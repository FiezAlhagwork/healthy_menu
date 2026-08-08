import {
  Salad,
  CupSoda,
  IceCreamCone,
  UtensilsCrossed,
  LucideIcon,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
  showAllTab?: boolean;
}

const categoryDisplay: Record<string, { icon: LucideIcon; label: string }> = {
  food: { icon: Salad, label: "ماكولات" },
  drinks: { icon: CupSoda, label: "مشروبات" },
  dessert: { icon: IceCreamCone, label: "حلويات" },
};

export function CategoryTabs({
  categories,
  activeCategory,
  onChange,
  showAllTab = true,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
      {showAllTab && (
        <TabButton
          isActive={activeCategory === "all"}
          onClick={() => onChange("all")}
          label="الكل"
          Icon={UtensilsCrossed}
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
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
  Icon?: LucideIcon;
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
    </button>
  );
}
