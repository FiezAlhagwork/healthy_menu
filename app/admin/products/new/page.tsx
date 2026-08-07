import { ProductForm } from "@/components/admin/ProductForm";
import { BackButton } from "@/components/ui/BackButton";

export default function NewProductPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <BackButton href="/admin/products" />
      <h1 className="text-2xl font-bold text-text-dark mb-6">إضافة صنف جديد</h1>
      <ProductForm mode="create" />
    </div>
  );
}
