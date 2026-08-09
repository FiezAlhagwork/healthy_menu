import { InputHTMLAttributes } from "react";
import { ButtonHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
  showAllTab?: boolean;
  counts?: Record<string, number>; // { categoryId: count, all: totalCount }
}
