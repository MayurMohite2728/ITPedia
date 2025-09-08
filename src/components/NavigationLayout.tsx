import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  Search,
  Bell,
  RefreshCw,
  Database,ChevronDown,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";

import './NavigationLayout.css';
interface NavigationLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export const NavigationLayout = ({ children, currentPage = "dashboard", onPageChange }: NavigationLayoutProps) => {
  const [searchValue, setSearchValue] = useState("");

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "components", label: "Application Golden Library", icon: Database },
    { id: "infrastructure", label: "Infrastructure", icon: Server },
    { id: "settings", label: "Integration Config", icon: Settings },
  ];
 const handleLogout = () => {
    console.log("User signed out");
  };
 return (
   <div className="min-h-screen">
  {/* Header */}
  <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-card shadow-sm z-50">
  <div className="flex h-16 items-center justify-between px-6">
    {/* Left side: Logo + Search */}
    <div className="flex items-center gap-4">
      <img
        src="/logomannai.png"
        alt="Logo"
        className="header-logo"
        style={{ width: "215px" }}
      />
      <div className="h-6 w-px bg-border" />
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search applications, components..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 w-80"
        />
      </div>
    </div>

    {/* Right side: Buttons + Welcome */}
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Sync All
      </Button>
      <Button variant="ghost" size="sm">
        <Bell className="h-4 w-4" />
      </Button>

      {/* User avatar + name + down arrow */}
          <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100 transition">
            <img
             src="https://www.kindpng.com/picc/m/649-6490120_user-picture-in-circle-png-png-download-circle.png"
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">Username</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
    </div>
  </div>
</header>

  {/* Sidebar */}
  <aside className="w-64 border-r border-border bg-card fixed top-16 bottom-0 overflow-y-auto">
    <nav className="p-4 space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Button
  key={item.id}
  variant={currentPage === item.id ? "default" : "ghost"}
  className={cn(
    "w-full justify-start text-white",
    currentPage === item.id 
      ? "bg-blue-500 text-white" 
      : "hover:bg-blue-300 focus:bg-blue-500 focus:text-white"
  )}
  onClick={() => onPageChange?.(item.id)}
>
  <Icon className="h-4 w-4 mr-2" />
  {item.label}
</Button>

        );
      })}
    </nav>
  </aside>

  {/* Main Content */}
  <main className="ml-64 mt-16 p-6">
    {children}
  </main>
</div>

  );
};