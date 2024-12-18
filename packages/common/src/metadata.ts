import { z } from 'zod'

export const LottoPGFMetadataV1Schema = z.object({
    version: z.literal('1.0.0'),
    name: z.string().max(128),
    title: z.string().max(128).optional(),
    description: z.string().max(2048),
    longDescription: z.string().max(8192).optional(),
    /** Canonical app URL */
    url: z.string().max(2048),
    /** URI to icon image */
    icon: z.string().max(2048),
    /** URI to logo image */
    logo: z.string().max(2048),
    /** URI to banner image */
    bannerImage: z.string().max(2048),
})

export type LottoPGFMetadataV1 = z.infer<typeof LottoPGFMetadataV1Schema>

export type LottoPGFMetadata = LottoPGFMetadataV1
