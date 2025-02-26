import { useEffect, useState } from 'react';
import { getBedAvailability, getInventory, getAppointments } from '../utils/api';

export const Dashboard = () => {
  const [beds, setBeds] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getBedAvailability().then((res) => setBeds(res.data));
    getInventory().then((res) => setInventory(res.data));
    getAppointments().then((res) => setAppointments(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Beds: {beds.length}</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Inventory: {inventory.length}</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Appointments: {appointments.length}</div>
      </div>
    </div>
  );
};
