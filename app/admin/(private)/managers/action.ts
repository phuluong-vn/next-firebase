"use server"

import { createAdmin, deleteManagerById, updateActiveAdmin } from "@/features/managers/model"
import { IAdminInput } from "@/features/managers/type"
import { revalidatePath } from "next/cache"



export const onAddManager = async(data: IAdminInput) => {
    await createAdmin(data);
    revalidatePath("/admin/managers"); 
}

export const deleteManagerAction = async(id: string) => {
  await deleteManagerById(id);
  revalidatePath("/admin/managers");
}

export const updateActiveAdminAction = async (id: string, isActive: boolean) => {
  await updateActiveAdmin(id, isActive);
  revalidatePath("/admin/managers");
}