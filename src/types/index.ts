export interface Vendor {
  id: string;
  email: string;
  name: string;
  storeName: string;
  storeType: StoreType;
  products: string[];
  restockTime: string;
  location: string;
  createdAt: string;
}

export type StoreType =
  | "provision"
  | "food"
  | "drinks"
  | "stationery"
  | "toiletries"
  | "mixed";

export interface Product {
  name: string;
  weeklyUnits: number;
  restockEvery: string;
  demandScore: number;
  status: "high" | "medium" | "low";
  restockPoint: number;
}

export interface RestockAlert {
  product: string;
  currentStock: number;
  restockPoint: number;
  urgency: "critical" | "warning" | "ok";
  restockEvery: string;
}

export interface Recommendation {
  type: "add" | "reduce" | "maintain";
  product: string;
  reason: string;
  weeklyUnits?: number;
}

export interface GapItem {
  category: string;
  demandScore: number;
  supplyScore: number;
  gapScore: number;
  recommendation: string;
}

export interface SeasonalBanner {
  active: boolean;
  headline: string;
  message: string;
  products: string[];
  season?: string;
  period?: string;
}

export interface SeasonalAdd {
  product: string;
  reason: string;
  trigger: string;
}

export interface DashboardData {
  storeType: string;
  demandScore: number;
  weeklyRevenuePotential: string;
  insight: string;
  topProducts: Product[];
  restockAlerts: RestockAlert[];
  recommendations: Recommendation[];
  addThese: string[];
  reduce: string[];
  gapAnalysis: GapItem[];
  seasonalBanner?: SeasonalBanner;
  seasonalAdd?: SeasonalAdd[];
  seasonalContext?: {
    seasonLabel: string;
    periodLabel: string;
    monthName: string;
  };
}

export interface BudgetItem {
  name: string;
  unitPrice: number;
  quantity: number;
  totalCost: number;
  demandScore: number;
  purchaseRatePct: number;
  priorityScore: number;
  isMustStock: boolean;
  buyQty?: number;
  subtotal?: number;
  buyFull?: boolean;
  shortfall?: number;
  decision: "buy" | "partial" | "defer";
}

export interface BudgetPlan {
  budget: number;
  totalSpent: number;
  remaining: number;
  utilisation: number;
  buyNow: BudgetItem[];
  defer: BudgetItem[];
  deferCostTotal: number;
  amountToSave: number;
  advice: string;
  suggestions: { product: string; reason: string; urgency: string }[];
  summary: {
    itemsBought: number;
    itemsPartial: number;
    itemsDeferred: number;
    totalItems: number;
  };
}

export interface AdminVendor {
  id: string;
  name: string;
  email: string;
  storeName: string;
  storeType: string;
  products: string[];
  restockTime: string;
  location: string;
  createdAt: string;
}

export interface OnboardingData {
  step: number;
  name: string;
  email: string;
  password: string;
  storeName: string;
  storeType: StoreType | "";
  products: string[];
  restockTime: string;
  location: string;
}
