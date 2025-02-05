import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // Esencial para el manejo de cookies de sesión
});

export const login = (username, password) => {
    return api.post('login/', { username, password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const logout = () => {
    return axios.post(`${API_URL}logout/`);
};

export const fetchDashboardData = () => {
    return axios.get(`${API_URL}admin-dashboard/`);
};

export const buttonClick = (buttonNumber) => {
    return api.post(`${API_URL}button-click/`, { button_number: buttonNumber }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
