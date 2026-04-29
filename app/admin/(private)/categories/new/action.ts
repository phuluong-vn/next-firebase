"use server"
import { addCategory } from "@/features/categories/model"
import { ICreateCategoryInput } from "@/features/categories/type"
import { revalidatePath } from "next/cache"

export const onAddCategory = async(data: ICreateCategoryInput) => {
    await addCategory(data);
    revalidatePath("/admin/categories"); 
}