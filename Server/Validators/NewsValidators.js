import { z } from 'zod'

export const createNewsSchema = z.object({
    newsHeadline: z.string().min(5),
    newsContent: z.string().min(15),
    newsImage: z.string().optional(),
})