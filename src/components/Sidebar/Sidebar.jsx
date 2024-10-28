import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white shadow-lg">
      <ul className="p-4 space-y-2">
        <li className="hover:bg-gray-700 rounded transition duration-200">
          <Link to="/dashboard" className="block p-2">Dashboard</Link>
        </li>
        <li className="hover:bg-gray-700 rounded transition duration-200">
          <Link to="/dashboard/products" className="block p-2">Products</Link>
        </li>
        <li className="hover:bg-gray-700 rounded transition duration-200">
          <Link to="/dashboard/orders" className="block p-2">Orders</Link>
        </li>
        <li className="hover:bg-gray-700 rounded transition duration-200">
          <Link to="/dashboard/store-settings" className="block p-2">Store Settings</Link>
        </li>
        <li className="hover:bg-gray-700 rounded transition duration-200">
          <Link to="/dashboard/profile" className="block p-2">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
