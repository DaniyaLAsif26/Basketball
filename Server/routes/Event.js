import express from 'express'
import multer from 'multer'

import Event from '../models/event.js'
import { createEventSchema } from '../Validators/EventValidator.js'
import { success } from 'zod'

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

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
            })
        }

        res.status(200).json({
            success: true,
            data: event
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.put('/edit/:id', upload.single('tournamentImage'), async (req, res) => {

    try {
        const updateData = { ...req.body }

        if (updateData.highlights && typeof updateData.highlights === 'string') {
            try {
                updateData.highlights = JSON.parse(updateData.highlights);
            } catch (e) {
                updateData.highlights = [];
            }
        }

        if (req.file) {
            // Optional: Delete old image from storage
            const oldEvent = await Event.findById(req.params.id);
            if (oldEvent && oldEvent.tournamentImage) {
                const oldImagePath = path.join(__dirname, '..', oldEvent.tournamentImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            updateData.tournamentImage = req.file.path;
        }

        const validatedData = createEventSchema.parse(updateData)

        const updatedData = await Event.findByIdAndUpdate(
            req.params.id,
            validatedData,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Event Updated Successfully",
            data: updatedData
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed to update tournament: ${error.message}`
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Event Deleted Successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: `Failed to Delete Event: ${err.message}`
        })
    }
})

export default router