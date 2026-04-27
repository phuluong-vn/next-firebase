import { IDocDb } from "../type";

export interface ICreateCategoryInput {
  name: string;
  slug: string;
  description: string; // html
  images?: string[]; // url to storage firebase
}

export interface ICategoryDb extends ICreateCategoryInput, IDocDb {}
export interface ICategoryDoc extends ICreateCategoryInput, Omit<IDocDb, "id"> {}
