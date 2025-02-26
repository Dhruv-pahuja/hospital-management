
import { FaUserMd, FaSearch } from "react-icons/fa";

const specialists = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    imgSrc: "/doc1.webp",
    description: "Expert in heart diseases and treatments.",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Neurologist",
    imgSrc: "/doc2.webp",
    description: "Specializes in brain and nervous system disorders.",
  },
  // Add more specialists as needed
];

const Specialists = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Our Specialists
        </h1>
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search specialists..."
              className="w-full py-2 px-4 pl-10 border rounded-lg shadow-lg"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-500" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {specialists.map((specialist) => (
            <div
              key={specialist.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={specialist.imgSrc}
                alt={specialist.name}
                className="w-full h-45 object-fit"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                  {specialist.name}
                </h2>
                <h3 className="text-xl text-gray-600 mb-4">
                  <FaUserMd className="inline mr-2 text-blue-500" />
                  {specialist.specialty}
                </h3>
                <p className="text-gray-700 mb-4">{specialist.description}</p>
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specialists;
