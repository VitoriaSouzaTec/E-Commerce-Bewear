import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export const getUseCartQueryKey = () => ["cart"] as const;

export const useCart = (params?: {
  initialData?: Awaited<ReturnType<typeof getCart>>;
}) => {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: async () => {
      try {
        const cart = await getCart();
        return cart || { items: [] }; // Garante um fallback seguro
      } catch (error) {
        console.error("Error fetching cart:", error);
        return { items: [] }; // Retorna um carrinho vazio em caso de erro
      }
    },
    initialData: params?.initialData,
    retry: 1, // Tenta apenas uma vez adicional em caso de erro
    staleTime: 60 * 1000, // 1 minuto de cache
  });
};