import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "category name is required"),
  slug: z.string().min(1, "category slug is required"),
  description: z.string().min(1, "description slug is required"),
  images: z.array(z.string()).optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;