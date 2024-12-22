import { LOOTERY_ABI } from '@/abi/Lootery'
import { Address, isAddressEqual } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export function useLootery(contractAddress: Address) {
    const config = {
        address: contractAddress,
        abi: LOOTERY_ABI,
    } as const

    const { data: owner } = useReadContract({
        ...config,
        functionName: 'owner',
        query: {
            enabled: Boolean(contractAddress),
        },
    })

    const { address } = useAccount()
    const isConnectedAccountOwner = owner && address && isAddressEqual(owner, address)

    return {
        config,
        data: {
            owner,
            isConnectedAccountOwner,
        },
    }
}
