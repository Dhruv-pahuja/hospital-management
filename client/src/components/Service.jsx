import { useState } from "react";
import { Link } from "react-router-dom";
const services = [
  {
    name: "Neurology",
    icon: "fas fa-brain",
    servicesList: ["EEG", "EMG", "Nerve Conduction Studies"],
  },
  {
    name: "Cardiology",
    icon: "fas fa-heartbeat",
    servicesList: ["ECG", "Echo", "Stress Test"],
    active: true,
  },
  {
    name: "Orthopedics",
    icon: "fas fa-bone",
    servicesList: [
      "Joint Replacement",
      "Fracture Treatment",
      "Sports Injuries",
    ],
  },
  {
    name: "Surgery",
    icon: "fas fa-scalpel",
    servicesList: ["Laparoscopic Surgery", "General Surgery"],
  },
  {
    name: "Dentistry",
    icon: "fas fa-tooth",
    servicesList: ["Root Canal", "Dental Implants", "Teeth Whitening"],
  },
  {
    name: "Radiology",
    icon: "fas fa-x-ray",
    servicesList: ["MRI", "CT Scan", "Ultrasound"],
  },
  {
    name: "Urology",
    icon: "fas fa-notes-medical",
    servicesList: ["Kidney Stones", "Bladder Health"],
  },
  {
    name: "Medicine",
    icon: "fas fa-pills",
    servicesList: ["General Medicine", "Diabetes Management"],
  },
];

const Service = () => {
  const [selectedService, setSelectedService] = useState(services[1]); // Default: Cardiology

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10">
        Our Medical Services
      </h1>

      {/* Service and Department Section */}
      <div className="flex">
        {/* Services List */}
        <div className="grid grid-cols-3 gap-8 w-2/3">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105 
              ${service === selectedService ? "bg-blue-100" : "bg-white"}`}
              onClick={() => handleServiceClick(service)}
            >
              <i
                className={`${
                  service.icon
                } text-4xl mb-4 transition duration-300 
                ${
                  service === selectedService
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              ></i>
              <p
                className={`text-lg font-bold transition 
                ${
                  service === selectedService
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                {service.name}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Department Info */}
        <div className="w-1/3 pl-12">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-5">
            {selectedService.name} Department
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {selectedService.servicesList.map((service, index) => (
              <li key={index} className="mb-3 text-lg">
                {service}
              </li>
            ))}
          </ul>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
            <Link to={"/appointment"}>Book an Appointment</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
