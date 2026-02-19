interface LogoProps {
    className?: string;
    variant?: "Default" | "small";
}

export function Logo({ className, variant = "Default" }: LogoProps) {
    const isSmall = variant === "small";
    // The large logo is a valid SVG, but small was found to be a PNG despite the extension
    const logoSrc = isSmall ? "/assets/sidebar/logo/logo-small.png" : "/assets/sidebar/logo/logo-large.svg";

    return (
        <div className={className || `${isSmall ? "h-[43px] w-[45px]" : "h-[30px] w-[140px]"} relative flex items-center justify-center`}>
            <img
                src={logoSrc}
                alt="MyCash+ Logo"
                className="w-full h-full object-contain"
            />
        </div>
    );
}
