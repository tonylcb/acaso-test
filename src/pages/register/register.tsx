import style from '../../styles/user-not-logged.module.scss'
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, RegisterFormDataTypes } from '../../validations/FormValidations'
import { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext'

interface RegisterTypes {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormDataTypes>({
        resolver: yupResolver(registerSchema)
    });

    // const { setCurrentUserEmail, setCurrentFirstName, setCurrentLastName } = useContext(UserContext)

    const [isloading, setIsLoading] = useState<boolean>(false)
    const [successRequest, setSuccessRequest] = useState<boolean>(false)
    const [token, setToken] = useState<object>()
    const [requestError, setRequestError] = useState<string>('')

    const navigate = useNavigate()

    const baseURL = 'https://api.staging.aca.so'

    const onSubmit = async (registerData: RegisterTypes) => {
        setIsLoading(true)
        setSuccessRequest(false)
        const isValid = await registerSchema.isValid(registerData)
        if (isValid) {
            // setCurrentFirstName(registerData.firstName)
            // setCurrentLastName(registerData.lastName)
            // setCurrentUserEmail(registerData.email)

            signUpRequest(registerData)
        } else {
            setIsLoading(false)
        }
    }

    const signUpRequest = async (registerData: RegisterTypes) => {
        localStorage.setItem("email", registerData.email)

        await axios.post(`${baseURL}/auth/sign-up`,
            {
                email: registerData.email,
                first_name: registerData.firstName,
                last_name: registerData.lastName,
                password: registerData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setRequestError('')
                setToken(response.data)
                localStorage.setItem("authToken", response.data)
                navigate("/confirmar-cadastro")
            }).catch((err) => {
                console.log('err :>> ', err);
                if (err.response.status === 400) {
                    setRequestError('E-mail já cadastrado, você será redirecionado')
                    sendCodeRequest(registerData)
                    setTimeout(() => {
                        navigate('/confirmar-cadastro')
                    }, 5000)
                } else {
                    setRequestError('Erro no servidor')
                }
                setIsLoading(false)
                setSuccessRequest(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const sendCodeRequest = async (registerData: RegisterTypes) => {
        await axios.post(`${baseURL}/auth/resend-confirmation-code`,
            {
                email: registerData.email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setSuccessRequest(true)

                console.log('responseEmail :>> ', response);
                setRequestError('')
                navigate('/confirmar-cadastro')
            }).catch((err) => {
                console.log('err :>> ', err);
                setRequestError('Erro no servidor')
                setIsLoading(false)
                setSuccessRequest(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }



    return (
        <div className={`${style.mainContentNotLogged} ${style.mainContentRegister}`}>
            <h1 className={style.mainTitle}>
                Cadastro
            </h1>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formHorizontalContainer}>
                    <Fieldset
                        register={register}
                        rules={{ required: true }}
                        id="firstName" name="firstName"
                        type="text" placeholder="Primeiro nome*"
                        label="Primeiro nome*"
                        hasError={errors.firstName ? true : false}
                        errorText={errors.firstName?.message}
                    />
                    <Fieldset
                        register={register}
                        rules={{ required: true }}
                        id="lastName" name="lastName"
                        type="text" placeholder="Último nome*"
                        label="Último nome*"
                        hasError={errors.lastName ? true : false}
                        errorText={errors.lastName?.message}
                    />
                </div>
                <Fieldset
                    register={register}
                    rules={{ required: true }}
                    id="email" name="email"
                    type="text" placeholder="Seu@e-mail.com"
                    label="E-mail*" hasError={errors.email ? true : false}
                    errorText={errors.email?.message}
                />
                <Fieldset
                    register={register} rules={{ required: true }}
                    id="password"
                    name="password"
                    label="Senha*"
                    hasError={errors.password ? true : false}
                    errorText={errors.password?.message}

                />
                <Fieldset
                    register={register}
                    rules={{ required: true }}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirme a senha*"
                    hasError={errors.confirmPassword ? true : false} errorText={errors.confirmPassword?.message}
                />

                {!successRequest && requestError !== '' &&
                    <p className={style.requestErrorTxt}>{requestError}</p>
                }

                <span className={style.complementTextBttn}>Não possui uma conta?</span>
                <Button type="submit" isLoading={isloading} text="Criar minha conta aca.so" isWhiteBg={true} />
            </form>
            <Link className={`${style.link} ${style.linkBackToLogin}`} to="/">
                <Button text="Voltar ao login" isWhiteBg={false} />
            </Link>
        </div>
    )
}

export default RegisterPage