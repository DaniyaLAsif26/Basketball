import { z } from 'zod'

export const createUserSchema = z.object({
    verified: z.boolean().optional(),
    firstName: z.string().min(3),
    lastName: z.string().min(1),
    profilePicture: z.string().optional(),
    phoneNumber: z.string().regex(/^[6-9]\d{9}$/).min(10).max(10),
    homeTown: z.string().min(1),
    dateOfBirth: z.coerce.date(),
    height: z.string().min(1),
    weight: z.string().min(1),
    wingspan: z.string().min(1),
    playerPosition: z.enum(['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center']),
    gender: z.enum(['Male', 'Female']),
    ranking: z.object({
        currentRanking: z.number().optional(),
        rankingPoints: z.number().optional()
    }).optional(),
    tournamentsParticipated: z.record(z.array(z.string())).optional(),
})
    .refine(
        data => {
            const dob = new Date(data.dateOfBirth);
            const today = new Date();

            const minAgeDate = new Date(
                today.getFullYear() - 10,
                today.getMonth(),
                today.getDate()
            );

            return dob <= minAgeDate;
        },
        {
            message: "User must be at least 10 years old",
            path: ["dateOfBirth"],
        }
    )