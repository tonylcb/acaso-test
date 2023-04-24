import * as yup from "yup"

export type RegisterFormDataTypes = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginFormDataTypes = {
    email: string;
    password: string;
};

export type ConfirmEmailFormDataTypes = {
    code: string;
};

const onlyLettersRegex = /^[A-Za-z]+$/i;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,99}$/;

export const loginSchema = yup.object({
    email: yup.string()
        .required("Campo obrigatório")
        .matches(emailRegex, "Insira um e-mail válido"),
    password: yup.string()
        .required("Campo obrigatório")
        .min(6, "A senha deve conter pelo menos 6 caracteres")
        .matches(passwordRegex, "A senha deve conter pelo menos um número e uma letra"),
}).required();

export const registerSchema = yup.object({
    firstName: yup.string()
        .required("Campo obrigatório")
        .matches(onlyLettersRegex, "Insira um nome válido"),
    lastName: yup.string()
        .required("Campo obrigatório")
        .matches(onlyLettersRegex, "Insira um nome válido"),
    email: yup.string()
        .required("Campo obrigatório")
        .matches(emailRegex, "Insira um e-mail válido"),
    password: yup.string()
        .required("Campo obrigatório")
        .min(6, "A senha deve conter pelo menos 6 caracteres")
        .matches(passwordRegex, "A senha deve conter pelo menos um número e uma letra"),
    confirmPassword: yup.string()
        .required("Campo obrigatório")
        .min(6, "A senha deve conter pelo menos 6 caracteres")
        .matches(passwordRegex, "A senha deve conter pelo menos um número e uma letra")
        .oneOf([yup.ref('password')], 'A senha deve ser igual à anterior'),
}).required();


export const confirmEmailSchema = yup.object({
    code: yup.string().required("Campo obrigatório"),
}).required();


