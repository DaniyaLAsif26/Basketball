import express from 'express'
import Admin from '../models/admin.js'

import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const router = express.Router()

const isProduction = process.env.NODE_ENV === 'production';

const getCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction, // true in production (HTTPS), false in development
    sameSite: isProduction ? "none" : "lax", // "none" for cross-origin, "lax" for same-origin
    maxAge: maxAge,
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password || username === undefined || password=== undefined) {
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
            adminToken
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Server error" });
    }
})

export default router;

