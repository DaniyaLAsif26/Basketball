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
            // highlights: JSON.parse(req.body.highlights || '[]')
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

export default router