import Image from "next/image";
import { Pencil, Trash2, Eye } from "lucide-react";

interface AdminProductCardProps {
  image: string;
  title: string;
  subtitle: string;
  price: number | string;
  currency: string;
  isAvailable: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function AdminProductCard({
  image,
  title,
  subtitle,
  price,
  currency,
  isAvailable,
  onView,
  onEdit,
  onDelete,
}: AdminProductCardProps) {
  return (
    <div className="w-full bg-card-bg rounded-card overflow-hidden shadow-sm flex flex-col">
      <div
        className="w-full h-48 relative overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
        onClick={onView}
      >
        <Image src={image} alt={title} fill className="object-cover" />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm">غير متوفر</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col grow justify-between">
        <div className="cursor-pointer" onClick={onView}>
          <h3 className="text-base font-bold text-primary-color mb-1.5 line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-text-muted mb-4 leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2 mt-auto border-t border-slate-50">
          <div className="text-lg font-extrabold text-primary-color flex items-baseline gap-1">
            {price}{" "}
            <span className="text-xs font-semibold text-text-muted">
              {currency}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onView}
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <Eye size={15} />
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="w-9 h-9 rounded-full bg-emerald-50 text-primary-color flex items-center justify-center hover:bg-primary-color hover:text-white transition-colors"
            >
              <Pencil size={15} />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
