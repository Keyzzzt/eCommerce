const {Order, CartItem} = require('./../models/order')
const path = require('path')
const {errorHandler} = require('./../helpers/dbErrorHandler')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})


exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if(err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            req.order = order
        })
    next()
}

exports.createOrder = (req, res) => {
    // console.log('create order', req.body)
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((err, response) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(response)
    })
}

exports.ordersList = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(orders)
        })
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}

exports.updateOrderStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (err, order) => {
        if(err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(order)
    })
}

