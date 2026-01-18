import express from 'express'

const router = express.Router()

router.post('/admin', (req, res) => {
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })

    res.json({
        success: true
    })
})

export default router;

