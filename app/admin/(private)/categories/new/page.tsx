"use client"

import * as React from "react"
import {  SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

import { CategoryFormValues } from "@/features/categories/rule"
import { useRouter } from "next/navigation"
import FormCategory from "../category-form"
import { onAddCategory } from "../action"


export default function CreateCategory() {
    const router = useRouter();
    const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
      try {
         await onAddCategory(data);
         router.push("/admin/categories");
        toast.success("Category created successfully!");
      } catch (e) {
        toast.error("Failed to create category! Please try again.");
      }
  }

  return (
    <FormCategory nameFormAction="Create Category New"  onSubmit={onSubmit} />
  )
}
