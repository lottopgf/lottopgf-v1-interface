import { EthereumAddressSchema } from '@common/EthereumAddressSchema'
import { Lottery } from '@/pages/Lottery'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/lottery/$chainId/$address')({
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
    return <Lottery chainId={chainId} address={address} />
}
