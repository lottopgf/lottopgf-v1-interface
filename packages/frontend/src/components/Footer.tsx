export function Footer() {
    return (
        <footer className="text-center text-sm">
            Powered by{' '}
            <a
                href="https://lottopgf.org"
                target="_blank"
                className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-2 hover:no-underline"
            >
                <span>LottoPGF V1</span>
                <img src="/images/otto.svg" alt="Otto" width={14} height={14} />
            </a>
        </footer>
    )
}
