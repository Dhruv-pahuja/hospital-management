
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Get in Touch
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Our Contact Information
            </h2>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-3xl text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-3xl text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@yourwebsite.com</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">123 Main Street, Anytown, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
