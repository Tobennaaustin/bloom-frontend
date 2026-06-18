import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  BarChart3,
  Download,
  Trash2,
  Search,
  RefreshCw,
  ShieldCheck,
  X,
  ChevronLeft,
  Database,
  AlertTriangle,
  Store,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  StatCard,
} from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import { BloomLogo } from "@/components/ui/Logo";
import { adminApi } from "@/lib/api";
import { AdminVendor } from "@/types";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-slate-100 animate-pulse rounded-xl ${className}`} />
  );
}

const STORE_TYPE_LABELS: Record<string, string> = {
  provision: "Provision",
  food: "Food Vendor",
  drinks: "Drinks",
  stationery: "Stationery",
  toiletries: "Toiletries",
  mixed: "Mixed",
};

const STORE_TYPE_COLORS: Record<
  string,
  "green" | "blue" | "yellow" | "slate" | "red"
> = {
  provision: "green",
  food: "yellow",
  drinks: "blue",
  stationery: "slate",
  toiletries: "red",
  mixed: "green",
};

// ── Login gate ─────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!key.trim()) {
      setError("Enter the admin key");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await adminApi.health(key);
      onLogin(key);
    } catch {
      setError("Invalid admin key. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <BloomLogo size={32} />
      </div>
      <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Admin Access</h2>
            <p className="text-xs text-slate-500">Bloom control panel</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Admin Key
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none
              focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
            placeholder="Enter admin key..."
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <Button
          className="w-full"
          onClick={handleLogin}
          loading={loading}>
          Access Admin Panel
        </Button>
        <button
          onClick={() => navigate("/")}
          className="w-full text-xs text-slate-400 hover:text-slate-600 text-center transition-colors">
          ← Back to site
        </button>
      </div>
    </div>
  );
}

// ── Vendor detail modal ────────────────────────────────────────────────────────
function VendorModal({
  vendor,
  onClose,
  onDelete,
  adminKey,
}: {
  vendor: AdminVendor;
  onClose: () => void;
  onDelete: (id: string) => void;
  adminKey: string;
}) {
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    setDeleting(true);
    try {
      await adminApi.deleteVendor(adminKey, vendor.id);
      onDelete(vendor.id);
      onClose();
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {vendor.storeName}
            </h3>
            <p className="text-sm text-slate-500">
              {vendor.name} · {vendor.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Store Type",
              value: STORE_TYPE_LABELS[vendor.storeType] || vendor.storeType,
            },
            { label: "Restock Time", value: vendor.restockTime || "—" },
            { label: "Location", value: vendor.location || "—" },
            {
              label: "Joined",
              value: vendor.createdAt
                ? new Date(vendor.createdAt).toLocaleDateString()
                : "—",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-1">{r.label}</p>
              <p className="text-sm font-semibold text-slate-800">{r.value}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Products ({vendor.products?.length || 0})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {vendor.products?.length > 0 ? (
              vendor.products.map((p, i) => (
                <span
                  key={i}
                  className="bg-green-50 text-green-700 border border-green-200
                    text-xs font-medium px-2.5 py-1 rounded-full">
                  {p}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400">No products listed</p>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={deleting}
            className="gap-2">
            <Trash2 className="w-4 h-4" />
            {confirm ? "Confirm Delete" : "Delete Vendor"}
          </Button>
          {confirm && (
            <p className="text-xs text-red-500 mt-2">
              Click again to confirm. This action cannot be undone.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(
    sessionStorage.getItem("bloom_admin_key"),
  );
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [vendors, setVendors] = useState<AdminVendor[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [selected, setSelected] = useState<AdminVendor | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "vendors">(
    "overview",
  );
  const navigate = useNavigate();

  const handleLogin = (key: string) => {
    sessionStorage.setItem("bloom_admin_key", key);
    setAdminKey(key);
  };

  const loadStats = () => {
    if (!adminKey) return;
    setStatsLoading(true);
    adminApi
      .getStats(adminKey)
      .then((r) => setStats(r.data))
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  };

  const loadVendors = () => {
    if (!adminKey) return;
    setLoading(true);
    adminApi
      .getVendors(adminKey, { page, search, storeType: filterType })
      .then((r) => {
        setVendors(r.data.vendors ?? []);
        setTotal(r.data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (adminKey) {
      loadStats();
      loadVendors();
    }
  }, [adminKey, page, filterType]);

  useEffect(() => {
    if (!adminKey) return;
    const t = setTimeout(() => loadVendors(), 350);
    return () => clearTimeout(t);
  }, [search]);

  const handleDelete = (id: string) => {
    setVendors((v) => v.filter((x) => x.id !== id));
    setTotal((t) => t - 1);
    if (stats) {
      setStats((s) => ({
        ...s!,
        totalVendors: (s!.totalVendors as number) - 1,
      }));
    }
  };

  if (!adminKey) return <AdminLogin onLogin={handleLogin} />;

  const storeTypes = stats?.storeTypes as Record<string, number> | undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BloomLogo size={28} />
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-slate-700">
                Admin Panel
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to site
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("bloom_admin_key");
                setAdminKey(null);
              }}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Tab nav */}
        <div className="flex gap-1 bg-white border border-slate-100 rounded-2xl p-1 w-fit shadow-sm">
          {(
            [
              {
                id: "overview",
                label: "Overview",
                icon: <BarChart3 className="w-4 h-4" />,
              },
              {
                id: "vendors",
                label: "Vendors",
                icon: <Users className="w-4 h-4" />,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ──────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {statsLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-28"
                  />
                ))}
              </div>
            ) : (
              stats && (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                      label="Total Vendors"
                      value={stats.totalVendors as number}
                      sub={`${stats.recentRegistrations ?? 0} this week`}
                      trend="up"
                      icon={<Users className="w-5 h-5" />}
                    />
                    <StatCard
                      label="Budget Plans"
                      value={stats.totalBudgetPlans as number}
                      icon={<Package className="w-5 h-5" />}
                    />
                    <StatCard
                      label="Demand Products"
                      value={stats.campusDemandProducts as number}
                      sub="In analysis engine"
                      icon={<BarChart3 className="w-5 h-5" />}
                    />
                    <div
                      className={`rounded-2xl border p-6 ${
                        stats.dbConnected
                          ? "bg-green-50 border-green-200"
                          : "bg-amber-50 border-amber-200"
                      }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-500 mb-1">
                            Database
                          </p>
                          <p
                            className={`text-xl font-bold ${stats.dbConnected ? "text-green-700" : "text-amber-700"}`}>
                            {stats.dbConnected ? "Connected" : "Demo Mode"}
                          </p>
                          <p
                            className={`text-xs mt-1 ${stats.dbConnected ? "text-green-600" : "text-amber-600"}`}>
                            {stats.dbConnected
                              ? "MongoDB Atlas live"
                              : "No MongoDB — set MONGO_URI"}
                          </p>
                        </div>
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                            stats.dbConnected
                              ? "bg-green-100 text-green-600"
                              : "bg-amber-100 text-amber-600"
                          }`}>
                          <Database className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store type breakdown */}
                  {storeTypes && Object.keys(storeTypes).length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Vendors by Store Type</CardTitle>
                        <p className="text-xs text-slate-400 mt-1">
                          Distribution across all registered vendors
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                          {Object.entries(storeTypes).map(([type, count]) => (
                            <div
                              key={type}
                              className="bg-slate-50 rounded-2xl p-4 text-center">
                              <p className="text-2xl font-bold text-slate-800">
                                {count as number}
                              </p>
                              <Badge
                                className="mt-2"
                                variant={STORE_TYPE_COLORS[type] ?? "slate"}>
                                {STORE_TYPE_LABELS[type] ?? type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Export section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Export Data</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                      <a
                        href={adminApi.exportVendors(adminKey)}
                        download
                        className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold
                        px-5 py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
                        <Download className="w-4 h-4" /> Export Vendors CSV
                      </a>
                      <a
                        href={adminApi.exportBudgetPlans(adminKey)}
                        download
                        className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold
                        px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                        <Download className="w-4 h-4" /> Export Budget Plans CSV
                      </a>
                    </CardContent>
                  </Card>

                  {/* DB setup guide (shown when not connected) */}
                  {!stats.dbConnected && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <h3 className="font-semibold text-amber-800">
                          MongoDB Not Connected
                        </h3>
                      </div>
                      <p className="text-sm text-amber-700 leading-relaxed">
                        Bloom is running in demo mode. Vendor registrations
                        won't persist between sessions. To connect MongoDB
                        Atlas:
                      </p>
                      <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
                        <li>Create a free account at mongodb.com/atlas</li>
                        <li>Create a free M0 cluster</li>
                        <li>Get your connection string (mongodb+srv://...)</li>
                        <li>
                          Add it to{" "}
                          <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">
                            bloom-backend/.env
                          </code>{" "}
                          as{" "}
                          <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">
                            MONGO_URI=...
                          </code>
                        </li>
                        <li>Restart the Flask server</li>
                      </ol>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        )}

        {/* ── VENDORS TAB ───────────────────────────────────────────────── */}
        {activeTab === "vendors" && (
          <div className="space-y-5">
            {/* Search + filter bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm
                    outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
                  placeholder="Search by name, email or store..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <select
                className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none
                  focus:border-green-500 transition-all appearance-none cursor-pointer min-w-40"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setPage(1);
                }}>
                <option value="">All types</option>
                {Object.entries(STORE_TYPE_LABELS).map(([v, l]) => (
                  <option
                    key={v}
                    value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <Button
                variant="secondary"
                onClick={loadVendors}
                className="gap-2 flex-shrink-0">
                <RefreshCw className="w-4 h-4" /> Refresh
              </Button>
            </div>

            <p className="text-sm text-slate-500">
              Showing {vendors.length} of {total} vendor{total !== 1 ? "s" : ""}
            </p>

            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-20"
                  />
                ))}
              </div>
            ) : vendors.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Store className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No vendors found</p>
                <p className="text-xs mt-1">
                  Try adjusting the search or filter
                </p>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          {[
                            "Vendor",
                            "Store Type",
                            "Products",
                            "Location",
                            "Joined",
                            "Actions",
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {vendors.map((v, i) => (
                          <tr
                            key={i}
                            className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => setSelected(v)}>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center
                                  text-white text-xs font-bold flex-shrink-0">
                                  {v.name?.[0]?.toUpperCase() ?? "V"}
                                </div>
                                <div>
                                  <p className="font-medium text-slate-900">
                                    {v.storeName}
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    {v.name} · {v.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <Badge
                                variant={
                                  STORE_TYPE_COLORS[v.storeType] ?? "slate"
                                }>
                                {STORE_TYPE_LABELS[v.storeType] ?? v.storeType}
                              </Badge>
                            </td>
                            <td className="px-5 py-4 text-slate-500">
                              {v.products?.length ?? 0} products
                            </td>
                            <td className="px-5 py-4 text-slate-500 text-xs max-w-32 truncate">
                              {v.location ?? "—"}
                            </td>
                            <td className="px-5 py-4 text-slate-400 text-xs">
                              {v.createdAt
                                ? new Date(v.createdAt).toLocaleDateString()
                                : "—"}
                            </td>
                            <td className="px-5 py-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelected(v);
                                }}
                                className="text-xs text-green-600 font-semibold hover:text-green-800 transition-colors">
                                View →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {total > 20 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}>
                        Previous
                      </Button>
                      <span className="text-sm text-slate-500">
                        Page {page}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={vendors.length < 20}
                        onClick={() => setPage((p) => p + 1)}>
                        Next
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Vendor detail modal */}
      {selected && (
        <VendorModal
          vendor={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
          adminKey={adminKey}
        />
      )}
    </div>
  );
}
