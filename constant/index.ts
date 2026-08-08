import { Salad, CupSoda, IceCreamCone, LucideIcon } from "lucide-react";

export const categoryDisplay: Record<
  string,
  { icon: LucideIcon; label: string }
> = {
  food: { icon: Salad, label: "ماكولات" },
  drinks: { icon: CupSoda, label: "مشروبات" },
  dessert: { icon: IceCreamCone, label: "حلويات" },
};
