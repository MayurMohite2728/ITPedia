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
  Bell,
} from "lucide-react";

export const RiskMonitoringPanel = ({ alerts = [] }) => {
  // const mockAlerts = [
  //   {
  //     id: "1",
  //     type: "vulnerability",
  //     severity: "critical",
  //     title: "Apache Log4j Critical Vulnerability",
  //     description: "CVE-2021-44228 affects multiple applications in your portfolio",
  //     affectedAssets: 12,
  //     stakeholders: ["security-team@company.com", "app-owners@company.com"],
  //     source: "IT-Pedia Security Feed",
  //     timestamp: "2024-01-20T14:30:00Z",
  //     status: "new",
  //   },
  //   {
  //     id: "2",
  //     type: "lifecycle",
  //     severity: "high",
  //     title: "Windows Server 2012 End of Support",
  //     description: "End of support date approaching in 6 months",
  //     affectedAssets: 8,
  //     stakeholders: ["infrastructure@company.com"],
  //     source: "IT-Pedia Lifecycle Updates",
  //     timestamp: "2024-01-20T10:15:00Z",
  //     status: "acknowledged",
  //   },
  //   {
  //     id: "3",
  //     type: "compliance",
  //     severity: "medium",
  //     title: "Oracle Database License Review Required",
  //     description: "License compliance check needed for production instances",
  //     affectedAssets: 5,
  //     stakeholders: ["compliance@company.com", "dba-team@company.com"],
  //     source: "IT-Pedia Compliance Monitor",
  //     timestamp: "2024-01-20T08:45:00Z",
  //     status: "in-progress",
  //   },
  // ];

  const mockAlerts = {
    "@odata.context":
      "https://itpedia.eracent.com/API/v1/$metadata#MyProductsVulnerabilities",
    Total: 7,
    value: [
      {
        productId: 1555627,
        productName: "resteasy-jaxrs",
        Component_ID: 46,
        Source: "ITPedia",
        dataSourceType: "OpenSource",
        cveName: "CVE-2016-6346",
        cvsS2_Score: 5.0,
        cvsS2_ScoreStatus: "Medium",
        publishedDateTime: "2016-09-07T18:59:03Z",
        lastModifiedDateTime: "2025-04-12T10:46:41Z",
        cveSummary:
          "RESTEasy enables GZIPInterceptor, which allows remote attackers to cause a denial of service via unspecified vectors.",
        cvsS2_Vector: "AV:N/AC:L/Au:N/C:N/I:N/A:P",
        cvsS2_AccessVector: "Network exploitable",
        cvsS2_AccessComplexity: "Low",
        cvsS2_Authentication: "Not required to exploit",
        cvsS2_ConfidentialityImpact:
          "No impact to the confidentiality of the system",
        cvsS2_IntegrityImpact: "No impact to the integrity of the system",
        cvsS2_AvailabilityImpact:
          "Reduced performance in resource availability",
        cvsS3_Score: 7.5,
        cvsS3_ScoreStatus: "High",
        cvsS3_Vector: "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
        cvsS3_AttackVector: "Network ",
        cvsS3_AttackComplexity: "Low",
        cvsS3_PrivilegesRequired: "None",
        cvsS3_UserInteraction: "None",
        cvsS3_Scope: "Unchanged",
        cvsS3_ConfidentialityImpact: "None",
        cvsS3_IntegrityImpact: "None",
        cvsS3_AvailabilityImpact: "High",
        hasVulnerabilities: true,
        type: "compliance",
      },
      {
        productId: 1555625,
        productName: "keycloak-core",
        Component_ID: 48,
        Source: "ITPedia",
        cvE_ID: 20168609,
        dataSourceType: "OpenSource",
        cveName: "CVE-2016-8609",
        cvsS2_Score: 5.8,
        cvsS2_ScoreStatus: "Medium",
        publishedDateTime: "2018-08-01T17:29:00Z",
        lastModifiedDateTime: "2024-11-21T02:59:40Z",
        cveSummary:
          "It was found that the keycloak before 2.3.0 did not implement authentication flow correctly. An attacker could use this flaw to construct a phishing URL, from which he could hijack the user's session. This could lead to information disclosure, or permit further possible attacks.",
        cvsS2_Vector: "AV:N/AC:M/Au:N/C:P/I:P/A:N",
        cvsS2_AccessVector: "Network exploitable",
        cvsS2_AccessComplexity: "Medium",
        cvsS2_Authentication: "Not required to exploit",
        cvsS2_ConfidentialityImpact: "Considerable informational disclosure",
        cvsS2_IntegrityImpact: "Modification of some system files",
        cvsS2_AvailabilityImpact: "No impact to the availability of the system",
        cvsS3_Score: 8.1,
        cvsS3_ScoreStatus: "High",
        cvsS3_Vector: "CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N",
        cvsS3_AttackVector: "Network ",
        cvsS3_AttackComplexity: "Low",
        cvsS3_PrivilegesRequired: "None",
        cvsS3_UserInteraction: "Required",
        cvsS3_Scope: "Unchanged",
        cvsS3_ConfidentialityImpact: "High",
        cvsS3_IntegrityImpact: "High",
        cvsS3_AvailabilityImpact: "None",
        hasVulnerabilities: true,
        type: "lifecycle",
      },
      {
        productId: 1555625,
        productName: "keycloak-core",
        Component_ID: 48,
        Source: "ITPedia",
        cvE_ID: 20168629,
        dataSourceType: "OpenSource",
        cveName: "CVE-2016-8629",
        cvsS2_Score: 5.5,
        cvsS2_ScoreStatus: "Medium",
        publishedDateTime: "2018-03-12T15:29:00Z",
        lastModifiedDateTime: "2024-11-21T02:59:43Z",
        cveSummary:
          "Red Hat Keycloak before version 2.4.0 did not correctly check permissions when handling service account user deletion requests sent to the rest server. An attacker with service account authentication could use this flaw to bypass normal permissions and delete users in a separate realm.",
        cvsS2_Vector: "AV:N/AC:L/Au:S/C:N/I:P/A:P",
        cvsS2_AccessVector: "Network exploitable",
        cvsS2_AccessComplexity: "Low",
        cvsS2_Authentication: "Required to exploit",
        cvsS2_ConfidentialityImpact:
          "No impact to the confidentiality of the system",
        cvsS2_IntegrityImpact: "Modification of some system files",
        cvsS2_AvailabilityImpact:
          "Reduced performance in resource availability",
        cvsS3_Score: 6.5,
        cvsS3_ScoreStatus: "Medium",
        cvsS3_Vector: "CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N",
        cvsS3_AttackVector: "Network ",
        cvsS3_AttackComplexity: "Low",
        cvsS3_PrivilegesRequired: "Low",
        cvsS3_UserInteraction: "None",
        cvsS3_Scope: "Unchanged",
        cvsS3_ConfidentialityImpact: "None",
        cvsS3_IntegrityImpact: "High",
        cvsS3_AvailabilityImpact: "None",
        hasVulnerabilities: true,
        type: "vulnerability",
      },

      {
        productId: 1555625,
        productName: "keycloak-core",
        Component_ID: 48,
        Source: "ITPedia",
        cvE_ID: 202120262,
        dataSourceType: "OpenSource",
        cveName: "CVE-2021-20262",
        cvsS2_Score: 4.6,
        cvsS2_ScoreStatus: "Medium",
        publishedDateTime: "2021-03-09T18:15:15Z",
        lastModifiedDateTime: "2024-11-21T05:46:14Z",
        cveSummary:
          "A flaw was found in Keycloak 12.0.0 where re-authentication does not occur while updating the password. This flaw allows an attacker to take over an account if they can obtain temporary, physical access to a user’s browser. The highest threat from this vulnerability is to confidentiality, integrity, as well as system availability.",
        cvsS2_Vector: "AV:L/AC:L/Au:N/C:P/I:P/A:P",
        cvsS2_AccessVector: "Locally exploitable",
        cvsS2_AccessComplexity: "Low",
        cvsS2_Authentication: "Not required to exploit",
        cvsS2_ConfidentialityImpact: "Considerable informational disclosure",
        cvsS2_IntegrityImpact: "Modification of some system files",
        cvsS2_AvailabilityImpact:
          "Reduced performance in resource availability",
        cvsS3_Score: 6.8,
        cvsS3_ScoreStatus: "Medium",
        cvsS3_Vector: "CVSS:3.1/AV:P/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        cvsS3_AttackVector: "Physical",
        cvsS3_AttackComplexity: "Low",
        cvsS3_PrivilegesRequired: "None",
        cvsS3_UserInteraction: "None",
        cvsS3_Scope: "Unchanged",
        cvsS3_ConfidentialityImpact: "High",
        cvsS3_IntegrityImpact: "High",
        cvsS3_AvailabilityImpact: "High",
        hasVulnerabilities: true,
        type: "vulnerability",
      },
      {
        productId: 1555628,
        productName: "spring-beans",
        Component_ID: 45,
        Source: "ITPedia",
        cvE_ID: 202222965,
        dataSourceType: "OpenSource",
        cveName: "CVE-2022-22965",
        cvsS2_Score: 7.5,
        cvsS2_ScoreStatus: "High",
        publishedDateTime: "2022-04-01T23:15:14Z",
        lastModifiedDateTime: "2025-04-10T16:56:46Z",
        cveSummary:
          "A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.",
        cvsS2_Vector: "AV:N/AC:L/Au:N/C:P/I:P/A:P",
        cvsS2_AccessVector: "Network exploitable",
        cvsS2_AccessComplexity: "Low",
        cvsS2_Authentication: "Not required to exploit",
        cvsS2_ConfidentialityImpact: "Considerable informational disclosure",
        cvsS2_IntegrityImpact: "Modification of some system files",
        cvsS2_AvailabilityImpact:
          "Reduced performance in resource availability",
        cvsS3_Score: 9.8,
        cvsS3_ScoreStatus: "Critical",
        cvsS3_Vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        cvsS3_AttackVector: "Network ",
        cvsS3_AttackComplexity: "Low",
        cvsS3_PrivilegesRequired: "None",
        cvsS3_UserInteraction: "None",
        cvsS3_Scope: "Unchanged",
        cvsS3_ConfidentialityImpact: "High",
        cvsS3_IntegrityImpact: "High",
        cvsS3_AvailabilityImpact: "High",
        hasVulnerabilities: true,
        type: "vulnerability",
      },
      {
        productId: 1555628,
        productName: "spring-beans",
        Component_ID: 45,
        Source: "ITPedia",
        cvE_ID: 202222970,
        dataSourceType: "OpenSource",
        cveName: "CVE-2022-22970",
        cvsS2_Score: 3.5,
        cvsS2_ScoreStatus: "Low",
        publishedDateTime: "2022-05-12T20:15:15Z",
        lastModifiedDateTime: "2024-11-21T06:47:43Z",
        cveSummary:
          "In spring framework versions prior to 5.3.20+ , 5.2.22+ and old unsupported versions, applications that handle file uploads are vulnerable to DoS attack if they rely on data binding to set a MultipartFile or javax.servlet.Part to a field in a model object.",
        cvsS2_Vector: "AV:N/AC:M/Au:S/C:N/I:N/A:P",
        cvsS2_AccessVector: "Network exploitable",
        cvsS2_AccessComplexity: "Medium",
        cvsS2_Authentication: "Required to exploit",
        cvsS2_ConfidentialityImpact:
          "No impact to the confidentiality of the system",
        cvsS2_IntegrityImpact: "No impact to the integrity of the system",
        cvsS2_AvailabilityImpact:
          "Reduced performance in resource availability",
        cvsS3_Score: 5.3,
        cvsS3_ScoreStatus: "Medium",
        cvsS3_Vector: "CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:H",
        cvsS3_AttackVector: "Network ",
        cvsS3_AttackComplexity: "High",
        cvsS3_PrivilegesRequired: "Low",
        cvsS3_UserInteraction: "None",
        cvsS3_Scope: "Unchanged",
        cvsS3_ConfidentialityImpact: "None",
        cvsS3_IntegrityImpact: "None",
        cvsS3_AvailabilityImpact: "High",
        hasVulnerabilities: true,
        type: "vulnerability",
      },
      {
        productId: 1555626,
        productName: "spring-xml",
        cvE_ID: 20193773,
        Component_ID: 47,
        Source: "ITPedia",
        dataSourceType: "OpenSource",
        cveName: "CVE-2019-3773",
        cvsS2_Score: 7.5,
        cvsS2_ScoreStatus: "High",
        publishedDateTime: "2019-01-18T22:29:01Z",
        lastModifiedDateTime: "2024-11-21T04:42:30Z",
        cveSummary:
          "Spring Web Services, versions 2.4.3, 3.0.4, and older unsupported versions of all three projects, were susceptible to XML External Entity Injection (XXE) when receiving XML data from untrusted sources.",
        cvsS2_Vector: "AV:N/AC:L/Au:N/C:P/I:P/A:P",
        cvsS2_AccessVector: "Network exploitable",
        cvsS2_AccessComplexity: "Low",
        cvsS2_Authentication: "Not required to exploit",
        cvsS2_ConfidentialityImpact: "Considerable informational disclosure",
        cvsS2_IntegrityImpact: "Modification of some system files",
        cvsS2_AvailabilityImpact:
          "Reduced performance in resource availability",
        cvsS3_Score: 9.8,
        cvsS3_ScoreStatus: "Critical",
        cvsS3_Vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        cvsS3_AttackVector: "Network ",
        cvsS3_AttackComplexity: "Low",
        cvsS3_PrivilegesRequired: "None",
        cvsS3_UserInteraction: "None",
        cvsS3_Scope: "Unchanged",
        cvsS3_ConfidentialityImpact: "High",
        cvsS3_IntegrityImpact: "High",
        cvsS3_AvailabilityImpact: "High",
        hasVulnerabilities: true,
        type: "vulnerability",
      },
    ],
  };

  // const getAlertIcon = (type) => {
  //   switch (type) {
  //     case "vulnerability":
  //       return <Shield className="h-4 w-4" />;
  //     case "lifecycle":
  //       return <Clock className="h-4 w-4" />;
  //     case "compliance":
  //       return <AlertTriangle className="h-4 w-4" />;
  //     default:
  //       return <Bell className="h-4 w-4" />;
  //   }
  // };

  const getAlertIcon = (type, colorClass = "text-primary") => {
    switch (type) {
      case "vulnerability":
        return <Shield className={`h-4 w-4 ${colorClass}`} />;
      // // case "lifecycle":
      //   return <Clock className={`h-4 w-4 ${colorClass}`} />;
      // case "compliance":
      //   return <AlertTriangle className={`h-4 w-4 ${colorClass}`} />;
      default:
        return <Shield className={`h-4 w-4 ${colorClass}`} />;
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

  const handleNotifyClick = (csv) => {
    window.location.href = `mailto:abc@company.com?subject=Report&body=Please%20refer%20this%20link:%20:%20https://nvd.nist.gov/vuln/detail/${csv}`;
  };
  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts.value;

  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold">Risk Monitoring</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">
            {displayAlerts.filter((a) => a.status === "new").length} New
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* risk monotoring  */}

      <div className="space-y-4">
        {displayAlerts.map((alert) => (
          <div
            key={alert.productId}
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* <div
                  className={`p-2 rounded-md ${getSeverityColor(
                    alert.cvsS3_ScoreStatus
                  )}`}
                >
                  {getAlertIcon(alert.type)}
                </div>  */}

                <div
                  className={`p-2 rounded-md border ${getSeverityColor(
                    alert.cvsS2_ScoreStatus
                  )}`}
                >
                  {getAlertIcon(alert.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{alert.productName}</h4>
                    {/* <Badge
                      variant="outline"
                      className={getSeverityColor(alert.vsS2_ScoreStatus)}
                    >
                      {alert.cvsS2_ScoreStatus}
                    </Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>{alert.cveName}</strong> {alert.cveSummary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {alert.affectedAssets} assets affected
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {/* {alert.stakeholders.length} stakeholders notified */}
                    </span>
                    <span>
                      {new Date(alert.lastModifiedDateTime).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              {/* <StatusBadge
                status={
                  alert.status === "new"
                    ? "error"
                    : alert.status === "resolved"
                    ? "synced"
                    : "pending"
                }
              >
                {alert.status}
              </StatusBadge> */}
              <Badge
                variant="outline"
                className={getSeverityColor(alert.vsS2_ScoreStatus)}
              >
                {alert.cvsS2_ScoreStatus}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Source:</span>
                <Badge variant="outline" className="text-xs">
                  {alert.dataSourceType}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleNotifyClick(alert.cveName);
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Notify Stakeholders
                  </Button>
                </>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    alert.cveName &&
                    window.open(
                      `https://nvd.nist.gov/vuln/detail/${alert.cveName}`,
                      "_blank"
                    )
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="space-y-4">
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
      </div> */}

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Scheduled Notifications Active</h5>
            <p className="text-sm text-muted-foreground">
              Security Operations and asset owners receive periodic updates via
              email
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
