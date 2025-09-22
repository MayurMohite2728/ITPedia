import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecipientsConfigurationDialog } from "@/components/RecipientsConfigurationDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  RefreshCw,
  Database,
  AlertCircle,
  CheckCircle,
  Settings,
  Calendar,
  Zap,
  Mail,
} from "lucide-react";

export const ScheduleConfigurationDialog = ({ open, onOpenChange, type }) => {
  const { toast } = useToast();
  const [frequency, setFrequency] = useState("hourly");
  const [specificTime, setSpecificTime] = useState("00:00");
  const [enableRetries, setEnableRetries] = useState(true);
  const [maxRetries, setMaxRetries] = useState("3");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [isRecipientsDialogOpen, setIsRecipientsDialogOpen] = useState(false);
  const [dataSources, setDataSources] = useState({
    itpedia: true,
    lifecycle: true,
    security: true,
    compliance: type === "infrastructure",
  });

  const frequencyOptions = [
    {
      value: "15min",
      label: "Every 15 minutes",
      description: "High frequency updates",
    },
    {
      value: "30min",
      label: "Every 30 minutes",
      description: "Frequent updates",
    },
    { value: "hourly", label: "Hourly", description: "Standard frequency" },
    {
      value: "daily",
      label: "Daily",
      description: "Once per day at specified time",
    },
    {
      value: "weekly",
      label: "Weekly",
      description: "Weekly on Sunday at specified time",
    },
    {
      value: "custom",
      label: "Custom Cron",
      description: "Advanced scheduling",
    },
  ];

  const handleSave = () => {
    toast({
      title: "Schedule Updated",
      description: `${
        type === "application" ? "Application" : "Infrastructure"
      } enrichment schedule has been configured successfully.`,
    });
    onOpenChange(false);
  };

  const isHighFrequency = ["15min", "30min"].includes(frequency);
  const isScheduledFrequency = ["daily", "weekly"].includes(frequency);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configure{" "}
            {type === "application" ? "Application" : "Infrastructure"}{" "}
            Enrichment Schedule
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h4 className="font-medium">Current Schedule Active</h4>
                  <p className="text-sm text-muted-foreground">
                    Next sync in 23 minutes • Last sync: 12:34 PM
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-success border-success/20"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Running
              </Badge>
            </div>
          </Card>

          {/* Frequency Configuration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <Label className="text-base font-medium">Sync Frequency</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {frequencyOptions.map((option) => (
                <Card
                  key={option.value}
                  className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                    frequency === option.value
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setFrequency(option.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                    {option.value === frequency && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  {option.value === "15min" && (
                    <div className="mt-2 flex items-center gap-1">
                      <Zap className="h-3 w-3 text-warning" />
                      <span className="text-xs text-warning">
                        High API usage
                      </span>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {isHighFrequency && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium text-warning">
                    High Frequency Warning
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  High frequency syncing may impact API rate limits and system
                  performance.
                </p>
              </div>
            )}

            {isScheduledFrequency && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Specific Time</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={specificTime}
                    onChange={(e) => setSpecificTime(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background"
                  />
                  <span className="text-sm text-muted-foreground">
                    {frequency === "weekly" ? "(Sunday)" : "(Daily)"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Data Sources */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              <Label className="text-base font-medium">Data Sources</Label>
            </div>

            <div className="space-y-3">
              {["itpedia", "lifecycle", "security", "compliance"].map(
                (key) =>
                  (key !== "compliance" || type === "infrastructure") && (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {key === "itpedia" && "IT-Pedia Products API"}
                          {key === "lifecycle" && "Lifecycle Data"}
                          {key === "security" && "Security Intelligence"}
                          {key === "compliance" && "Compliance Data"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {key === "itpedia" &&
                            "Product standardization and naming"}
                          {key === "lifecycle" &&
                            "End-of-life and support status"}
                          {key === "security" &&
                            "CVE data and vulnerability information"}
                          {key === "compliance" &&
                            "Regulatory and compliance status"}
                        </div>
                      </div>
                      <Switch
                        checked={dataSources[key]}
                        onCheckedChange={(checked) =>
                          setDataSources((prev) => ({
                            ...prev,
                            [key]: checked,
                          }))
                        }
                      />
                    </div>
                  )
              )}
            </div>
          </div>

          <Separator />

          {/* Retry Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">
                  Automatic Retries
                </Label>
                <p className="text-sm text-muted-foreground">
                  Retry failed synchronization attempts
                </p>
              </div>
              <Switch
                checked={enableRetries}
                onCheckedChange={setEnableRetries}
              />
            </div>

            {enableRetries && (
              <div className="ml-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Label className="text-sm font-medium min-w-0">
                    Max Retries:
                  </Label>
                  <Select value={maxRetries} onValueChange={setMaxRetries}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">
                  Sync Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about sync status and issues
                </p>
              </div>
              <Switch
                checked={enableNotifications}
                onCheckedChange={setEnableNotifications}
              />
            </div>

            {enableNotifications && (
              <div className="ml-6 space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRecipientsDialogOpen(true)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Configure Recipients
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">Test Connection</Button>
            <Button onClick={handleSave}>Save Schedule</Button>
          </div>
        </div>

        {/* Recipients Configuration Dialog */}
        <RecipientsConfigurationDialog
          open={isRecipientsDialogOpen}
          onOpenChange={setIsRecipientsDialogOpen}
          type="schedule"
        />
      </DialogContent>
    </Dialog>
  );
};
