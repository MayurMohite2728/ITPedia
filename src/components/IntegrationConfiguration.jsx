import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Database,
  CheckCircle,
  AlertCircle,
  TestTube,
  Key,
  Globe,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IntegrationConfiguration = () => {
  const { toast } = useToast();
  const [configs, setConfigs] = useState([
    {
      id: "abacus",
      name: "Avolution Abacus",
      type: "ea-tool",
      url: "https://abacus.avolution.com/api",
      authType: "api-key",
      apiKey: "••••••••••••••••",
      status: "connected",
      lastTested: "2024-01-20T14:30:00Z",
    },
    {
      id: "itpedia",
      name: "IT-Pedia MyProducts",
      type: "provider",
      url: "https://api.itpedia.com/v1",
      authType: "api-key",
      apiKey: "••••••••••••••••",
      status: "connected",
      lastTested: "2024-01-20T14:25:00Z",
    },
  ]);

  const [editingConfig, setEditingConfig] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(null);

  const eaTools = [
    { value: "abacus", label: "Avolution Abacus" },
    { value: "alfabet", label: "Software AG Alfabet" },
    { value: "archimate", label: "BiZZdesign Enterprise Studio" },
    { value: "mega", label: "MEGA HOPEX" },
    { value: "cmbd", label: "CMBD" },
    { value: "siem", label: "SIEM" },
    { value: "techlib", label: "Technology Library " },
    { value: "datatools", label: "Data Classification tools " },
    { value: "sparx", label: "Sparx Enterprise Architect" },
  ];

  const providers = [
    { value: "itpedia", label: "IT-Pedia MyProducts" },
    { value: "flexera", label: "Flexera Software Vulnerability Manager" },
    { value: "servicenow", label: "ServiceNow IT Operations Management" },
  ];

  const handleSaveConfig = (config) => {
    setConfigs((prev) => {
      const existing = prev.find((c) => c.id === config.id);
      if (existing) {
        return prev.map((c) => (c.id === config.id ? config : c));
      } else {
        return [...prev, config];
      }
    });
    setEditingConfig(null);
    toast({
      title: "Configuration Saved",
      description: `${config.name} integration has been configured successfully.`,
    });
  };

  const handleTestConnection = async (configId) => {
    setIsTestingConnection(configId);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConfigs((prev) =>
      prev.map((c) =>
        c.id === configId
          ? { ...c, status: "connected", lastTested: new Date().toISOString() }
          : c
      )
    );
    setIsTestingConnection(null);
    toast({
      title: "Connection Test Successful",
      description: "Integration is working correctly.",
    });
  };

  const renderConfigForm = (config, isNew = false) => (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {isNew ? "Add New Integration" : `Configure ${config.name}`}
        </CardTitle>
        <CardDescription>
          Set up authentication and connection details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API URL */}
        <div className="space-y-2">
          <Label htmlFor="url">API URL</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="url"
              placeholder="https://api.example.com"
              value={config.url}
              onChange={(e) =>
                setEditingConfig((prev) =>
                  prev ? { ...prev, url: e.target.value } : null
                )
              }
              className="pl-10"
            />
          </div>
        </div>

        {/* Save + Cancel */}
        <div className="flex gap-2 pt-4">
          <Button onClick={() => config && handleSaveConfig(config)}>
            Save Configuration
          </Button>
          <Button variant="outline" onClick={() => setEditingConfig(null)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderIntegrationList = (type) => {
    const filteredConfigs = configs.filter((c) => c.type === type);
    return (
      <div className="space-y-4">
        {filteredConfigs.map((config) => (
          <Card key={config.id} className="bg-white shadow-md rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      type === "ea-tool" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    {type === "ea-tool" ? (
                      <Database className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Shield className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{config.name}</h4>
                    <p className="text-sm text-gray-500">{config.url}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integration Configuration</h2>
        <p className="text-gray-600">
          Configure connections to EA tools and normalization providers
        </p>
      </div>

      {editingConfig ? (
        renderConfigForm(editingConfig, !editingConfig.id)
      ) : (
        <Tabs defaultValue="ea-tools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="ea-tools"
              className="data-[state=active]:bg-white"
            >
              EA Tools
            </TabsTrigger>
            <TabsTrigger
              value="providers"
              className="data-[state=active]:bg-white"
            >
              Normalization Providers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ea-tools" className="space-y-4">
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Enterprise Architecture Tools
                </CardTitle>
              </CardHeader>
              <CardContent>{renderIntegrationList("ea-tool")}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-4">
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Normalization Providers
                </CardTitle>
              </CardHeader>
              <CardContent>{renderIntegrationList("provider")}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default IntegrationConfiguration;
