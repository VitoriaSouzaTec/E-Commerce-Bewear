// eslint-disable-next-line simple-import-sort/imports
import Link from "next/link";
import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-2xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Button
              variant="ghost"
              className="rounded-lg bg-white text-xs font-semibold w-full py-2"
            >
              {category.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;