import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ScheduleConfigurationDialog } from "@/components/ScheduleConfigurationDialog";
import {
  Server,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  Calendar,
  Shield,
  Edit3,
  HardDrive,
  Network,
} from "lucide-react";

export const InfrastructureLibraryPanel = ({ infrastructure = [] }) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const { toast } = useToast();

  const mockInfrastructure = [
    {
      id: "1",
      originalName: "HP ProLiant DL380 Gen10",
      normalizedName: "HPE ProLiant DL380 Gen10",
      source: "ABACUS Infrastructure Catalogue",
      status: "normalized",
      type: "server",
      lifecycle: {
        generalAvailability: "2017-06-01",
        endOfSupport: "2027-06-30",
        endOfLife: "2032-06-30",
      },
      securityStatus: "secure",
      complianceStatus: "compliant",
      lastUpdated: "2024-01-20T14:30:00Z",
    },
    {
      id: "2",
      originalName: "VMware vSphere 7.0",
      normalizedName: "VMware vSphere 7.0",
      source: "ABACUS Infrastructure Catalogue",
      status: "normalized",
      type: "virtualization",
      lifecycle: {
        generalAvailability: "2020-04-02",
        endOfSupport: "2025-04-02",
        endOfLife: "2027-04-02",
      },
      securityStatus: "vulnerable",
      complianceStatus: "non-compliant",
      lastUpdated: "2024-01-20T12:15:00Z",
    },
    {
      id: "3",
      originalName: "Cisco ASR 9000 Series Router",
      normalizedName: "Cisco ASR 9000 Series",
      source: "ABACUS Infrastructure Catalogue",
      status: "manual-review",
      type: "network",
      lifecycle: {
        generalAvailability: "2008-01-01",
        endOfSupport: "2025-12-31",
        endOfLife: "2028-12-31",
      },
      securityStatus: "unknown",
      complianceStatus: "unknown",
      lastUpdated: "2024-01-20T10:45:00Z",
    },
    {
      id: "4",
      originalName: "NetApp FAS8200 Storage",
      normalizedName: "NetApp FAS8200",
      source: "ABACUS Infrastructure Catalogue",
      status: "pending",
      type: "storage",
      lifecycle: {
        generalAvailability: "2016-09-01",
        endOfSupport: "2026-09-01",
        endOfLife: "2029-09-01",
      },
      securityStatus: "secure",
      complianceStatus: "compliant",
      lastUpdated: "2024-01-20T09:20:00Z",
    },
  ];

  const displayInfrastructure =
    infrastructure.length > 0 ? infrastructure : mockInfrastructure;
  const normalizedCount = displayInfrastructure.filter(
    (i) => i.status === "normalized"
  ).length;
  const normalizationRate =
    (normalizedCount / displayInfrastructure.length) * 100;

  const getTypeIcon = (type) => {
    switch (type) {
      case "server":
        return <Server className="h-4 w-4" />;
      case "database":
        return <HardDrive className="h-4 w-4" />;
      case "network":
        return <Network className="h-4 w-4" />;
      case "storage":
        return <HardDrive className="h-4 w-4" />;
      case "virtualization":
        return <Server className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  const getSecurityIcon = (status) => {
    switch (status) {
      case "secure":
        return <Shield className="h-4 w-4 text-success" />;
      case "vulnerable":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "normalized":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "manual-review":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleManualReview = (item) => {
    setSelectedInfrastructure(item);
    setIsReviewDialogOpen(true);
  };

  const handleViewDetails = () => {
    setIsDetailsDialogOpen(true);
  };

  const handleViewItemDetails = (item) => {
    setSelectedInfrastructure(item);
    setIsDetailsDialogOpen(true);
  };

  const handleSyncAll = async () => {
    setIsSyncingAll(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Sync Complete",
        description:
          "All infrastructure components have been synchronized with IT-Pedia.",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize with IT-Pedia. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleSaveManualReview = async () => {
    if (!selectedInfrastructure) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Infrastructure Updated",
        description: `${selectedInfrastructure.normalizedName} has been updated and synced with IT-Pedia.`,
      });
      setIsReviewDialogOpen(false);
      setSelectedInfrastructure(null);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update infrastructure. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncIndividual = async (itemId) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Infrastructure Synced",
        description:
          "Infrastructure component has been synchronized with IT-Pedia.",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync infrastructure. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Normalization Rate
              </p>
              <p className="text-2xl font-bold">
                {normalizationRate.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-success" />
          </div>
          <Progress value={normalizationRate} className="mt-2 bg-secondary" />
        </Card>
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Infrastructure
              </p>
              <p className="text-2xl font-bold">
                {displayInfrastructure.length}
              </p>
            </div>
            <Server className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Risks</p>
              <p className="text-2xl font-bold text-destructive">
                {
                  displayInfrastructure.filter(
                    (i) => i.securityStatus === "vulnerable"
                  ).length
                }
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Non-Compliant</p>
              <p className="text-2xl font-bold text-warning">
                {
                  displayInfrastructure.filter(
                    (i) => i.complianceStatus === "non-compliant"
                  ).length
                }
              </p>
            </div>
            <Shield className="h-8 w-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* Infrastructure Table & Dialogs */}
      {/* ... The rest remains mostly the same JSX code without TypeScript types ... */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">
              Golden Infrastructure Library
            </h3>
            <p className="text-sm text-muted-foreground">
              Standardized infrastructure components and lifecycle data from
              IT-Pedia
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSyncAll}
              disabled={isSyncingAll}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isSyncingAll ? "animate-spin" : ""}`}
              />
              {isSyncingAll ? "Syncing..." : "Sync Now"}
            </Button>
            <Button size="sm" onClick={handleViewDetails}>
              View Full Library
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {displayInfrastructure.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => handleViewItemDetails(item)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(item.status)}
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <div>
                        <h4 className="font-semibold">{item.normalizedName}</h4>
                        {item.originalName !== item.normalizedName && (
                          <p className="text-sm text-muted-foreground">
                            Originally: "{item.originalName}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Type</p>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {item.type}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Lifecycle Status
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">
                          EOS:{" "}
                          {item.lifecycle.endOfSupport
                            ? new Date(
                                item.lifecycle.endOfSupport
                              ).getFullYear()
                            : "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Security Status
                      </p>
                      <div className="flex items-center gap-2">
                        {getSecurityIcon(item.securityStatus)}
                        <span className="text-sm capitalize">
                          {item.securityStatus}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Compliance
                      </p>
                      <div className="flex items-center gap-2">
                        <Shield
                          className={`h-3 w-3 ${
                            item.complianceStatus === "compliant"
                              ? "text-success"
                              : item.complianceStatus === "non-compliant"
                              ? "text-destructive"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-sm capitalize">
                          {item.complianceStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {item.status === "manual-review" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleManualReview(item);
                        }}
                        className="text-xs px-2 py-1 h-auto"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Manual Review
                      </Button>
                    )}
                    {item.status !== "normalized" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSyncIndividual(item.id);
                        }}
                        disabled={isLoading}
                        className="text-xs px-2 py-1 h-auto"
                      >
                        <RefreshCw
                          className={`h-3 w-3 ${
                            isLoading ? "animate-spin" : ""
                          }`}
                        />
                      </Button>
                    )}
                  </div>
                  <StatusBadge
                    status={
                      item.status === "normalized"
                        ? "synced"
                        : item.status === "error"
                        ? "error"
                        : "pending"
                    }
                  >
                    {item.status}
                  </StatusBadge>
                  <Badge variant="outline" className="text-xs">
                    {item.source}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium">Automatic Enrichment Schedule</h5>
              <p className="text-sm text-muted-foreground">
                Hourly synchronization with IT-Pedia for updated lifecycle,
                security and compliance data
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="synced">Next sync in 18 min</StatusBadge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsScheduleDialogOpen(true)}
              >
                Configure Schedule
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Manual Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manual Infrastructure Review</DialogTitle>
          </DialogHeader>

          {selectedInfrastructure && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="original-name">Original Name</Label>
                  <Input
                    id="original-name"
                    value={selectedInfrastructure.originalName}
                    onChange={(e) =>
                      setSelectedInfrastructure({
                        ...selectedInfrastructure,
                        originalName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="normalized-name">Normalized Name</Label>
                  <Input
                    id="normalized-name"
                    value={selectedInfrastructure.normalizedName}
                    onChange={(e) =>
                      setSelectedInfrastructure({
                        ...selectedInfrastructure,
                        normalizedName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="type">Infrastructure Type</Label>
                <Select
                  value={selectedInfrastructure.type}
                  onValueChange={(value) =>
                    setSelectedInfrastructure({
                      ...selectedInfrastructure,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="server">Server</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                    <SelectItem value="virtualization">
                      Virtualization
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ga-date">General Availability</Label>
                  <Input
                    id="ga-date"
                    type="date"
                    value={
                      selectedInfrastructure.lifecycle.generalAvailability || ""
                    }
                    onChange={(e) =>
                      setSelectedInfrastructure({
                        ...selectedInfrastructure,
                        lifecycle: {
                          ...selectedInfrastructure.lifecycle,
                          generalAvailability: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="eos-date">End of Support</Label>
                  <Input
                    id="eos-date"
                    type="date"
                    value={selectedInfrastructure.lifecycle.endOfSupport || ""}
                    onChange={(e) =>
                      setSelectedInfrastructure({
                        ...selectedInfrastructure,
                        lifecycle: {
                          ...selectedInfrastructure.lifecycle,
                          endOfSupport: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="eol-date">End of Life</Label>
                  <Input
                    id="eol-date"
                    type="date"
                    value={selectedInfrastructure.lifecycle.endOfLife || ""}
                    onChange={(e) =>
                      setSelectedInfrastructure({
                        ...selectedInfrastructure,
                        lifecycle: {
                          ...selectedInfrastructure.lifecycle,
                          endOfLife: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="security-status">Security Status</Label>
                  <Select
                    value={selectedInfrastructure.securityStatus}
                    onValueChange={(value) =>
                      setSelectedInfrastructure({
                        ...selectedInfrastructure,
                        securityStatus: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="secure">Secure</SelectItem>
                      <SelectItem value="vulnerable">Vulnerable</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="compliance-status">Compliance Status</Label>
                  <Select
                    value={selectedInfrastructure.complianceStatus}
                    onValueChange={(value) =>
                      setSelectedInfrastructure({
                        ...selectedInfrastructure,
                        complianceStatus: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="non-compliant">
                        Non-Compliant
                      </SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveManualReview} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save & Sync"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full Library Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedInfrastructure
                ? `${selectedInfrastructure.normalizedName} Details`
                : "Infrastructure Library"}
            </DialogTitle>
          </DialogHeader>

          {selectedInfrastructure ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Basic Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Normalized Name:
                      </span>
                      <p className="font-medium">
                        {selectedInfrastructure.normalizedName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Original Name:
                      </span>
                      <p>{selectedInfrastructure.originalName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Type:
                      </span>
                      <Badge variant="secondary" className="ml-2 capitalize">
                        {selectedInfrastructure.type}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Source:
                      </span>
                      <p>{selectedInfrastructure.source}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Status Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Normalization Status:
                      </span>
                      <StatusBadge
                        status={
                          selectedInfrastructure.status === "normalized"
                            ? "synced"
                            : "pending"
                        }
                      >
                        {selectedInfrastructure.status}
                      </StatusBadge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Security:
                      </span>
                      {getSecurityIcon(selectedInfrastructure.securityStatus)}
                      <span className="capitalize">
                        {selectedInfrastructure.securityStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Compliance:
                      </span>
                      <Shield
                        className={`h-4 w-4 ${
                          selectedInfrastructure.complianceStatus ===
                          "compliant"
                            ? "text-success"
                            : selectedInfrastructure.complianceStatus ===
                              "non-compliant"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="capitalize">
                        {selectedInfrastructure.complianceStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Last Updated:
                      </span>
                      <p>
                        {new Date(
                          selectedInfrastructure.lastUpdated
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Lifecycle Information</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-3">
                    <div className="text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-success" />
                      <p className="text-sm text-muted-foreground">
                        General Availability
                      </p>
                      <p className="font-medium">
                        {selectedInfrastructure.lifecycle.generalAvailability
                          ? new Date(
                              selectedInfrastructure.lifecycle.generalAvailability
                            ).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-warning" />
                      <p className="text-sm text-muted-foreground">
                        End of Support
                      </p>
                      <p className="font-medium">
                        {selectedInfrastructure.lifecycle.endOfSupport
                          ? new Date(
                              selectedInfrastructure.lifecycle.endOfSupport
                            ).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-destructive" />
                      <p className="text-sm text-muted-foreground">
                        End of Life
                      </p>
                      <p className="font-medium">
                        {selectedInfrastructure.lifecycle.endOfLife
                          ? new Date(
                              selectedInfrastructure.lifecycle.endOfLife
                            ).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayInfrastructure.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <h5 className="font-semibold text-sm">
                          {item.normalizedName}
                        </h5>
                      </div>
                      <StatusBadge
                        status={
                          item.status === "normalized" ? "synced" : "pending"
                        }
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {item.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Security:</span>
                        <div className="flex items-center gap-1">
                          {getSecurityIcon(item.securityStatus)}
                          <span className="capitalize">
                            {item.securityStatus}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">EOS:</span>
                        <span>
                          {item.lifecycle.endOfSupport
                            ? new Date(
                                item.lifecycle.endOfSupport
                              ).getFullYear()
                            : "Unknown"}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => handleViewItemDetails(item)}
                    >
                      View Details
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Schedule Configuration Dialog */}
      <ScheduleConfigurationDialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
        type="infrastructure"
      />
    </div>
  );
};
