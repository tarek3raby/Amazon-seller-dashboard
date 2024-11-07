import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl text-red-600 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
} 