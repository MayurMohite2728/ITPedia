import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Progress } from "@/components/ui/progress";
import LoadingBar from "react-top-loading-bar";
import { NavigationLayout } from "./NavigationLayout";
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
import {
  getProductSummaryGoldenLibrary,
  getProductSummaryStatus,
  getProductSummaryRiskCount,
} from "../services/ServiceAPI";

import {
  Database,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  Calendar,
  Shield,
  Edit3,
} from "lucide-react";

export const GoldenLibraryPanel = (searchValue, setSearchValue) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncingAll, setIsSyncingAll, getProductSummaryRisk] =
    useState(false);
  const { toast } = useToast();

  const mockProducts = [
    {
      id: "1",
      originalName: "Apache Tomcat v9.0",
      normalizedName: "Apache Tomcat 9.0.x",
      source: "ABACUS Application Catalogue",
      status: "normalized",
      lifecycle: {
        generalAvailability: "2018-09-01",
        endOfSupport: "2027-12-31",
        endOfLife: "2030-12-31",
      },
      securityStatus: "vulnerable",
      lastUpdated: "2024-01-20T14:30:00Z",
    },
    {
      id: "2",
      originalName: "Microsoft SQL Server 2019",
      normalizedName: "Microsoft SQL Server 2019",
      source: "ABACUS Application Catalogue",
      status: "normalized",
      lifecycle: {
        generalAvailability: "2019-11-04",
        endOfSupport: "2030-01-08",
        endOfLife: "2030-01-08",
      },
      securityStatus: "secure",
      lastUpdated: "2024-01-20T12:15:00Z",
    },
    {
      id: "3",
      originalName: "Oracle DB 19c Enterprise",
      normalizedName: "Oracle Database 19c",
      source: "ABACUS Application Catalogue",
      status: "manual-review",
      lifecycle: {
        generalAvailability: "2019-02-01",
        endOfSupport: "2027-04-30",
        endOfLife: "2027-04-30",
      },
      securityStatus: "unknown",
      lastUpdated: "2024-01-20T10:45:00Z",
    },
  ];

  const [libraryList, setLibraryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [summery, setSummery] = useState("");

  const [riskCount, setRiskCount] = useState("");

  const loadingBarRef = useRef(null);

  useEffect(() => {
    // Fetch the project list when the component mounts
    const goldenLibraryPanelSummery = async () => {
      try {
        loadingBarRef?.current.continuousStart(); // Start loading bar
        const data = await getProductSummaryGoldenLibrary(); // Call the API to get the project list
        console.log(data);
        setLibraryList(data.data.librarylist);
      } catch (error) {
        setError(error.message); // Handle error if API call fails
      } finally {
        loadingBarRef?.current.complete(); // Finish loading bar
      }
    };
    goldenLibraryPanelSummery(); // Call the function to fetch data
  }, []);

  useEffect(() => {
    const getProductSummary = async () => {
      try {
        loadingBarRef?.current.continuousStart();
        const summeryStatus = await getProductSummaryStatus();

        console.log(summeryStatus);

        setSummery(summeryStatus.products);
      } catch (error) {
        setError(error.message);
      } finally {
        loadingBarRef?.current.complete(); // Finish loading bar
      }
    };

    getProductSummary();
  }, []);

  useEffect(() => {
    const getProductRiskCount = async () => {
      try {
        loadingBarRef?.current.continuousStart();
        const riskCountData = await getProductSummaryRiskCount();

        console.log(riskCountData);

        setRiskCount(riskCountData.risk);
      } catch (error) {
        setError(error);
      } finally {
        loadingBarRef?.current.complete(); // Finish loading bar
      }
    };
    getProductRiskCount();
  }, []);

  const displayProducts = libraryList.length > 0 ? libraryList.length : "none";

  const displayProductsapi =
    libraryList.length > 0 ? libraryList : libraryList.length;

  const normalizedCount = libraryList.filter(
    (p) => p.status === "normalized"
  ).length;

  const normalizationRate = (normalizedCount / displayProducts) * 100;

  const roundedNormalizationRate =
    normalizationRate !== undefined && displayProducts !== 0
      ? Math.round(normalizationRate * 100) / 100
      : "Loading...";

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

  const handleManualReview = (product) => {
    setSelectedProduct(product);
    setIsReviewDialogOpen(true);
  };

  const handleViewDetails = () => {
    setIsDetailsDialogOpen(true);
  };

  const handleViewProductDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsDialogOpen(true);
  };

  const handleSyncAll = async () => {
    setIsSyncingAll(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Sync Complete",
        description: "All products have been synchronized with IT-Pedia.",
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

  //   const handleSyncAll = async () => {
  //   setIsSyncingAll(true);
  //   try {
  //     // Call your API instead of just waiting
  //     const result = await syncAllProduct();

  //     toast({
  //       title: "Sync Complete",
  //       description: result?.message || "All products have been synchronized with IT-Pedia.",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Sync Failed",
  //       description: "Failed to synchronize with IT-Pedia. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSyncingAll(false);
  //   }
  // };

  const handleSaveManualReview = async () => {
    if (!selectedProduct) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Product Updated",
        description: `${selectedProduct.normalizedName} has been updated and synced with IT-Pedia.`,
      });
      setIsReviewDialogOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncIndividual = async (productId) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Product Synced",
        description: "Product has been synchronized with IT-Pedia.",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <LoadingBar color="#f11946" ref={loadingBarRef} />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Normalization Rate
              </p>
              <p className="text-2xl font-bold">
                {/* {summery ? `${summery.normalized} %` : "Loading..."} */}
                {`${roundedNormalizationRate}%`}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-success" />
          </div>
          <Progress value={normalizationRate} className="mt-2" />
        </Card>

        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{summery.total}</p>
            </div>
            <Database className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Risks</p>
              <p className="text-2xl font-bold text-destructive">
                {/* {libraryList?.filter((p) => p.status === "vulnerable").length} */}
                {riskCount && riskCount.total}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </Card>
      </div>

      {/* Product Normalization Table */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">
              Application Golden Library
            </h3>
            <p className="text-sm text-muted-foreground">
              Standardized product names and lifecycle data from IT-Pedia
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
      </Card>

      {/* display product from api  */}
      <div className="space-y-3">
        {libraryList.map((product, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => handleViewProductDetails(product)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(product.status)}
                  <div>
                    <h4 className="font-semibold">
                      {product.libproductname || "Unnamed Product"}
                    </h4>
                    {product.libproductorigname &&
                      product.libproductorigname !== product.libproductname && (
                        <p className="text-sm text-muted-foreground">
                          Originally: "{product.libproductorigname}"
                        </p>
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Lifecycle Status
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">
                        EOS:{" "}
                        {product.lifecycleinfo.endOfSupport !==
                          "Not Applicable" &&
                        product.lifecycleinfo.endOfSupport !==
                          "Not Yet Announced" &&
                        product.lifecycleinfo.endOfSupport !== "Not Published"
                          ? new Date(
                              product.lifecycleinfo.endOfSupport
                            ).toLocaleDateString()
                          : "Not Published"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Security Status
                    </p>
                    <div className="flex items-center gap-2">
                      {getSecurityIcon(product.isVulnerable)}
                      <span className="text-sm capitalize">
                        {product.isVulnerable ? "vulnerable" : "secure"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Last Updated
                    </p>
                    <span className="text-sm">
                      {new Date(product.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {product.status === "unrecognized" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManualReview(product);
                      }}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Manual Review
                    </Button>
                  )}
                  {product.status !== "normalized" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSyncIndividual(product.id);
                      }}
                      disabled={isLoading}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      <RefreshCw
                        className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`}
                      />
                    </Button>
                  )}
                </div>
                <StatusBadge
                  status={
                    product.status === "normalized"
                      ? "synced"
                      : product.status === "error"
                      ? "error"
                      : "pending"
                  }
                >
                  {product.status}
                </StatusBadge>
                {/* <Badge variant="outline" className="text-xs">
                  {product.source || "Unknown"}
                </Badge> */}
                <Badge variant="outline" className="text-xs">
                  ABACUS Application Catalogue
                </Badge>
              </div>
            </div>
          </div>
        ))}
        {error && <div className="text-red-500">Error: {error}</div>}
      </div>

      {/* <div className="space-y-3">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => handleViewProductDetails(product)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(product.status)}
                  <div>
                    <h4 className="font-semibold">{product.normalizedName}</h4>
                    {product.originalName !== product.normalizedName && (
                      <p className="text-sm text-muted-foreground">
                        Originally: "{product.originalName}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Lifecycle Status
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">
                        EOS:{" "}
                        {product.lifecycle.endOfSupport
                          ? new Date(
                              product.lifecycle.endOfSupport
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
                      {getSecurityIcon(product.securityStatus)}
                      <span className="text-sm capitalize">
                        {product.securityStatus}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Last Updated
                    </p>
                    <span className="text-sm">
                      {new Date(product.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {product.status === "manual-review" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManualReview(product);
                      }}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Manual Review
                    </Button>
                  )}
                  {product.status !== "normalized" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSyncIndividual(product.id);
                      }}
                      disabled={isLoading}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      <RefreshCw
                        className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`}
                      />
                    </Button>
                  )}
                </div>
                <StatusBadge
                  status={
                    product.status === "normalized"
                      ? "synced"
                      : product.status === "error"
                      ? "error"
                      : "pending"
                  }
                >
                  {product.status}
                </StatusBadge>
                <Badge variant="outline" className="text-xs">
                  {product.source}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Automatic Enrichment Schedule */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Automatic Enrichment Schedule</h5>
            <p className="text-sm text-muted-foreground">
              Hourly synchronization with IT-Pedia for updated lifecycle and
              security data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="synced">Next sync in 23 min</StatusBadge>
            <Button variant="outline" size="sm">
              Configure Schedule
            </Button>
          </div>
        </div>
      </div>

      {/* Manual Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manual Product Review</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              {/* Original & Normalized Names */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="original-name">Original Name</Label>
                  <Input
                    id="original-name"
                    value={selectedProduct.libproductorigname || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        libproductorigname: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="normalized-name">Normalized Name</Label>
                  <Input
                    id="normalized-name"
                    value={selectedProduct.libproductname || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        libproductname: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Lifecycle Dates for availability */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ga-date">Version</Label>
                  <Input
                    id="ga-date"
                    type="input"
                    value={selectedProduct.lifecycleinfo.releaseDate || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        lifecycleinfo: {
                          ...selectedProduct.lifecycleinfo,
                          releaseDate: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="eos-date">Type</Label>
                  <Input
                    id="eos-date"
                    type="input"
                    value={selectedProduct.lifecycleinfo.endOfSupport || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        lifecycleinfo: {
                          ...selectedProduct.lifecycleinfo,
                          endOfSupport: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="eol-date">Manufacturer name</Label>
                  <Input
                    id="eol-date"
                    type="input"
                    value={selectedProduct.lifecycleinfo.endOfLife || ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        lifecycleinfo: {
                          ...selectedProduct.lifecycleinfo,
                          endOfLife: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* Security Status */}
              <div>
                <Label htmlFor="security-status">Security Status</Label>
                <Select
                  value={selectedProduct.isVulnerable ? "vulnerable" : "secure"}
                  onValueChange={(value) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      isVulnerable: value === "vulnerable",
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
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving & Syncing...
                </>
              ) : (
                "Save & Sync with IT-Pedia"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Details Dialog */}

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct
                ? `${
                    selectedProduct.libproductname ||
                    selectedProduct.libproductorigname
                  } Details`
                : "Golden Technology Library"}
            </DialogTitle>
          </DialogHeader>

          {selectedProduct ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Original Name
                  </Label>
                  <p className="text-lg font-semibold">
                    {selectedProduct.libproductorigname}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Normalized Name
                  </Label>
                  <p className="text-lg font-semibold">
                    {selectedProduct.libproductname || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Release Date
                  </Label>
                  <p className="font-medium">
                    {selectedProduct.lifecycleinfo.releaseDate &&
                    selectedProduct.lifecycleinfo.releaseDate !==
                      "Not Applicable"
                      ? new Date(
                          selectedProduct.lifecycleinfo.releaseDate
                        ).toLocaleDateString()
                      : "Not Published"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    End of Support
                  </Label>
                  <p className="font-medium">
                    {selectedProduct.lifecycleinfo.endOfSupport &&
                    selectedProduct.lifecycleinfo.endOfSupport !==
                      "Not Applicable"
                      ? new Date(
                          selectedProduct.lifecycleinfo.endOfSupport
                        ).toLocaleDateString()
                      : "Not Published"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    End of Life
                  </Label>
                  <p className="font-medium">
                    {selectedProduct.lifecycleinfo.endOfLife &&
                    selectedProduct.lifecycleinfo.endOfLife !== "Not Applicable"
                      ? new Date(
                          selectedProduct.lifecycleinfo.endOfLife
                        ).toLocaleDateString()
                      : "Not Published"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Security Status
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getSecurityIcon(
                      selectedProduct.isVulnerable ? "vulnerable" : "secure"
                    )}
                    <span className="font-medium capitalize">
                      {selectedProduct.isVulnerable ? "vulnerable" : "secure"}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Normalization Status
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedProduct.status)}
                    <span className="font-medium capitalize">
                      {selectedProduct.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Source
                  </Label>
                  <Badge variant="outline" className="mt-1">
                    Golden Library
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </Label>
                <p className="font-medium">
                  {new Date(selectedProduct.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {libraryList.length} products from your technology
                  library
                </p>
                <Button
                  size="sm"
                  onClick={handleSyncAll}
                  disabled={isSyncingAll}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${
                      isSyncingAll ? "animate-spin" : ""
                    }`}
                  />
                  Sync All
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {libraryList.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleViewProductDetails(product)}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(product.status)}
                      <div>
                        <p className="font-medium">
                          {product.libproductname || "Not Available"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.libproductorigname !==
                            product.libproductname &&
                            `Originally: "${product.libproductorigname}"`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSecurityIcon(
                        product.isVulnerable ? "vulnerable" : "secure"
                      )}
                      <StatusBadge
                        status={
                          product.status === "normalized"
                            ? "synced"
                            : product.status === "manual-review"
                            ? "pending"
                            : "error"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDetailsDialogOpen(false);
                setSelectedProduct(null);
              }}
            >
              Close
            </Button>
            {selectedProduct && selectedProduct.status === "unrecognized" && (
              <Button
                onClick={() => {
                  setIsDetailsDialogOpen(false);
                  handleManualReview(selectedProduct);
                }}
              >
                Edit Product
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
