
import * as React from "react"

import { getCategoryById } from "@/features/categories/model"
import EditCategoryForm from "./edit-category-form"

interface IProps {
    params: {
        id: string;
    }
}

const  EditCategory = async ({ params }: IProps) =>  {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const category = await getCategoryById(id);
    
    return (
    category && <EditCategoryForm  data={category} id={id} />
    
  )
}
export default EditCategory;