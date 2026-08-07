interface Category {
  id: string;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
  showAllTab?: boolean;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onChange,
  showAllTab = true,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
      {showAllTab && (
        <TabButton
          isActive={activeCategory === "all"}
          onClick={() => onChange("all")}
          label="الكل"
        />
      )}

      {categories.map((cat) => (
        <TabButton
          key={cat.id}
          isActive={activeCategory === cat.id}
          onClick={() => onChange(cat.id)}
          label={cat.name}
        />
      ))}
    </div>
  );
}

function TabButton({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
        isActive
          ? "bg-primary-color text-white"
          : "bg-slate-100 text-text-muted hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}
