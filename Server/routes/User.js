import express from "express"
import multer from 'multer'
import User from "../models/user.js"

const upload = multer()

const router = express.Router()

import { createUserSchema } from "../Validators/UserValidators.js"

router.put('/edit/:id', upload.single('profilePicture'), async (req, res) => {

    try {

        const updateUser = { ...req.body }

        if (updateUser.email) {
            return res.json({
                success: false,
                message: "Email can not be chnaged"
            })
        }

        if (req.file) {
            // Optional: Delete old image from storage
            const oldUser = await User.findById(req.params.id);
            if (oldUser && oldUser.profilePicture) {
                const oldImagePath = path.join(__dirname, '..', oldUser.profilePicture);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            updateUser.playerProfile = req.file.path;
        }

        const validateUser = createUserSchema.parse(updateUser)

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            validateUser,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "User not Found",
            })
        }

        res.status(200).json({
            success: true,
            message: "User Updated successfully",
            user: updatedUser
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: `Failed to update User: ${err.message}`
        })
    }
})

router.get('/all-users', async (req, res) => {
    try {
        const allUsers = await User.find().sort({ createdAt: -1 })

        if (!allUsers) {
            return res.status(404).json({
                sucess: false,
                message: "No Users Found"
            })
        }

        return res.status(200).json({
            success: true,
            users: allUsers
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: `Error : ${err.message}`
        })
    }
})

export default router;