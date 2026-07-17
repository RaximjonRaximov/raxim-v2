import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-paper shadow-soft transition-shadow hover:shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}
