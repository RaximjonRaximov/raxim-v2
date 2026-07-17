import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-12 px-4 rounded-2xl border border-line bg-paper text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue",
            error && "border-rose",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-rose">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
