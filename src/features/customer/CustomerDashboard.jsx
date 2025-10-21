import React from 'react';
// Reusing the same query/mutation hooks defined in apiSlice
import { useGetProductsQuery, useOrderProductMutation } from '../../app/apiSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';

const CustomerDashboard = () => {
  const { data: products, isLoading, isSuccess, isError } = useGetProductsQuery();
  const [orderProduct, { isLoading: isOrdering }] = useOrderProductMutation();
  const dispatch = useDispatch();

  const handleOrder = async (product) => {
    if (product.stock < 1) return alert("Item is out of stock!");
    
    const newStock = product.stock - 1;

    try {
      // Call the mutation to update the stock on the server
      await orderProduct({ id: product.id, newStock }).unwrap();
      // RTK Query automatically re-fetches the list, updating the UI
      alert(`Ordered 1 x ${product.name}!`);
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  if (isLoading) return <h2 style={{ textAlign: 'center' }}>Loading Catalog...</h2>;
  if (isError) return <h2 style={{ textAlign: 'center', color: 'red' }}>Error loading catalog.</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Customer Catalog 🛍️</h1>
        <button onClick={() => dispatch(logout())} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
          Logout
        </button>
      </div>
      
      {isSuccess && products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #28a745', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
          <h3>{product.name} - **${product.price}**</h3>
          <p>Stock Available: **{product.stock}**</p>
          
          <button 
            onClick={() => handleOrder(product)} 
            disabled={product.stock === 0 || isOrdering}
            style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomerDashboard;