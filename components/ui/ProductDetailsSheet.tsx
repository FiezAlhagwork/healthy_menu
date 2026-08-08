"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, PieChart, Leaf, Info } from "lucide-react";

interface ProductDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    categoryName: string;
    image: string;
    price: number | string;
    currency: string;
    description: string | null;
    calories: number | null;
    protein_g: number | null;
    carbs_g: number | null;
    fat_g: number | null;
    ingredients: string | null;
    allergensText?: string | null;
  };
}

export function ProductDetailsSheet({
  isOpen,
  onClose,
  product,
}: ProductDetailsSheetProps) {
  // منع تمرير الصفحة الخلفية عند فتح المودال
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ingredientsList = product.ingredients
    ? product.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-150 rounded-t-[28px] md:rounded-3xl p-6 max-h-[85vh] overflow-y-auto relative shadow-2xl animate-slide-up scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* مقبض السحب (للموبايل) */}
        <div className="w-11 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 md:hidden" />

        {/* زر الإغلاق */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 left-5 bg-primary-color hover:bg-primary-color/90 w-9 h-9 rounded-full flex items-center justify-center text-slate-200 transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* الصورة */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-5 shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* العنوان والسعر */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-primary-color">
              {product.name}
            </h2>
            <span className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mt-1">
              {product.categoryName}
            </span>
          </div>
          <div className="text-xl font-extrabold text-primary-accent whitespace-nowrap">
            {product.price} {product.currency}
          </div>
        </div>

        {/* الوصف */}
        {product.description && (
          <p className="text-slate-500 text-sm leading-relaxed mb-5">
            {product.description}
          </p>
        )}

        {/* القيمة الغذائية */}
        <div className="text-base font-bold text-text-dark mb-3 flex items-center gap-2">
          <PieChart size={18} className="text-primary-accent" />
          القيمة الغذائية (لكل وجبة)
        </div>

        <div className="grid grid-cols-4 gap-2.5 mb-5">
          <NutrientBox value={product.calories} unit="" label="سعرة حرارية" />
          <NutrientBox value={product.protein_g} unit="غ" label="بروتين" />
          <NutrientBox value={product.carbs_g} unit="غ" label="كربوهيدرات" />
          <NutrientBox value={product.fat_g} unit="غ" label="دهون صحية" />
        </div>

        {/* المكونات */}
        {ingredientsList.length > 0 && (
          <>
            <div className="text-base font-bold text-text-dark mb-3 flex items-center gap-2">
              <Leaf size={18} className="text-emerald-500" />
              المكونات الأساسية
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {ingredientsList.map((ingredient, i) => (
                <span
                  key={i}
                  className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </>
        )}

        {/* تنبيه مسببات الحساسية */}
        {product.allergensText && (
          <div className="bg-orange-50 border border-orange-100 p-3.5 rounded-xl text-sm text-orange-700 flex items-center gap-2.5">
            <Info size={16} className="shrink-0" />
            <span>{product.allergensText}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function NutrientBox({
  value,
  unit,
  label,
}: {
  value: number | null;
  unit: string;
  label: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
      <div className="font-extrabold text-base text-primary-color">
        {value ?? 0}
        {unit}
      </div>
      <div className="text-[11px] text-slate-400 mt-0.5 font-semibold">
        {label}
      </div>
    </div>
  );
}