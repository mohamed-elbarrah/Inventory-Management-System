import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice'; 
import { useGetUsersQuery } from '../../app/apiSlice'; 

const AuthPage = () => {
  const [username, setUsername] = useState('admin'); // Default for easy testing
  const [password, setPassword] = useState('123');
  const [isLogin, setIsLogin] = useState(true); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Fetch users for mock authentication
  const { data: users = [], isLoading } = useGetUsersQuery(); 

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent submission while data is loading

    if (isLogin) {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        dispatch(setCredentials({ 
            username: foundUser.username, 
            role: foundUser.role 
        }));

        // --- Redirect Logic ---
        if (foundUser.role === 'manager') {
          navigate('/manager-dashboard');
        } else if (foundUser.role === 'customer') {
          navigate('/customer-dashboard');
        }
      } else {
        alert('Login Failed: Invalid credentials.');
      }
    } else {
        // Simplified registration logic (not implemented fully on mock backend)
        alert('Registration successful (Mock)! Please login.');
        setIsLogin(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h2>{isLogin ? 'Inventory Login' : 'Register Account'}</h2>
      <form onSubmit={handleAuthSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '20px' }}/>
        
        <button type="submit" disabled={isLoading} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', marginTop: '15px' }}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;