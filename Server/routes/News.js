import express from 'express'
import News from '../models/news.js'

import multer from 'multer'

import { createNewsSchema } from '../Validators/NewsValidators.js'

const router = express.Router()

const upload = multer()

router.post('/admin/create', upload.single('newsImage'), async (req, res) => {
    try {
        const parseData = {
            ...req.body
        }

        const validatedata = createNewsSchema.parse(parseData)

        if (req.file) {
            validatedata.newsImage = req.file.path
        }

        const news = await News.create(validatedata)

        res.status(201).json({
            success: true,
            message: "News created successfully",
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Error creating news',
            error: err.message
        });
    }
})

router.get('/all-news', async (req, res) => {

})

export default router