import express from 'express'
import jwt from "jsonwebtoken";

import User from '../models/user.js'

const router = express.Router()

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.O_AUTH_CLIENT_ID);

const isProduction = process.env.NODE_ENV === 'production';

const getCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction, // true in production (HTTPS), false in development
    sameSite: isProduction ? "none" : "lax", // "none" for cross-origin, "lax" for same-origin
    maxAge: maxAge,
});

router.post('/google', async (req, res) => {
    try {
        const { token } = req.body

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token missing"
            })
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.O_AUTH_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const { sub, email, name, email_verified } = payload

        if (!email_verified) {
            return res.status(401).json({
                success: false,
                message: "Email not verified by Google",
            });
        }


        let user = await User.findOne({ email: email })

        if (!user) {
            user = await User.create(
                {
                    uniqueId: sub,
                    email: email,
                    name: name
                }
            )
        }

        const userToken = jwt.sign({
            id: user._id,
            role: "user"
        },
            process.env.JWT_SECRET,
            { expiresIn: '14d' }
        )

        res.cookie("UserToken", userToken, getCookieOptions(14 * 24 * 60 * 60 * 1000))

        return res.status(200).json({
            success: true,
            user: user,
        })

    }
    catch (err) {
        console.log(err)
        res.status(401).json({
            success: false,
            message: "Invalid Google token",
        });
    }
})

export default router;