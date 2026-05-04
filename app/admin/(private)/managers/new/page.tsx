"use client"

import * as React from "react"
import {  SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

import { LoginFormValues } from "@/features/managers/rules"
import FormManager from "../manager-form"
import { onAddManager } from "../action"
import { useRouter } from "next/navigation"


export default function CreateManager() {
    const router = useRouter();
    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
      try {
         await onAddManager(data);
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
