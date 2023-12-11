const express = require('express');
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const e = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

// @route GET api/auth
// @desc check if user is logged in
// @access Public
router.get('/', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const {username, password}= req.body;

    //simple validation
    if(!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username or password'
        })
    }

    try {
        //check for existing user
        const user = await User.findOne({ username })
        if(user) {
            return res.status(400).json({
                success: false,
                message: 'Username already exist'
            })
        }

        //hash password
        const hashedpassword = await argon2.hash(password)
        const newUser = new User({username, password: hashedpassword})
        await newUser.save()

        //return token
        const accessToken = jwt.sign({userid: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({
            success: true,
            message: 'register successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    //simple validation
    if(!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username or password'
        })
    }
    //bat dau nch db, await thi dung try catch
    try {
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username'
            })
        }

        //username found
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            })
        }
        //all good, return token
        const accessToken = jwt.sign({userid: user._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({
            success: true,
            message: 'Logined successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

module.exports = router