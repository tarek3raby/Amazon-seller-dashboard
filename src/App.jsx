import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';

import AddEditProduct from './pages/AddEditProduct';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import StoreSettings from './pages/StoreSettings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AuthProvider from './Context/authentication';
import Welcome from './pages/Welcome';
import SellerRegister from './pages/SellerRegister';
import Products from './pages/Products';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { BrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />, // Use AuthLayout for login and registration
    children: [
      { path: '/welcome', element: <Welcome /> },
      { path: '/login', element: <Login /> },
      { path: '/seller-register', element: <SellerRegister /> },
    ],
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <Products /> },
      { path: 'products/new', element: <AddEditProduct /> },
      { path: 'products/edit/:id', element: <AddEditProduct /> },
      { path: 'orders', element: <Orders /> },
      { path: 'orders/:id', element: <OrderDetails /> },
      { path: 'store-settings', element: <StoreSettings /> },
      { path: 'profile', element: <Profile /> },
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
