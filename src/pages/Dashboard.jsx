import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import moment from 'moment';
import { authContext } from '../Context/authentication';

const Dashboard = () => {
  const { token } = useContext(authContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('https://ahmed-sabry-ffbbe964.koyeb.app/sellers/dashboard/stats', {
          headers: {
            Authorization: `${token}`
          }
        });
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardStats();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error || 'Failed to load dashboard data'}</p>
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

  // Prepare data for order status pie chart
  const orderStatusData = [
    { name: 'Pending', value: dashboardData.orders.pending },
    { name: 'Completed', value: dashboardData.orders.completed },
    { name: 'Shipped', value: dashboardData.orders.shipped },
    { name: 'Delivered', value: dashboardData.orders.delivered },
    { name: 'Cancelled', value: dashboardData.orders.cancelled },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

  console.log('Recent Orders Data:', dashboardData.recentOrders);

  return (
    <div className="p-4 lg:p-6 bg-gray-50 mt-16 md:mt-20">
      {/* Welcome Section */}
      <div className="mb-6 md:mb-8 animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Overview</h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {[
          {
            title: 'Total Orders',
            value: dashboardData.orders.total,
            icon: '📦',
            detail: `${dashboardData.orders.completed} completed`,
            color: 'blue'
          },
          {
            title: 'Products',
            value: dashboardData.products.total,
            icon: '🛍️',
            detail: `${dashboardData.products.inStock} in stock`,
            color: 'green'
          },
          {
            title: 'Revenue',
            value: `$${dashboardData.revenue.total}`,
            icon: '💰',
            detail: 'Total earnings',
            color: 'purple'
          },
          {
            title: 'Stock Status',
            value: dashboardData.products.lowStock,
            icon: '⚠️',
            detail: 'Low stock items',
            color: 'red'
          }
        ].map((stat, index) => (
          <div
            key={stat.title}
            className={`bg-white p-6 rounded-xl shadow-sm border border-${stat.color}-100 
              hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
              animate-fadeIn`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-${stat.color}-500 text-sm font-medium`}>
                {stat.detail}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        {/* Order Status Chart */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-0">Order Status Distribution</h3>
            <div className="flex flex-wrap gap-2">
              {orderStatusData.map((entry, index) => (
                <span key={entry.name} className="flex items-center text-xs">
                  <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index] }}></span>
                  {entry.name}
                </span>
              ))}
            </div>
          </div>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="text-base md:text-lg font-medium mb-4">Top Products</h3>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dashboardData.topProducts}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name.en" 
                  tick={false}
                  height={50}
                />
                <YAxis />
                <Tooltip 
                  wrapperStyle={{ zIndex: 100 }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow max-w-[200px] break-words">
                          <p className="text-sm truncate">{payload[0].payload.name.en}</p>
                          <p className="text-sm font-bold">Sales: {payload[0].payload.totalSold}</p>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Bar 
                  dataKey="totalSold" 
                  fill="#8884d8"
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm animate-fadeIn overflow-hidden">
        <h3 className="text-base md:text-lg font-medium p-4 md:p-6 border-b">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(order.createdAt).format('MMM DD, YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.orderStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                        order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.products.reduce((total, product) => {
                      // Calculate total by multiplying price with quantity from matching item
                      const orderItem = order.items.find(item => item.productId === product._id);
                      return total + (product.price * (orderItem?.quantity || 1));
                    }, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
