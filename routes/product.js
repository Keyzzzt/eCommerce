const express = require('express')
const router = express.Router()
const {userById} = require('../controllers/user')
const {requireSignin, isAuth, isAdmin} = require('./../controllers/auth')
const {create, productById, read, remove, update, list, listRelated, listBySearch, photo, searchedProduct} = require('./../controllers/product')

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId',requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId',requireSignin, isAuth, isAdmin, update)

router.get('/products', list)
router.get('/products/related/:productId', listRelated)
router.get('/product/photo/:productId', photo)
router.get('/products/search', searchedProduct)

router.post('/products/by/search', listBySearch)


router.param('userId', userById)
router.param('productId', productById)


module.exports = router