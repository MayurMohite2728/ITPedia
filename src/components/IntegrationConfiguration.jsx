// // import React, { useState } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Badge } from "@/components/ui/badge";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import {
// //   Settings,
// //   Database,
// //   CheckCircle,
// //   AlertCircle,
// //   TestTube,
// //   Key,
// //   Globe,
// //   Shield,
// // } from "lucide-react";
// // import { useToast } from "@/hooks/use-toast";
// // import "./NavigationLayout.css";

// // const IntegrationConfiguration = () => {
// //   const { toast } = useToast();

// //   const [configs, setConfigs] = useState([
// //     {
// //       id: "abacus",
// //       name: "Mannai Abacus",
// //       type: "ea-tool",
// //       url: "https://mannai.avolutionsoftware.com/api/",
// //       authType: "api-key",
// //       apiKey: "••••••••••••••••",
// //       status: "connected",
// //       lastTested: "2024-01-20T14:30:00Z",
// //     },
// //     {
// //       id: "itpedia",
// //       name: "IT-Pedia MyProducts",
// //       type: "provider",
// //       url: "https://api.itpedia.com/v1",
// //       authType: "api-key",
// //       apiKey: "••••••••••••••••",
// //       status: "connected",
// //       lastTested: "2024-01-20T14:25:00Z",
// //     },
// //   ]);

// //   const [editingConfig, setEditingConfig] = useState(null);
// //   const [isTestingConnection, setIsTestingConnection] = useState(null);

// //   const eaTools = [
// //     { value: "abacus", label: "Avolution Abacus" },
//  { value: "CSV", label: "Comma Seperated Values" },
//     { value: "cmbd", label: "CMBD" },
// //     { value: "alfabet", label: "Software AG Alfabet" }, ----- remove
// //     { value: "archimate", label: "BiZZdesign Enterprise Studio" }, ----remove
// //     { value: "mega", label: "MEGA HOPEX" }, remove

// //     { value: "siem", label: "SIEM" },
// //     { value: "techlib", label: "Technology Library" },
// //     { value: "datatools", label: "Data Classification tools" },
// //     { value: "sparx", label: "Sparx Enterprise Architect" },   ---remove
// //     { value: "excel", label: "Microsoft Excel" },
// //
// //     { value: "JSON", label: "JSON File" },
// //     { value: "XML", label: "XML" },
// //   ];

// //   const providers = [
// //     { value: "itpedia", label: "IT-Pedia MyProducts" },
// //     { value: "ManageEngine", label: "ManageEngine AssetExplorer" },
// //     { value: "servicenow", label: "ServiceNow IT Operations Management" },
// //     {
// //       value: "SolarWinds",
// //       label: "SolarWinds Service Desk (IT Asset Management)",
// //     },
// //     { value: "ITFLOW", label: "ITFLOW" },
// //   ];

// //   const handleSaveConfig = (config) => {
// //     setConfigs((prev) => {
// //       const existing = prev.find((c) => c.id === config.id);
// //       if (existing) {
// //         return prev.map((c) => (c.id === config.id ? config : c));
// //       } else {
// //         return [...prev, config];
// //       }
// //     });
// //     setEditingConfig(null);
// //     toast({
// //       title: "Configuration Saved",
// //       description: `${config.name} integration has been configured successfully.`,
// //     });
// //   };

// //   const handleTestConnection = async (configId) => {
// //     setIsTestingConnection(configId);
// //     await new Promise((resolve) => setTimeout(resolve, 2000));
// //     setConfigs((prev) =>
// //       prev.map((c) =>
// //         c.id === configId
// //           ? { ...c, status: "connected", lastTested: new Date().toISOString() }
// //           : c
// //       )
// //     );
// //     setIsTestingConnection(null);
// //     toast({
// //       title: "Connection Test Successful",
// //       description: "Integration is working correctly.",
// //     });
// //   };

