//type.ts is used to define interfaces and types.

import { IDocDb } from "../type"

export interface IAdminDB{
    id: string
    email: string
    password: string
    isActive: boolean
    deleted_at: string
    created_at: string
    updated_at: string
}

export type IAdminInput = Pick<IAdminDB, "email" | "password">;
export interface IAdminDoc extends IAdminInput, Omit<IDocDb, "id"> {}