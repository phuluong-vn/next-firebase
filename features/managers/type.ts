//type.ts is used to define interfaces and types.

import { IDocDb } from "../type"

export interface IAdminInput{
    email: string
    password: string
    isActive: boolean
}

export interface IAdminDb extends IAdminInput, IDocDb {}
export interface IAdminDoc extends IAdminInput, Omit<IDocDb, "id"> {}