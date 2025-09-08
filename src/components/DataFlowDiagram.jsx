import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, RefreshCw, AlertTriangle, Shield } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export const DataFlowDiagram = () => {
  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <h3 className="text-lg font-semibold mb-6">Integration Architecture</h3>
      
      <div className="flex items-center justify-between">
        {/* ABACUS */}
        <div className="flex flex-col items-center space-y-3 flex-1">
          <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
            <Database className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h4 className="font-semibold">ABACUS</h4>
            <p className="text-sm text-muted-foreground">Enterprise Architecture</p>
            <Badge variant="outline" className="mt-1">Source Repository</Badge>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex flex-col items-center mx-4">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground mt-1">Raw Product List</span>
        </div>

        {/* Integration Layer */}
        <div className="flex flex-col items-center space-y-3 flex-1">
          <div className="w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <h4 className="font-semibold">Integration Layer</h4>
            <p className="text-sm text-muted-foreground">Normalization Engine</p>
            <StatusBadge status="active">Processing</StatusBadge>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="flex flex-col items-center mx-4">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground mt-1">MyProducts API</span>
        </div>

        {/* IT-Pedia */}
        <div className="flex flex-col items-center space-y-3 flex-1">
          <div className="w-24 h-24 bg-success/10 rounded-lg flex items-center justify-center">
            <Shield className="h-8 w-8 text-success" />
          </div>
          <div className="text-center">
            <h4 className="font-semibold">IT-Pedia</h4>
            <p className="text-sm text-muted-foreground">Technology Catalogue</p>
            <Badge variant="outline" className="mt-1">Golden Library</Badge>
          </div>
        </div>

      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h5 className="font-medium mb-2">Process Flow:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-primary">1. Extract</span>
            <p className="text-muted-foreground">Raw product data from ABACUS application catalogue</p>
          </div>
          <div>
            <span className="font-medium text-success">2. Normalize</span>
            <p className="text-muted-foreground">IT-Pedia standardizes names & provides lifecycle data on schedule</p>
          </div>
        </div>
      </div>
    </Card>
  );
};