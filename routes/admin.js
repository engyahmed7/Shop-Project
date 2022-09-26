const path = require('path');

const express = require('express');
const {
    body
} = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
    '/add-product',
    [
        body('title', "Title must be at least 3 characters long")
        .isString()
        .isLength({
            min: 3
        })
        .trim(),
        body('price', 'Please Enter Valid Price').isFloat(),
        body('description', 'Description must be at least 5 characters long')
        .isLength({
            min: 5,
            max: 400
        })
        .trim()
    ],
    isAuth,
    adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
    '/edit-product',
    [
        body('title')
        .isString()
        .isLength({
            min: 3
        })
        .trim(),
        body('image', 'Please provide an image').custom((value, {
            req
        }) => {
            if (req.file) {
                return true;
            }
            return false;
        }),
        body('price').isFloat(),
        body('description')
        .isLength({
            min: 5,
            max: 400
        })
        .trim()
    ],
    isAuth,
    adminController.postEditProduct
);

router.delete('/products/:productId', isAuth, adminController.deleteProduct);

module.exports = router;