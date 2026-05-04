"use server"
import { addCategory, deleteCategoryById, editCategory } from "@/features/categories/model"
import { ICategoryInput } from "@/features/categories/type"
import { revalidatePath } from "next/cache"

export const onEditCategory = async(id: string, data: ICategoryInput) => {
    await editCategory(id,data);
    revalidatePath("/admin/categories"); 
}

export const onAddCategory = async(data: ICategoryInput) => {
    await addCategory(data);
    revalidatePath("/admin/categories"); 
}

export const deleteCategoryAction = async(id: string) => {
  await deleteCategoryById(id);
  revalidatePath("/admin/categories");
}