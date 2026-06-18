// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   TrendingUp,
//   TrendingDown,
//   Minus,
//   Package,
//   AlertTriangle,
//   CheckCircle2,
//   Info,
//   Clock,
//   ShoppingCart,
//   Plus,
//   X,
//   Lightbulb,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   StatCard,
//   Badge,
//   Input,
// } from "@/components/ui/index";
// import { Button } from "@/components/ui/Button";
// import { dashboardApi, budgetApi } from "@/lib/api";
// import { useAuth } from "@/hooks/useAuth";
// import {
//   Product,
//   RestockAlert,
//   Recommendation,
//   BudgetPlan,
//   BudgetItem,
// } from "@/types";
// import AppShell from "@/components/layout/AppShell";

// function Skeleton({ className = "" }: { className?: string }) {
//   return (
//     <div className={`bg-slate-100 animate-pulse rounded-xl ${className}`} />
//   );
// }
// function PageError({ onRetry }: { onRetry: () => void }) {
//   return (
//     <div className="p-8 max-w-md mx-auto text-center mt-16">
//       <div className="text-4xl mb-4">⚠️</div>
//       <h2 className="text-lg font-semibold text-slate-800 mb-2">
//         Failed to load
//       </h2>
//       <p className="text-sm text-slate-500 mb-6">
//         Check your connection and try again.
//       </p>
//       <Button onClick={onRetry}>Try again</Button>
//     </div>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════════
// //  PRODUCTS
// // ══════════════════════════════════════════════════════════════════════════════
// export function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const load = () => {
//     setLoading(true);
//     setError(false);
//     dashboardApi
//       .getProducts()
//       .then((r) => setProducts(r.data.products ?? r.data.topProducts ?? []))
//       .catch(() => setError(true))
//       .finally(() => setLoading(false));
//   };
//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <AppShell>
//       <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">
//             Product Analysis
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Products ranked by campus demand — 465 student responses.
//           </p>
//         </div>

//         {loading ? (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <Skeleton
//                   key={i}
//                   className="h-28"
//                 />
//               ))}
//             </div>
//             <Skeleton className="h-72" />
//           </div>
//         ) : error ? (
//           <PageError onRetry={load} />
//         ) : (
//           <>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//               <StatCard
//                 label="Products Tracked"
//                 value={products.length}
//                 icon={<Package className="w-5 h-5" />}
//               />
//               <StatCard
//                 label="High Demand"
//                 value={products.filter((p) => p.status === "high").length}
//                 sub="Sell these first"
//                 trend="up"
//                 icon={<TrendingUp className="w-5 h-5" />}
//               />
//               <StatCard
//                 label="Medium Demand"
//                 value={products.filter((p) => p.status === "medium").length}
//                 trend="neutral"
//                 icon={<Minus className="w-5 h-5" />}
//               />
//               <StatCard
//                 label="Low Demand"
//                 value={products.filter((p) => p.status === "low").length}
//                 sub="Consider reducing"
//                 trend="down"
//                 icon={<TrendingDown className="w-5 h-5" />}
//               />
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Weekly Units by Product</CardTitle>
//                 <p className="text-xs text-slate-400 mt-1">
//                   Estimated weekly units to stock
//                 </p>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer
//                   width="100%"
//                   height={260}>
//                   <BarChart
//                     data={products}
//                     margin={{ left: 0, right: 20 }}>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#f1f5f9"
//                       vertical={false}
//                     />
//                     <XAxis
//                       dataKey="name"
//                       tick={{ fontSize: 9, fill: "#94a3b8" }}
//                       axisLine={false}
//                       tickLine={false}
//                     />
//                     <YAxis
//                       tick={{ fontSize: 11, fill: "#94a3b8" }}
//                       axisLine={false}
//                       tickLine={false}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         borderRadius: "12px",
//                         border: "1px solid #e2e8f0",
//                         fontSize: "12px",
//                       }}
//                     />
//                     <Bar
//                       dataKey="weeklyUnits"
//                       name="Weekly Units"
//                       fill="#16a34a"
//                       radius={[6, 6, 0, 0]}
//                       maxBarSize={40}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Product Details</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="border-b border-slate-100">
//                         {[
//                           "Product",
//                           "Score",
//                           "Weekly Units",
//                           "Restock Every",
//                           "Restock Point",
//                           "Status",
//                         ].map((h) => (
//                           <th
//                             key={h}
//                             className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                             {h}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {products.map((p, i) => (
//                         <tr
//                           key={i}
//                           className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
//                           <td className="px-6 py-4 font-medium text-slate-900">
//                             {p.name}
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-2">
//                               <div className="flex-1 max-w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                                 <div
//                                   className="h-full bg-green-500 rounded-full"
//                                   style={{ width: `${p.demandScore * 10}%` }}
//                                 />
//                               </div>
//                               <span className="text-slate-700 font-medium text-xs">
//                                 {p.demandScore}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-slate-600 font-medium">
//                             {p.weeklyUnits} units
//                           </td>
//                           <td className="px-6 py-4 text-slate-500">
//                             {p.restockEvery}
//                           </td>
//                           <td className="px-6 py-4 text-slate-500">
//                             {p.restockPoint} units
//                           </td>
//                           <td className="px-6 py-4">
//                             <Badge
//                               variant={
//                                 p.status === "high"
//                                   ? "green"
//                                   : p.status === "medium"
//                                     ? "yellow"
//                                     : "red"
//                               }>
//                               {p.status}
//                             </Badge>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </>
//         )}
//       </div>
//     </AppShell>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════════
// //  ALERTS
// // ══════════════════════════════════════════════════════════════════════════════
// export function AlertsPage() {
//   const [alerts, setAlerts] = useState<RestockAlert[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const load = () => {
//     setLoading(true);
//     setError(false);
//     dashboardApi
//       .getAlerts()
//       .then((r) => setAlerts(r.data.alerts ?? []))
//       .catch(() => setError(true))
//       .finally(() => setLoading(false));
//   };
//   useEffect(() => {
//     load();
//   }, []);

//   const critical = alerts.filter((a) => a.urgency === "critical");
//   const warning = alerts.filter((a) => a.urgency === "warning");
//   const ok = alerts.filter((a) => a.urgency === "ok");

