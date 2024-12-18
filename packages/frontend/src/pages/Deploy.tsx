import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import z from 'zod'
import { formatUnits, getAddress, isAddress, isAddressEqual } from 'viem'
import { useERC20 } from '../hooks/useERC20'
import {
    FullBeneficiaryInfo,
    useCreateLooteryWithMetadata,
} from '../hooks/useCreateLooteryWithMetadata'
import { useChainId } from 'wagmi'
import { chains } from '@/lib/wagmi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Loader2Icon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { EthereumAddressSchema } from '@common/EthereumAddressSchema'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const DeployFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    symbol: z.string().min(1, 'Symbol is required'),
    duration: z.coerce.number().min(600, 'Minimum 10 minutes'),
    communityFeeBps: z.coerce.number(),
    prizeTokenAddress: EthereumAddressSchema,
    pickLength: z.coerce.number(),
    maxBallValue: z.coerce.number(),
    ticketPrice: z.coerce.bigint(),
    seedJackpotDelay: z.coerce.bigint(),
    seedJackpotMinValue: z.coerce.bigint(),
})

const NewBeneficiaryFormSchema = z.object({
    address: EthereumAddressSchema,
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
    goal: z.coerce.bigint(),
})

export function Deploy() {
    const form = useForm<z.infer<typeof DeployFormSchema>>({
        resolver: zodResolver(DeployFormSchema),
        defaultValues: {
            title: '',
            symbol: '',
            duration: 3600,
            communityFeeBps: 50,
            prizeTokenAddress: '0x4200000000000000000000000000000000000006',
            pickLength: 5,
            maxBallValue: 25,
            ticketPrice: 10n ** 18n,
            seedJackpotDelay: 600n,
            seedJackpotMinValue: 10n ** 18n,
        },
    })

    const { symbol: prizeTokenSymbol } = useERC20(form.watch('prizeTokenAddress'))

    // Ephemeral state for adding beneficiaries
    const [beneficiaries, setBeneficiaries] = useState<FullBeneficiaryInfo[]>([])
    const [isAddingBeneficiary, setIsAddingBeneficiary] = useState(false)
    const newBeneficiaryForm = useForm<z.infer<typeof NewBeneficiaryFormSchema>>({
        resolver: zodResolver(NewBeneficiaryFormSchema),
        defaultValues: {
            address: '' as `0x${string}`,
            name: '',
            description: '',
            goal: 1n,
        },
    })

    const {
        write: createLootery,
        status: createLooteryStatus,
        looteryLaunchedEvent,
    } = useCreateLooteryWithMetadata()

    const launch = async (values: z.infer<typeof DeployFormSchema>) => {
        if (!createLootery) return
        await createLootery(
            values.title,
            values.symbol,
            values.pickLength,
            values.maxBallValue,
            BigInt(values.duration),
            values.ticketPrice,
            BigInt(values.communityFeeBps),
            values.prizeTokenAddress,
            BigInt(values.seedJackpotDelay),
            BigInt(values.seedJackpotMinValue),
            beneficiaries,
            {
                version: '1.0.0',
                title: values.title,
                description: '',
                longDescription: '',
                bannerImage: '',
                icon: '',
                logo: '',
                url: '',
            },
        )
    }

    const chainId = useChainId()
    const chain = chains.find((c) => c.id === chainId)

    return (
        <>
            <h1 className="text-4xl font-normal mt-16">
                Launch a permissionless lottery to fund public goods
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(launch)}>
                    {/* Lottery details */}
                    <div className="flex flex-col space-y-4 mt-8">
                        <h2 className="text-2xl">Lottery details</h2>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Lottery title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="The biggest lottery ever"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>The title of the lottery</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="symbol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Lottery symbol
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="PWRBLD" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The symbol of the lottery, used for NFT tickets
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Lottery settings */}
                    <div className="flex flex-col space-y-4 mt-8">
                        <h2 className="text-2xl">Lottery settings</h2>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Duration until draw, in seconds
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="3600" {...field} />
                                        </FormControl>
                                        <FormDescription>Minimum 10 minutes</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="communityFeeBps"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Community fee, in %
                                        </FormLabel>
                                        <div className="flex items-center gap-4">
                                            <FormControl>
                                                <Slider
                                                    className="flex-1"
                                                    value={[field.value / 100]}
                                                    onValueChange={(values) => {
                                                        field.onChange(values[0] * 100)
                                                    }}
                                                    max={95}
                                                />
                                            </FormControl>
                                            <>{Math.floor(field.value / 100)}%</>
                                        </div>
                                        <FormDescription>
                                            Percentage of ticket price that goes to the community
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="prizeTokenAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Prize token contract address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0x4200000000000000000000000000000000000006"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The token that will be used as prize payout and ticket
                                            purchases
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="seedJackpotDelay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Seed jackpot delay, in seconds
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="600"
                                                {...field}
                                                value={field.value.toString()}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Rate-limiter for manual jackpot seeding
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="seedJackpotMinValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Seed jackpot minimum value
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1000000000000000000"
                                                {...field}
                                                value={field.value.toString()}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Minimum value for manual jackpot seeding
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Ticket configuration */}
                    <div className="flex flex-col space-y-4 mt-8">
                        <h2 className="text-2xl">Ticket configuration</h2>

                        <div className="w-full flex justify-between items-center">
                            <FormField
                                control={form.control}
                                name="maxBallValue"
                                render={({ field }) => (
                                    <FormItem className="w-full flex items-center justify-between">
                                        <div className="flex flex-col space-y-1">
                                            <FormLabel className="text-sm font-medium">
                                                Numbers range to
                                            </FormLabel>
                                            <FormDescription>
                                                Select the highest number that can be picked
                                            </FormDescription>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input type="number" className="w-24" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <FormField
                                control={form.control}
                                name="pickLength"
                                render={({ field }) => (
                                    <FormItem className="w-full flex items-center justify-between">
                                        <div className="space-y-2">
                                            <FormLabel className="text-sm font-medium">
                                                Pick length
                                            </FormLabel>
                                            <FormDescription>
                                                How many numbers to be picked per ticket
                                            </FormDescription>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input type="number" className="w-24" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="ticketPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Ticket price
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="1000000000000000000"
                                                {...field}
                                                value={field.value.toString()}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The price of a ticket, in the prize token's decimals.{' '}
                                            {field.value &&
                                                prizeTokenSymbol &&
                                                `(${formatUnits(field.value, 18)} ${prizeTokenSymbol})`}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Beneficiaries */}
                    <div className="flex flex-col space-y-4 mt-8">
                        <h2 className="text-2xl">Add causes to fund with the lottery</h2>

                        <Card>
                            <CardHeader>
                                <CardTitle>{form.getValues('title') || 'Main fund'}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    This is the default beneficiary and the proceeds will be stored
                                    in the deployed lottery contract.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Other beneficiaries */}
                        <div className="grid grid-cols-2 gap-4">
                            {beneficiaries.map((beneficiary) => (
                                <Card key={beneficiary.address}>
                                    <CardHeader>
                                        <CardTitle className="text-lg underline decoration-dotted">
                                            <a
                                                href={
                                                    new URL(
                                                        `/address/${beneficiary.address}`,
                                                        chain?.blockExplorers.default.url,
                                                    ).href
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {beneficiary.name}
                                            </a>
                                        </CardTitle>
                                        {beneficiary.description && (
                                            <CardDescription>
                                                {beneficiary.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-muted-foreground">
                                            {beneficiary.goal} {prizeTokenSymbol} goal
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {!isAddingBeneficiary ? (
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => setIsAddingBeneficiary(true)}
                                >
                                    + Add another cause
                                </Button>
                            ) : (
                                <Card>
                                    <CardContent>
                                        <div className="mt-4 space-y-4">
                                            <div className="space-y-2">
                                                <FormField
                                                    control={newBeneficiaryForm.control}
                                                    name="address"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">
                                                                Beneficiary address
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder="0x0000000000000000000000000000000000000000"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={newBeneficiaryForm.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">
                                                                Cause title
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={newBeneficiaryForm.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">
                                                                Description
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Textarea {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={newBeneficiaryForm.control}
                                                    name="goal"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">
                                                                Goal
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type="number"
                                                                    value={
                                                                        field.value?.toString() ||
                                                                        ''
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                {field.value &&
                                                                    prizeTokenSymbol &&
                                                                    `(${formatUnits(field.value, 18)} ${prizeTokenSymbol})`}
                                                            </FormDescription>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                className="w-full"
                                                disabled={
                                                    !newBeneficiaryForm.formState.isValid ||
                                                    beneficiaries.some((beneficiary) =>
                                                        isAddressEqual(
                                                            beneficiary.address,
                                                            newBeneficiaryForm.getValues('address'),
                                                        ),
                                                    )
                                                }
                                                onClick={() => {
                                                    setBeneficiaries([
                                                        ...beneficiaries,
                                                        {
                                                            ...newBeneficiaryForm.getValues(),
                                                            goal: newBeneficiaryForm
                                                                .getValues('goal')
                                                                .toString() as `${number}`,
                                                        },
                                                    ])
                                                    setIsAddingBeneficiary(false)
                                                    newBeneficiaryForm.reset()
                                                }}
                                            >
                                                Confirm
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    <div className="w-full">
                        <h1 className="text-4xl font-normal mt-16">Let's fund public goods 🫡</h1>
                    </div>

                    <Button
                        type="submit"
                        className="mt-4"
                        size="lg"
                        disabled={createLooteryStatus === 'success'}
                    >
                        {createLooteryStatus === 'pending' ? (
                            <>
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                Launching...
                            </>
                        ) : (
                            'Launch'
                        )}
                    </Button>
                </form>
            </Form>

            {chain && looteryLaunchedEvent && (
                <p className="text-lg mt-4">
                    Lottery deployed at{' '}
                    <Link
                        className="underline hover:no-underline"
                        target="_blank"
                        to="/lottery/$chainId/$address"
                        params={{
                            chainId: String(chain.id),
                            address: looteryLaunchedEvent.args.looteryProxy,
                        }}
                    >
                        {looteryLaunchedEvent.args.looteryProxy}
                    </Link>
                    🙌
                </p>
            )}
        </>
    )
}
