import { InputProps } from "@/types/database";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-dark">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-btn border border-gray-200
            bg-card-bg text-text-dark placeholder:text-text-muted
            focus:outline-none focus:ring-2 focus:ring-primary-color/40 focus:border-primary-color
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            ${error ? "border-red-500 focus:ring-red-300" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
