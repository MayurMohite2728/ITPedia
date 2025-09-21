import { useState, useEffect } from "react";
import { NavigationLayout } from "@/components/NavigationLayout";
import { ApplicationCard } from "@/components/ApplicationCard";
import { IntegrationStatus } from "@/components/IntegrationStatus";
import { DataFlowDiagram } from "@/components/DataFlowDiagram";
import { RiskMonitoringPanel } from "@/components/RiskMonitoringPanel";
import { GoldenLibraryPanel } from "@/components/GoldenLibraryPanel";
import { InfrastructureLibraryPanel } from "@/components/InfrastructureLibraryPanel";
import IntegrationConfiguration from "@/components/IntegrationConfiguration";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Database,
  Users,
  Activity,
  Plus,
  Filter,
  Grid,
  List,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import {
  getProductSummaryGoldenLibrary,
  getProductSummaryStatus,
  getProductSummaryRiskCount,
  getlifeCycle,
} from "../services/ServiceAPI";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [viewMode, setViewMode] = useState("grid"); // ✅ removed TS type

  // changes for current value .

  const [libraryList, setLibraryList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [summery, setSummery] = useState("");

  const [riskCount, setRiskCount] = useState("");

  const [lifeCycle, setLifecycle] = useState("");

  useEffect(() => {
    // Fetch the project list when the component mounts
    const goldenLibraryPanelSummery = async () => {
      try {
        // loadingBarRef?.current.continuousStart(); // Start loading bar
        const data = await getProductSummaryGoldenLibrary(); // Call the API to get the project list
        console.log(data);
        setLibraryList(data.data.librarylist);
      } catch (error) {
        setError(error.message); // Handle error if API call fails
      } finally {
        // loadingBarRef?.current.complete(); // Finish loading bar
      }
    };
    goldenLibraryPanelSummery(); // Call the function to fetch data
  }, []);

  useEffect(() => {
    const getProductSummary = async () => {
      try {
        // loadingBarRef?.current.continuousStart();
        const summeryStatus = await getProductSummaryStatus();

        console.log(summeryStatus);

        setSummery(summeryStatus.products);
      } catch (error) {
        setError(error.message);
      } finally {
        // loadingBarRef?.current.complete(); // Finish loading bar
      }
    };

    getProductSummary();
  }, []);

  useEffect(() => {
    const getProductRiskCount = async () => {
      try {
        // loadingBarRef?.current.continuousStart();
        const riskCountData = await getProductSummaryRiskCount();

        console.log(riskCountData);

        setRiskCount(riskCountData.risk);
      } catch (error) {
        setError(error);
      } finally {
        // loadingBarRef?.current.complete(); // Finish loading bar
      }
    };
    getProductRiskCount();
  }, []);
  getlifeCycle;

  useEffect(() => {
    const getLifeCycle = async () => {
      try {
        // loadingBarRef?.current.continuousStart();
        const lifeCycle = await getlifeCycle();

        console.log(lifeCycle);

        setLifecycle(lifeCycle.productLifeCycle.counts);
      } catch (error) {
        setError(error);
      } finally {
        // loadingBarRef?.current.complete(); // Finish loading bar
      }
    };
    getLifeCycle();
  }, []);

  //get total lifecycle count

  const totalLifeCycleCount =
    lifeCycle.endOfSupport + lifeCycle.endOfSale + lifeCycle.startOfLife;

  const displayProducts = libraryList.length > 0 ? libraryList.length : "none";

  console.log(displayProducts);
  const normalizedCount = libraryList.filter(
    (p) => p.status === "normalized"
  ).length;

  const normalizationRate = (normalizedCount / displayProducts) * 100;

  const roundedNormalizationRate =
    normalizationRate !== undefined && displayProducts !== 0
      ? Math.round(normalizationRate * 100) / 100
      : "Loading...";

  // Mock data - would come from your API
  const dashboardStats = [
    {
      label: "Products Normalized",
      value: summery?.normalized || "Not Published", //Count of total product normalized
      change: "",
      icon: CheckCircle,
      trend: "success",
    },
    {
      label: "Active Risk Alerts", //total number risk from json api
      value: "7",
      change: "",
      icon: AlertTriangle,
      trend: "warning",
    },
    {
      label: "Lifecycle Events", //total number of lifecycles api end of support + endOfLife +endOfSale + count value
      value: totalLifeCycleCount ? totalLifeCycleCount : "notPublished",
      change: "",
      icon: TrendingUp,
      trend: "info",
    },
    {
      label: "Golden Library Coverage", //toal product normalized rate value .
      value: roundedNormalizationRate
        ? `${roundedNormalizationRate}%`
        : "Not Published",
      change: "",
      icon: Shield,
      trend: "success",
    },
  ];

  const applications = [
    {
      app_id: 1,
      app_name: "Customer Portal",
      app_type: "Web Application",
      app_url: "https://portal.company.com",
      active: true,
      added_on: "2024-01-15T10:00:00Z",
      added_by: "John Smith",
      componentCount: 25,
      lastSyncDate: "2024-01-20T14:30:00Z",
    },
    {
      app_id: 2,
      app_name: "ERP System",
      app_type: "Enterprise Software",
      active: true,
      added_on: "2024-01-10T09:00:00Z",
      added_by: "Jane Doe",
      componentCount: 156,
      lastSyncDate: "2024-01-20T12:15:00Z",
    },
    {
      app_id: 3,
      app_name: "Legacy CRM",
      app_type: "Desktop Application",
      active: false,
      added_on: "2023-12-20T16:00:00Z",
      added_by: "Mike Wilson",
      componentCount: 43,
      lastSyncDate: "2024-01-18T08:45:00Z",
    },
  ];

  const integrations = [
    {
      name: "Avolution Abacus",
      status: "connected",
      lastSync: "2024-01-20T14:30:00Z",
      url: "https://abacus.avolution.com",
      recordCount: 1247,
      errorMessage: undefined,
    },
    {
      name: "IT-Pedia MyProducts API",
      status: "connected",
      lastSync: "2024-01-20T14:25:00Z",
      recordCount: 987,
      errorMessage: undefined,
    },
    {
      name: "IT-Pedia Event Stream",
      status: "connected",
      lastSync: "2024-01-20T14:30:00Z",
      recordCount: 156,
      errorMessage: undefined,
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          const trendColor =
            stat.trend === "success"
              ? "text-success"
              : stat.trend === "warning"
              ? "text-warning"
              : "text-primary";
          return (
            <Card key={stat.label} className="p-6 bg-gradient-card shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${trendColor}`}>
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    stat.trend === "success"
                      ? "bg-success/10"
                      : stat.trend === "warning"
                      ? "bg-warning/10"
                      : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      stat.trend === "success"
                        ? "text-success"
                        : stat.trend === "warning"
                        ? "text-warning"
                        : "text-primary"
                    }`}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Risk Monitoring */}
      <RiskMonitoringPanel />

      {/* Integration Status */}
      <IntegrationStatus integrations={integrations} />
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "components":
        return <GoldenLibraryPanel />;
      case "infrastructure":
        return <InfrastructureLibraryPanel />;
      case "settings":
        return <IntegrationConfiguration />;
      default:
        return renderDashboard();
    }
  };

  return (
    <NavigationLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderContent()}
    </NavigationLayout>
  );
};

export default Index;