//   const AlertCard = ({ alert }: { alert: RestockAlert }) => {
//     const pct = Math.min(
//       100,
//       Math.round((alert.currentStock / alert.restockPoint) * 100),
//     );
//     return (
//       <div
//         className={`p-5 rounded-2xl border ${
//           alert.urgency === "critical"
//             ? "bg-red-50 border-red-200"
//             : alert.urgency === "warning"
//               ? "bg-amber-50 border-amber-200"
//               : "bg-green-50 border-green-200"
//         }`}>
//         <div className="flex items-start gap-4">
//           <div
//             className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
//               alert.urgency === "critical"
//                 ? "bg-red-100"
//                 : alert.urgency === "warning"
//                   ? "bg-amber-100"
//                   : "bg-green-100"
//             }`}>
//             {alert.urgency === "ok" ? (
//               <CheckCircle2 className="w-5 h-5 text-green-600" />
//             ) : (
//               <AlertTriangle
//                 className={`w-5 h-5 ${alert.urgency === "critical" ? "text-red-600" : "text-amber-600"}`}
//               />
//             )}
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-2">
//               <p className="font-semibold text-slate-900">{alert.product}</p>
//               <Badge
//                 variant={
//                   alert.urgency === "critical"
//                     ? "red"
//                     : alert.urgency === "warning"
//                       ? "yellow"
//                       : "green"
//                 }>
//                 {alert.urgency}
//               </Badge>
//             </div>
//             <div className="flex gap-4 text-xs text-slate-400 mb-3">
//               <span className="flex items-center gap-1">
//                 <Package className="w-3 h-3" /> {alert.currentStock} in stock
//               </span>
//               <span className="flex items-center gap-1">
//                 <AlertTriangle className="w-3 h-3" /> threshold:{" "}
//                 {alert.restockPoint}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock className="w-3 h-3" /> {alert.restockEvery}
//               </span>
//             </div>
//             <div>
//               <div className="flex justify-between text-xs text-slate-400 mb-1">
//                 <span>Stock level</span>
//                 <span>{pct}%</span>
//               </div>
//               <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
//                 <div
//                   className={`h-full rounded-full transition-all ${
//                     alert.urgency === "critical"
//                       ? "bg-red-500"
//                       : alert.urgency === "warning"
//                         ? "bg-amber-500"
//                         : "bg-green-500"
//                   }`}
//                   style={{ width: `${pct}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <AppShell>
//       <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Restock Alerts</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Formula: Restock Point = Daily Sales × Lead Time × 1.5
//           </p>
//         </div>

//         {loading ? (
//           <div className="space-y-3">
//             {[...Array(3)].map((_, i) => (
//               <Skeleton
//                 key={i}
//                 className="h-32"
//               />
//             ))}
//           </div>
//         ) : error ? (
//           <PageError onRetry={load} />
//         ) : (
//           <>
//             <div className="grid grid-cols-3 gap-4">
//               {[
//                 {
//                   n: critical.length,
//                   label: "Critical",
//                   bg: "bg-red-50 border-red-200",
//                   c: "text-red-600",
//                   s: "text-red-500",
//                 },
//                 {
//                   n: warning.length,
//                   label: "Warning",
//                   bg: "bg-amber-50 border-amber-200",
//                   c: "text-amber-600",
//                   s: "text-amber-500",
//                 },
//                 {
//                   n: ok.length,
//                   label: "OK",
//                   bg: "bg-green-50 border-green-200",
//                   c: "text-green-600",
//                   s: "text-green-500",
//                 },
//               ].map((s, i) => (
//                 <div
//                   key={i}
//                   className={`${s.bg} border rounded-2xl p-4 text-center`}>
//                   <p className={`text-3xl font-bold ${s.c}`}>{s.n}</p>
//                   <p className={`text-xs font-medium mt-1 ${s.s}`}>{s.label}</p>
//                 </div>
//               ))}
//             </div>

//             {alerts.length === 0 ? (
//               <div className="text-center py-12 text-slate-400">
//                 No alerts — stock is healthy 🎉
//               </div>
//             ) : (
//               <>
//                 {critical.length > 0 && (
//                   <>
//                     <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide">
//                       🔴 Immediate Action
//                     </h2>
//                     <div className="space-y-3">
//                       {critical.map((a, i) => (
//                         <AlertCard
//                           key={i}
//                           alert={a}
//                         />
//                       ))}
//                     </div>
//                   </>
//                 )}
//                 {warning.length > 0 && (
//                   <>
//                     <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wide mt-4">
//                       🟡 Act Within 1–2 Days
//                     </h2>
//                     <div className="space-y-3">
//                       {warning.map((a, i) => (
//                         <AlertCard
//                           key={i}
//                           alert={a}
//                         />
//                       ))}
//                     </div>
//                   </>
//                 )}
//                 {ok.length > 0 && (
//                   <>
//                     <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wide mt-4">
//                       🟢 Looking Good
//                     </h2>
//                     <div className="space-y-3">
//                       {ok.map((a, i) => (
//                         <AlertCard
//                           key={i}
//                           alert={a}
//                         />
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </AppShell>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════════
// //  RECOMMENDATIONS
// // ══════════════════════════════════════════════════════════════════════════════
// export function RecommendationsPage() {
//   const [data, setData] = useState<{
//     recommendations: Recommendation[];
//     addThese: string[];
//     reduce: string[];
//     insight: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const load = () => {
//     setLoading(true);
//     setError(false);
//     dashboardApi
//       .getRecommendations()
//       .then((r) => setData(r.data))
//       .catch(() => setError(true))
//       .finally(() => setLoading(false));
//   };
//   useEffect(() => {
//     load();
//   }, []);

//   const adds = data?.recommendations.filter((r) => r.type === "add") ?? [];
//   const reduces =
//     data?.recommendations.filter((r) => r.type === "reduce") ?? [];
//   const maint =
//     data?.recommendations.filter((r) => r.type === "maintain") ?? [];

//   const RecCard = ({ rec }: { rec: Recommendation }) => (
//     <div className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
//       <div
//         className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
//           rec.type === "add"
//             ? "bg-green-100"
//             : rec.type === "reduce"
//               ? "bg-amber-100"
//               : "bg-blue-100"
//         }`}>
//         {rec.type === "add" ? (
//           <CheckCircle2 className="w-5 h-5 text-green-600" />
//         ) : rec.type === "reduce" ? (
//           <TrendingDown className="w-5 h-5 text-amber-600" />
//         ) : (
//           <Minus className="w-5 h-5 text-blue-600" />
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <div className="flex items-start justify-between gap-2 mb-1">
//           <p className="font-semibold text-slate-900">{rec.product}</p>
//           <Badge
//             variant={
//               rec.type === "add"
//                 ? "green"
//                 : rec.type === "reduce"
//                   ? "yellow"
//                   : "blue"
//             }>
//             {rec.type === "add"
//               ? "Add"
//               : rec.type === "reduce"
//                 ? "Reduce"
//                 : "Maintain"}
//           </Badge>
//         </div>
//         <p className="text-sm text-slate-500 leading-relaxed">{rec.reason}</p>
//         {rec.weeklyUnits && (
//           <p className="text-xs font-semibold text-green-600 mt-1">
//             Recommended: {rec.weeklyUnits} units/week
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <AppShell>
//       <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Recommendations</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Gap analysis of 465 student responses vs 7 vendor surveys.
//           </p>
//         </div>

//         {loading ? (
//           <div className="space-y-3">
//             {[...Array(5)].map((_, i) => (
//               <Skeleton
//                 key={i}
//                 className="h-24"
//               />
//             ))}
//           </div>
//         ) : error ? (
//           <PageError onRetry={load} />
//         ) : (
//           data && (
//             <>
//               {data.insight && (
//                 <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-5">
//                   <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <p className="text-sm text-green-700 leading-relaxed">
//                     {data.insight}
//                   </p>
//                 </div>
//               )}

