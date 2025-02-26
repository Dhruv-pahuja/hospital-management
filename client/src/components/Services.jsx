import { useState } from "react";
import { FaCogs, FaHeartbeat, FaShieldAlt, FaUsers } from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    title: "Cardiology",
    description:
      "Comprehensive heart care including diagnosis and treatment of heart diseases.",
    icon: <FaHeartbeat className="text-4xl text-red-600" />,
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Neurology",
    description:
      "Expert care for neurological disorders including brain and spinal issues.",
    icon: <FaCogs className="text-4xl text-blue-600" />,
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Orthopedics",
    description: "Treatment of musculoskeletal injuries and conditions.",
    icon: <FaShieldAlt className="text-4xl text-green-600" />,
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "General Medicine",
    description:
      "General health check-ups and treatment for a variety of conditions.",
    icon: <FaUsers className="text-4xl text-yellow-600" />,
    imgSrc: "https://via.placeholder.com/150",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ${
                selectedService === service.id ? "transform scale-105" : ""
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <img
                src={service.imgSrc}
                alt={service.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h2 className="text-2xl font-semibold text-blue-800 ml-3">
                    {service.title}
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                {
                  servicesData.find((service) => service.id === selectedService)
                    .title
                }
              </h2>
              <p className="text-gray-700 mb-4">
                {
                  servicesData.find((service) => service.id === selectedService)
                    .description
                }
              </p>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
