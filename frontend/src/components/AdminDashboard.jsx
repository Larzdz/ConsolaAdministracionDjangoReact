// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [usersResponse, clicksResponse, sessionsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/users/', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/api/button-clicks/', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/api/session-logs/', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const enrichedData = usersResponse.data.map(user => {
          const userClicks = clicksResponse.data.filter(click => click.user === user.id);
          const userSessions = sessionsResponse.data.filter(session => session.user === user.id);

          const button1Clicks = userClicks.filter(click => click.button_number === 1).length;
          const button2Clicks = userClicks.filter(click => click.button_number === 2).length;

          const totalSessionDuration = userSessions.reduce((acc, session) => {
            const loginTime = new Date(session.login_time);
            const logoutTime = session.logout_time ? new Date(session.logout_time) : null;

            if (logoutTime) {
              return acc + (logoutTime - loginTime) / 1000; // Solo sumar si la sesión está cerrada
            }

            return acc; // Ignorar sesiones abiertas
          }, 0);

          const formatDuration = (seconds) => {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            return `${hrs}h ${mins}m ${secs}s`;
          };

          return {
            username: user.username,
            isAdmin: user.is_admin ? 'Sí' : 'No',
            button1Clicks,
            button2Clicks,
            sessionDuration: totalSessionDuration > 0 ? formatDuration(totalSessionDuration) : 'Sin datos',
          };
        });

        setUserData(enrichedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

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
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#202020' }}>
      <div style={{ backgroundColor: '#000000', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)', width: '80%', maxWidth: '800px' }}>
        <h1 style={{ textAlign: 'center', color: '#fff' }}>Admin Dashboard</h1>

        <div style={{ maxHeight: '350px', overflowY: 'scroll', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>Usuario</th>
                <th style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>¿Es Admin?</th>
                <th style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>Clics en Botón 1</th>
                <th style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>Clics en Botón 2</th>
                <th style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>Duración Total de Sesión</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>{user.username}</td>
                  <td style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>{user.isAdmin}</td>
                  <td style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>{user.button1Clicks}</td>
                  <td style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>{user.button2Clicks}</td>
                  <td style={{ border: '1px solid rgb(107, 105, 105)', padding: '8px', color: '#fff' }}>{user.sessionDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
