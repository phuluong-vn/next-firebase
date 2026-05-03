
import * as React from "react"

import { getCategoryById } from "@/features/categories/model"
import EditCategoryForm from "./edit-category-form"
import { ICategoryInput } from "@/features/categories/type";

interface IProps {
    params: {
        id: string;
    }
}

const  EditCategory = async ({ params }: IProps) =>  {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const category = await getCategoryById(id);
    const detailCategory : ICategoryInput = {
  name: category?.name || "",
  slug: category?.slug || "",
  description: category?.description || "",
  images: category?.images || [],
};
    return (
    category && <EditCategoryForm  data={detailCategory} id={id} />
  )
}
export default EditCategory;