

import * as React from "react"
import { IProductInput } from "@/features/products/type"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/option"
import CreateProduct from "./create"


export default  async function Page () {
const session = await getServerSession(authOptions);
const defaultValues: IProductInput = {
    name: "",
    slug: "",
    description: "",
    images: [],
    createdId: session?.user?.id || "",
    categoryIds: [],
    properties: [],
    defaultPrice: 0,
  };
  return (
    <CreateProduct data={defaultValues} />
  )
}
