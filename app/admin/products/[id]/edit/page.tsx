import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import { BackButton } from "@/components/ui/BackButton";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
       <BackButton href="/admin/products" />
      <h1 className="text-2xl font-bold text-text-dark mb-6">تعديل الصنف</h1>
      <ProductForm mode="edit" productId={id} initialData={product} />
    </div>
  );
}
