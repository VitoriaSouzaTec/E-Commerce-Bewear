"use client";
// eslint-disable-next-line simple-import-sort/imports
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogInIcon } from "lucide-react";

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
  const router = useRouter();

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
    onError: (error) => {
      if (error instanceof Error && error.message === "UNAUTHENTICATED") {
        toast.error("Você precisa fazer login para comprar", {
          description: "Faça login na sua conta para continuar com a compra.",
          
          icon: <LogInIcon className="h-4 w-4" />,
          action: {
            label: "Fazer login",
            onClick: () => router.push("/authentication"),
          },
          duration: 5000,
        });
        router.push("/authentication");
        return;
      }
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
      <span className="flex items-center gap-2">
        {isPending && <Loader2 className="animate-spin" />}
        Adicionar à sacola
      </span>
    </Button>
  );
};

export default AddToCartButton;