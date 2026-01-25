import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import path from 'path'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const createCloudinaryStorage = ({
    folder,
    resourceType = 'image',
    allowedFormats = ['jpg', 'jpeg', 'png', 'webp'],
}) => {
    return new CloudinaryStorage({
        cloudinary,
        params: {
            folder,
            resource_type: resourceType,
            allowed_formats: allowedFormats,
            public_id: (req, file) => {
                // Remove file extension from original name
                const nameWithoutExt = path.parse(file.originalname).name
                
                // Sanitize filename: remove special chars, replace spaces with hyphens
                const sanitized = nameWithoutExt
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
                
                // Create unique identifier
                const timestamp = Date.now()
                const randomStr = Math.random().toString(36).substring(2, 8)
                
                // Format: sanitized-name_timestamp_random
                return `${sanitized}_${timestamp}_${randomStr}`
            },
        },
    })
}

export { cloudinary, createCloudinaryStorage }