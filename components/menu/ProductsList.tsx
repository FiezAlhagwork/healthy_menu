/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductDetailsSheet } from "@/components/ui/ProductDetailsSheet";

export function ProductsList({
  products,
  categoryName,
}: {
  products: any[];
  categoryName: string;
}) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image_url}
            title={product.name}
            subtitle={product.description}
            price={product.price}
            currency="SYP"
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailsSheet
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={{
            name: selectedProduct.name,
            categoryName,
            image: selectedProduct.image_url,
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
    </>
  );
}
