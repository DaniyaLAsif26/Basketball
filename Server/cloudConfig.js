import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
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

const deleteCloudinaryImage = async (imageUrl) => {
    if (!imageUrl || imageUrl.includes('flaticon.com') || imageUrl.includes('default')) {
        return null;
    }

    try {
        const urlParts = imageUrl.split('/');
        const uploadIndex = urlParts.indexOf('upload');

        if (uploadIndex !== -1) {
            let pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
            pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');
            const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');

            const deleteResult = await cloudinary.uploader.destroy(publicId);

            return deleteResult;
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return null;
    }
}

export { cloudinary, createCloudinaryStorage, deleteCloudinaryImage }