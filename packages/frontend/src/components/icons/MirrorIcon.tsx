export function MirrorIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="22" fill="none" {...props}>
            <g clipPath="url(#a)">
                <path
                    fill="url(#b)"
                    d="M.555 8.79a8.129 8.129 0 0 1 16.258 0v11.635c0 .682-.553 1.235-1.235 1.235H1.79a1.235 1.235 0 0 1-1.235-1.235z"
                />
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M15.847 20.651V8.813c0-3.968-3.207-7.184-7.163-7.184S1.521 4.845 1.521 8.813V20.65c0 .023.018.04.04.04h14.246a.04.04 0 0 0 .04-.04M8.684.661C4.194.66.555 4.31.555 8.812V20.65c0 .557.45 1.01 1.006 1.01h14.246c.556 0 1.006-.453 1.006-1.01V8.813c0-4.503-3.64-8.153-8.129-8.153"
                    clipRule="evenodd"
                />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1="2.648"
                    x2="16.872"
                    y1="1.871"
                    y2="24.435"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset=".266" stopColor="#fff" />
                    <stop offset=".734" stopColor="#BBF7D0" />
                </linearGradient>
                <clipPath id="a">
                    <path fill="#fff" d="M.555.66H16.9v21H.555z" />
                </clipPath>
            </defs>
        </svg>
    )
}
