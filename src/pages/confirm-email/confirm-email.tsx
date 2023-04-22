
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'

function ConfirmEmailPage() {

    return (
        <div className={style.mainContentNotLogged}>
            <h1 className={style.mainTitle}>
                Confirmar e-mail
            </h1>
            <form className={style.form}>
                <Fieldset id="code" type="text" placeholder="Digite o código recebido..." label="Código" />
                <Button text="Confirmar e-mail" isWhiteBg={true} />
            </form>
            <span className={style.complementTextBttn}>Não recebeu o código?</span>
            <Button text="Aguarde ... para reenviar" isWhiteBg={false} />
        </div>
    )
}

export default ConfirmEmailPage
