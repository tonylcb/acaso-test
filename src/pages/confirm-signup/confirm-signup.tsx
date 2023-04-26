import Button from '../../components/button/button'
import CountdownButton from '../../components/button/countdownButton'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmEmailSchema, ConfirmEmailFormDataTypes } from '../../validations/FormValidations'
import ConfirmSignUpRequest from '../../services/ConfirmSignUpRequest'
interface RegisterTypes {
    code: string,
}

function ConfirmRegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<ConfirmEmailFormDataTypes>({
        resolver: yupResolver(confirmEmailSchema)
    });

    const { sendSignUpFConfirmetch,
        successConfirmSignUpRequest,
        requestConfirmSignUpError,
        isConfirmSignUpLoading } = ConfirmSignUpRequest()

    const onSubmit = async (registerData: RegisterTypes) => {
        const isValid = await confirmEmailSchema.isValid(registerData)
        if (isValid) {
            sendSignUpFConfirmetch(registerData)
        }
    };

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
                {!successConfirmSignUpRequest && requestConfirmSignUpError !== '' &&
                    <p className={style.requestErrorTxt}>{requestConfirmSignUpError}</p>
                }
                {
                    successConfirmSignUpRequest &&
                    <p className={style.requestSuccessTxt}>Cadastro realizado com sucesso!</p>
                }
                <Button isLoading={isConfirmSignUpLoading} type="submit" text="Confirmar e-mail" isWhiteBg={true} />
            </form>
            <span className={style.complementTextBttn}>Não recebeu o código?</span>
            <CountdownButton />
        </div>
    )
}

export default ConfirmRegisterPage
