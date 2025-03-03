import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/inventory`);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post(`${API_URL}/api/inventory/add`, {
        itemName,
        quantity: Number(quantity),
      });
      fetchInventory();
      setItemName("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateStock = async (id, newQuantity) => {
    try {
      await axios.put(`${API_URL}/api/inventory/update/${id}`, {
        quantity: newQuantity,
      });
      fetchInventory();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/inventory/delete/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-6">
        Inventory Management
      </h2>

      {/* Add Item Form */}
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-2 border rounded mb-2"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded mb-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          onClick={addItem}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Item
        </button>
      </div>

      {/* Inventory Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">Item Name</th>
              <th className="py-2 px-4 text-center">Quantity</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No inventory items.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2 px-4">{item.itemName}</td>
                  <td className="py-2 px-4 text-center">{item.quantity}</td>
                  <td className="py-2 px-4 text-center flex justify-center space-x-2">
                    <button
                      onClick={() => updateStock(item._id, item.quantity + 1)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      + Add
                    </button>
                    <button
                      onClick={() =>
                        item.quantity > 0 &&
                        updateStock(item._id, item.quantity - 1)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      - Use
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
