const express = require('express')
const router = express.Router()
const {userById} = require('../controllers/user')
const {requireSignin, isAuth, isAdmin} = require('./../controllers/auth')

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

// Anytime when there will be a userId parameter in query string, userById method will run.
// userById method make user id available in request object
router.param('userId', userById)


module.exports = router