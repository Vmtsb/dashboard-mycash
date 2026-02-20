import { Logo } from '../ui/Logo'

const imgMemberPai = "/assets/sidebar/member-pai.png";

interface HeaderMobileProps {
    onOpenMenu: () => void
}

export function HeaderMobile({ onOpenMenu }: HeaderMobileProps) {
    return (
        <header className="fixed top-0 left-0 w-full h-[72px] bg-white border-b border-neutral-300 px-24 flex items-center justify-between z-[100] lg:hidden">
            <Logo variant="Default" className="h-[28px] w-auto" />

            <button
                onClick={onOpenMenu}
                className="w-24 h-24 rounded-full overflow-hidden border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                aria-label="Open menu"
            >
                <img
                    src={imgMemberPai}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                />
            </button>
        </header>
    )
}
