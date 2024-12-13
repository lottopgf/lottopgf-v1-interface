import { Address, getAddress, isAddress } from 'viem'
import { z } from 'zod'

export const EthereumAddressSchema = z
    .string()
    .refine((arg: any): arg is Address => isAddress(arg))
    .transform((arg) => getAddress(arg))
