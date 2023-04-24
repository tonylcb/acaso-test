import { ReactComponent as Logo } from "../../assets/logo.svg"
import style from "./header.module.scss"

function Header() {
    return (
        <header className={style.headerMainContainer}>
            <a href="/">
                <Logo />
            </a>
        </header>
    )
}

export default Header
