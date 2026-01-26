import express from 'express'
import News from '../models/news.js'

import multer from 'multer'

import { cloudinary, createCloudinaryStorage, deleteCloudinaryImage } from '../cloudConfig.js'

const createUserStorage = createCloudinaryStorage({
    folder: "news",
})

const upload = multer({ storage: createUserStorage })

import { createNewsSchema } from '../Validators/NewsValidators.js'

const router = express.Router()


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

    const query = req.query.q?.trim();

    try {
        if (!query) {
            const news = await News.find().sort({ createdAt: -1 })

            if (!news || news.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No News Found"
                })
            }

            return res.status(200).json({
                success: true,
                news: news
            })
        }

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const news = await News.find({
            newsHeadline: {
                $regex: escapedQuery,
                $options: 'i'
            }
        })

        if (news.length === 0) {
            return res.status(200).json({
                success: true,
                news: []
            })
        }

        return res.status(200).json({
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

router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id)

        if (!news) {
            return res.status(404).json({
                success: true,
                message: "News not found"
            })
        }

        res.status(200).json({
            success: true,
            news: news
        })
    } catch (err) {
        console.log(err)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id)

        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            })
        }

        if (news.newsImage) {
            await deleteCloudinaryImage(news.newsImage)
        }

        await News.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "News deleted successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: `Failed to Delete News: ${err.message}`
        })
    }
})

router.put('/admin/edit/:id', upload.single('newsImage'), async (req, res) => {
    const updateNews = { ...req.body }

    try {

        if (req.file) {
            const oldNews = await News.findById(req.params.id)

            // Delete old image from Cloudinary
            if (oldNews && oldNews.newsImage) {
                await deleteCloudinaryImage(oldNews.newsImage)
            }

            updateNews.newsImage = req.file.path
        }

        const validateNews = createNewsSchema.parse(updateNews)

        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            validateNews,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNews) {
            return res.status(404).json({
                success: false,
                message: "News Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "News Updated Successfully",
            data: updatedNews
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: `Failed to edit News: ${err.message}`
        })

    }
})

export default router;