import { EthereumAddressSchema } from '@common/EthereumAddressSchema'
import { Admin } from '@/pages/Admin'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/admin/$chainId/$address')({
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
    return <Admin chainId={chainId} contractAddress={address} />
}
