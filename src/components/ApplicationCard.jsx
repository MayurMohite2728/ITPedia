import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Database, Clock } from "lucide-react";

export const ApplicationCard = ({ application, onClick }) => {
  return (
    <Card
      className="p-6 bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-card-foreground">
              {application.app_name}
            </h3>
            {application.app_url && (
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {application.app_type}
          </Badge>
        </div>
        <StatusBadge status={application.active ? "active" : "inactive"} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Database className="h-4 w-4" />
          <span>{application.componentCount || 0} Components</span>
        </div>

        {application.lastSyncDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Last sync:{" "}
              {new Date(application.lastSyncDate).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Added by {application.added_by}</span>
            <span>{new Date(application.added_on).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
