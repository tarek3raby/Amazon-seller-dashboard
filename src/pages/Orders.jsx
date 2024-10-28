
import OrderCard from "../components/Orders/OrderCard";

const Orders = () => {
  // Dummy data for testing
  const dummyOrders = [
    { id: 1, status: "Pending", totalPrice: 50, orderDate: "2023-10-01" },
    { id: 2, status: "Shipped", totalPrice: 30, orderDate: "2023-10-02" },
    { id: 3, status: "Delivered", totalPrice: 20, orderDate: "2023-10-03" },
  ];

  return (
    <div className="orders-container p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="orders-title text-2xl font-bold mb-4">Orders</h2>
      <div className="flex space-x-4"> 
        {dummyOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
