import express from 'express'

const router = express.Router()

router.delete('/admin', (req, res) => {
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })

    res.json({
        success: true,
    })
})

router.delete('/user', (req, res) => {
    res.clearCookie('userToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })

    res.json({
        success: true,
        message : "User Logged Out"
    })
})

export default router;

