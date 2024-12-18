import { z } from 'zod'
import { EthereumAddressSchema } from './EthereumAddressSchema'

/** Extended beneficiary info */
export const BeneficiaryInfoSchema = z.object({
    /** Identifier for the beneficiary (mapped to contract) */
    address: EthereumAddressSchema,
    /** Description of the beneficiary and their cause */
    description: z.string().max(8192),
    /** Funding goal in the respective token decimals */
    goal: z
        .string()
        .regex(/^\d+$/)
        .refine((val): val is `${number}` => true),
})

export type BeneficiaryInfo = z.infer<typeof BeneficiaryInfoSchema>

export const LottoPGFMetadataV1Schema = z.object({
    /** Metadata version (not lottery version) */
    version: z.literal('1.0.0'),
    /** Optional title override to be rendered */
    title: z.string().max(128).optional(),
    /** Short description of the lottery */
    description: z.string().max(2048).optional(),
    /** Long description of the lottery */
    longDescription: z.string().max(8192).optional(),
    /** Canonical app URL */
    url: z.string().url().optional(),
    /** URI to icon image */
    icon: z.string().url().optional(),
    /** URI to logo image */
    logo: z.string().url().optional(),
    /** URI to banner image */
    bannerImage: z.string().url().optional(),
    /** Extended beneficiaries info */
    beneficiaries: z.array(BeneficiaryInfoSchema),
})

export type LottoPGFMetadataV1 = z.infer<typeof LottoPGFMetadataV1Schema>

export type LottoPGFMetadata = LottoPGFMetadataV1
