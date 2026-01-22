import express from "express"
import multer from 'multer'
import User from "../models/user.js"
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer()

const router = express.Router()

import { createUserSchema } from "../Validators/UserValidators.js"

router.put('/edit/:id', upload.single('profilePicture'), async (req, res) => {

    try {
        const updateUser = { ...req.body }

        console.log('tournamentsParticipated:', updateUser.tournamentsParticipated);
        console.log('Type:', typeof updateUser.tournamentsParticipated);

        // Prevent email/uniqueId changes
        if (updateUser.email || updateUser.uniqueId) {
            return res.json({
                success: false,
                message: "Email and Unique ID cannot be changed"
            })
        }

        // Remove immutable fields
        delete updateUser.email
        delete updateUser.uniqueId

        // Convert verified to boolean
        if (updateUser.verified !== undefined) {
            updateUser.verified = updateUser.verified === 'true' || updateUser.verified === true;
        }

        // Handle ranking fields - nest them under ranking object
        if (updateUser.currentRanking !== undefined || updateUser.rankingPoints !== undefined) {
            updateUser.ranking = {};

            if (updateUser.currentRanking !== undefined && updateUser.currentRanking !== '') {
                updateUser.ranking.currentRanking = Number(updateUser.currentRanking);
            }

            if (updateUser.rankingPoints !== undefined && updateUser.rankingPoints !== '') {
                updateUser.ranking.rankingPoints = Number(updateUser.rankingPoints);
            }

            // Remove top-level fields
            delete updateUser.currentRanking;
            delete updateUser.rankingPoints;
        }

        // CRITICAL: Parse tournaments BEFORE validation
        if (updateUser.tournamentsParticipated !== undefined && updateUser.tournamentsParticipated !== '') {
            try {
                if (typeof updateUser.tournamentsParticipated === 'string') {
                    console.log('=== PARSING TOURNAMENTS ===');
                    const parsed = JSON.parse(updateUser.tournamentsParticipated);
                    console.log('Parsed result:', parsed);
                    console.log('Parsed type:', typeof parsed);

                    // Verify structure
                    for (const [year, tournaments] of Object.entries(parsed)) {
                        console.log(`Year ${year}:`, tournaments);
                        console.log(`Is array?`, Array.isArray(tournaments));

                        if (!Array.isArray(tournaments)) {
                            console.error(`ERROR: Year ${year} value is not an array!`);
                            return res.status(400).json({
                                success: false,
                                message: `Invalid tournament data for year ${year}: expected array, got ${typeof tournaments}`
                            });
                        }
                    }

                    updateUser.tournamentsParticipated = parsed;
                    console.log('=== TOURNAMENTS PARSED SUCCESSFULLY ===');
                } else {
                    console.log('Tournaments already an object, keeping as is');
                }
            } catch (e) {
                console.error('=== PARSE ERROR ===');
                console.error('Error:', e);
                return res.status(400).json({
                    success: false,
                    message: `Invalid tournament data: ${e.message}`
                });
            }
        } else {
            delete updateUser.tournamentsParticipated;
        }

        // Handle profile picture upload
        if (req.file) {
            const oldUser = await User.findById(req.params.id);
            if (oldUser && oldUser.profilePicture && !oldUser.profilePicture.includes('flaticon.com')) {
                const oldImagePath = path.join(__dirname, '..', oldUser.profilePicture);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateUser.profilePicture = req.file.path;
        }

        const validateUser = createUserSchema.parse(updateUser)

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            validateUser,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        })
    }
    catch (err) {
        console.error('Error:', err);
        // Better error handling for Zod validation errors
        if (err.name === 'ZodError') {
            console.error('Zod errors:', JSON.stringify(err.errors, null, 2));
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: err.errors
            })
        }

        res.status(500).json({
            success: false,
            message: `Failed to update user: ${err.message}`
        })
    }
})

router.get('/all-users', async (req, res) => {
    try {
        const allUsers = await User.find().sort({ createdAt: -1 })

        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            })
        }

        return res.status(200).json({
            success: true,
            users: allUsers
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user: user
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
})

export default router;