//type.ts is used to define interfaces and types.

export interface IAdminDB{
    id: string
    email: string
    password: string
    isActive: boolean
    deleted_at: string
    created_at: string
    updated_at: string
}

export type ICreateAdminInput = Pick<IAdminDB, "email" | "password">;