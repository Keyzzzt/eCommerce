const {Order} = require('./../models/order')
const User = require('./../models/user')
const {errorHandler} = require('./../helpers/dbErrorHandler')
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})


// userById method make user id available in request object
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()
    })
}

exports.update = (req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, updatedUser) => {
        if(err) {
            return res.status(400).json({
                error: 'User not authorized to perform this action'
            })
        }
        updatedUser.hashedPassword = undefined
        updatedUser.salt = undefined
        res.json(updatedUser)
    })
}

exports.read = (req, res) => {
    req.profile.hashedPassword = undefined
    req.profile.salt = undefined

    return res.json(req.profile)
}

exports.addOrderToUserHistory  = (req, res, next) => {
    let history = []
    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {history: history}},
        {new: true},
        (err, response) => {
            if(err) {
                return res.status(400).json({
                    error: 'Couldn\'t update usersers history'
                })
            }
            next()
        }
    )
}

exports.purchaseHistory = (req, res) => {
    Order.find({user: req.profile._id})
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, order) => {
            if(err) {
                res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(order)
        })
}