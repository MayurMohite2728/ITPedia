import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

export const IntegrationStatus = ({ integrations }) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Integration Status</h3>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
      </div>
      
      <div className="space-y-4">
        {integrations.map((integration) => (
          <div 
            key={integration.name} 
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
          >
            <div className="flex items-center gap-3">
              {integration.status === "connected" && <CheckCircle className="h-5 w-5 text-success" />}
              {integration.status === "error" && <AlertTriangle className="h-5 w-5 text-destructive" />}
              {integration.status === "syncing" && <RefreshCw className="h-5 w-5 text-warning animate-spin" />}
              
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{integration.name}</h4>
                  {integration.url && (
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Last sync: {new Date(integration.lastSync).toLocaleString()}
                </p>
                {integration.recordCount && (
                  <p className="text-sm text-muted-foreground">
                    {integration.recordCount} records
                  </p>
                )}
                {integration.errorMessage && (
                  <p className="text-sm text-destructive mt-1">
                    {integration.errorMessage}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <StatusBadge 
                status={
                  integration.status === "connected" 
                    ? "synced" 
                    : integration.status === "syncing" 
                      ? "pending" 
                      : "error"
                }
              />
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
