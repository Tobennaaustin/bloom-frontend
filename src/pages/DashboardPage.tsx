import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Bell,
  Lightbulb,
  Package,
  ArrowRight,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
  Badge,
} from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import { dashboardApi } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { DashboardData } from "@/types";
import AppShell from "@/components/layout/AppShell";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-slate-100 animate-pulse rounded-xl ${className}`} />
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    dashboardApi
      .getData()
      .then((res) => setData(res.data))
      .catch(() => setError("Could not load dashboard. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const criticalAlerts =
    data?.restockAlerts.filter((a) => a.urgency === "critical").length ?? 0;

  if (loading)
    return (
      <AppShell>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-28"
              />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
          </div>
        </div>
      </AppShell>
    );

  if (error)
    return (
      <AppShell>
        <div className="p-8 max-w-md mx-auto text-center mt-20">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Failed to load dashboard
          </h2>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
      </AppShell>
    );

  if (!data) return null;

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Good day, {user?.name?.split(" ")[0] || "Vendor"} 👋
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {user?.storeName} · Crawford University
            </p>
          </div>
          {criticalAlerts > 0 && (
            <button
              onClick={() => navigate("/alerts")}
              className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-100 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              {criticalAlerts} critical alert{criticalAlerts > 1 ? "s" : ""}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Demand Score"
            value={`${data.demandScore}/10`}
            sub="Based on 465 student surveys"
            trend="up"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            label="Restock Alerts"
            value={data.restockAlerts.length}
            sub={
              criticalAlerts > 0
                ? `${criticalAlerts} critical`
                : "All under control"
            }
            trend={criticalAlerts > 0 ? "down" : "neutral"}
            icon={<Bell className="w-5 h-5" />}
          />
          <StatCard
            label="Products to Add"
            value={data.addThese.length}
            sub="Unmet student demand"
            trend="up"
            icon={<Lightbulb className="w-5 h-5" />}
          />
          <StatCard
            label="Revenue Potential"
            value={data.weeklyRevenuePotential}
            sub="Estimated weekly"
            trend="up"
            icon={<Package className="w-5 h-5" />}
          />
        </div>

        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800 mb-1">
              Bloom Insight for your store
            </p>
            <p className="text-sm text-green-700 leading-relaxed">
              {data.insight}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Demand Scores</CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                Campus demand score per product (0–10)
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer
                width="100%"
                height={220}>
                <BarChart
                  data={data.topProducts}
                  layout="vertical"
                  margin={{ left: 12, right: 24 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 10]}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={148}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                    formatter={(v) => [`${v}/10`, "Demand Score"]}
                  />
                  <Bar
                    dataKey="demandScore"
                    fill="#16a34a"
                    radius={[0, 6, 6, 0]}
                    maxBarSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demand vs Supply Gap</CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                Green = student demand · Faint = vendor supply
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer
                width="100%"
                height={220}>
                <BarChart
                  data={data.gapAnalysis}
                  margin={{ left: 0, right: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 9, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="demandScore"
                    name="Demand"
                    fill="#16a34a"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="supplyScore"
                    name="Supply"
                    fill="#bbf7d0"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Restock Alerts</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/alerts")}
                  className="gap-1 text-green-600">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {data.restockAlerts.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">
                  No alerts right now 🎉
                </p>
              ) : (
                data.restockAlerts.slice(0, 3).map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      alert.urgency === "critical"
                        ? "bg-red-50 border-red-200"
                        : "bg-amber-50 border-amber-200"
                    }`}>
                    <AlertTriangle
                      className={`w-4 h-4 flex-shrink-0 ${alert.urgency === "critical" ? "text-red-500" : "text-amber-500"}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {alert.product}
                      </p>
                      <p className="text-xs text-slate-500">
                        Threshold: {alert.restockPoint} units
                      </p>
                    </div>
                    <Badge
                      variant={alert.urgency === "critical" ? "red" : "yellow"}>
                      {alert.urgency}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Top Recommendations</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/recommendations")}
                  className="gap-1 text-green-600">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {data.recommendations.slice(0, 4).map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      rec.type === "add"
                        ? "bg-green-500"
                        : rec.type === "reduce"
                          ? "bg-amber-500"
                          : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {rec.product}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {rec.reason}
                    </p>
                  </div>
                  <Badge
                    variant={
                      rec.type === "add"
                        ? "green"
                        : rec.type === "reduce"
                          ? "yellow"
                          : "blue"
                    }>
                    {rec.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
