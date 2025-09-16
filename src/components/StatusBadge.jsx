import { cn } from "@/lib/utils";

export const StatusBadge = ({ status, children }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-success/10 text-success border border-success/20": status === "active" || status === "synced",
          "bg-muted text-muted-foreground border": status === "inactive",
          "bg-warning/10 text-warning border border-warning/20": status === "pending" || status === "modified",
          "bg-destructive/10 text-destructive border border-destructive/20": status === "error",
        }
      )}
    >
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
