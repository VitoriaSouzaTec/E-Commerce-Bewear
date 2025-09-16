// app/page.tsx

import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      {/* ✅ Contêiner principal para desktop, limita a largura e centraliza */}
      <div className="space-y-6 md:space-y-12 max-w-7xl mx-auto md:px-8">
        <div className="px-5 md:px-0">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full md:rounded-lg"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5 md:px-0">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5 md:px-0">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full md:rounded-lg"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
      <Footer />
    </>
  );
};

export default Home;