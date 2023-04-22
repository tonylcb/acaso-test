
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'
import { Link } from 'react-router-dom'

function LoginPage() {
    return (
        <div className={style.mainContentNotLogged}>
            <h1 className={style.mainTitle}>
                Login
            </h1>
            <form className={style.form}>
                <Fieldset id="email" type="email" placeholder="Seu@e-mail.com" label="E-mail" />
                <Fieldset id="password" label="Senha" />
                <Link className={style.link} to="minha-conta">
                    <Button text="Entrar" isWhiteBg={true} />
                </Link>
            </form>
            <span className={style.complementTextBttn}>Não possui uma conta?</span>
            <Link className={style.link} to="cadastro">
                <Button text="Criar minha conta em aca.so" isWhiteBg={false} />
            </Link>
        </div>
    )
}

export default LoginPage
