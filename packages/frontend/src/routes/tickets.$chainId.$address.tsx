import { Tickets } from '@/pages/Tickets'
import { EthereumAddressSchema } from '@common/EthereumAddressSchema'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/tickets/$chainId/$address')({
    loader: ({ params }) => {
        return z
            .object({
                chainId: z.coerce.number(),
                address: EthereumAddressSchema,
            })
            .parse(params)
    },
    component: () => {
        return <RouteComponent />
    },
})

function RouteComponent() {
    const { chainId, address } = Route.useLoaderData()
    return <Tickets chainId={chainId} address={address} />
}
