import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---- Card ----

type CardProps = {
  shadow?: boolean;
  hover?: boolean;
  pad?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Card({ shadow, hover, pad, className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card",
        shadow && "shadow-sm",
        hover &&
          "transition-shadow duration-150 hover:border-slate-300 hover:shadow-md",
        pad && "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ---- CardHeader ----

type CardHeaderProps = {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function CardHeader({
  title,
  description,
  className,
  children,
}: CardHeaderProps) {
  return (
    <div className={cn("border-b border-border px-6 py-4", className)}>
      {title && <h3 className="text-sm font-medium text-foreground">{title}</h3>}
      {description && (
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
}

// ---- CardBody ----

type CardBodyProps = {
  className?: string;
  children?: ReactNode;
};

export function CardBody({ className, children }: CardBodyProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
