import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);
export const getBedAvailability = () => API.get('/api/beds');
export const getInventory = () => API.get('/api/inventory');
export const getAppointments = () => API.get('/api/appointments');
