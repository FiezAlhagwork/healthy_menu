import { categoryDisplay } from "@/constant";
import { CategoryTabsProps } from "@/types/database";
import { UtensilsCrossed, LucideIcon } from "lucide-react";

export function CategoryTabs({
  categories,
  activeCategory,
  onChange,
  showAllTab = true,
  counts,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
      {showAllTab && (
        <TabButton
          isActive={activeCategory === "all"}
          onClick={() => onChange("all")}
          label="الكل"
          Icon={UtensilsCrossed}
          count={counts?.all}
        />
      )}

      {categories.map((cat) => {
        const display = categoryDisplay[cat.slug];
        return (
          <TabButton
            key={cat.id}
            isActive={activeCategory === cat.id}
            onClick={() => onChange(cat.id)}
            label={display?.label || cat.name}
            Icon={display?.icon}
            count={counts?.[cat.id]}
          />
        );
      })}
    </div>
  );
}

function TabButton({
  isActive,
  onClick,
  label,
  Icon,
  count,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
  Icon?: LucideIcon;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
        isActive
          ? "bg-primary-color text-white"
          : "bg-slate-100 text-text-muted hover:bg-slate-200"
      }`}
    >
      {Icon && <Icon size={16} />}
      {label}
      {count !== undefined && (
        <span
          className={`text-xs font-bold ${
            isActive ? "text-white/80" : "text-text-muted/70"
          }`}
        >
          ({count})
        </span>
      )}
    </button>
  );
}
