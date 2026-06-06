import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "flex items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "h-10 w-10 text-muted-foreground hover:bg-accent hover:text-foreground",
        primary:
          "h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90",
        rail: "h-10 w-10 hover:bg-white/10 focus-visible:ring-white/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    label: string;
    active?: boolean;
  };

export function IconButton({
  variant,
  active,
  label,
  className,
  ...rest
}: IconButtonProps) {
  const railActive =
    variant === "rail" ? (active ? "text-white bg-accent/20" : "text-zinc-400") : "";

  return (
    <button
      aria-label={label}
      className={cn(iconButtonVariants({ variant }), railActive, className)}
      type="button"
      {...rest}
    />
  );
}
