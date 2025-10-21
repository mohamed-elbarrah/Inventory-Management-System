import React, { useState } from 'react';
import { useGetProductsQuery, useUpdateProductMutation } from '../../app/apiSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';

const ManagerDashboard = () => {
  const { data: products, isLoading, isSuccess, isError } = useGetProductsQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [editProduct, setEditProduct] = useState(null);
  const dispatch = useDispatch();

  const handleUpdate = async (e, product) => {
    e.preventDefault();
    const newStock = Number(e.target.stock.value);
    
    try {
      // 1. Call the mutation
      await updateProduct({ id: product.id, stock: newStock }).unwrap();
      // 2. RTK Query handles the automatic re-fetch of the product list!
      setEditProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (isLoading) return <h2 style={{ textAlign: 'center' }}>Loading Products...</h2>;
  if (isError) return <h2 style={{ textAlign: 'center', color: 'red' }}>Error loading products.</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Manager Dashboard 🛠️</h1>
        <button onClick={() => dispatch(logout())} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
          Logout
        </button>
      </div>

      {isSuccess && products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #3498db', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
          <h3>{product.name} (${product.price})</h3>
          <p>Current Stock: **{product.stock}**</p>
          
          <button onClick={() => setEditProduct(product)} disabled={isUpdating} style={{ marginRight: '10px', padding: '8px 12px', cursor: 'pointer' }}>
            {isUpdating ? 'Saving...' : 'Edit Stock'}
          </button>

          {editProduct && editProduct.id === product.id && (
            <form onSubmit={(e) => handleUpdate(e, product)} style={{ display: 'inline-block', marginLeft: '10px' }}>
              <input type="number" name="stock" defaultValue={product.stock} min="0" required style={{ padding: '5px', width: '80px' }}/>
              <button type="submit" disabled={isUpdating} style={{ marginLeft: '5px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
                Save
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManagerDashboard;