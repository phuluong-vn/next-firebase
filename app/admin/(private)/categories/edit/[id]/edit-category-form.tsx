'use client'
import * as React from "react"

import FormCategory from "../../category-form"
import { ICategoryInput } from "@/features/categories/type"
import { CategoryFormValues } from "@/features/categories/rule"
import { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { onEditCategory } from "../../action"

interface IProps {
    data: ICategoryInput;
    id: string;  
}

export default function  EditCategoryForm ({data, id}: IProps) {
    const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
      try {
         await onEditCategory(id, data);
        toast.success("Category updated successfully!");
      } catch (e) {
        toast.error("Failed to update category!");
      }
  }
  return (
    <FormCategory nameFormAction="Edit Category" data={data}  onSubmit={onSubmit} />
  )
}
