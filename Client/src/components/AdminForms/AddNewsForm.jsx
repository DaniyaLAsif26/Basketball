import './add-news-form.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { IoMdArrowRoundBack } from "react-icons/io";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const newsSchema = z.object({
    newsHeadline: z.string()
        .min(5, "Title to small")
        .max(550, "Title to big"),

    newsContent: z.string()
        .min(15, "Content to small")
        .max(600, "Content to big"),

    newsImage: z.instanceof(FileList)
        .optional()
        .refine(files => !files || files.length === 0 || files.length === 1, "Upload only 1 image")
        .refine(files => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024, "Image must be less than 5MB")
        .refine(files => !files || files.length === 0 || ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type), "Invalid Image format"),
})

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AddNewsForm({ isEditMode = false, newsData = null }) {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [existingImage, setexistingImage] = useState(false)

    const prepareNewsFormData = (news) => {

        if (!news) return;

        return {
            newsHeadline: news.newsHeadline || '',
            newsContent: news.newsContent || '',
        }
    }

    const initialValues = () => {
        if (isEditMode && newsData) {
            return (prepareNewsFormData(newsData))
        }

        const draft = sessionStorage.getItem('news-draft');
        if (draft) {
            try {
                return JSON.parse(draft)
            }
            catch (e) {
                console.error('Failed to parse draft', e)
            }
        }

        return {
            newsTitle: '',
            newsContent: '',
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(newsSchema),
        defaultValues: initialValues()
    })

    const formValues = watch();

    useEffect(() => {

        if (isEditMode && newsData) {
            const editData = prepareNewsFormData(newsData);
            Object.keys(editData).forEach(keys => {
                setValue(keys, editData[keys])
            })

            if (editData.newsImage) {
                setexistingImage(editData.newsImage)
            }

            sessionStorage.removeItem('news-draft');
        }

        if (!isEditMode) {
            const draft = sessionStorage.getItem('news-draft');

            if (draft) {
                const parseDraft = JSON.parse(draft);
                Object.keys(parseDraft).forEach(key => {
                    if (key !== "newsImage") {
                        setValue(key, parseDraft[key])
                    }
                })
            }
        }

    }, [isEditMode, newsData, setValue])

    useEffect(() => {
        if (isEditMode) return;

        const timeOutId = setTimeout(() => {
            const { newsImage, ...newsDraft } = formValues
            sessionStorage.setItem('news-draft', JSON.stringify(newsDraft))
        }, 500)

        return () => clearTimeout(timeOutId)
    }, [isEditMode, formValues])

    const handleClear = (e) => {
        sessionStorage.removeItem('tournazmentDraft');
        reset()
    }

    const createNews = async (data) => {
        if (loading) return;

        try {
            setLoading(true)
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === 'newsImage') {
                    if (value && value.length > 0) {
                        formData.append('newsImage', value[0]);
                    }
                }
                else if (value !== undefined && value !== '') {
                    formData.append(key, value);
                }
            })

            const res = await fetch(`${BackEndRoute}/api/news/admin/create`, {
                method: 'POST',
                body: formData
            })

            const dataRes = await res.json();

            if (dataRes.success === false) {
                return alert(`Error: ${dataRes.message}`);
            }

            alert(`Success: ${dataRes.message}`);
            handleClear()
            navigate('/admin')

        } catch (err) {
            alert(`Error: ${err.message}`);
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    }

    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return <span className="news-error-message">{error.message}</span>;
    };

    if (isEditMode && (!newsData || newsData.length < 1)) return;

    return (
        <div className="add-news">
            <div className="add-news-cont">
                <a href="/admin"><IoMdArrowRoundBack /></a>
                <div className="add-news-head">
                    <h2>
                        {isEditMode ? 'Edit News' : 'Add News'}
                    </h2>
                </div>
                <div className="add-news-from-cont">
                    <form className='add-news-form' onSubmit={handleSubmit(createNews)}>
                        <div className="news-form">
                            <div className="news-form-div">
                                <label htmlFor="title">News Title : </label>
                                <textarea
                                    name='title'
                                    id="title"
                                    placeholder='Add News Title'
                                    resize='none'
                                    {...register('newsHeadline')}
                                >
                                </textarea>
                            </div>
                            <ErrorMessage error={errors.newsHeadline} />
                        </div>
                        <div className="news-form">
                            <div className="news-form-div">
                                <label htmlFor="content">News Content : </label>
                                <textarea
                                    name='content'
                                    id="content"
                                    placeholder='Add News Content'
                                    resize='none'
                                    {...register('newsContent')}
                                >
                                </textarea>
                            </div>
                            <ErrorMessage error={errors.newsContent} />
                        </div>
                        <div className="news-form-div">
                            <label htmlFor="image">News Image : </label>
                            <input
                                id='image'
                                type="file"
                                name="image"
                                accept='image/png, image/jpeg, image/jpg'
                                // required
                                className="event-form-input"
                                {...register('newsImage')}
                            />
                        </div>
                        <div className="news-btn">
                            <div className="add-news-btn">
                                <button type='submit' disabled={isSubmitting}>
                                    {isEditMode ? 'Edit News' : 'Add News'}
                                </button>
                            </div>
                            <div className="add-news-btn clear-news-btn">
                                <button onClick={handleClear}>Clear</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}