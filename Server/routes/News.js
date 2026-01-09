import express from 'express'
import News from '../models/news.js'

import multer from 'multer'

import { createNewsSchema } from '../Validators/NewsValidators.js'
import news from '../models/news.js'

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
    try {
        const news = await News.find().sort({ createdAt: -1 })

        if (!news || news.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No News Found"
            })
        }

        res.status(200).json({
            success: true,
            news: news
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Error fetching news',
            error: err.message
        });
    }

})

export default router