// import { APP_URL } from '@/lib/host'
import { type Address } from 'viem'
import { base, scroll } from 'viem/chains'

// Project metadata
// export const METADATA = {
//     name: 'LottoPGF Test Lottery',
//     title: null,
//     description: 'This is a Test!',
//     url: APP_URL,
//     icon: `${APP_URL}/images/icon.svg`,
//     logo: `/images/logo.svg`,
//     bannerImage: '/images/banner.png',
//     longDescription: (
//         <p>
//             This is a test lottery to show how LottoPGF can be used to fund public goods, community
//             and other causes!
//         </p>
//     ),
// }

// The metadata of the collective fund (default receiver of funds)
export const COLLECTIVE_FUND_METADATA = {
    name: 'Collective fund',
    description: 'Managed by the lottery organizer',
}

// The address of the ETH adapter contract
export const looteryEthAdapterAddress: Record<number, Address> = {
    [base.id]: '0xF9aC611be31983EB9030d2F201Af566b59d5BCE2',
    [scroll.id]: '0x51A60D80Fa6d5FEDeb87E615Ed1D41661CB42A69',
}

// The URL of the GraphQL API to get ticket data
export const gqlApiUrl: Record<number, string> = {
    [base.id]: 'https://lootery-v1-indexer-base-prod.up.railway.app',
    [scroll.id]: 'https://zuzalotto-indexer-production.up.railway.app',
}

// TODO(metadata)
// The amount of money you're trying to raise.
// It will show a progress bar inside of the "funds raised" card.
// Set to null to disable the progress bar
// export const FUNDRAISE_TARGET: bigint | null = null
