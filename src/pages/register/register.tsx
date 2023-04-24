import style from '../../styles/user-not-logged.module.scss'
import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, RegisterFormDataTypes } from '../../validations/FormValidations'
import { useContext } from 'react'
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

    const { signUpRequest, isloading, successRequest, requestError } = useContext(UserContext)

    // const navigate = useNavigate()

    const onSubmit = async (registerData: RegisterTypes) => {
        const isValid = await registerSchema.isValid(registerData)
        if (isValid) {
            signUpRequest?.(registerData)
        }
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