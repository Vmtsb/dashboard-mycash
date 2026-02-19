const imgVector = "http://localhost:3845/assets/7a69f771ab53715bdf70edfddf0c67be167bcac6.svg";
const imgVector1 = "http://localhost:3845/assets/27da47405d4c129fe033c1fe90f3459e15793968.svg";
const imgVector2 = "http://localhost:3845/assets/82dffc594b9589ae77ed784c26085299e68dfa33.svg";
const imgVector3 = "http://localhost:3845/assets/ef4fc84106079422e2d52f86a653ea18202a73fc.svg";
const imgVector4 = "http://localhost:3845/assets/fc1aef233a10842e07aecf724ef58e25dffdb744.svg";
const imgVector5 = "http://localhost:3845/assets/c94591873f5bc9394f4de84d22159d1795a19cb2.svg";
const imgVector6 = "http://localhost:3845/assets/0968ea8ccfd03aa9ed0a2abfb586042298378b07.svg";
const imgVector7 = "http://localhost:3845/assets/f9d56007a9148584cdf56850a8f5be5a442e2e23.svg";
const imgVector8 = "http://localhost:3845/assets/1524c570e7ccd8f5637a639c808ceb1bddd0ed99.svg";
const imgVector9 = "http://localhost:3845/assets/e0c443c695f76dd9dd6f0832c70db2f2a753166e.svg";
const imgVector10 = "http://localhost:3845/assets/28eb2257900b29366475135b9974e32f54f0fb28.svg";
const imgVector11 = "http://localhost:3845/assets/2cd4e3a8dae85ddb5500eee89aa325bbd8c12578.svg";

interface LogoProps {
    className?: string;
    variant?: "Default" | "small";
}

export function Logo({ className, variant = "Default" }: LogoProps) {
    const isSmall = variant === "small";
    return (
        <div
            className={className || `relative ${isSmall ? "h-[43px] w-[45px]" : "h-[29.818px] w-[139.648px]"}`}
        >
            <div className={`absolute ${isSmall ? "inset-[81.38%_11.11%_2.52%_73.51%]" : "inset-[19.86%_0_26.18%_88.48%]"}`}>
                <img alt="" className="absolute block inset-0 max-w-none" src={isSmall ? imgVector7 : imgVector} />
            </div>
            <div className={`absolute ${isSmall ? "inset-[75.45%_31%_1.26%_53.55%]" : "inset-[0_14.89%_21.95%_73.53%]"}`}>
                <img alt="" className="absolute block inset-0 max-w-none" src={isSmall ? imgVector8 : imgVector1} />
            </div>
            <div className={`absolute ${isSmall ? "inset-[81.05%_49.36%_0.92%_35.64%]" : "inset-[18.75%_28.65%_20.81%_60.11%]"}`}>
                <img alt="" className="absolute block inset-0 max-w-none" src={isSmall ? imgVector9 : imgVector2} />
            </div>
            <div className={`absolute ${isSmall ? "inset-[81.05%_67.21%_0.93%_17.85%]" : "inset-[18.75%_42.02%_20.85%_46.79%]"}`}>
                <img alt="" className="absolute block inset-0 max-w-none" src={isSmall ? imgVector10 : imgVector3} />
            </div>
            <div className={`absolute ${isSmall ? "inset-[81.05%_84.33%_0.92%_0]" : "inset-[18.75%_54.84%_20.81%_33.42%]"}`}>
                <img alt="" className="absolute block inset-0 max-w-none" src={isSmall ? imgVector11 : imgVector4} />
            </div>
            <div className={`absolute ${isSmall ? "inset-[13.11%_-0.63%_31.08%_0.11%]" : "inset-[19.51%_67.45%_0_0.16%]"}`}>
                <img alt="" className="absolute block inset-0 max-w-none" src={imgVector5} />
            </div>
            <div className={`absolute ${isSmall ? "inset-[-0.42%_44.33%_46.3%_-0.39%]" : "inset-[0_81.94%_21.95%_0]"}`}>
                <img alt="" className="absolute block inset-0 max-w-none" src={imgVector6} />
            </div>
        </div>
    );
}
