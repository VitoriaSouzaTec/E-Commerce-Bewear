"use client";

// eslint-disable-next-line simple-import-sort/imports
import { MinusIcon, PlusIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Crie uma nova mutação para o botão "Comprar agora"
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado! Redirecionando para o carrinho...");
      // 2. Redireciona para o checkout APÓS o sucesso da mutação
      router.push("/cart/identification"); 
    },
    onError: () => {
      toast.error("Ocorreu um erro ao adicionar o produto.");
    },
  });

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  
  // A função para o botão "Comprar agora"
  const handleBuyNow = () => {
    mutate(); // Inicia a mutação
  };

  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button 
          className="rounded-full" 
          size="lg"
          onClick={handleBuyNow}
          disabled={isPending} // Desabilita o botão enquanto a ação está pendente
        >
          <span className="flex items-center gap-2">
            {isPending && <Loader2 className="animate-spin" />}
            Comprar agora
          </span>
        </Button>
      </div>
    </>
  );
};

export default ProductActions;