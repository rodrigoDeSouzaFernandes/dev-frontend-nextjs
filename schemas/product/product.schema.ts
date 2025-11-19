import * as z from "zod";

export const producFormSchema = z.object({
  title: z
    .string()
    .nonempty("The title is required")
    .min(3, "The title must have at least 3 characters"),
  price: z
    .string()
    .nonempty("The price is required")
    .transform((val) => val.replace(/[^0-9\.,]+/g, ""))
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "The price must be a positive number"
    ),
  description: z
    .string()
    .nonempty("The description is required")
    .min(10, "The description must have at least 10 characters"),
  category: z.string().min(3, "The category must have at least 3 characters"),
  image: z
    .string()
    .nonempty("The image is required")
    .refine((val) => {
      const imageExtensions = /\.(png|jpe?g|webp|gif|svg|bmp|ico|avif)$/i;
      return val.startsWith("data:") || imageExtensions.test(val);
    }),
});
