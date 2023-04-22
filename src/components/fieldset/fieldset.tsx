import style from "../../styles/user-not-logged.module.scss"
import { useState, FC, InputHTMLAttributes } from "react"
import { ReactComponent as Eye } from "../../assets/eye.svg"
import { ReactComponent as ClosedEye } from "../../assets/closed-eye.svg"


interface FieldsetBaseProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
}

const Fieldset: FC<FieldsetBaseProps> = ({ id, label, type, placeholder }) => {

    const [inputPasswordType, setInputPasswordType] = useState('password')

    function changeInputType() {
        inputPasswordType === "password" ? setInputPasswordType("text") : setInputPasswordType("password")
    }

    return (
        <fieldset className={style.generalFieldset}>
            <label htmlFor={id} className={style.generalLabel}>{label}</label>

            {id === "password" || id === "confirmPassword" ?
                <div className={style.inputPasswordContainer}>
                    <input type={inputPasswordType} placeholder={placeholder} id={id} className={style.generalInput} />
                    {inputPasswordType === "password" ?
                        <Eye onClick={changeInputType} className={style.inputPasswordEye} />
                        :
                        <ClosedEye onClick={changeInputType} className={style.inputPasswordEye} />
                    }
                </div>
                : <input type={type} placeholder={placeholder} id={id} className={style.generalInput} />
            }
        </fieldset>
    )
}

export default Fieldset