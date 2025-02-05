// src/components/UserLandingPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/logo2.png';

const UserLandingPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Obtener directamente la información del usuario autenticado
        const userResponse = await axios.get('http://localhost:8000/api/users/me/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsername(userResponse.data.username);
        localStorage.setItem('userId', userResponse.data.id); // Guardar el userId
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = async (buttonNumber) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/button-clicks/',
        { button_number: buttonNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`¡Clic registrado en el botón ${buttonNumber}!`);
    } catch (error) {
      console.error('Error al registrar el clic:', error);
      alert('Hubo un error al registrar el clic. Verifica tu sesión.');
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/api/users/logout/', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId'); // Limpiar el userId al cerrar sesión
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#202020', width: '100vw' }}>
      <div style={{ backgroundColor: '#000000', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)', color: '#ffffff', maxWidth: '800px', width: '100%', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src={logo2} alt="Logo" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }} />

        <div style={{ textAlign: 'left', flex: 1 }}>
          <h1 style={{ marginBottom: '10px', fontSize: '2rem', fontWeight: 'bold' }}> HOLA {username.toUpperCase()}👋</h1>
          <p style={{ marginBottom: '20px' }}>Esta es una breve descripción de la aplicación, donde puedes interactuar con los botones y explorar funcionalidades.</p>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <button onClick={() => handleClick(1)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Botón 1</button>
            <button onClick={() => handleClick(2)} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Botón 2</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;
