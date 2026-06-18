import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Bell,
  Lightbulb,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import { BloomLogo } from "@/components/ui/Logo";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV = [
  {
    path: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
  },
  {
    path: "/products",
    icon: <Package className="w-5 h-5" />,
    label: "Products",
  },
  {
    path: "/alerts",
    icon: <Bell className="w-5 h-5" />,
    label: "Restock Alerts",
  },
  {
    path: "/recommendations",
    icon: <Lightbulb className="w-5 h-5" />,
    label: "Recommendations",
  },
  {
    path: "/budget",
    icon: <ShoppingCart className="w-5 h-5" />,
    label: "Budget Planner",
  },
  {
    path: "/settings",
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
  },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-100">
        <BloomLogo size={28} />
      </div>

      {/* User pill */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-3">
          <div
            className="w-9 h-9 rounded-xl bg-[#1f514c] flex items-center justify-center
            text-white text-sm font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? "V"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {user?.storeName ?? "My Store"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.name ?? "Vendor"}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {NAV.map((n) => {
          const active = location.pathname === n.path;
          return (
            <button
              key={n.path}
              onClick={() => {
                navigate(n.path);
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[#1f514c] text-white shadow-md shadow-green-600/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
              )}>
              <span className={active ? "text-white" : "text-slate-400"}>
                {n.icon}
              </span>
              {n.label}
              {active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-6 pt-2 border-t border-slate-100 mt-2 space-y-1">
        <button
          onClick={() => {
            navigate("/admin");
            setOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
            text-slate-400 hover:bg-slate-50 hover:text-[#1f514c] transition-all">
          <ShieldCheck className="w-5 h-5" /> Admin Panel
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
            text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut className="w-5 h-5" /> Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-100 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100">
          <BloomLogo size={26} />
          <button
            onClick={() => setOpen(true)}
            className="text-slate-500 hover:text-slate-800">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
