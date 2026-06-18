import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";
import OnboardingPage from "@/pages/OnboardingPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminPage from "@/pages/AdminPage";
import {
  ProductsPage,
  AlertsPage,
  RecommendationsPage,
  BudgetPlannerPage,
  SettingsPage,
} from "@/pages/AppPages";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-green-600 flex items-center justify-center animate-pulse">
            <svg
              width="20"
              height="20"
              viewBox="0 0 40 40"
              fill="none">
              <ellipse
                cx="20"
                cy="13"
                rx="4"
                ry="7"
                fill="white"
                fillOpacity="0.9"
              />
              <ellipse
                cx="20"
                cy="13"
                rx="4"
                ry="7"
                fill="white"
                fillOpacity="0.6"
                transform="rotate(72 20 20)"
              />
              <ellipse
                cx="20"
                cy="13"
                rx="4"
                ry="7"
                fill="white"
                fillOpacity="0.6"
                transform="rotate(144 20 20)"
              />
              <ellipse
                cx="20"
                cy="13"
                rx="4"
                ry="7"
                fill="white"
                fillOpacity="0.6"
                transform="rotate(216 20 20)"
              />
              <ellipse
                cx="20"
                cy="13"
                rx="4"
                ry="7"
                fill="white"
                fillOpacity="0.6"
                transform="rotate(288 20 20)"
              />
              <circle
                cx="20"
                cy="20"
                r="4"
                fill="white"
              />
              <circle
                cx="20"
                cy="20"
                r="2.5"
                fill="#16a34a"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-400 font-medium">Loading Bloom...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated)
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated)
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <PublicRoute>
            <OnboardingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/admin"
        element={<AdminPage />}
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <AlertsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <RecommendationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/budget"
        element={
          <ProtectedRoute>
            <BudgetPlannerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
