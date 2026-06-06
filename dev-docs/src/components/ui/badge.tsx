import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input text-foreground",
        muted: "bg-muted text-muted-foreground",
        success:
          "bg-[var(--status-complete-soft)] text-[#15803d]",
        destructive:
          "bg-[var(--status-blocked-soft)] text-[#b91c1c]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
  mono?: boolean;
  dot?: boolean;
  dotColor?: string;
  className?: string;
  children?: ReactNode;
};

export function Badge({
  variant,
  mono,
  dot,
  dotColor,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), mono && "font-mono", className)}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="inline-block h-[7px] w-[7px] rounded-full"
          style={{ background: dotColor ?? "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}