//               <div className="grid grid-cols-3 gap-4">
//                 {[
//                   {
//                     n: adds.length,
//                     label: "Add",
//                     bg: "bg-green-50 border-green-200",
//                     c: "text-green-600",
//                   },
//                   {
//                     n: reduces.length,
//                     label: "Reduce",
//                     bg: "bg-amber-50 border-amber-200",
//                     c: "text-amber-600",
//                   },
//                   {
//                     n: maint.length,
//                     label: "Maintain",
//                     bg: "bg-blue-50 border-blue-200",
//                     c: "text-blue-600",
//                   },
//                 ].map((s, i) => (
//                   <div
//                     key={i}
//                     className={`${s.bg} border rounded-2xl p-4 text-center`}>
//                     <p className={`text-3xl font-bold ${s.c}`}>{s.n}</p>
//                     <p className={`text-xs font-semibold mt-1 ${s.c}`}>
//                       {s.label}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {adds.length > 0 && (
//                 <div>
//                   <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
//                     ✅ Add These
//                   </h2>
//                   <div className="space-y-3">
//                     {adds.map((r, i) => (
//                       <RecCard
//                         key={i}
//                         rec={r}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {reduces.length > 0 && (
//                 <div>
//                   <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3 mt-2">
//                     ⬇️ Reduce These
//                   </h2>
//                   <div className="space-y-3">
//                     {reduces.map((r, i) => (
//                       <RecCard
//                         key={i}
//                         rec={r}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {maint.length > 0 && (
//                 <div>
//                   <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3 mt-2">
//                     ↔️ Maintain
//                   </h2>
//                   <div className="space-y-3">
//                     {maint.map((r, i) => (
//                       <RecCard
//                         key={i}
//                         rec={r}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )
//         )}
//       </div>
//     </AppShell>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════════
// //  BUDGET PLANNER
// // ══════════════════════════════════════════════════════════════════════════════

// interface BudgetEntry {
//   id: number;
//   name: string;
//   unitPrice: string;
//   quantity: string;
// }

// export function BudgetPlannerPage() {
//   const [budget, setBudget] = useState("");
//   const [entries, setEntries] = useState<BudgetEntry[]>([
//     { id: Date.now(), name: "", unitPrice: "", quantity: "" },
//   ]);
//   const [plan, setPlan] = useState<BudgetPlan | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showDefer, setShowDefer] = useState(false);

//   const addRow = () =>
//     setEntries((p) => [
//       ...p,
//       { id: Date.now(), name: "", unitPrice: "", quantity: "" },
//     ]);

//   const removeRow = (id: number) => {
//     if (entries.length === 1) return; // keep at least one row
//     setEntries((p) => p.filter((e) => e.id !== id));
//   };

//   const updateEntry = (id: number, field: keyof BudgetEntry, value: string) =>
//     setEntries((p) =>
//       p.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
//     );

//   // Live row total
//   const rowTotal = (e: BudgetEntry) => {
//     const p = parseFloat(e.unitPrice) || 0;
//     const q = parseInt(e.quantity) || 0;
//     return p * q;
//   };

//   // Grand total of all entries
//   const grandTotal = entries.reduce((sum, e) => sum + rowTotal(e), 0);

//   const generate = async () => {
//     setError("");
//     const bud = parseFloat(budget);
//     if (!budget || bud <= 0) {
//       setError("Enter your available budget first.");
//       return;
//     }

//     // Validate rows
//     const filled = entries.filter((e) => e.name.trim());
//     if (filled.length === 0) {
//       setError("Add at least one item.");
//       return;
//     }

//     for (const e of filled) {
//       if (!e.unitPrice || parseFloat(e.unitPrice) <= 0) {
//         setError(`Enter the unit price for "${e.name}".`);
//         return;
//       }
//       if (!e.quantity || parseInt(e.quantity) < 1) {
//         setError(`Enter the quantity for "${e.name}".`);
//         return;
//       }
//     }

//     const items = filled.map((e) => ({
//       name: e.name.trim(),
//       unitPrice: parseFloat(e.unitPrice),
//       quantity: parseInt(e.quantity),
//     }));

//     setLoading(true);
//     setPlan(null);
//     try {
//       const r = await budgetApi.createPlan(bud, items);
//       setPlan(r.data);
//     } catch {
//       setError("Could not generate plan. Check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reset = () => {
//     setPlan(null);
//     setError("");
//     setEntries([{ id: Date.now(), name: "", unitPrice: "", quantity: "" }]);
//     setBudget("");
//   };

//   return (
//     <AppShell>
//       <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
//         {/* Header */}
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Budget Planner</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Going to the market with limited cash? List everything you want to
//             buy with your own prices — Bloom will tell you what to buy now and
//             what to defer, ranked by campus demand data.
//           </p>
//         </div>

//         {/* Input form */}
//         {!plan && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Plan your market trip</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               {/* Budget */}
//               <Input
//                 label="Your available budget (₦)"
//                 type="number"
//                 placeholder="e.g. 15000"
//                 value={budget}
//                 onChange={(e) => setBudget(e.target.value)}
//               />

//               {/* Items table */}
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="text-sm font-medium text-slate-700">
//                     Items you want to buy
//                   </label>
//                   <span className="text-xs text-slate-400">
//                     Total: ₦{grandTotal.toLocaleString()}
//                   </span>
//                 </div>

//                 {/* Column headers */}
//                 <div className="grid grid-cols-12 gap-2 mb-2 px-1">
//                   <div className="col-span-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                     Item name
//                   </div>
//                   <div className="col-span-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                     Unit price (₦)
//                   </div>
//                   <div className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                     Qty
//                   </div>
//                   <div className="col-span-1 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
//                     Total
//                   </div>
//                   <div className="col-span-1" />
//                 </div>

//                 {/* Rows */}
//                 <div className="space-y-2">
//                   {entries.map((entry, idx) => (
//                     <div
//                       key={entry.id}
//                       className="grid grid-cols-12 gap-2 items-center">
//                       {/* Name */}
//                       <div className="col-span-5">
//                         <input
//                           className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm
//                             outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
//                           placeholder={`e.g. Carton of Indomie`}
//                           value={entry.name}
//                           onChange={(e) =>
//                             updateEntry(entry.id, "name", e.target.value)
//                           }
//                         />
//                       </div>

//                       {/* Unit price */}
//                       <div className="col-span-3">
//                         <input
//                           type="number"
//                           min="0"
//                           className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm
//                             outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
//                           placeholder="4500"
//                           value={entry.unitPrice}
//                           onChange={(e) =>
//                             updateEntry(entry.id, "unitPrice", e.target.value)
//                           }
//                         />
//                       </div>

