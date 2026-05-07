import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "product name is required"),
  slug: z.string().min(1, "product slug is required"),
  description: z.string().min(1, "description slug is required"),
  images: z.array(z.string()).optional(),
  createdId: z.string().min(1, "manager id is required"),
  categoryIds: z.array(z.string()),

  properties: z
    .array(
      z.object({
        name: z.string(),
        color: z.string().optional(),
        size: z.string().optional(),
        price: z.number(),
        //stripeId: z.string().optional(),
      })
    )
    .optional(),
  defaultPrice: z.number().optional(),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;