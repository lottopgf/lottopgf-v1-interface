import { z } from 'zod'
import { type Address, getAddress } from 'viem'

export const EthereumAddressSchema = z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .refine((arg): arg is Address => {
        try {
            getAddress(arg)
            return true
        } catch (e) {
            return false
        }
    })
    .transform((arg) => getAddress(arg))

export type EthereumAddress = z.infer<typeof EthereumAddressSchema>