//                       {/* Quantity */}
//                       <div className="col-span-2">
//                         <input
//                           type="number"
//                           min="1"
//                           className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm
//                             outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
//                           placeholder="2"
//                           value={entry.quantity}
//                           onChange={(e) =>
//                             updateEntry(entry.id, "quantity", e.target.value)
//                           }
//                         />
//                       </div>

//                       {/* Row total */}
//                       <div className="col-span-1 text-right">
//                         <span
//                           className={`text-sm font-semibold ${rowTotal(entry) > 0 ? "text-slate-800" : "text-slate-300"}`}>
//                           {rowTotal(entry) > 0
//                             ? `₦${rowTotal(entry).toLocaleString()}`
//                             : "—"}
//                         </span>
//                       </div>

//                       {/* Remove */}
//                       <div className="col-span-1 flex justify-center">
//                         <button
//                           onClick={() => removeRow(entry.id)}
//                           className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
//                           title="Remove row">
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Add row button */}
//                 <button
//                   onClick={addRow}
//                   className="mt-3 flex items-center gap-2 text-sm text-green-600 font-medium
//                     hover:text-green-800 transition-colors px-1">
//                   <Plus className="w-4 h-4" /> Add another item
//                 </button>
//               </div>

//               {/* Budget summary before generating */}
//               {grandTotal > 0 && parseFloat(budget) > 0 && (
//                 <div
//                   className={`rounded-xl p-4 border ${
//                     grandTotal > parseFloat(budget)
//                       ? "bg-amber-50 border-amber-200"
//                       : "bg-green-50 border-green-200"
//                   }`}>
//                   <div className="flex justify-between text-sm font-semibold">
//                     <span
//                       className={
//                         grandTotal > parseFloat(budget)
//                           ? "text-amber-700"
//                           : "text-green-700"
//                       }>
//                       {grandTotal > parseFloat(budget)
//                         ? `₦${(grandTotal - parseFloat(budget)).toLocaleString()} over budget`
//                         : `₦${(parseFloat(budget) - grandTotal).toLocaleString()} will remain`}
//                     </span>
//                     <span className="text-slate-500 font-normal">
//                       List total: ₦{grandTotal.toLocaleString()} / Budget: ₦
//                       {parseFloat(budget).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
//                   {error}
//                 </div>
//               )}

//               <Button
//                 onClick={generate}
//                 loading={loading}
//                 className="w-full gap-2">
//                 <ShoppingCart className="w-4 h-4" />
//                 {loading
//                   ? "Analysing demand & allocating budget..."
//                   : "Generate smart shopping plan"}
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         {/* Results */}
//         {plan && (
//           <>
//             {/* Summary cards */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 {
//                   val: `₦${plan.totalSpent.toLocaleString()}`,
//                   sub: `Spent (${plan.utilisation}%)`,
//                   bg: "bg-green-50 border-green-200",
//                   c: "text-green-700",
//                 },
//                 {
//                   val: `₦${plan.remaining.toLocaleString()}`,
//                   sub: "Remaining",
//                   bg: "bg-slate-50 border-slate-200",
//                   c: "text-slate-700",
//                 },
//                 {
//                   val: String(
//                     plan.summary.itemsBought + plan.summary.itemsPartial,
//                   ),
//                   sub: "Buy now",
//                   bg: "bg-blue-50 border-blue-200",
//                   c: "text-blue-700",
//                 },
//                 {
//                   val: String(plan.summary.itemsDeferred),
//                   sub: "Deferred",
//                   bg: "bg-amber-50 border-amber-200",
//                   c: "text-amber-700",
//                 },
//               ].map((s, i) => (
//                 <div
//                   key={i}
//                   className={`${s.bg} border rounded-2xl p-4 text-center`}>
//                   <p className={`text-2xl font-bold ${s.c}`}>{s.val}</p>
//                   <p className={`text-xs font-medium mt-1 ${s.c} opacity-70`}>
//                     {s.sub}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Advice banner */}
//             <div className="bg-green-600 rounded-2xl p-5 text-white">
//               <p className="text-sm font-semibold mb-1">💡 Bloom's Advice</p>
//               <p className="text-sm text-green-100 leading-relaxed">
//                 {plan.advice}
//               </p>
//             </div>

