import { productsService } from "@/lib/services/products.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseRemoveProductDialogProps = {
  closeModal: () => void;
};

const useRemoveProductDialog = (props: UseRemoveProductDialogProps) => {
  const {
    isPending,
    isError,
    mutate: deleteProduct,
  } = useMutation({
    mutationFn: productsService.delete,
    onSuccess: () => {
      toast.success("Product deleted successfully.");
      props.closeModal();
    },
  });

  return { isPending, isError, deleteProduct };
};

export default useRemoveProductDialog;
