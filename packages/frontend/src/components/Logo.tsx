import LottoPGFLogoBlack from '@/assets/lottopgf_logo_black.png'
import LottoPGFLogoWhite from '@/assets/lottopgf_logo_white.png'
import { useTheme } from './ThemeProvider'

export type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>

export function Logo(props: LogoProps) {
    const { resolvedTheme } = useTheme()
    return <img src={resolvedTheme === 'dark' ? LottoPGFLogoWhite : LottoPGFLogoBlack} {...props} />
}
