const Category = require('./../models/category')
const {errorHandler} = require('./../helpers/dbErrorHandler')
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})


exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err) {
            return res.status(400).json({
                error: 'Category not found'
            })
        }
        req.category = category
        next()
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if(err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(category)
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.remove = (req, res) => {
    const category = req.category
    category.remove((err, removedCategory) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Category deleted'
        })
    })
}

exports.update = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, updatedCategory) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            updatedCategory,
            message: 'Category updated'
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, allCategories) => {
        if(err) {
            return res.status(400).json({
                error: 'Categories not found'
            })
        }
        res.json(allCategories)

    })
}