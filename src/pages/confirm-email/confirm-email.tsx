import Button from '../../components/button/button'
import Fieldset from '../../components/fieldset/fieldset'
import style from '../../styles/user-not-logged.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmEmailSchema, ConfirmEmailFormDataTypes } from '../../validations/FormValidations'

function ConfirmEmailPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<ConfirmEmailFormDataTypes>({
        resolver: yupResolver(confirmEmailSchema)
    });
    const onSubmit = async (data: object) => {
        const isValid = await confirmEmailSchema.isValid(data)
        console.log('isValid :>> ', isValid);
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
                <Button type="submit" text="Confirmar e-mail" isWhiteBg={true} />
            </form>
            <span className={style.complementTextBttn}>Não recebeu o código?</span>
            <Button text="Aguarde ... para reenviar" isWhiteBg={false} />
        </div>
    )
}

export default ConfirmEmailPage
