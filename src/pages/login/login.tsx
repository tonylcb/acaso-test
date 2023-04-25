import { useContext } from 'react'
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormDataTypes } from '../../validations/FormValidations'
import { UserContext } from '../../contexts/UserContext'

interface LoginTypes {
    email: string,
    password: string,
}

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormDataTypes>({
        resolver: yupResolver(loginSchema)
    });

    const { loginFetch, isloading, requestError } = useContext(UserContext)


    const onSubmit = async (loginData: LoginTypes) => {
        const isValid = await loginSchema.isValid(loginData)

        if (isValid) {
            loginFetch?.(loginData)
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
