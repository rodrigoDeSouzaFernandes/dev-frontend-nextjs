import { productsService } from "@/lib/services/products.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useRemoveProductDialog = () => {
  const {
    isPending,
    isError,
    mutate: deleteProduct,
  } = useMutation({
    mutationFn: productsService.delete,
    onSuccess: () => {
      toast.success("Product deleted successfully.");
    },
  });

  return { isPending, isError, deleteProduct };
};

export default useRemoveProductDialog;