//             {/* Buy Now table */}
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-green-500" />
//                   <CardTitle>
//                     Buy Now —{" "}
//                     {plan.summary.itemsBought + plan.summary.itemsPartial} item
//                     {plan.summary.itemsBought + plan.summary.itemsPartial !== 1
//                       ? "s"
//                       : ""}{" "}
//                     · ₦{plan.totalSpent.toLocaleString()}
//                   </CardTitle>
//                 </div>
//                 <p className="text-xs text-slate-400 mt-1">
//                   Sorted by campus demand priority — highest demand items bought
//                   first
//                 </p>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="border-b border-slate-100">
//                         {[
//                           "Item",
//                           "Your Price",
//                           "Wanted",
//                           "Buy Qty",
//                           "Subtotal",
//                           "Demand",
//                           "Priority",
//                         ].map((h) => (
//                           <th
//                             key={h}
//                             className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                             {h}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {plan.buyNow.map((item: BudgetItem, i) => (
//                         <tr
//                           key={i}
//                           className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
//                             item.decision === "partial" ? "bg-amber-50/30" : ""
//                           }`}>
//                           <td className="px-5 py-3">
//                             <p className="font-medium text-slate-900">
//                               {item.name}
//                             </p>
//                             {item.decision === "partial" && (
//                               <p className="text-xs text-amber-600 font-medium mt-0.5">
//                                 Partial — {item.shortfall} unit
//                                 {item.shortfall !== 1 ? "s" : ""} short
//                               </p>
//                             )}
//                           </td>
//                           <td className="px-5 py-3 font-medium text-slate-800">
//                             ₦{item.unitPrice.toLocaleString()}
//                           </td>
//                           <td className="px-5 py-3 text-slate-500">
//                             {item.quantity}
//                           </td>
//                           <td className="px-5 py-3">
//                             <span
//                               className={`font-bold text-lg ${
//                                 item.decision === "partial"
//                                   ? "text-amber-600"
//                                   : "text-green-700"
//                               }`}>
//                               {item.buyQty}
//                             </span>
//                           </td>
//                           <td className="px-5 py-3 font-semibold text-slate-800">
//                             ₦{(item.subtotal ?? 0).toLocaleString()}
//                           </td>
//                           <td className="px-5 py-3">
//                             <div className="flex items-center gap-1.5">
//                               <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                                 <div
//                                   className="h-full bg-green-500 rounded-full"
//                                   style={{ width: `${item.demandScore * 10}%` }}
//                                 />
//                               </div>
//                               <span className="text-xs text-slate-500">
//                                 {item.demandScore}/10
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-5 py-3">
//                             <Badge
//                               variant={item.isMustStock ? "green" : "slate"}>
//                               {item.isMustStock ? "Must stock" : "Normal"}
//                             </Badge>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                     <tfoot>
//                       <tr className="bg-slate-50 border-t border-slate-200">
//                         <td
//                           colSpan={4}
//                           className="px-5 py-3 text-sm font-semibold text-slate-700">
//                           Total spent
//                         </td>
//                         <td className="px-5 py-3 font-bold text-green-700 text-base">
//                           ₦{plan.totalSpent.toLocaleString()}
//                         </td>
//                         <td colSpan={2} />
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Deferred */}
//             {plan.defer.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <button
//                     className="flex items-center justify-between w-full"
//                     onClick={() => setShowDefer((e) => !e)}>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-amber-400" />
//                       <CardTitle>
//                         Defer — {plan.defer.length} item
//                         {plan.defer.length !== 1 ? "s" : ""} · ₦
//                         {plan.deferCostTotal.toLocaleString()} needed
//                       </CardTitle>
//                     </div>
//                     {showDefer ? (
//                       <ChevronUp className="w-4 h-4 text-slate-400" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4 text-slate-400" />
//                     )}
//                   </button>
//                 </CardHeader>
//                 {showDefer && (
//                   <CardContent className="pt-2 space-y-3">
//                     {plan.defer.map((item: BudgetItem, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl">
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium text-slate-800">
//                             {item.name}
//                           </p>
//                           <p className="text-xs text-slate-500 mt-0.5">
//                             ₦{item.unitPrice.toLocaleString()} × {item.quantity}{" "}
//                             units = ₦{item.totalCost.toLocaleString()}
//                           </p>
//                         </div>
//                         <div className="text-right flex-shrink-0">
//                           <p className="text-xs text-slate-400">Demand</p>
//                           <p className="font-bold text-slate-700">
//                             {item.demandScore}/10
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                     {plan.amountToSave > 0 && (
//                       <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//                         <p className="text-sm font-semibold text-amber-700">
//                           Save an extra ₦{plan.amountToSave.toLocaleString()} to
//                           cover all deferred items on your next trip.
//                         </p>
//                       </div>
//                     )}
//                   </CardContent>
//                 )}
//               </Card>
//             )}

//             {/* Bloom suggestions for deferred */}
//             {plan.suggestions.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Bloom's Suggestions for Deferred Items</CardTitle>
//                   <p className="text-xs text-slate-400 mt-1">
//                     Based on Crawford University campus demand data
//                   </p>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {plan.suggestions.map((s, i) => (
//                     <div
//                       key={i}
//                       className={`flex items-start gap-3 p-4 rounded-xl border ${
//                         s.urgency === "high"
//                           ? "bg-red-50 border-red-200 text-red-700"
//                           : s.urgency === "medium"
//                             ? "bg-amber-50 border-amber-200 text-amber-700"
//                             : "bg-slate-50 border-slate-200 text-slate-600"
//                       }`}>
//                       <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="font-semibold text-sm">{s.product}</p>
//                         <p className="text-xs leading-relaxed mt-0.5 opacity-80">
//                           {s.reason}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             )}

//             {/* Start over */}
//             <div className="flex justify-center pt-2">
//               <Button
//                 variant="outline"
//                 onClick={reset}
//                 className="gap-2">
//                 <Plus className="w-4 h-4" /> Plan another trip
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </AppShell>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════════════
// //  SETTINGS
// // ══════════════════════════════════════════════════════════════════════════════
// export function SettingsPage() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [saved, setSaved] = useState(false);
//   const [storeName, setStoreName] = useState(user?.storeName || "");
//   const [location, setLocation] = useState(
//     user?.location || "Crawford University, Igbesa",
//   );

//   return (
//     <AppShell>
//       <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
//           <p className="text-sm text-slate-500 mt-1">Manage your account.</p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Store Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Input
//               label="Your name"
//               defaultValue={user?.name || ""}
//               readOnly
//               className="bg-slate-50"
//             />
//             <Input
//               label="Email"
//               defaultValue={user?.email || ""}
//               readOnly
//               className="bg-slate-50"
//             />
//             <Input
//               label="Store name"
//               value={storeName}
//               onChange={(e) => setStoreName(e.target.value)}
//             />
//             <Input
//               label="Location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//             <Button
//               onClick={() => {
//                 setSaved(true);
//                 setTimeout(() => setSaved(false), 2500);
//               }}
//               className="gap-2">
//               {saved ? (
//                 <>
//                   <CheckCircle2 className="w-4 h-4" /> Saved!
//                 </>
//               ) : (
//                 "Save changes"
//               )}
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>About Bloom</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2 text-sm text-slate-500">
//             <p>Data-driven inventory system for Crawford University vendors.</p>
//             <p>
//               Powered by{" "}
//               <strong className="text-slate-700">465 student responses</strong>{" "}
//               and <strong className="text-slate-700">7 vendor surveys</strong>,
//               May 2026.
//             </p>
//             <p className="text-xs text-slate-400 pt-2">
//               Final Year CS Project · Crawford University · 2026
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-red-600">Danger Zone</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Button
//               variant="danger"
//               onClick={() => {
//                 logout();
//                 navigate("/");
//               }}>
//               Log out of Bloom
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </AppShell>
//   );
// }

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
  TrendingDown,
  Minus,
  Package,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  ShoppingCart,
  Plus,
  X,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
  Badge,
  Input,
} from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import { dashboardApi, budgetApi } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import {
  Product,
  RestockAlert,
  Recommendation,
  BudgetPlan,
  BudgetItem,
} from "@/types";
import AppShell from "@/components/layout/AppShell";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-slate-100 animate-pulse rounded-xl ${className}`} />
  );
}
function PageError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-8 max-w-md mx-auto text-center mt-16">
      <div className="text-4xl mb-4">⚠️</div>
      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to load
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Check your connection and try again.
      </p>
      <Button onClick={onRetry}>Try again</Button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PRODUCTS
// ══════════════════════════════════════════════════════════════════════════════
export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    dashboardApi
      .getProducts()
      .then((r) => setProducts(r.data.products ?? r.data.topProducts ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Product Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Products ranked by campus demand — 465 student responses.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-28"
                />
              ))}
            </div>
            <Skeleton className="h-72" />
          </div>
        ) : error ? (
          <PageError onRetry={load} />
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Products Tracked"
                value={products.length}
                icon={<Package className="w-5 h-5" />}
              />
              <StatCard
                label="High Demand"
                value={products.filter((p) => p.status === "high").length}
                sub="Sell these first"
                trend="up"
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <StatCard
                label="Medium Demand"
                value={products.filter((p) => p.status === "medium").length}
                trend="neutral"
                icon={<Minus className="w-5 h-5" />}
              />
              <StatCard
                label="Low Demand"
                value={products.filter((p) => p.status === "low").length}
                sub="Consider reducing"
                trend="down"
                icon={<TrendingDown className="w-5 h-5" />}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Units by Product</CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Estimated weekly units to stock
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer
                  width="100%"
                  height={260}>
                  <BarChart
                    data={products}
                    margin={{ left: 0, right: 20 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f1f5f9"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
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
                      dataKey="weeklyUnits"
                      name="Weekly Units"
                      fill="#16a34a"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {[
                          "Product",
                          "Score",
                          "Weekly Units",
                          "Restock Every",
                          "Restock Point",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, i) => (
                        <tr
                          key={i}
                          className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">
                            {p.name}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 max-w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${p.demandScore * 10}%` }}
                                />
                              </div>
                              <span className="text-slate-700 font-medium text-xs">
                                {p.demandScore}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">
                            {p.weeklyUnits} units
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            {p.restockEvery}
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            {p.restockPoint} units
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                p.status === "high"
                                  ? "green"
                                  : p.status === "medium"
                                    ? "yellow"
                                    : "red"
                              }>
                              {p.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppShell>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  ALERTS
// ══════════════════════════════════════════════════════════════════════════════
export function AlertsPage() {
  const [alerts, setAlerts] = useState<RestockAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    dashboardApi
      .getAlerts()
      .then((r) => setAlerts(r.data.alerts ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  // Reframe urgency as restock priority
  const high = alerts.filter((a) => a.urgency === "critical");
  const medium = alerts.filter((a) => a.urgency === "warning");
  const low = alerts.filter((a) => a.urgency === "ok");

  const priorityLabel = (u: string) =>
    u === "critical"
      ? "High priority"
      : u === "warning"
        ? "Medium priority"
        : "Low priority";

  const SuggestionCard = ({ alert }: { alert: RestockAlert }) => (
    <div
      className={`p-5 rounded-2xl border ${
        alert.urgency === "critical"
          ? "bg-red-50 border-red-200"
          : alert.urgency === "warning"
            ? "bg-amber-50 border-amber-200"
            : "bg-green-50 border-green-200"
      }`}>
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            alert.urgency === "critical"
              ? "bg-red-100"
              : alert.urgency === "warning"
                ? "bg-amber-100"
                : "bg-green-100"
          }`}>
          {alert.urgency === "ok" ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <RefreshCw
              className={`w-5 h-5 ${alert.urgency === "critical" ? "text-red-600" : "text-amber-600"}`}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-slate-900">{alert.product}</p>
            <Badge
              variant={
                alert.urgency === "critical"
                  ? "red"
                  : alert.urgency === "warning"
                    ? "yellow"
                    : "green"
              }>
              {priorityLabel(alert.urgency)}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            {alert.urgency === "critical"
              ? `This is a top-demand product. We suggest keeping at least ${alert.restockPoint} units on hand and restocking ${alert.restockEvery.toLowerCase()}.`
              : alert.urgency === "warning"
                ? `A steady seller. Aim to hold around ${alert.restockPoint} units and restock ${alert.restockEvery.toLowerCase()}.`
                : `Lower turnover. Holding about ${alert.restockPoint} units and restocking ${alert.restockEvery.toLowerCase()} should be enough.`}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              Suggested quantity:{" "}
              <strong className="text-slate-700">
                {alert.restockPoint} units
              </strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Restock:{" "}
              <strong className="text-slate-700">{alert.restockEvery}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Restock Suggestions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Based on campus demand, here's how much of each product to keep on
            hand and how often to restock. Suggested quantity = Daily Sales ×
            Lead Time × 1.5 safety factor.
          </p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-32"
              />
            ))}
          </div>
        ) : error ? (
          <PageError onRetry={load} />
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  n: high.length,
                  label: "High priority",
                  bg: "bg-red-50 border-red-200",
                  c: "text-red-600",
                  s: "text-red-500",
                },
                {
                  n: medium.length,
                  label: "Medium priority",
                  bg: "bg-amber-50 border-amber-200",
                  c: "text-amber-600",
                  s: "text-amber-500",
                },
                {
                  n: low.length,
                  label: "Low priority",
                  bg: "bg-green-50 border-green-200",
                  c: "text-green-600",
                  s: "text-green-500",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`${s.bg} border rounded-2xl p-4 text-center`}>
                  <p className={`text-3xl font-bold ${s.c}`}>{s.n}</p>
                  <p className={`text-xs font-medium mt-1 ${s.s}`}>{s.label}</p>
                </div>
              ))}
            </div>

            {alerts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No restock suggestions right now 🎉
              </div>
            ) : (
              <>
                {high.length > 0 && (
                  <>
                    <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                      🔴 Restock These First
                    </h2>
                    <div className="space-y-3">
                      {high.map((a, i) => (
                        <SuggestionCard
                          key={i}
                          alert={a}
                        />
                      ))}
                    </div>
                  </>
                )}
                {medium.length > 0 && (
                  <>
                    <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wide mt-4">
                      🟡 Keep an Eye On
                    </h2>
                    <div className="space-y-3">
                      {medium.map((a, i) => (
                        <SuggestionCard
                          key={i}
                          alert={a}
                        />
                      ))}
                    </div>
                  </>
                )}
                {low.length > 0 && (
                  <>
                    <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wide mt-4">
                      🟢 Low Priority
                    </h2>
                    <div className="space-y-3">
                      {low.map((a, i) => (
                        <SuggestionCard
                          key={i}
                          alert={a}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  RECOMMENDATIONS
// ══════════════════════════════════════════════════════════════════════════════
export function RecommendationsPage() {
  const [data, setData] = useState<{
    recommendations: Recommendation[];
    addThese: string[];
    reduce: string[];
    insight: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    dashboardApi
      .getRecommendations()
      .then((r) => setData(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const adds = data?.recommendations.filter((r) => r.type === "add") ?? [];
  const reduces =
    data?.recommendations.filter((r) => r.type === "reduce") ?? [];
  const maint =
    data?.recommendations.filter((r) => r.type === "maintain") ?? [];

  const RecCard = ({ rec }: { rec: Recommendation }) => (
    <div className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          rec.type === "add"
            ? "bg-green-100"
            : rec.type === "reduce"
              ? "bg-amber-100"
              : "bg-blue-100"
        }`}>
        {rec.type === "add" ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : rec.type === "reduce" ? (
          <TrendingDown className="w-5 h-5 text-amber-600" />
        ) : (
          <Minus className="w-5 h-5 text-blue-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-semibold text-slate-900">{rec.product}</p>
          <Badge
            variant={
              rec.type === "add"
                ? "green"
                : rec.type === "reduce"
                  ? "yellow"
                  : "blue"
            }>
            {rec.type === "add"
              ? "Add"
              : rec.type === "reduce"
                ? "Reduce"
                : "Maintain"}
          </Badge>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{rec.reason}</p>
        {rec.weeklyUnits && (
          <p className="text-xs font-semibold text-green-600 mt-1">
            Recommended: {rec.weeklyUnits} units/week
          </p>
        )}
      </div>
    </div>
  );

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recommendations</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gap analysis of 465 student responses vs 7 vendor surveys.
          </p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-24"
              />
            ))}
          </div>
        ) : error ? (
          <PageError onRetry={load} />
        ) : (
          data && (
            <>
              {data.insight && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-5">
                  <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 leading-relaxed">
                    {data.insight}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    n: adds.length,
                    label: "Add",
                    bg: "bg-green-50 border-green-200",
                    c: "text-green-600",
                  },
                  {
                    n: reduces.length,
                    label: "Reduce",
                    bg: "bg-amber-50 border-amber-200",
                    c: "text-amber-600",
                  },
                  {
                    n: maint.length,
                    label: "Maintain",
                    bg: "bg-blue-50 border-blue-200",
                    c: "text-blue-600",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`${s.bg} border rounded-2xl p-4 text-center`}>
                    <p className={`text-3xl font-bold ${s.c}`}>{s.n}</p>
                    <p className={`text-xs font-semibold mt-1 ${s.c}`}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {adds.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                    ✅ Add These
                  </h2>
                  <div className="space-y-3">
                    {adds.map((r, i) => (
                      <RecCard
                        key={i}
                        rec={r}
                      />
                    ))}
                  </div>
                </div>
              )}
              {reduces.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3 mt-2">
                    ⬇️ Reduce These
                  </h2>
                  <div className="space-y-3">
                    {reduces.map((r, i) => (
                      <RecCard
                        key={i}
                        rec={r}
                      />
                    ))}
                  </div>
                </div>
              )}
              {maint.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3 mt-2">
                    ↔️ Maintain
                  </h2>
                  <div className="space-y-3">
                    {maint.map((r, i) => (
                      <RecCard
                        key={i}
                        rec={r}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
    </AppShell>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  BUDGET PLANNER
// ══════════════════════════════════════════════════════════════════════════════

interface BudgetEntry {
  id: number;
  name: string;
  unitPrice: string;
  quantity: string;
}

export function BudgetPlannerPage() {
  const [budget, setBudget] = useState("");
  const [entries, setEntries] = useState<BudgetEntry[]>([
    { id: Date.now(), name: "", unitPrice: "", quantity: "" },
  ]);
  const [plan, setPlan] = useState<BudgetPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDefer, setShowDefer] = useState(false);

  const addRow = () =>
    setEntries((p) => [
      ...p,
      { id: Date.now(), name: "", unitPrice: "", quantity: "" },
    ]);

  const removeRow = (id: number) => {
    if (entries.length === 1) return; // keep at least one row
    setEntries((p) => p.filter((e) => e.id !== id));
  };

  const updateEntry = (id: number, field: keyof BudgetEntry, value: string) =>
    setEntries((p) =>
      p.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );

  // Live row total
  const rowTotal = (e: BudgetEntry) => {
    const p = parseFloat(e.unitPrice) || 0;
    const q = parseInt(e.quantity) || 0;
    return p * q;
  };

  // Grand total of all entries
  const grandTotal = entries.reduce((sum, e) => sum + rowTotal(e), 0);

  const generate = async () => {
    setError("");
    const bud = parseFloat(budget);
    if (!budget || bud <= 0) {
      setError("Enter your available budget first.");
      return;
    }

    // Validate rows
    const filled = entries.filter((e) => e.name.trim());
    if (filled.length === 0) {
      setError("Add at least one item.");
      return;
    }

    for (const e of filled) {
      if (!e.unitPrice || parseFloat(e.unitPrice) <= 0) {
        setError(`Enter the unit price for "${e.name}".`);
        return;
      }
      if (!e.quantity || parseInt(e.quantity) < 1) {
        setError(`Enter the quantity for "${e.name}".`);
        return;
      }
    }

    const items = filled.map((e) => ({
      name: e.name.trim(),
      unitPrice: parseFloat(e.unitPrice),
      quantity: parseInt(e.quantity),
    }));

    setLoading(true);
    setPlan(null);
    try {
      const r = await budgetApi.createPlan(bud, items);
      setPlan(r.data);
    } catch {
      setError("Could not generate plan. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPlan(null);
    setError("");
    setEntries([{ id: Date.now(), name: "", unitPrice: "", quantity: "" }]);
    setBudget("");
  };

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budget Planner</h1>
          <p className="text-sm text-slate-500 mt-1">
            Going to the market with limited cash? List everything you want to
            buy with your own prices — Bloom will tell you what to buy now and
            what to defer, ranked by campus demand data.
          </p>
        </div>

        {/* Input form */}
        {!plan && (
          <Card>
            <CardHeader>
              <CardTitle>Plan your market trip</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Budget */}
              <Input
                label="Your available budget (₦)"
                type="number"
                placeholder="e.g. 15000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />

              {/* Items table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    Items you want to buy
                  </label>
                  <span className="text-xs text-slate-400">
                    Total: ₦{grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Column headers */}
                <div className="grid grid-cols-12 gap-2 mb-2 px-1">
                  <div className="col-span-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Item name
                  </div>
                  <div className="col-span-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Unit price (₦)
                  </div>
                  <div className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Qty
                  </div>
                  <div className="col-span-1 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                    Total
                  </div>
                  <div className="col-span-1" />
                </div>

                {/* Rows */}
                <div className="space-y-2">
                  {entries.map((entry, idx) => (
                    <div
                      key={entry.id}
                      className="grid grid-cols-12 gap-2 items-center">
                      {/* Name */}
                      <div className="col-span-5">
                        <input
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm
                            outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
                          placeholder={`e.g. Carton of Indomie`}
                          value={entry.name}
                          onChange={(e) =>
                            updateEntry(entry.id, "name", e.target.value)
                          }
                        />
                      </div>

                      {/* Unit price */}
                      <div className="col-span-3">
                        <input
                          type="number"
                          min="0"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm
                            outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
                          placeholder="4500"
                          value={entry.unitPrice}
                          onChange={(e) =>
                            updateEntry(entry.id, "unitPrice", e.target.value)
                          }
                        />
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm
                            outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all"
                          placeholder="2"
                          value={entry.quantity}
                          onChange={(e) =>
                            updateEntry(entry.id, "quantity", e.target.value)
                          }
                        />
                      </div>

                      {/* Row total */}
                      <div className="col-span-1 text-right">
                        <span
                          className={`text-sm font-semibold ${rowTotal(entry) > 0 ? "text-slate-800" : "text-slate-300"}`}>
                          {rowTotal(entry) > 0
                            ? `₦${rowTotal(entry).toLocaleString()}`
                            : "—"}
                        </span>
                      </div>

                      {/* Remove */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => removeRow(entry.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                          title="Remove row">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add row button */}
                <button
                  onClick={addRow}
                  className="mt-3 flex items-center gap-2 text-sm text-green-600 font-medium
                    hover:text-green-800 transition-colors px-1">
                  <Plus className="w-4 h-4" /> Add another item
                </button>
              </div>

              {/* Budget summary before generating */}
              {grandTotal > 0 && parseFloat(budget) > 0 && (
                <div
                  className={`rounded-xl p-4 border ${
                    grandTotal > parseFloat(budget)
                      ? "bg-amber-50 border-amber-200"
                      : "bg-green-50 border-green-200"
                  }`}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span
                      className={
                        grandTotal > parseFloat(budget)
                          ? "text-amber-700"
                          : "text-green-700"
                      }>
                      {grandTotal > parseFloat(budget)
                        ? `₦${(grandTotal - parseFloat(budget)).toLocaleString()} over budget`
                        : `₦${(parseFloat(budget) - grandTotal).toLocaleString()} will remain`}
                    </span>
                    <span className="text-slate-500 font-normal">
                      List total: ₦{grandTotal.toLocaleString()} / Budget: ₦
                      {parseFloat(budget).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button
                onClick={generate}
                loading={loading}
                className="w-full gap-2">
                <ShoppingCart className="w-4 h-4" />
                {loading
                  ? "Analysing demand & allocating budget..."
                  : "Generate smart shopping plan"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {plan && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  val: `₦${plan.totalSpent.toLocaleString()}`,
                  sub: `Spent (${plan.utilisation}%)`,
                  bg: "bg-green-50 border-green-200",
                  c: "text-green-700",
                },
                {
                  val: `₦${plan.remaining.toLocaleString()}`,
                  sub: "Remaining",
                  bg: "bg-slate-50 border-slate-200",
                  c: "text-slate-700",
                },
                {
                  val: String(
                    plan.summary.itemsBought + plan.summary.itemsPartial,
                  ),
                  sub: "Buy now",
                  bg: "bg-blue-50 border-blue-200",
                  c: "text-blue-700",
                },
                {
                  val: String(plan.summary.itemsDeferred),
                  sub: "Deferred",
                  bg: "bg-amber-50 border-amber-200",
                  c: "text-amber-700",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`${s.bg} border rounded-2xl p-4 text-center`}>
                  <p className={`text-2xl font-bold ${s.c}`}>{s.val}</p>
                  <p className={`text-xs font-medium mt-1 ${s.c} opacity-70`}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Advice banner */}
            <div className="bg-green-600 rounded-2xl p-5 text-white">
              <p className="text-sm font-semibold mb-1">💡 Bloom's Advice</p>
              <p className="text-sm text-green-100 leading-relaxed">
                {plan.advice}
              </p>
            </div>

            {/* Buy Now table */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <CardTitle>
                    Buy Now —{" "}
                    {plan.summary.itemsBought + plan.summary.itemsPartial} item
                    {plan.summary.itemsBought + plan.summary.itemsPartial !== 1
                      ? "s"
                      : ""}{" "}
                    · ₦{plan.totalSpent.toLocaleString()}
                  </CardTitle>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Sorted by campus demand priority — highest demand items bought
                  first
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {[
                          "Item",
                          "Your Price",
                          "Wanted",
                          "Buy Qty",
                          "Subtotal",
                          "Demand",
                          "Priority",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {plan.buyNow.map((item: BudgetItem, i) => (
                        <tr
                          key={i}
                          className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                            item.decision === "partial" ? "bg-amber-50/30" : ""
                          }`}>
                          <td className="px-5 py-3">
                            <p className="font-medium text-slate-900">
                              {item.name}
                            </p>
                            {item.decision === "partial" && (
                              <p className="text-xs text-amber-600 font-medium mt-0.5">
                                Partial — {item.shortfall} unit
                                {item.shortfall !== 1 ? "s" : ""} short
                              </p>
                            )}
                          </td>
                          <td className="px-5 py-3 font-medium text-slate-800">
                            ₦{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-5 py-3 text-slate-500">
                            {item.quantity}
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`font-bold text-lg ${
                                item.decision === "partial"
                                  ? "text-amber-600"
                                  : "text-green-700"
                              }`}>
                              {item.buyQty}
                            </span>
                          </td>
                          <td className="px-5 py-3 font-semibold text-slate-800">
                            ₦{(item.subtotal ?? 0).toLocaleString()}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${item.demandScore * 10}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500">
                                {item.demandScore}/10
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <Badge
                              variant={item.isMustStock ? "green" : "slate"}>
                              {item.isMustStock ? "Must stock" : "Normal"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 border-t border-slate-200">
                        <td
                          colSpan={4}
                          className="px-5 py-3 text-sm font-semibold text-slate-700">
                          Total spent
                        </td>
                        <td className="px-5 py-3 font-bold text-green-700 text-base">
                          ₦{plan.totalSpent.toLocaleString()}
                        </td>
                        <td colSpan={2} />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Deferred */}
            {plan.defer.length > 0 && (
              <Card>
                <CardHeader>
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={() => setShowDefer((e) => !e)}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <CardTitle>
                        Defer — {plan.defer.length} item
                        {plan.defer.length !== 1 ? "s" : ""} · ₦
                        {plan.deferCostTotal.toLocaleString()} needed
                      </CardTitle>
                    </div>
                    {showDefer ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </CardHeader>
                {showDefer && (
                  <CardContent className="pt-2 space-y-3">
                    {plan.defer.map((item: BudgetItem, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            ₦{item.unitPrice.toLocaleString()} × {item.quantity}{" "}
                            units = ₦{item.totalCost.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-slate-400">Demand</p>
                          <p className="font-bold text-slate-700">
                            {item.demandScore}/10
                          </p>
                        </div>
                      </div>
                    ))}
                    {plan.amountToSave > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <p className="text-sm font-semibold text-amber-700">
                          Save an extra ₦{plan.amountToSave.toLocaleString()} to
                          cover all deferred items on your next trip.
                        </p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            )}

            {/* Bloom suggestions for deferred */}
            {plan.suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Bloom's Suggestions for Deferred Items</CardTitle>
                  <p className="text-xs text-slate-400 mt-1">
                    Based on Crawford University campus demand data
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.suggestions.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-xl border ${
                        s.urgency === "high"
                          ? "bg-red-50 border-red-200 text-red-700"
                          : s.urgency === "medium"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}>
                      <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">{s.product}</p>
                        <p className="text-xs leading-relaxed mt-0.5 opacity-80">
                          {s.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Start over */}
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={reset}
                className="gap-2">
                <Plus className="w-4 h-4" /> Plan another trip
              </Button>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SETTINGS
// ══════════════════════════════════════════════════════════════════════════════
export function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState(user?.storeName || "");
  const [location, setLocation] = useState(
    user?.location || "Crawford University, Igbesa",
  );

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Your name"
              defaultValue={user?.name || ""}
              readOnly
              className="bg-slate-50"
            />
            <Input
              label="Email"
              defaultValue={user?.email || ""}
              readOnly
              className="bg-slate-50"
            />
            <Input
              label="Store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
              }}
              className="gap-2">
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Bloom</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-500">
            <p>Data-driven inventory system for Crawford University vendors.</p>
            <p>
              Powered by{" "}
              <strong className="text-slate-700">465 student responses</strong>{" "}
              and <strong className="text-slate-700">7 vendor surveys</strong>,
              May 2026.
            </p>
            <p className="text-xs text-slate-400 pt-2">
              Final Year CS Project · Crawford University · 2026
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="danger"
              onClick={() => {
                logout();
                navigate("/");
              }}>
              Log out of Bloom
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}