import style from "./button.module.scss"
import { FC, ButtonHTMLAttributes } from "react"

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isWhiteBg: boolean;
}


const Button: FC<ButtonBaseProps> = ({ text, isWhiteBg }) => {
    return (
        <button className={`${isWhiteBg && style.whiteBg} ${style.generalButton}`}>{text}</button>
    )
}

export default Button