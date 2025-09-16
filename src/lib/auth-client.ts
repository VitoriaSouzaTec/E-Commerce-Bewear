import { createAuthClient } from "better-auth/react";

console.log("Variável de ambiente carregada:", process.env.NEXT_PUBLIC_APP_URL);

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}api/auth`,
});