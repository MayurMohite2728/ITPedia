import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Mail, 
  Users,
  ExternalLink,
  Bell
} from "lucide-react";

export const RiskMonitoringPanel = ({ alerts = [] }) => {
  const mockAlerts = [
    {
      id: "1",
      type: "vulnerability",
      severity: "critical",
      title: "Apache Log4j Critical Vulnerability",
      description: "CVE-2021-44228 affects multiple applications in your portfolio",
      affectedAssets: 12,
      stakeholders: ["security-team@company.com", "app-owners@company.com"],
      source: "IT-Pedia Security Feed",
      timestamp: "2024-01-20T14:30:00Z",
      status: "new",
    },
    {
      id: "2",
      type: "lifecycle",
      severity: "high",
      title: "Windows Server 2012 End of Support",
      description: "End of support date approaching in 6 months",
      affectedAssets: 8,
      stakeholders: ["infrastructure@company.com"],
      source: "IT-Pedia Lifecycle Updates",
      timestamp: "2024-01-20T10:15:00Z",
      status: "acknowledged",
    },
    {
      id: "3",
      type: "compliance",
      severity: "medium",
      title: "Oracle Database License Review Required",
      description: "License compliance check needed for production instances",
      affectedAssets: 5,
      stakeholders: ["compliance@company.com", "dba-team@company.com"],
      source: "IT-Pedia Compliance Monitor",
      timestamp: "2024-01-20T08:45:00Z",
      status: "in-progress",
    },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case "vulnerability":
        return <Shield className="h-4 w-4" />;
      case "lifecycle":
        return <Clock className="h-4 w-4" />;
      case "compliance":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "high":
        return "text-warning bg-warning/10 border-warning/20";
      case "medium":
        return "text-primary bg-primary/10 border-primary/20";
      default:
        return "text-muted-foreground bg-muted border";
    }
  };

  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts;

  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold">Risk Monitoring</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">
            {displayAlerts.filter(a => a.status === "new").length} New
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {displayAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${getSeverityColor(alert.severity)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={getSeverityColor(alert.severity)}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {alert.affectedAssets} assets affected
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {alert.stakeholders.length} stakeholders notified
                    </span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={alert.status === "new" ? "error" : alert.status === "resolved" ? "synced" : "pending"}>
                {alert.status}
              </StatusBadge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Source:</span>
                <Badge variant="outline" className="text-xs">
                  {alert.source}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Notify Stakeholders
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Scheduled Notifications Active</h5>
            <p className="text-sm text-muted-foreground">
              Security Operations and asset owners receive periodic updates via email
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Configure Recipients
          </Button>
        </div>
      </div>
    </Card>
  );
};
