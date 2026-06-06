import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---- StatusBadge ----

type PlanStatus = "queued" | "active" | "complete" | "deferred" | "blocked";

const STATUS: Record<
  PlanStatus,
  { label: string; bg: string; fg: string; dot: string }
> = {
  queued: {
    label: "Queued",
    bg: "var(--status-queued-soft)",
    fg: "#3f4a5a",
    dot: "var(--status-queued)",
  },
  active: {
    label: "Active",
    bg: "var(--status-active-soft)",
    fg: "#1d4ed8",
    dot: "var(--status-active)",
  },
  complete: {
    label: "Complete",
    bg: "var(--status-complete-soft)",
    fg: "#15803d",
    dot: "var(--status-complete)",
  },
  deferred: {
    label: "Deferred",
    bg: "var(--status-deferred-soft)",
    fg: "#92400e",
    dot: "var(--status-deferred)",
  },
  blocked: {
    label: "Blocked",
    bg: "var(--status-blocked-soft)",
    fg: "#b91c1c",
    dot: "var(--status-blocked)",
  },
};

type StatusBadgeProps = {
  status?: PlanStatus;
  className?: string;
  children?: ReactNode;
};

export function StatusBadge({
  status = "queued",
  className,
  children,
}: StatusBadgeProps) {
  const s = STATUS[status] ?? STATUS.queued;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] rounded-full px-[11px] py-[5px] text-xs font-medium whitespace-nowrap",
        className,
      )}
      style={{ background: s.bg, color: s.fg }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-[7px] w-[7px] rounded-full"
        style={{ background: s.dot }}
      />
      {children ?? s.label}
    </span>
  );
}

// ---- PlanTypeTag ----

type PlanType = "d" | "p" | "r";

const TYPE: Record<PlanType, { color: string; label: string }> = {
  d: { color: "var(--type-d)", label: "d" },
  p: { color: "var(--type-p)", label: "p" },
  r: { color: "var(--type-r)", label: "r" },
};

const TYPE_SIZE: Record<"sm" | "md" | "lg", number> = { sm: 18, md: 24, lg: 30 };

type PlanTypeTagProps = {
  type?: PlanType;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function PlanTypeTag({
  type = "d",
  size = "md",
  className,
}: PlanTypeTagProps) {
  const t = TYPE[type] ?? TYPE.d;
  const px = TYPE_SIZE[size];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sm font-mono font-bold text-white",
        className,
      )}
      style={{
        background: t.color,
        width: px,
        height: px,
        fontSize: Math.round(px * 0.55),
      }}
    >
      {t.label}
    </span>
  );
}
