import { z } from 'zod'

export const EthereumAddressSchema = z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .refine((_arg): _arg is `0x${string}` => true)
// .transform((arg) => getAddress(arg)) // TODO: Re-add viem, but gotta deal with the ES modules nonsense

export type EthereumAddress = z.infer<typeof EthereumAddressSchema>
