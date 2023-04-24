import { useContext } from 'react'
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmEmailSchema, ConfirmEmailFormDataTypes } from '../../validations/FormValidations'
import { UserContext } from '../../contexts/UserContext'

interface RegisterTypes {
    code: string,
}

function ConfirmRegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<ConfirmEmailFormDataTypes>({
        resolver: yupResolver(confirmEmailSchema)
    });

    const { confirmSignUpRequest, resendCodeRequest, isloading, isResendloading, successRequest, successResendRequest, requestError } = useContext(UserContext)

    const onSubmit = async (registerData: RegisterTypes) => {
        const isValid = await confirmEmailSchema.isValid(registerData)
        if (isValid) {
            confirmSignUpRequest?.(registerData)
        }
    };

    const resendCode = () => {
        resendCodeRequest?.()
    }

    return (
        <div className={style.mainContentNotLogged}>
            <h1 className={style.mainTitle}>
                Confirmar e-mail
            </h1>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <Fieldset
                    register={register}
                    rules={{ required: true }}
                    id="code"
                    name="code"
                    type="text"
                    placeholder="Digite o código recebido..."
                    label="Código"
                    hasError={errors.code ? true : false}
                    errorText={errors.code?.message}
                />
                {!successRequest && requestError !== '' &&
                    <p className={style.requestErrorTxt}>{requestError}</p>
                }
                {
                    successRequest &&
                    <p className={style.requestSuccessTxt}>Cadastro realizado com sucesso!</p>
                }
                <Button isLoading={isloading} type="submit" text="Confirmar e-mail" isWhiteBg={true} />
            </form>
            <span className={style.complementTextBttn}>Não recebeu o código?</span>
            <Button isLoading={isResendloading} onClick={resendCode} text="Aguarde ... para reenviar" isWhiteBg={false} />
            {
                successResendRequest &&
                <p className={style.requestResendSuccessTxt}>Código reenviado!</p>
            }
        </div>
    )
}

export default ConfirmRegisterPage
