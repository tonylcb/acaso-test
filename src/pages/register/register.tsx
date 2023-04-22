import style from '../../styles/user-not-logged.module.scss'
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import { Link } from 'react-router-dom'


const RegisterPage = () => {
    return (
        <div className={`${style.mainContentNotLogged} ${style.mainContentRegister}`}>
            <h1 className={style.mainTitle}>
                Cadastro
            </h1>
            <form className={style.form}>
                <div className={style.formHorizontalContainer}>
                    <Fieldset id="firstName" type="text" placeholder="Primeiro nome*" label="Primeiro nome*" />
                    <Fieldset id="lastName" type="text" placeholder="Último nome*" label="Último nome*" />
                </div>
                <Fieldset id="email" type="email" placeholder="Seu@e-mail.com" label="E-mail*" />
                <Fieldset id="password" label="Senha*" />
                <Fieldset id="confirmPassword" label="Confirme a senha*" />
                <span className={style.complementTextBttn}>Não possui uma conta?</span>
                <Link className={`${style.link}`} to="/confirmar-email">
                    <Button text="Criar minha conta aca.so" isWhiteBg={true} />
                </Link>
                <Link className={`${style.link} ${style.linkBackToLogin}`} to="/">
                    <Button text="Voltar ao login" isWhiteBg={false} />
                </Link>
            </form>
        </div>
    )
}

export default RegisterPage