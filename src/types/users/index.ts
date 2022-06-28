export interface userListObject {
    id: number,
    name: string,
    email: string,
    role: number,
    email_verified_at: string | null,
    created_at: string,
    updated_at: string
}
export interface selectOption {
    label: string,
    value: string
}

export type usersInitialStateType = {
    loading: boolean,
    data: selectOption[] | null,
    error: any
}