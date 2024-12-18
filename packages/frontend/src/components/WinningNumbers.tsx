import { useWinningNumbers } from '@/hooks/useWinningNumbers'
import { Address } from 'viem/accounts'

export function WinningNumbers({
    contractAddress,
    gameId,
}: {
    contractAddress: Address
    gameId: bigint
}) {
    const { numbers } = useWinningNumbers({ contractAddress, gameId })

    return <>{numbers ? <NumbersList numbers={numbers} /> : <span>–</span>}</>
}

export function NumbersList({ numbers }: { numbers: number[] }) {
    return (
        <div className="flex gap-2">
            {numbers.map((number) => (
                <div
                    key={number}
                    className="flex size-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white"
                >
                    {number}
                </div>
            ))}
        </div>
    )
}
