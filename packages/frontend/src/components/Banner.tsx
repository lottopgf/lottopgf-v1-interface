// import { METADATA } from '@/config'

import { viaIpfsGateway } from '@/lib/viaIpfsGateway'

export interface BannerProps {
    name?: string
    longDescription?: string
    bannerImage?: string
}

export function Banner({ name, longDescription, bannerImage }: BannerProps) {
    if (!bannerImage) {
        return null
    }

    return (
        <div className="space-y-14">
            <img
                src={viaIpfsGateway(bannerImage)}
                width={720}
                height={450}
                alt=""
                className="mx-auto aspect-[720/450] w-full rounded-3xl object-cover"
            />
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {name}
                </h1>
                <div>{longDescription}</div>
            </div>
        </div>
    )
}
