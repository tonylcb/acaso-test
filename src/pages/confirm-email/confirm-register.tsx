import { useState } from 'react'
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmEmailSchema, ConfirmEmailFormDataTypes } from '../../validations/FormValidations'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

interface RegisterTypes {
    code: string,
}

function ConfirmEmailPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<ConfirmEmailFormDataTypes>({
        resolver: yupResolver(confirmEmailSchema)
    });

    const navigate = useNavigate()

    const [isloading, setIsLoading] = useState<boolean>(false)
    const [isResendloading, setIsResendLoading] = useState<boolean>(false)
    const [successRequest, setSuccessRequest] = useState<boolean>(false)
    const [successResendRequest, setSuccessResendRequest] = useState<boolean>(false)
    const [requestError, setRequestError] = useState<string>('')

    const baseURL = 'https://api.staging.aca.so'
    const registerEmail = localStorage.getItem("email")

    const onSubmit = async (registerData: RegisterTypes) => {
        const isValid = await confirmEmailSchema.isValid(registerData)
        if (isValid) {
            await axios.post(`${baseURL}/auth/confirm-sign-up`,
                {
                    email: registerEmail,
                    confirmation_code: registerData.code
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    setSuccessRequest(true)
                    console.log('responseEmail :>> ', response);
                    setRequestError('')

                    setTimeout(() => {
                        navigate("/")
                    }, 3000)
                }).catch((err) => {
                    console.log('err :>> ', err);
                    setRequestError('Erro no servidor')
                    setIsLoading(false)
                    setSuccessRequest(false)
                }).finally(() => {
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    };

    const resendCode = async () => {
        await axios.post(`${baseURL}/auth/resend-confirmation-code`,
            {
                email: registerEmail,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setSuccessResendRequest(true)
                console.log('responseEmail :>> ', response);
                setRequestError('')
            }).catch((err) => {
                console.log('err :>> ', err);
                setRequestError('Erro no servidor')
                setIsResendLoading(false)
            }).finally(() => {
                setIsResendLoading(false)
            })
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

export default ConfirmEmailPage
