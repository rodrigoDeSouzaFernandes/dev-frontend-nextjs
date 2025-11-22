import { productsService } from "@/lib/services/products.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseRemoveProductDialogReturn } from "@/types/hooks";

type UseRemoveProductDialogProps = {
  closeModal: () => void;
  onSucces: () => void;
};

const useRemoveProductDialog = (
  props: UseRemoveProductDialogProps
): UseRemoveProductDialogReturn => {
  const {
    isPending,
    isError,
    mutate: deleteProduct,
  } = useMutation({
    mutationFn: productsService.delete,
    onSuccess: () => {
      toast.success("Product deleted successfully.");
      props.closeModal();
      props.onSucces();
    },
  });

  return { isPending, isError, deleteProduct };
};

export default useRemoveProductDialog;
