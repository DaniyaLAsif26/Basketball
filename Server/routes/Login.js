import express from 'express'
import Admin from '../models/admin.js'
import User from '../models/user.js'

import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const router = express.Router()

const isProduction = process.env.NODE_ENV === 'production';

const getCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction, // true in production (HTTPS), false in development
    // sameSite: isProduction ? "none" : "lax", // "none" for cross-origin, "lax" for same-origin
    sameSite: 'lax',
    maxAge: maxAge,
});

router.post('/admin', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password || username === undefined || password === undefined) {
        return res.status(404).json({
            success: false,
            message: "Username and Password is required"
        })
    }

    try {

        const adminUser = await Admin.findOne({ username })
        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password"
            })
        }

        const adminPassword = await bcrypt.compare(password, adminUser.password)
        if (!adminPassword) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password"
            })
        }

        const adminToken = jwt.sign({
            id: adminUser._id,
            role: 'admin'
        },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie("adminToken", adminToken, getCookieOptions(7 * 24 * 60 * 60 * 1000))

        return res.status(200).json({
            success: true,
            message: "Logged in Successfully",
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Server error" });
    }
})

router.get('/verify/admin', async (req, res) => {
    try {
        const token = req.cookies.adminToken

        if (!token) {
            return res.json({
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role !== 'admin') {
            return res.json({
                success: false
            })
        }

        res.json({ success: true })
    }
    catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message: err.message
        })
    }
})

router.get('/verify/user', async (req, res) => {
    try {
        const token = req.cookies.userToken

        if (!token) {
            return res.json({
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role !== 'user') {
            return res.json({
                success: false
            })
        }

        const user = await User.findById(decode.id)

        if (!user) {
            return res.json(
                {
                    success: false,
                }
            )
        }

        res.json(
            {
                success: true,
                user: user
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message: err.message
        })
    }
})

export default router;

