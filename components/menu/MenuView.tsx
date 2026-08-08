"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductDetailsSheet } from "@/components/ui/ProductDetailsSheet";
import { Input } from "../ui/Input";
import { CategoryTabs } from "./CategoryTabs";
import { MenuHero } from "./MenuHero";
import { MenuNavbar } from "./MenuNavbar";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  ingredients: string | null;
  category_id: string;
  categories: { name: string; slug: string } | null;
}

export function MenuView({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category_id === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <MenuNavbar restaurantName="super Healthy" logoUrl="/logo.png" />

      <Input
        type="text"
        placeholder="ابحث عن صنف..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-btn border border-gray-200 bg-card-bg text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-color/40 mb-5"
      />

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {/* الكروت */}
      {filteredProducts.length === 0 ? (
        <p className="text-text-muted text-center py-12">لا يوجد نتائج</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image_url || "/placeholder.png"}
              title={product.name}
              subtitle={product.description || ""}
              price={product.price}
              currency="$"
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {/* تفاصيل المنتج */}
      {selectedProduct && (
        <ProductDetailsSheet
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={{
            name: selectedProduct.name,
            categoryName: selectedProduct.categories?.name || "",
            image: selectedProduct.image_url || "/placeholder.png",
            price: selectedProduct.price,
            currency: "SYP",
            description: selectedProduct.description,
            calories: selectedProduct.calories,
            protein_g: selectedProduct.protein_g,
            carbs_g: selectedProduct.carbs_g,
            fat_g: selectedProduct.fat_g,
            ingredients: selectedProduct.ingredients,
          }}
        />
      )}
    </div>
  );
}
