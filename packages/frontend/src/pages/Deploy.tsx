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
import { formatUnits, isAddressEqual } from 'viem'
import { useERC20 } from '../hooks/useERC20'
import { useCreateLooteryWithMetadata } from '../hooks/useCreateLooteryWithMetadata'
import { useChainId } from 'wagmi'
import { chains } from '@/lib/wagmi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Loader2Icon, XIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { EthereumAddressSchema } from '@common/EthereumAddressSchema'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BeneficiaryInfoSchema, LottoPGFMetadataV1Schema } from '@common/metadata'
import { viaIpfsGateway } from '@/lib/viaIpfsGateway'
import { Checkbox } from '@/components/ui/checkbox'

// Omit some stuff for the metadata form
const { version, title, beneficiaries, ...MetadataFormSchema } = LottoPGFMetadataV1Schema.shape

const FullBeneficiaryInfoFormSchema = BeneficiaryInfoSchema.extend({
    name: z.string().min(1, 'Name is required'),
})

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
    activateApocalypseMode: z.boolean(),
    // Metadata-related fields
    ...MetadataFormSchema,
    // Beneficiaries
    beneficiaries: z.array(FullBeneficiaryInfoFormSchema),
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
            activateApocalypseMode: false,
            // Metadata-related fields
            description: '',
            /** Not yet used: Long description of the lottery */
            // longDescription: z.string().max(8192).optional(),
            /** Not yet used: Canonical app URL */
            // url: 'https://',
            icon: 'ipfs://QmUnM2FTUxfQvKT9T5o6GDDfVBzeWGQBB1oVPrndZeZ4Ya',
            logo: 'ipfs://QmVRDAzuZ63P9hVyv1MGFdUhuqDF23mhEWWyu5wkCa4ejh',
            bannerImage: 'ipfs://QmYyM5oUycHo8XP8YnD5dJ5JpAVjHdzbxfENJZjmh6vx8L',

            // Beneficiaries
            beneficiaries: [],
        },
    })

    const [didAgreeToTerms, setDidAgreeToTerms] = useState(false)

    const { symbol: prizeTokenSymbol, decimals: prizeTokenDecimals } = useERC20(
        form.watch('prizeTokenAddress'),
    )

    // Ephemeral state for adding beneficiaries
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
        uploadMetadataStatus,
        uploadMetadataError,
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
            values.beneficiaries,
            {
                /** Metadata */
                version: '1.0.0',
                title: values.title,
                description: values.description,
                longDescription: values.longDescription,
                bannerImage: values.bannerImage,
                icon: values.icon,
                logo: values.logo,
                url: values.url,
            },
            values.activateApocalypseMode,
        )
        form.reset()
    }

    const chainId = useChainId()
    const chain = chains.find((c) => c.id === chainId)

    return (
        <div className="mb-16">
            <h1 className="text-4xl font-normal mt-16">
                Launch a fundraiser lottery with any token
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(launch)}>
                    {/* Lottery details */}
                    <div className="flex flex-col space-y-8 mt-16">
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
                                            The symbol of the lottery, used as an identifier for the
                                            lottery NFT tickets
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Lottery description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea {...field} maxLength={2048} />
                                        </FormControl>
                                        <FormDescription>
                                            Short description of the lottery (
                                            {field.value?.length || 0}/2048 characters left)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="icon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Icon URI
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Paste a URI for your icon image (can be a regular URL to
                                            an image like https://domain/image.png or an IPFS URI
                                            like ipfs://{'<cid>'}). This will be shown as the
                                            browser favicon.
                                        </FormDescription>
                                        {field.value && (
                                            <div>
                                                <img
                                                    src={viaIpfsGateway(field.value)}
                                                    className="my-2w-8 h-8"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="logo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Logo URI
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Paste a URI for your logo image (can be a regular URL to
                                            an image like https://domain/image.png or an IPFS URI
                                            like ipfs://{'<cid>'}). This will be shown as the navbar
                                            logo.
                                        </FormDescription>
                                        {field.value && (
                                            <div>
                                                <img
                                                    src={viaIpfsGateway(field.value)}
                                                    className="my-2 h-8"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="bannerImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Banner image URI
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Paste a URI for your banner image (can be a regular URL
                                            to an image like https://domain/image.png or an IPFS URI
                                            like ipfs://{'<cid>'}). This will be shown as the banner
                                            image on your ticket purchase page.
                                        </FormDescription>
                                        {field.value && (
                                            <div>
                                                <img
                                                    src={viaIpfsGateway(field.value)}
                                                    className="my-2 h-[100%]"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Lottery settings */}
                    <div className="flex flex-col space-y-8 mt-16">
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

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="activateApocalypseMode"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-medium">
                                                Activate apocalypse mode
                                            </FormLabel>
                                            <FormDescription>
                                                If enabled, the lottery will only run for a single
                                                game. If there are no winners, the jackpot is
                                                divided evenly between all tickets. If disabled, the
                                                lottery will run indefinitely.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Ticket configuration */}
                    <div className="flex flex-col space-y-8 mt-16">
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
                                                prizeTokenDecimals &&
                                                `(${formatUnits(field.value, prizeTokenDecimals)} ${prizeTokenSymbol})`}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Beneficiaries */}
                    <div className="flex flex-col space-y-4 mt-16">
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
                            {form.getValues('beneficiaries').map((beneficiary) => (
                                <Card key={beneficiary.address}>
                                    <CardHeader className="relative">
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
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={() => {
                                                form.setValue(
                                                    'beneficiaries',
                                                    form
                                                        .getValues('beneficiaries')
                                                        .filter(
                                                            (b) =>
                                                                !isAddressEqual(
                                                                    b.address,
                                                                    beneficiary.address,
                                                                ),
                                                        ),
                                                )
                                            }}
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-muted-foreground">
                                            {prizeTokenDecimals &&
                                                formatUnits(
                                                    BigInt(beneficiary.goal),
                                                    prizeTokenDecimals,
                                                )}{' '}
                                            {prizeTokenSymbol} goal
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
                                                                    prizeTokenDecimals &&
                                                                    `(${formatUnits(field.value, prizeTokenDecimals)} ${prizeTokenSymbol})`}
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
                                                    form
                                                        .getValues('beneficiaries')
                                                        .some((beneficiary) =>
                                                            isAddressEqual(
                                                                beneficiary.address,
                                                                newBeneficiaryForm.getValues(
                                                                    'address',
                                                                ),
                                                            ),
                                                        )
                                                }
                                                onClick={() => {
                                                    form.setValue(
                                                        'beneficiaries',
                                                        [
                                                            ...form.getValues('beneficiaries'),
                                                            {
                                                                ...newBeneficiaryForm.getValues(),
                                                                goal: newBeneficiaryForm
                                                                    .getValues('goal')
                                                                    .toString() as `${number}`,
                                                            },
                                                        ],
                                                        {
                                                            shouldValidate: true,
                                                        },
                                                    )
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

                    <div className="items-top flex space-x-2 mt-8">
                        <Checkbox
                            id="terms"
                            checked={didAgreeToTerms}
                            onCheckedChange={(checked) => setDidAgreeToTerms(Boolean(checked))}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I have read and understood the{' '}
                                <a
                                    className="underline decoration-dotted"
                                    href="https://docs.lottopgf.org/about/legal-and-security"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    legal disclaimers
                                </a>
                                .
                            </label>
                        </div>
                        <label htmlFor="terms"></label>
                    </div>

                    <Button
                        type="submit"
                        className="my-8"
                        size="lg"
                        disabled={createLooteryStatus === 'success' || !didAgreeToTerms}
                    >
                        {createLooteryStatus === 'pending' || uploadMetadataStatus === 'pending' ? (
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
        </div>
    )
}
