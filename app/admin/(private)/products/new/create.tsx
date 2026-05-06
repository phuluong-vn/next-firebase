"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IProductInput } from "@/features/products/type";
import { onAddProduct } from "../action";
import FormProduct from "../product-form";



interface IProps {
  data: IProductInput;
}
const CreateProduct = ({ data   }: IProps) => {
    console.log(data)
  const router = useRouter();
  const onSubmit = async (data: IProductInput) => {
    try {
      await onAddProduct(data);
      toast.info("Add product successfully !");
      router.push("/admin/products");
    } catch (error) {
      toast.error("Cannot Add product!");
    }
  };

  return (
      <FormProduct nameFormAction="Create Product New" data={data} onSubmit={onSubmit}  />
  );
};

export default CreateProduct;