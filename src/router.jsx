import ErrorBoundary from './components/ErrorBoundary';

// ... other imports ...

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorBoundary />
  },
  // ... other routes ...
]); 