import style from "./button.module.scss"
import { FC, ButtonHTMLAttributes } from "react"

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isWhiteBg: boolean;
}


const Button: FC<ButtonBaseProps> = ({ text, isWhiteBg, ...props }) => {
    return (
        <button className={`${isWhiteBg && style.whiteBg} ${style.generalButton}`} {...props}>{text}</button>
    )
}

export default Button