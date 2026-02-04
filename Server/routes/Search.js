import express from 'express'
import Event from '../models/event.js'

const router = express.Router()

function buildSearchQuery(filters) {
    const query = {};

    // Text search across multiple fields
    if (filters.search && filters.search.trim() !== '') {
        const searchRegex = new RegExp(filters.search, 'i');
        query.$or = [
            { tournamentName: searchRegex },
            { venueName: searchRegex },
            { city: searchRegex },
            { address: searchRegex },
            { district: searchRegex }
        ];
    }

    if (filters.type && filters.type !== 'All') {
        query.type = filters.type.toLocaleUpperCase();
    }

    if (filters.age && filters.age !== 'All') {
        query.ageCategory = filters.age.toLocaleUpperCase();
    }

    if (filters.category && filters.category !== 'All') {
        query.category = filters.category.toUpperCase();
    }

    if (filters.level && filters.level !== 'All') {
        query.level = filters.level.toLocaleUpperCase();
    }

    if (filters.format && filters.format !== 'All') {
        query.format = filters.format.toLocaleUpperCase();
    }

    if (filters.district && filters.district !== 'All') {
        query.district = filters.district;
    }

    return query;
}

router.get('/events', async (req, res) => {
    try {
        const query = req.query

        const query1 = buildSearchQuery(query)

        const events = await Event.find(query1).sort({ createdAt: -1 }).lean()

        if (events.length === 0) {
            return res.status(200).json({
                success: true,
                events: []
            })
        }

        return res.status(200).json({
            success: true,
            events: events
        })

    }
    catch (err) {
        console.log(err)
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
})

export default router;


