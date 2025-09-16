"use client";
// eslint-disable-next-line simple-import-sort/imports
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
       toast.success("Produto adicionado ao carrinho!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao adicionar o produto.");
    },
  });

  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => mutate()}
      data-testid="add-to-cart-button" 
    >
      {/* Mantém um span fixo para evitar troca abrupta de nós */}
      <span className="flex items-center gap-2">
        {isPending && <Loader2 className="animate-spin" />}
        Adicionar à sacola
      </span>
    </Button>
  );
};

export default AddToCartButton;
