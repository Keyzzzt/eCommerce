const User = require('./../models/user')
const braintree = require('braintree')
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const gateway = new braintree.BraintreeGateway({
    // This should be chanched to braintree.Environment.Production when will have real braintree account
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
})

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if(err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    })
}

exports.processPayment = (req, res) => {
    let nonceFromClient = req.body.paymentMethodNonce
    let amountFromClientSide = req.body.amount
    // Charge
    let newTransaction = gateway.transaction.sale({
        amount: amountFromClientSide,
        paymentMethodNonce: nonceFromClient,
        options: {
            submitForSettlement: true
        }
    }, (err, response) => {
        if(err) {
            res.status(500).json(err)
        } else {
            res.json(response)
        }
    })
}

