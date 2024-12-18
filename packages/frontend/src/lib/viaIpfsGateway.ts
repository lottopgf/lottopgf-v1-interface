import * as isIpfs from 'is-ipfs'

/**
 * Public IPFS gateways to try
 */
const PUBLIC_GATEWAYS = [
    'https://dweb.link',
    'https://flk-ipfs.xyz',
    'https://ipfs.cyou',
    'https://w3s.link',
]

let roundRobinIndex = 0

export function viaDecentralisedGateway(url: string) {
    return [viaIpfsGateway, viaArGateway].reduce((result, fn) => fn(result), url)
}

/**
 * Rewrite `url` if it's an IPFS-ish URL so that it goes through one of our
 * specified IPFS gateways.
 * Adapted from:
 * https://github.com/PinataCloud/ipfs-gateway-tools/blob/7d05f054dc53b94a6615bbb1a817f595fbea5b74/src/index.js
 * @param url
 * @param gateway Gateway to override with, otherwise uses default gateways.
 * @returns
 */
export function viaIpfsGateway(url: string, gateway?: string): string {
    const cid = containsIpfsCid(url)
    if (!cid) {
        return url
    }

    const desiredGatewayPrefixWithSlash =
        gateway || PUBLIC_GATEWAYS[roundRobinIndex++ % PUBLIC_GATEWAYS.length]
    // Trim slash, if present
    const desiredGatewayPrefix = desiredGatewayPrefixWithSlash.endsWith('/')
        ? desiredGatewayPrefixWithSlash.slice(0, desiredGatewayPrefixWithSlash.length - 1)
        : desiredGatewayPrefixWithSlash

    const splitUrl = url.split(cid)
    if (!splitUrl) {
        return url
    }

    // Case 1 - the ipfs://cid path
    if (url.includes(`ipfs://${cid}`)) {
        return `${desiredGatewayPrefix}/ipfs/${cid}${splitUrl[1]}`
    }

    // Case 2 - the /ipfs/cid path (this should cover ipfs://ipfs/cid as well
    if (url.includes(`/ipfs/${cid}`)) {
        return `${desiredGatewayPrefix}/ipfs/${cid}${splitUrl[1]}`
    }

    // Case 3 - the /ipns/cid path
    if (url.includes(`/ipns/${cid}`)) {
        return `${desiredGatewayPrefix}/ipns/${cid}${splitUrl[1]}`
    }

    return url
}

export function viaArGateway(url: string) {
    if (!url.startsWith('ar://')) {
        return url
    }

    return url.replace(/^ar:\/\//, 'https://arweave.net/')
}

/**
 * Check if a URL contains an IPFS CID and what that CID is, if any
 * Adapted from: https://github.com/PinataCloud/ipfs-gateway-tools/blob/master/src/index.js
 * @param url
 * @returns
 */
export function containsIpfsCid(url: string): string | null {
    const splitUrl = url.split('/')
    for (const split of splitUrl) {
        if (isIpfs.cid(split)) {
            return split
        }
        const splitOnDot = split.split('.')[0]
        if (isIpfs.cid(splitOnDot)) {
            return splitOnDot
        }
    }

    return null
}