//     const handleCsvUpload = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const text = e.target?.result;
//       const lines = text.split("\n").filter((line) => line.trim());
//       const headers = lines[0].split(",").map((h) => h.trim());
//       const data = lines.slice(1).map((line) => {
//         const values = line.split(",").map((v) => v.trim());
//         const row = {};
//         headers.forEach((header, index) => {
//           row[header] = values[index] || "";
//         });
//         return row;
//       });
//       setCsvPreview(data.slice(0, 5)); // Show first 5 rows as preview
//       setEditingConfig((prev) =>
//         prev
//           ? {
//               ...prev,
//               csvFile: file,
//               csvData: data,
//               status: "connected",
//             }
//           : null
//       );
//     };
//     reader.readAsText(file);
//   };

// //   const renderConfigForm = (config, isNew = false) => {
// //     // Choose list based on type
// //     const options = config.type === "ea-tool" ? eaTools : providers;

// //     return (
// //       <Card>
// //         <CardHeader>
// //           <CardTitle className="flex items-center gap-2">
// //             <Settings className="h-5 w-5" />
// //             {isNew ? "Add New Integration" : `Configure ${config.name}`}
// //           </CardTitle>
// //           <CardDescription>
// //             Set up authentication and connection details
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           {isNew && (
// //             <div className="space-y-2">
// //               <Label htmlFor="tool-select">Select Tool/Provider</Label>
// //               <Select
// //                 value={config.name}
// //                 onValueChange={(value) => {
// //                   const selected = options.find((t) => t.value === value);
// //                   if (selected) {
// //                     setEditingConfig({
// //                       ...config,
// //                       id: value,
// //                       name: selected.label,
// //                     });
// //                   }
// //                 }}
// //               >
//  // merge both lists
//                      onValueChange={(value) => {

//   const tool = [...eaTools, ...providers].find((t) => t.value === value);

//   if (tool) {
//     setEditingConfig({
//       ...config,
//       id: value,
//       name: tool.label,
//       type:
//         value === "csv-upload"
//           ? "csv-upload"
//           : eaTools.some((t) => t.value === value)
//           ? "ea-tool"
//           : "provider",
//       authType: value === "csv-upload" ? "csv-file" : "api-key",
//     });
//   }
// }}
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Choose integration..." />
// //                 </SelectTrigger>
// //                 <SelectContent className="bg-white text-gray-900">
// //                   {options.map((opt) => (
// //                     <SelectItem key={opt.value} value={opt.value}>
// //                       {opt.label}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           )}

// //           <div className="space-y-2">
// //             <Label htmlFor="url">API URL</Label>
// //             <div className="relative">
// //               <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //               <Input
// //                 id="url"
// //                 placeholder="https://api.example.com"
// //                 value={config.url}
// //                 onChange={(e) =>
// //                   setEditingConfig((prev) =>
// //                     prev ? { ...prev, url: e.target.value } : null
// //                   )
// //                 }
// //                 className="pl-10"
// //               />
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="auth-type">Authentication Type</Label>
// //             <Select
// //               value={config.authType}
// //               onValueChange={(value) =>
// //                 setEditingConfig((prev) =>
// //                   prev ? { ...prev, authType: value } : null
// //                 )
// //               }
// //             >
// //               <SelectTrigger>
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="api-key">API Key</SelectItem>
// //                 <SelectItem value="basic">Basic Authentication</SelectItem>
// //                 <SelectItem value="oauth">OAuth 2.0</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           {config.authType === "api-key" && (
// //             <div className="space-y-2">
// //               <Label htmlFor="api-key">API Key</Label>
// //               <div className="relative">
// //                 <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                 <Input
// //                   id="api-key"
// //                   type="password"
// //                   placeholder="Enter API key..."
// //                   value={config.apiKey || ""}
// //                   onChange={(e) =>
// //                     setEditingConfig((prev) =>
// //                       prev ? { ...prev, apiKey: e.target.value } : null
// //                     )
// //                   }
// //                   className="pl-10"
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           {config.authType === "basic" && (
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="username">Username</Label>
// //                 <Input
// //                   id="username"
// //                   value={config.username || ""}
// //                   onChange={(e) =>
// //                     setEditingConfig((prev) =>
// //                       prev ? { ...prev, username: e.target.value } : null
// //                     )
// //                   }
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="password">Password</Label>
// //                 <Input
// //                   id="password"
// //                   type="password"
// //                   value={config.password || ""}
// //                   onChange={(e) =>
// //                     setEditingConfig((prev) =>
// //                       prev ? { ...prev, password: e.target.value } : null
// //                     )
// //                   }
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           <div className="flex gap-2 pt-4">
// //             <Button
// //               onClick={() => editingConfig && handleSaveConfig(editingConfig)}
// //             >
// //               Save Configuration
// //             </Button>
// //             <Button variant="outline" onClick={() => setEditingConfig(null)}>
// //               Cancel
// //             </Button>
// //             {!isNew && (
// //               <Button
// //                 variant="outline"
// //                 onClick={() => handleTestConnection(config.id)}
// //                 disabled={isTestingConnection === config.id}
// //               >
// //                 <TestTube className="h-4 w-4 mr-2" />
// //                 {isTestingConnection === config.id
// //                   ? "Testing..."
// //                   : "Test Connection"}
// //               </Button>
// //             )}
// //           </div>
// //         </CardContent>
// //       </Card>
// //     );
// //   };

// //   const renderIntegrationList = (type) => {
// //     const filteredConfigs = configs.filter((c) => c.type === type);

// //     return (
// //       <div className="space-y-4">
// //         {filteredConfigs.map((config) => (
// //           <Card key={config.id}>
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-4">
// //                   <div
// //                     className={`h-10 w-10 rounded-lg flex items-center justify-center ${
// //                       type === "ea-tool" ? "bg-primary/10" : "bg-success/10"
// //                     }`}
// //                   >
// //                     {type === "ea-tool" ? (
// //                       <Database
// //                         className={`h-5 w-5 ${
// //                           type === "ea-tool" ? "text-primary" : "text-success"
// //                         }`}
// //                       />
// //                     ) : (
// //                       <Shield className="h-5 w-5 text-success" />
// //                     )}
// //                   </div>
// //                   <div>
// //                     <h4 className="font-semibold">{config.name}</h4>
// //                     <p className="text-sm text-muted-foreground">
// //                       {config.url}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <Badge
// //                     variant={
// //                       config.status === "connected"
// //                         ? "default"
// //                         : config.status === "error"
// //                         ? "destructive"
// //                         : "secondary"
// //                     }
// //                   >
// //                     {config.status === "connected" && (
// //                       <CheckCircle className="h-3 w-3 mr-1" />
// //                     )}
// //                     {config.status === "error" && (
// //                       <AlertCircle className="h-3 w-3 mr-1" />
// //                     )}
// //                     {config.status}
// //                   </Badge>
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => setEditingConfig(config)}
// //                   >
// //                     Configure
// //                   </Button>
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => handleTestConnection(config.id)}
// //                     disabled={isTestingConnection === config.id}
// //                   >
// //                     <TestTube className="h-4 w-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //               {config.lastTested && (
// //                 <p className="text-xs text-muted-foreground mt-2">
// //                   Last tested: {new Date().toLocaleString()}
// //                   {/* {new Date(config.lastTested).toLocaleString()}  */}
// //                 </p>
// //               )}
// //             </CardContent>
// //           </Card>
// //         ))}

// //         <Button
// //           variant="outline"
// //           onClick={() =>
// //             setEditingConfig({
// //               id: "",
// //               name: "",
// //               type,
// //               url: "",
// //               authType: "api-key",
// //               status: "disconnected",
// //             })
// //           }
// //           className="w-full"
// //         >
// //           <Settings className="h-4 w-4 mr-2" />
// //           Add New {type === "ea-tool" ? "EA Tool" : "Provider"}
// //         </Button>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h2 className="text-2xl font-bold text-foreground">
// //           Integration Configuration
// //         </h2>
// //         <p className="text-muted-foreground">
// //           Configure connections to EA tools and normalization providers
// //         </p>
// //       </div>

// //       {editingConfig ? (
// //         renderConfigForm(editingConfig, !editingConfig.id)
// //       ) : (
// //         <Tabs defaultValue="ea-tools" className="space-y-6">
// //           <TabsList className="grid w-full grid-cols-2">
// //             <TabsTrigger value="ea-tools">EA Tools</TabsTrigger>
// //             <TabsTrigger value="providers">Normalization Providers</TabsTrigger>
// //           </TabsList>

// //           <TabsContent value="ea-tools" className="space-y-4">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Database className="h-5 w-5" />
// //                   Enterprise Architecture Tools
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Configure connections to your EA repositories (Abacus,
// //                   Alfabet, etc.)
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>{renderIntegrationList("ea-tool")}</CardContent>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="providers" className="space-y-4">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Shield className="h-5 w-5" />
// //                   Normalization Providers
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Configure connections to data normalization and enrichment
// //                   services
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>{renderIntegrationList("provider")}</CardContent>
// //             </Card>
// //           </TabsContent>
// //         </Tabs>
// //       )}
// //     </div>
// //   );
// // };

// // export default IntegrationConfiguration;

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Upload,
  FileText,
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
  const [csvPreview, setCsvPreview] = useState([]);

  // const eaTools = [
  //   { value: "csv-upload", label: "CSV File Upload" },
  //   { value: "abacus", label: "Avolution Abacus" },
  //   { value: "alfabet", label: "Software AG Alfabet" },
  //   { value: "archimate", label: "BiZZdesign Enterprise Studio" },
  //   { value: "mega", label: "MEGA HOPEX" },
  //   { value: "sparx", label: "Sparx Enterprise Architect" },
  // ];

  const eaTools = [
    { value: "csv-upload", label: "CSV File Upload" },
    { value: "abacus", label: "Avolution Abacus" },
    { value: "CSV", label: "Comma Seperated Values" },
    { value: "cmbd", label: "CMBD" },

    { value: "siem", label: "SIEM" },
    { value: "techlib", label: "Technology Library" },
    { value: "datatools", label: "Data Classification tools" },

    { value: "excel", label: "Microsoft Excel" },

    { value: "JSON", label: "JSON File" },
    { value: "XML", label: "XML" },
  ];

  // const providers = [
  //   { value: "itpedia", label: "IT-Pedia MyProducts" },
  //   { value: "flexera", label: "Flexera Software Vulnerability Manager" },
  //   { value: "servicenow", label: "ServiceNow IT Operations Management" },
  // ];

  const providers = [
    { value: "itpedia", label: "IT-Pedia MyProducts" },
    { value: "ManageEngine", label: "ManageEngine AssetExplorer" },
    { value: "servicenow", label: "ServiceNow IT Operations Management" },
    {
      value: "SolarWinds",
      label: "SolarWinds Service Desk (IT Asset Management)",
    },
    { value: "ITFLOW", label: "ITFLOW" },
  ];

  // Save or add integration
  const handleSaveConfig = (config) => {
    setConfigs((prev) => {
      const exists = prev.find((c) => c.id === config.id);
      if (exists) {
        // Update existing config
        return prev.map((c) => (c.id === config.id ? config : c));
      } else {
        // Add new config without replacing existing
        return [...prev, config];
      }
    });
    setEditingConfig(null);
    toast({
      title: "Configuration Saved",
      description: `${config.name} integration has been configured successfully.`,
    });
  };

  // Test connection simulation
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

  // Handle CSV upload
  // const handleCsvUpload = (file) => {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const text = e.target.result;
  //     const lines = text.split("\n").filter((line) => line.trim());
  //     const headers = lines[0].split(",").map((h) => h.trim());
  //     const data = lines.slice(1).map((line) => {
  //       const values = line.split(",").map((v) => v.trim());
  //       const row = {};
  //       headers.forEach((header, index) => {
  //         row[header] = values[index] || "";
  //       });
  //       return row;
  //     });
  //     setCsvPreview(data.slice(0, 5));
  //     setEditingConfig((prev) =>
  //       prev
  //         ? {
  //             ...prev,
  //             csvFile: file,
  //             csvData: data,
  //             status: "connected",
  //           }
  //         : null
  //     );

  //   };

  //   reader.readAsText(file);
  // };

  const handleCsvUpload = async (file) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim());
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim());
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });
        return row;
      });

      // Show preview
      setCsvPreview(data.slice(0, 5));

      // Update config state
      setEditingConfig((prev) =>
        prev
          ? {
              ...prev,
              csvFile: file,
              csvData: data,
              status: "uploading",
            }
          : null
      );

      //  Send the data to your backend
      try {
        const response = await fetch("/api/import/csv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, data }),
        });

        if (!response.ok) throw new Error("Upload failed");

        toast({
          title: "CSV Imported Successfully",
          description: `${file.name} has been uploaded and processed.`,
        });

        setEditingConfig((prev) =>
          prev ? { ...prev, status: "connected" } : null
        );
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "Could not send CSV data to the API.",
          variant: "destructive",
        });
        setEditingConfig((prev) =>
          prev ? { ...prev, status: "error" } : null
        );
      }
    };

    reader.readAsText(file);
  };

  // Form for adding/editing integration
  const renderConfigForm = (config, isNew = false) => (
    <Card>
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
        {/* Select Tool/Provider */}
        {isNew && (
          <div className="space-y-2">
            <Label htmlFor="tool-select">Select Tool/Provider</Label>
            <Select
              value={config.id}
              onValueChange={(value) => {
                let tool;
                if (config.type === "ea-tool")
                  tool = eaTools.find((t) => t.value === value);
                else if (config.type === "provider")
                  tool = providers.find((t) => t.value === value);
                if (tool) {
                  setEditingConfig({
                    ...config,
                    id: `${value}-${Date.now()}`, // unique ID
                    name: tool.label,
                    type: config.type,
                    authType: value === "csv-upload" ? "csv-file" : "api-key",
                  });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose integration..." />
              </SelectTrigger>
              <SelectContent>
                {(config.type === "ea-tool" ? eaTools : providers).map(
                  (item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* CSV Upload */}
        {config.id.includes("csv-upload") && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleCsvUpload(file);
                }}
                className="w-full"
              />
              {config.csvFile && (
                <p className="text-sm text-muted-foreground">
                  Uploaded: {config.csvFile.name} (
                  {Math.round(config.csvFile.size / 1024)} KB)
                </p>
              )}
            </div>

            {csvPreview.length > 0 && (
              <div className="space-y-2">
                <Label>Data Preview (First 5 rows)</Label>
                <div className="border rounded-md p-4 bg-muted/50 max-h-60 overflow-auto">
                  <div className="grid gap-2 text-sm font-mono">
                    {csvPreview.map((row, index) => (
                      <div key={index} className="grid gap-1">
                        <div className="font-semibold text-xs text-muted-foreground">
                          Row {index + 1}:
                        </div>
                        <div className="pl-2">
                          {Object.entries(row).map(([key, value]) => (
                            <div key={key} className="flex gap-2">
                              <span className="font-medium min-w-24">
                                {key}:
                              </span>
                              <span className="text-muted-foreground">
                                {String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Total rows: {config.csvData?.length || 0}
                </p>
              </div>
            )}
          </div>
        )}

        {/* API URL & Auth */}
        {!config.id.includes("csv-upload") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">API URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="url"
                  placeholder="https://api.example.com"
                  value={config.url}
                  onChange={(e) =>
                    setEditingConfig((prev) =>
                      prev ? { ...prev, url: e.target.value } : null
                    )
                  }
                  className="pl-10 w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-type">Authentication Type</Label>
              <Select
                value={config.authType}
                onValueChange={(value) =>
                  setEditingConfig((prev) =>
                    prev ? { ...prev, authType: value } : null
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api-key">API Key</SelectItem>
                  <SelectItem value="basic">Basic Authentication</SelectItem>
                  <SelectItem value="oauth">OAuth 2.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {config.authType === "api-key" && (
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter API key..."
                    value={config.apiKey || ""}
                    onChange={(e) =>
                      setEditingConfig((prev) =>
                        prev ? { ...prev, apiKey: e.target.value } : null
                      )
                    }
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            )}

            {config.authType === "basic" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={config.username || ""}
                    onChange={(e) =>
                      setEditingConfig((prev) =>
                        prev ? { ...prev, username: e.target.value } : null
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={config.password || ""}
                    onChange={(e) =>
                      setEditingConfig((prev) =>
                        prev ? { ...prev, password: e.target.value } : null
                      )
                    }
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <Button onClick={() => handleSaveConfig(config)}>
            Save Configuration
          </Button>
          <Button variant="outline" onClick={() => setEditingConfig(null)}>
            Cancel
          </Button>
          {!isNew && !config.id.includes("csv-upload") && (
            <Button
              variant="outline"
              onClick={() => handleTestConnection(config.id)}
              disabled={isTestingConnection === config.id}
            >
              <TestTube className="h-4 w-4 mr-2" />
              {isTestingConnection === config.id
                ? "Testing..."
                : "Test Connection"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Render list of integrations
  const renderIntegrationList = (type) => {
    const filteredConfigs = configs.filter((c) => c.type === type);
    return (
      <div className="space-y-4">
        {filteredConfigs.map((config) => (
          <Card key={config.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      config.id.includes("csv-upload")
                        ? "bg-blue-500/10"
                        : type === "ea-tool"
                        ? "bg-primary/10"
                        : "bg-success/10"
                    }`}
                  >
                    {config.id.includes("csv-upload") ? (
                      <FileText className="h-5 w-5 text-blue-500" />
                    ) : type === "ea-tool" ? (
                      <Database className="h-5 w-5 text-primary" />
                    ) : (
                      <Shield className="h-5 w-5 text-success" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{config.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {config.id.includes("csv-upload")
                        ? `${config.csvData?.length || 0} rows loaded`
                        : config.url}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      config.status === "connected"
                        ? "default"
                        : config.status === "error"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {config.status === "connected" && (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    )}
                    {config.status === "error" && (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {config.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingConfig(config)}
                  >
                    Configure
                  </Button>
                  {!config.id.includes("csv-upload") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(config.id)}
                      disabled={isTestingConnection === config.id}
                    >
                      <TestTube className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {config.lastTested && (
                <p className="text-xs text-muted-foreground mt-2">
                  Last tested: {new Date(config.lastTested).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add new integration button */}
        <Button
          variant="outline"
          onClick={() =>
            setEditingConfig({
              id: "",
              name: "",
              type,
              url: "",
              authType: "api-key",
              status: "disconnected",
            })
          }
          className="w-full"
        >
          <Settings className="h-4 w-4 mr-2" />
          Add New {type === "ea-tool" ? "EA Tool" : "Provider"}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Integration Configuration
        </h2>
        <p className="text-muted-foreground">
          Configure connections to EA tools and normalization providers
        </p>
      </div>

      {editingConfig ? (
        renderConfigForm(editingConfig, !editingConfig.id)
      ) : (
        <Tabs defaultValue="ea-tools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ea-tools">EA Tools</TabsTrigger>
            <TabsTrigger value="providers">Normalization Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="ea-tools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Enterprise Architecture Tools
                </CardTitle>
                <CardDescription>
                  Configure connections to your EA repositories (Abacus,
                  Alfabet, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent>{renderIntegrationList("ea-tool")}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Normalization Providers
                </CardTitle>
                <CardDescription>
                  Configure connections to data normalization and enrichment
                  services
                </CardDescription>
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
