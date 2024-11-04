import PropTypes from 'prop-types';

const OrderCard = ({ order }) => {
  return (
    <div className="border rounded-md p-4 shadow-md hover:shadow-lg transition duration-200">
      <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
      <p className="text-gray-700">Status: {order.status}</p>
      <p className="text-gray-700">Total Price: ${order.totalPrice.toFixed(2)}</p>
      <p className="text-gray-700">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    orderDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
