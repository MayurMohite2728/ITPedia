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
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import {
  Mail,
  Plus,
  Users,
  Settings,
  UserPlus,
  Trash2,
  Clock,
} from "lucide-react";

export const RecipientsConfigurationDialog = ({
  open,
  onOpenChange,
  type = "general",
}) => {
  const { toast } = useToast();

  const [recipients, setRecipients] = useState([
    {
      id: "1",
      email: "Inthihas.Ananchintavida@mannai.com.qa",
      name: "Security Operations Team",
      role: "Security Team",
      department: "IT Security",
      notificationTypes: [
        "security-alerts",
        "compliance-issues",
        "risk-changes",
      ],
      frequency: "immediate",
      active: true,
    },
    {
      id: "2",
      email: "testUser1@mannai.com.qa",
      name: "testUser1",
      role: "Asset Manager",
      department: "IT Operations",
      notificationTypes: [
        "lifecycle-alerts",
        "sync-status",
        "normalization-issues",
      ],
      frequency: "daily",
      active: true,
    },
    {
      id: "3",
      email: "testUser2@mannai.com.qa",
      name: "testUser2",
      role: "Compliance Officer",
      department: "Risk & Compliance",
      notificationTypes: ["compliance-issues", "audit-reports"],
      frequency: "weekly",
      active: false,
    },
  ]);

  const [newRecipient, setNewRecipient] = useState({
    email: "",
    name: "",
    role: "",
    department: "",
    notificationTypes: [],
    frequency: "daily",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const notificationTypeOptions = [
    { value: "security-alerts", label: "Security Alerts" },
    { value: "lifecycle-alerts", label: "Lifecycle Alerts" },
    { value: "compliance-issues", label: "Compliance Issues" },
    { value: "risk-changes", label: "Risk Changes" },
    { value: "sync-status", label: "Sync Status" },
    { value: "normalization-issues", label: "Normalization Issues" },
    { value: "audit-reports", label: "Audit Reports" },
  ];

  //  reactjs email

  const sendEmail = (recipient) => {
    emailjs
      .send(
        "service_5rqnh6f",
        "template_xzu2qli",
        {
          email: recipient.email,
          name: recipient.name,
          message: `Hello ${recipient.name}, you have been added to the notification list.`,
        },
        "5nZr0ojAs2UHFEggq"
      )
      .then(() => {
        toast({
          title: "Email Sent",
          description: `Notification email sent to ${recipient.email}.`,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Email Failed",
          description: "Could not send the notification email.",
          variant: "destructive",
        });
      });
  };

  const handleAddRecipient = () => {
    if (!newRecipient.email || !newRecipient.name) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and name for the recipient.",
        variant: "destructive",
      });
      return;
    }

    const recipient = {
      id: Date.now().toString(),
      ...newRecipient,
      active: true,
    };

    setRecipients([...recipients, recipient]);
    setNewRecipient({
      email: "",
      name: "",
      role: "",
      department: "",
      notificationTypes: [],
      frequency: "daily",
    });
    setShowAddForm(false);

    toast({
      title: "Recipient Added",
      description: `${recipient.name} has been added to the notification list.`,
    });

    // ✅ Send email automatically
    sendEmail(recipient);
  };

  // const handleAddRecipient = () => {
  //   if (!newRecipient.email || !newRecipient.name) {
  //     toast({
  //       title: "Missing Information",
  //       description: "Please provide both email and name for the recipient.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   const recipient = {
  //     id: Date.now().toString(),
  //     ...newRecipient,
  //     active: true,
  //   };

  //   setRecipients([...recipients, recipient]);
  //   setNewRecipient({
  //     email: "",
  //     name: "",
  //     role: "",
  //     department: "",
  //     notificationTypes: [],
  //     frequency: "daily",
  //   });
  //   setShowAddForm(false);

  //   toast({
  //     title: "Recipient Added",
  //     description: `${recipient.name} has been added to the notification list.`,
  //   });
  // };

  const handleRemoveRecipient = (id) => {
    setRecipients(recipients.filter((r) => r.id !== id));
    toast({
      title: "Recipient Removed",
      description: "Recipient has been removed from notifications.",
    });
  };

  const handleToggleRecipient = (id) => {
    setRecipients(
      recipients.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleSave = () => {
    toast({
      title: "Recipients Updated",
      description: `Notification recipients have been configured successfully.`,
    });
    onOpenChange(false);
  };

  const getNotificationTypeLabel = (type) => {
    return (
      notificationTypeOptions.find((opt) => opt.value === type)?.label || type
    );
  };

  const activeRecipients = recipients.filter((r) => r.active);
  const totalNotifications = recipients.reduce(
    (sum, r) => sum + r.notificationTypes.length,
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Configure Notification Recipients
            {type !== "general" && (
              <Badge variant="secondary" className="ml-2">
                {type === "risk" ? "Risk Monitoring" : "Schedule Notifications"}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Recipients
                  </p>
                  <p className="text-2xl font-bold">
                    {activeRecipients.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Recipients
                  </p>
                  <p className="text-2xl font-bold">{recipients.length}</p>
                </div>
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Notification Types
                  </p>
                  <p className="text-2xl font-bold">
                    {notificationTypeOptions.length}
                  </p>
                </div>
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </Card>
          </div>

          {/* Add New Recipient */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Recipients Management</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Recipient
              </Button>
            </div>

            {showAddForm && (
              <div className="space-y-4 p-4 border rounded-lg bg-accent/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      placeholder="recipient@company.com"
                      value={newRecipient.email}
                      onChange={(e) =>
                        setNewRecipient({
                          ...newRecipient,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      placeholder="John Smith"
                      value={newRecipient.name}
                      onChange={(e) =>
                        setNewRecipient({
                          ...newRecipient,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input
                      placeholder="Security Manager"
                      value={newRecipient.role}
                      onChange={(e) =>
                        setNewRecipient({
                          ...newRecipient,
                          role: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input
                      placeholder="IT Security"
                      value={newRecipient.department}
                      onChange={(e) =>
                        setNewRecipient({
                          ...newRecipient,
                          department: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Notification Frequency</Label>
                  <Select
                    value={newRecipient.frequency}
                    onValueChange={(value) =>
                      setNewRecipient({ ...newRecipient, frequency: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Notification Types</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {notificationTypeOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={newRecipient.notificationTypes.includes(
                            option.value
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRecipient({
                                ...newRecipient,
                                notificationTypes: [
                                  ...newRecipient.notificationTypes,
                                  option.value,
                                ],
                              });
                            } else {
                              setNewRecipient({
                                ...newRecipient,
                                notificationTypes:
                                  newRecipient.notificationTypes.filter(
                                    (t) => t !== option.value
                                  ),
                              });
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label className="text-sm">{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button onClick={handleAddRecipient}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Recipient
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Recipients List */}
          <div className="space-y-4">
            <h4 className="font-medium">Current Recipients</h4>
            {recipients.map((recipient) => (
              <Card
                key={recipient.id}
                className={`p-4 ${!recipient.active ? "opacity-50" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Switch
                        checked={recipient.active}
                        onCheckedChange={() =>
                          handleToggleRecipient(recipient.id)
                        }
                      />
                      <div>
                        <h5 className="font-medium">{recipient.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {recipient.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Role & Department
                        </p>
                        <span className="text-sm">
                          {recipient.role || "Not specified"}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {recipient.department || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Frequency
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm capitalize">
                            {recipient.frequency}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Notification Types
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {recipient.notificationTypes
                            .slice(0, 2)
                            .map((type) => (
                              <Badge
                                key={type}
                                variant="secondary"
                                className="text-xs"
                              >
                                {getNotificationTypeLabel(type)}
                              </Badge>
                            ))}
                          {recipient.notificationTypes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{recipient.notificationTypes.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveRecipient(recipient.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Global Notification Settings */}
          <Card className="p-4">
            <h4 className="font-medium mb-4">Global Notification Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Master switch for all email notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Include System Status</Label>
                  <p className="text-xs text-muted-foreground">
                    Add system health info to notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Quiet Hours</Label>
                  <p className="text-xs text-muted-foreground">
                    Suppress non-critical notifications during off-hours
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{activeRecipients.length} active recipients</span>
            <span>•</span>
            <span>{totalNotifications} total subscriptions</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="outline">Test Notifications</Button>
            <Button onClick={handleSave}>Save Recipients</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
