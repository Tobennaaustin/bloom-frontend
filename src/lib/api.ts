import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bloom_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("bloom_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data: {
    name: string;
    email: string;
    password: string;
    storeName: string;
    storeType: string;
    products: string[];
    restockTime: string;
    location: string;
  }) => api.post("/auth/register", data),
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  me: () => api.get("/auth/me"),
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const dashboardApi = {
  getData: () => api.get("/dashboard"),
  getProducts: () => api.get("/dashboard/products"),
  getAlerts: () => api.get("/dashboard/alerts"),
  getRecommendations: () => api.get("/dashboard/recommendations"),
  getGapAnalysis: () => api.get("/dashboard/gap-analysis"),
  updateProducts: (p: string[]) =>
    api.put("/dashboard/products", { products: p }),
};

// ── Budget Planner ────────────────────────────────────────────────────────────
export const budgetApi = {
  createPlan: (
    budget: number,
    items: { name: string; unitPrice: number; quantity: number }[],
  ) => api.post("/budget/plan", { budget, items }),
  getHistory: () => api.get("/budget/history"),
};

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminApi = {
  getStats: (key: string) =>
    api.get("/admin/stats", { headers: { "X-Admin-Key": key } }),
  getVendors: (
    key: string,
    params?: { page?: number; search?: string; storeType?: string },
  ) => api.get("/admin/vendors", { headers: { "X-Admin-Key": key }, params }),
  getVendor: (key: string, id: string) =>
    api.get(`/admin/vendors/${id}`, { headers: { "X-Admin-Key": key } }),
  deleteVendor: (key: string, id: string) =>
    api.delete(`/admin/vendors/${id}`, { headers: { "X-Admin-Key": key } }),
  exportVendors: (key: string) =>
    `${import.meta.env.VITE_API_URL || "/api"}/admin/export/vendors?admin_key=${key}`,
  exportBudgetPlans: (key: string) =>
    `${import.meta.env.VITE_API_URL || "/api"}/admin/export/budget-plans?admin_key=${key}`,
  health: (key: string) =>
    api.get("/admin/health", { headers: { "X-Admin-Key": key } }),
};

export default api;
