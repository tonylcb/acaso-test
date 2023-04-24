import { useContext, useState } from 'react'
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormDataTypes } from '../../validations/FormValidations'
import axios from 'axios'

interface LoginTypes {
    email: string,
    password: string,
}

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormDataTypes>({
        resolver: yupResolver(loginSchema)
    });
    const [isloading, setIsLoading] = useState<boolean>(false)
    const [requestError, setRequestError] = useState<string>('')

    const navigate = useNavigate()

    const baseURL = 'https://api.staging.aca.so'

    const onSubmit = async (loginData: LoginTypes) => {
        const isValid = await loginSchema.isValid(loginData)

        if (isValid) {
            setIsLoading(true)
            await axios.post(`${baseURL}/auth/login`,
                {
                    email: loginData.email,
                    password: loginData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log('response :>> ', response);
                    setRequestError('')
                    localStorage.setItem("is_user_logged", "true")
                    localStorage.setItem("access_token", response.data.token.access_token)
                    localStorage.setItem("id_token", response.data.token.id_token)
                    localStorage.setItem("refresh_token", response.data.token.refresh_token)

                    navigate("/minha-conta")
                }).catch((error) => {
                    console.log('error :>> ', error);
                    if (error.response.status === 400) {
                        setRequestError('E-mail ou senha incorreto')
                    } else {
                        setRequestError('Erro no servidor')
                    }
                    setIsLoading(false)
                }).finally(() => {
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    };

    return (
        <div className={style.mainContentNotLogged}>
            <h1 className={style.mainTitle}>
                Login
            </h1>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <Fieldset
                    register={register}
                    rules={{ required: true }}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Seu@e-mail.com"
                    label="E-mail"
                    hasError={errors.email ? true : false}
                    errorText={errors.email?.message}
                />
                <Fieldset
                    register={register}
                    rules={{ required: true }}
                    id="password"
                    name="password"
                    label="Senha"
                    hasError={errors.password ? true : false}
                    errorText={errors.password?.message}
                />
                {requestError !== '' &&
                    <p className={style.requestErrorTxt}>{requestError}</p>
                }
                <Button isLoading={isloading} type="submit" text="Entrar" isWhiteBg={true} />
            </form>
            <span className={style.complementTextBttn}>Não possui uma conta?</span>
            <Link className={style.link} to="cadastro">
                <Button text="Criar minha conta em aca.so" isWhiteBg={false} />
            </Link>
        </div>
    )
}

export default LoginPage
