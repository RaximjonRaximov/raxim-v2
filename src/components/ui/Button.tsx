import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:opacity-50",
          variant === "primary" && "bg-ink text-white hover:bg-blue",
          variant === "secondary" && "bg-lime text-ink hover:opacity-90",
          variant === "outline" && "border border-line bg-paper text-ink hover:bg-page",
          variant === "ghost" && "bg-transparent text-ink hover:bg-page",
          size === "sm" && "h-9 px-4 text-xs tracking-label uppercase",
          size === "md" && "h-12 px-6 text-sm",
          size === "lg" && "h-14 px-8 text-base",
          className
        )}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);
Button.displayName = "Button";
