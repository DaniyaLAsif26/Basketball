import express from 'express'
import multer from 'multer'

import Event from '../models/event.js'
import { createEventSchema } from '../Validators/EventValidator.js'

const upload = multer()

const router = express.Router()

router.post('/create', upload.single('tournamentImage'), async (req, res) => {

    try {
        const parsedData = {
            ...req.body,
            highlights: JSON.parse(req.body.highlights || '[]')
        }

        // 🔒 SERVER-SIDE VALIDATION
        const validatedData = createEventSchema.parse(parsedData)

        if (req.file) {
            validatedData.tournamentImage = req.file.path
        }

        const event = await Event.create(validatedData)

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: event
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Error creating event',
            error: err.message
        });
    }
})

router.get('/all-events', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 })

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Events Found"
            })
        }

        res.status(200).json({
            success: true,
            data: events
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
})

export default router