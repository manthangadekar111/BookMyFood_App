const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        let data = req.body.order_data;
        if (Array.isArray(data)) {
            data.splice(0, 0, { Order_date: req.body.order_date });
        } else {
            data = [{ Order_date: req.body.order_date }];
        }

        let eId = await Order.findOne({ 'email': req.body.email });


        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});


router.post('/myOrder', async (req, res) => {
    try {

        let myData = await Order.findOne({
            'email': req.body.email

        })
        res.json({ orderData: myData })
    } catch (err) {
        res.send(err);
    }
})


module.exports = router;
