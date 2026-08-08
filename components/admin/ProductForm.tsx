/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initialData?: {
    category_id: string;
    name: string;
    description: string | null;
    ingredients: string | null;
    image_url: string | null;
    price: number | null;
    calories: number | null;
    protein_g: number | null;
    carbs_g: number | null;
    fat_g: number | null;
  };
}

export function ProductForm({
  mode,
  productId,
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image_url || null,
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    category_id: initialData?.category_id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    ingredients: initialData?.ingredients || "",
    price: initialData?.price?.toString() || "",
    calories: initialData?.calories?.toString() || "",
    protein_g: initialData?.protein_g?.toString() || "",
    carbs_g: initialData?.carbs_g?.toString() || "",
    fat_g: initialData?.fat_g?.toString() || "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name")
        .order("sort_order");
      if (data) {
        setCategories(data);
        if (mode === "create" && !form.category_id) {
          setForm((f) => ({ ...f, category_id: data[0]?.id || "" }));
        }
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.category_id) {
      setError("الاسم والتصنيف مطلوبين");
      return;
    }

    setLoading(true);

    let imageUrl = initialData?.image_url || null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        setError("صار خطأ برفع الصورة");
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    const payload = {
      category_id: form.category_id,
      name: form.name,
      description: form.description || null,
      ingredients: form.ingredients || null,
      image_url: imageUrl,
      price: form.price ? Number(form.price) : null,
      calories: form.calories ? Number(form.calories) : null,
      protein_g: form.protein_g ? Number(form.protein_g) : null,
      carbs_g: form.carbs_g ? Number(form.carbs_g) : null,
      fat_g: form.fat_g ? Number(form.fat_g) : null,
    };

    const { error: dbError } =
      mode === "create"
        ? await supabase.from("products").insert(payload)
        : await supabase.from("products").update(payload).eq("id", productId);

    setLoading(false);

    if (dbError) {
      setError("صار خطأ: " + dbError.message);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-dark">التصنيف</label>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-btn border border-gray-200 bg-card-bg text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-color/40"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        name="name"
        label="اسم الصنف"
        value={form.name}
        onChange={handleChange}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-dark">الصورة</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm text-text-muted"
        />
        {imagePreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePreview}
            alt="preview"
            className="w-32 h-32 object-cover rounded-card mt-2"
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-dark">الوصف</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded-btn border border-gray-200 bg-card-bg text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-color/40"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-dark">المكونات</label>
        <textarea
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 rounded-btn border border-gray-200 bg-card-bg text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-color/40"
        />
      </div>

      <Input
        name="price"
        type="number"
        step="0.01"
        label="السعر"
        value={form.price}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="calories"
          type="number"
          label="سعرات حرارية"
          value={form.calories}
          onChange={handleChange}
        />
        <Input
          name="protein_g"
          type="number"
          label="بروتين (غ)"
          value={form.protein_g}
          onChange={handleChange}
        />
        <Input
          name="carbs_g"
          type="number"
          label="كارب (غ)"
          value={form.carbs_g}
          onChange={handleChange}
        />
        <Input
          name="fat_g"
          type="number"
          label="دهون (غ)"
          value={form.fat_g}
          onChange={handleChange}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" loading={loading} className="mt-2">
        {mode === "create" ? "إضافة الصنف" : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
