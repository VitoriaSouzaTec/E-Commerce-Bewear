import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

interface AuthenticationProps {
  searchParams: Promise<{ redirect?: string }>;
}

const Authentication = async ({ searchParams }: AuthenticationProps) => {
  const { redirect } = await searchParams;

  return (
    <>
      <Header />

      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="w-full">
            <SignInForm redirectTo={redirect} />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm redirectTo={redirect} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Authentication;