import ProductCard from "../components/Products/ProductCard.jsx";

const Products = () => {
  const products = [
    // Example product data
    { id: 1, name: 'Product 1', price: 29.99, stock: 10, image: '' },
    { id: 2, name: 'Product 2', price: 19.99, stock: 5, image: '' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
