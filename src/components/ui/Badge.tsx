import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "lime" | "blue" | "dark";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-label",
        variant === "default" && "bg-page text-muted",
        variant === "lime" && "bg-lime text-ink",
        variant === "blue" && "bg-blue text-white",
        variant === "dark" && "bg-ink text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
