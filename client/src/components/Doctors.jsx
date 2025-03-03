import { useEffect, useState } from "react";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchDoctors();
  },[]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/doctors/all`);
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const addDoctor = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/doctors`, {
        name,
        department,
        description,
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td className="border p-2">{doc.name}</td>
              <td className="border p-2">{doc.department}</td>
              <td className="border p-2">{doc.description}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteDoctor(doc._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addDoctor}
          className="bg-green-500 text-white px-4 py-2"
        >
          Add Doctor
        </button>
      </div>
    </div>
  );
};

export default Doctors;
