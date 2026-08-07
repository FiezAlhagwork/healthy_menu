import { ButtonProps } from "@/types/database";

const variantStyles = {
  primary: "bg-primary-color text-white hover:opacity-90",
  secondary: "bg-primary-accent text-white hover:opacity-90",
  outline:
    "bg-transparent border border-primary-color text-primary-color hover:bg-primary-color/5",
};

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        px-6 py-3 rounded-btn font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "جاري التحميل..." : children}
    </button>
  );
}
