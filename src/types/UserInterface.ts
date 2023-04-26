export interface userDataType {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;

    user?: {
        first_name: string;
        last_name: string;
    };
    token?: {
        id_token: string;
    };
}