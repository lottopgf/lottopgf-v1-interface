import Countdown from 'react-countdown'

const END_DATE = new Date(1735223442 * 1000)

export function JuiceboxCampaignBanner() {
    return (
        <div className="flex items-center justify-center gap-4 bg-otto/90 px-4 py-2 text-sm text-white md:text-base">
            <div className="flex items-center gap-1">
                <div className="flex flex-col items-center tracking-wide">
                    <div>
                        Our Juicebox Community Fundraise campaign is live - Get $OTTO, join OttoDAO
                    </div>{' '}
                    <Countdown
                        date={END_DATE}
                        renderer={(props) => {
                            return (
                                <span className="animate-wiggle">
                                    Only{' '}
                                    <strong>
                                        {props.days}d {props.hours}h {props.minutes}m{' '}
                                        {props.seconds}s
                                    </strong>{' '}
                                    left!
                                </span>
                            )
                        }}
                    />
                </div>
                <img
                    alt=""
                    loading="lazy"
                    width="32"
                    height="32"
                    decoding="async"
                    data-nimg="1"
                    className="inline-block align-middle mx-2"
                    style={{
                        color: 'transparent',
                    }}
                    src="/salute.svg"
                />
            </div>
            <a
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-full px-6 py-2.5 leading-tight"
                href="https://juicebox.money/@ottodao"
                target="_blank"
                rel="noopener noreferrer"
            >
                Get $OTTO
            </a>
        </div>
    )
}
