"use client"

import * as React from "react"
import {  SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

import {  ManagerFormValues } from "@/features/managers/rules"
import FormManager from "../manager-form"
import { onAddManager } from "../action"
import { useRouter } from "next/navigation"


export default function CreateManager() {
    const router = useRouter();
    const onSubmit: SubmitHandler<ManagerFormValues> = async (data) => {
        const newData ={...data, isActive: true};
      try {
         await onAddManager(newData);
         router.push("/admin/managers");
        toast.success("Manager created successfully!");
      } catch (e) {
        toast.error("Failed to create manager! Please try again.");
      }
  }

  return (
    <FormManager nameFormAction="Create Manager"  onSubmit={onSubmit} />
  )
}
