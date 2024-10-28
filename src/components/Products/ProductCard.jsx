import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 bg-white">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-2" />
      <h3 className="text-xl font-semibold text-gray-800 mt-2">{product.name}</h3>
      <p className="text-gray-600 text-sm">Price: <span className="font-bold">${product.price.toFixed(2)}</span></p>
      <p className="text-gray-600 text-sm">Stock: <span className="font-bold">{product.stock}</span></p>
      <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
