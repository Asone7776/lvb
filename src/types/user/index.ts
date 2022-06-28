export interface userObject {
    id: number,
    name: string,
    email: string,
    role: number,
    email_verified_at: string | null,
    created_at: string,
    updated_at: string,
    token: string
}

export interface userInitialStateType {
    loading: boolean,
    data: userObject | null,
    success: boolean,
    error: any
}

export interface loginData {
    email: string,
    password: string
}