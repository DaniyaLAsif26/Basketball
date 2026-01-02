import { z } from 'zod'

export const createEventSchema = z.object({
  tournamentName: z.string().min(3),
  tournamentImage :z.string().optional(),

  type: z.enum(['UN-OFFICIAL', 'OFFICIAL']),
  category: z.enum(['MEN', 'WOMEN']),
  level: z.string().min(1),
  ageCategory: z.string().min(1),
  format: z.enum(['5X5', '3X3']),
  gender: z.enum(['mens', 'womens', 'mixed']),

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  registrationDeadline: z.coerce.date(),

  venueName: z.string().min(3),
  address: z.string().min(5),
  city: z.string().min(1),
  district: z.string().min(1),
  zipCode: z.string().regex(/^\d{6}$/),

  entryFee: z.coerce.number().min(0).optional(),
  firstPrize: z.coerce.number().min(0).optional(),
  secondPrize: z.coerce.number().min(0).optional(),
  thirdPrize: z.coerce.number().min(0).optional(),

  phone1: z.string().regex(/^[6-9]\d{9}$/),
  phone2: z.string().regex(/^[6-9]\d{9}$/).optional(),
  email: z.string().email().optional(),
  instagram: z.string().optional(),
  instagramLink: z.string().url().optional(),

  description: z.string().min(5),
  highlights: z.array(z.string().min(1)),

  createdBy: z.string().optional()
})
.refine(
  d => d.endDate >= d.startDate,
  { path: ['endDate'], message: 'End date must be after start date' }
)
.refine(
  d => d.registrationDeadline <= d.startDate,
  { path: ['registrationDeadline'], message: 'Registration deadline must be before start date' }
)

