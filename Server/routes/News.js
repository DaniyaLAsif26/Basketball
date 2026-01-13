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

<<<<<<< HEAD
router.delete('/delete/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id)

        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "News deleted successfully"
        })
=======
router.put('/admin/edit/:id', upload.single('tournamentImage') , async (req, res) => {
    const updateNews = {...req.body }

    try {

        if (req.file) {
            // Optional: Delete old image from storage
            const oldNews = await News.findById(req.params.id);
            if (oldNews && oldNews.newsImage) {
                const oldImagePath = path.join(__dirname, '..', oldNews.tournamentImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            updateNews.newsImage = req.file.path;
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

>>>>>>> 754824f8e0627b2038abfdc7f5b1edf7f4602c2d
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
<<<<<<< HEAD
            message: `Failed to Delete News: ${err.message}`
        })
=======
            message: 'Error updating news'
        });
>>>>>>> 754824f8e0627b2038abfdc7f5b1edf7f4602c2d
    }
})

export default router;