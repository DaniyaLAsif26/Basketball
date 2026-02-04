import jwt, { decode } from 'jsonwebtoken'
import User from '../models/user.js'
import Admin from '../models/admin.js'
import Event from '../models/event.js'

// helper function?
const verifyTokenFromCookie = (req, tokenName) => {
    const token = req.cookies?.[tokenName]
    if (!token) return null

    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        console.error('Error verifying token', err)
        return null;
    }
}


// allow user or admin middleware
const allowUserOrAdmin = async (req, res, next) => {
    try {
        let decoded = verifyTokenFromCookie(req, 'adminToken')
        if (decoded && decoded.role === 'admin') {
            const admin = await Admin.findById(decoded.id)

            if (admin) {
                req.user = {
                    id: admin._id,
                    role: 'admin'
                }
                return next()
            }
        }

        decoded = verifyTokenFromCookie(req, 'userToken')

        if (decoded && decoded.role === 'user') {
            const user = await User.findById(decoded.id)

            if (user) {
                req.user = {
                    id: user._id,
                    role: 'user'
                }
                return next()
            }
        }

        return res.status(401).json({ message: "Unauthorized access" });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server error during authentication" })
    }
}

// allow admin
const allowAdmin = async (req, res, next) => {
    try {
        let decoded = verifyTokenFromCookie(req, 'adminToken')
        if (decoded && decoded.role === 'admin') {
            const admin = await Admin.findById(decoded.id)

            if (admin) {
                req.user = {
                    id: admin._id,
                    role: 'admin'
                }
                return next()
            }
        }

        return res.status(401).json({ message: "Unauthorized access" });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server error during authentication" })
    }
}

const isOwner = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        if (req.user.role === "admin") {
            return next()
        }

        const eventId = req.params.id

        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: "Event Id is required"
            })
        }

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            })
        }

        const isUserOwner = event.hostedUser?._id.toString() === req.user
            ?.id.toString()

        if (!isUserOwner) {
            return res.status(403).json({
                success: false,
                message: "Forbidden - You are not the owner of this event"
            })
        }
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error during authorization"
        })
    }
}

export { allowUserOrAdmin, allowAdmin, isOwner };