"use server"
import { addProduct, deleteProductById, editProduct } from "@/features/products/model"
import { IProductInput } from "@/features/products/type"
import { revalidatePath } from "next/cache"

export const onEditProduct = async(id: string, data: IProductInput) => {
    await editProduct(id,data);
    revalidatePath("/admin/products"); 
}

export const onAddProduct = async(data: IProductInput) => {
    await addProduct(data);
    revalidatePath("/admin/products"); 
}

export const deleteProductAction = async(id: string) => {
  await deleteProductById(id);
  revalidatePath("/admin/products");
}