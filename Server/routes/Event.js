import express from 'express'
import multer from 'multer'

import Event from '../models/event.js'
import jwt from "jsonwebtoken";

import { cloudinary, createCloudinaryStorage, deleteCloudinaryImage } from '../cloudConfig.js'

const createUserStorage = createCloudinaryStorage({
    folder: "events",
})

const upload = multer({ storage: createUserStorage })

import { createEventSchema } from '../Validators/EventValidator.js'

const router = express.Router()

router.post('/create', upload.single('tournamentImage'), async (req, res) => {

    try {

        const token = req.cookies.userToken || req.cookies.adminToken

        if (!token) {
            return res.json({
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        let userId

        if (decode.role === 'user') {
            userId = decode.id
        }

        const parsedData = {
            ...req.body,
            highlights: JSON.parse(req.body.highlights || '[]'),
            hostedUser: userId
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
    const query = req.query.q?.trim();

    try {
        if (!query) {
            const events = await Event.find().sort({ createdAt: -1 })

            if (events.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No Events Found"
                })
            }

            return res.status(200).json({
                success: true,
                data: events
            })
        }

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const events = await Event.find({
            tournamentName: {
                $regex: escapedQuery,
                $options: 'i'
            }
        })

        if (events.length === 0) {
            return res.status(299).json({
                success: true,
                data: []
            })
        }

        return res.status(200).json({
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
        const event = await Event.findById(req.params.id).populate('hostedUser')

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
            const oldEvent = await Event.findById(req.params.id)

            // Delete old image from Cloudinary
            if (oldEvent && oldEvent.tournamentImage) {
                await deleteCloudinaryImage(oldEvent.tournamentImage)
            }

            updateData.tournamentImage = req.file.path
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
        const event = await Event.findById(req.params.id)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
            })
        }

        if (event.tournamentImage) {
            await deleteCloudinaryImage(event.tournamentImage)
        }

        await Event.findByIdAndDelete(req.params.id)

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