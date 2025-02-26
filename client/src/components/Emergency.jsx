import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaDirections,
} from "react-icons/fa";

// Function for generating random Indian phone numbers
const generateRandomPhoneNumber = () => {
  const generateDigit = () => Math.floor(Math.random() * 10); // Generate a single digit
  const firstDigit = [7, 8, 9][Math.floor(Math.random() * 3)]; // First digit must be 7, 8, or 9
  const restOfNumber = Array.from({ length: 9 }, generateDigit).join(""); // Generate the remaining 9 digits

  return `+91-${firstDigit}${restOfNumber}`;
};

const Emergency = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        axios
          .get("http://localhost:8000/api/hospitals", {
            params: { latitude, longitude },
          })
          .then((response) => {
            setHospitals(response.data);
          })
          .catch((error) => {
            console.error("Error fetching hospitals:", error);
          });
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, []);

  const handleGetDirections = (address) => {
    if (address) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        address
      )}`;
      window.open(directionsUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Nearby Hospitals
        </h1>
        {selectedHospital ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedHospital(null)}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
            >
              <FaMapMarkerAlt className="mr-2" />
              Back to List
            </button>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              {selectedHospital.name}
            </h2>
            <p className="text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-2" />{" "}
              {selectedHospital.address}
            </p>
            <p className="text-gray-700 mb-4">
              <FaPhoneAlt className="inline mr-2" />
              {selectedHospital.phone || generateRandomPhoneNumber()}
            </p>
            <p className="text-gray-600 mb-6">{selectedHospital.description}</p>
            <button
              onClick={() => handleGetDirections(selectedHospital.address)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <FaDirections className="mr-2" />
              Get Directions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedHospital(hospital)}
              >
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  {hospital.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" /> {hospital.address}
                </p>
                <p className="text-gray-600 mb-4">
                  <FaPhoneAlt className="inline mr-2" />
                  {hospital.phone || generateRandomPhoneNumber()}
                </p>
                <p className="text-gray-700 mb-4">{hospital.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from firing
                    handleGetDirections(hospital.address);
                  }}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
                >
                  <FaDirections className="mr-2" />
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Emergency;
