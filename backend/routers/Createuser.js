const express = require('express');
const router = express.Router();
const User = require('../models/Usermodel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "mynameismanthanimfrompune";

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 4 }),
    body('password', "incorrect password").isLength({ min: 5 })],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //password hidden
        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password , salt);

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password:secpassword
            });
           
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', "incorrect password").isLength({ min: 5 })], async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "try again" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password , userdata.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "wrong password.." });
            }

            const data = {
                user:{
                    id:userdata.id
                }
            }
            const authToken = jwt.sign(data ,jwtsecret );
            res.json({ success: true , authToken : authToken });
            // return res.json({ success: true });
        
        } catch (error) {
            console.log(error);
            // res.json({ success: false });
        }
    })

module.exports = router;