import { productsService } from "@/lib/services/products.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseRemoveProductDialogReturn } from "@/types/hooks";

type UseRemoveProductDialogProps = {
  closeModal: () => void;
  onSucces: () => void;
};

const useRemoveProductDialog = (
  props: UseRemoveProductDialogProps
): UseRemoveProductDialogReturn => {
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    mutate: deleteProduct,
  } = useMutation({
    mutationFn: productsService.delete,
    onSuccess: async () => {
      toast.success("Product deleted successfully.");
      props.closeModal();
      props.onSucces();
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product"] });
      await queryClient.removeQueries({ queryKey: ["product"] });
    },
  });

  return { isPending, isError, deleteProduct };
};

export default useRemoveProductDialog;
