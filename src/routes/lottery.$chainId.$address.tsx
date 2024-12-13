import { EthereumAddressSchema } from '@/lib/schemas'
import { Lottery } from '@/pages/Lottery'
import { createFileRoute } from '@tanstack/react-router'
import { Address } from 'viem'
import { z } from 'zod'

export const Route = createFileRoute('/lottery/$chainId/$address')({
    component: async ({ params }) => {
        const p = z
            .object({
                chainId: z.coerce.number(),
                address: EthereumAddressSchema,
            })
            .parse(params)
        return <RouteComponent chainId={p.chainId} address={p.address} />
    },
})

function RouteComponent(props: { chainId: number; address: Address }) {
    return <Lottery {...props} />
}
