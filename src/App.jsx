import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/Protect/ProtectedRoute";
import AuthProvider from "./Context/authentication";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";

// Create a loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    Loading...
  </div>
);

// Lazy imports remain the same
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const AddEditProduct = lazy(() => import("./pages/AddEditProduct"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const StoreSettings = lazy(() => import("./pages/StoreSettings"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Welcome = lazy(() => import("./pages/Welcome"));
const SellerRegister = lazy(() => import("./pages/SellerRegister"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/welcome",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Welcome />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      { 
        path: "/login", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ) 
      },
      {
        path: "/seller-register",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <SellerRegister />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { 
        path: "dashboard", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ) 
      },
      { 
        path: "products", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Products />
          </Suspense>
        ) 
      },
      { 
        path: "products/new", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddEditProduct />
          </Suspense>
        ) 
      },
      { 
        path: "products/edit/:id", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddEditProduct />
          </Suspense>
        ) 
      },
      { 
        path: "orders", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Orders />
          </Suspense>
        ) 
      },
      { 
        path: "orders/:id", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <OrderDetails />
          </Suspense>
        ) 
      },
      { 
        path: "store-settings", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <StoreSettings />
          </Suspense>
        ) 
      },
      { 
        path: "profile", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Profile />
          </Suspense>
        ) 
      },
      { 
        path: "products/:id", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductDetails />
          </Suspense>
        ) 
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
