const express = require("express");
const router = express.Router();
// import mysql from 'mysql2';
const mysql = require('mysql2/promise');
const { route } = require("./product");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "man@1610",
    database: "qtask",
    port: 3306
});

router.get('/', async (req, res) => {
    try {
        const products = await connection.query("select * from products");
        return res.status(200).json({
            status: "Ok",
            data: products,
            message: "product fetch successfully"
        })
    } catch (e) {
        return res.status(500).json({
            message: "somting went wrong",
            error: e.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const { product_name, description, price, stock, category } = req.body;
        const result = await connection.query(`INSERT INTO products (product_name, description, price,stock,category) VALUES (?, ?,?,?,?)`, [product_name, description, price, stock, category])
        if (!result) {
            return res.status(401).json({
                message: "data not inserted",
            })
        }
        return res.status(200).json({
            method: 200,
            message: "data inserted succesfully",
            response: result
        })
    } catch (e) {
        return res.status(500).json({
            message: "somting went wrong",
            error: e.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params['id'];
        const response = await connection.query("DELETE FROM products WHERE product_id=?", [productId])

        if (!response) {
            return res.status(401).json({
                message: "Product not delete",
            })
        }

        return res.status(200).json({
            method: 200,
            message: "Product deleted succesfully",
            response: response
        })

    } catch (error) {
        return res.status(500).json({
            message: "somting went wrong",
            error: error.message
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const product_id = req.params['id'];
        const { product_name, description, price, stock, category } = req.body;
        const response = await connection.query("UPDATE products SET product_name=?,description=?,price=?,stock=?,category=? WHERE  product_id=?", [product_name, description, price, stock, category, product_id])
        if (!response) {
            return res.status(401).json({
                message: "Product not updated",
            })
        }

        return res.status(200).json({
            method: 200,
            message: "Product update succesfully",
            response: response
        })
    } catch (e) {
        return res.status(500).json({
            message: "somting went wrong",
            error: e.message
        })
    }
})


module.exports = router