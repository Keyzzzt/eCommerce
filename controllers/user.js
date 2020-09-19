const User = require('./../models/user')
const jwt = require('jsonwebtoken') // Uses to generate signed token
const expressJWT = require('express-jwt') // Uses for authorization check
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