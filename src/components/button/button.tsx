import Loading from "../loading/loading";
import style from "./button.module.scss"
import { FC, ButtonHTMLAttributes } from "react"

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    text?: string;
    isWhiteBg: boolean;
    hasCountdown?: boolean;
    isWhiteLoading?: boolean
}

const Button: FC<ButtonBaseProps> = ({ isLoading = false, text, isWhiteBg, isWhiteLoading, ...props }) => {

    return (
        <button
            disabled={isLoading && true}
            className={`${isWhiteBg && style.whiteBg} ${!isLoading ? style.generalButtonHover : style.generalDisabledButton} ${style.generalButton}`}
            {...props}
        >
            {isLoading ? <Loading isWhite={isWhiteLoading} /> : text}
        </button>
    )
}

export default Button