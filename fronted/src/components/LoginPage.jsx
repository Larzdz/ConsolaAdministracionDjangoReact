import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username || !password) {
      setError('Por favor, ingresa usuario y contraseña.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      const accessToken = response.data.access;

      localStorage.setItem('token', accessToken);

      const userResponse = await axios.get('http://localhost:8000/api/users/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await axios.post('http://localhost:8000/api/users/login/', {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const user = userResponse.data.find((u) => u.username === username);

      if (user.is_admin) {
        localStorage.setItem('userType', 'admin');
        navigate('/admin');
      } else {
        localStorage.setItem('userType', 'user');
        navigate('/user');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.detail || 'Credenciales incorrectas.');
      } else {
        setError('No se pudo conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#0000', minWidth: '300px' }}>
        <h1>Iniciar Sesión</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: '10px', padding: '10px', width: '250px' }}
          />
          <br />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '10px', padding: '10px', width: '250px' }}
          />
          <br />
          <button type="submit" style={{ padding: '10px 20px', width: '100%' }} disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
