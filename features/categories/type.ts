import { IDocDb } from "../type";

export interface ICategoryInput {
  name: string;
  slug: string;
  description: string; // html
  images?: string[]; // url to storage firebase
}

export interface ICategoryDb extends ICategoryInput, IDocDb {}
export interface ICategoryDoc extends ICategoryInput, Omit<IDocDb, "id"> {}

