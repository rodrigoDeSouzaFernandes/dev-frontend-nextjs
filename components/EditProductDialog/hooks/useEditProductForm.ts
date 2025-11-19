import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(3, "The title must have at least 3 characters"),
  price: z
    .string()
    .transform((val) => val.replace(/[^0-9\.,]+/g, ""))
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "The price must be a positive number"
    ),
  description: z
    .string()
    .min(10, "The description must have at least 10 characters"),
  category: z.string().min(3, "The category must have at least 3 characters"),
  image: z
    .string()
    .nonempty("The image is required")
    .refine((val) => val.startsWith("data:"), "Invalid image"),
});

export const useEditProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  });

  function handleFormSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, "image">
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      field.onChange("");
      e.target.value = "";
      form.setError("image", { message: "Only image files are allowed" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      field.onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return { form, handleFormSubmit, handleImageChange };
};
