const express = require('express')
const router = express.Router()
const {requireSignin, isAuth, isAdmin} = require('./../controllers/auth')
const {userById, addOrderToUserHistory} = require('../controllers/user')
const {createOrder, ordersList, getStatusValues, updateOrderStatus, orderById} = require('../controllers/order')
const {decreaseQuantity} = require('../controllers/product')


router.post('/order/create/:userId',
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    createOrder
)
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, ordersList)
router.get('/order/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues)
router.put('/order/:orderId/update-status/:userId', requireSignin, isAuth, isAdmin, updateOrderStatus)



router.param('userId', userById)
router.param('orderId', orderById)


module.exports = router