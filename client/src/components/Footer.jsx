import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">

          <div>
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are dedicated to providing the best healthcare services and ensuring the well-being of our community. 
              Our mission is to offer compassionate and high-quality care.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="flex items-center justify-center md:justify-start text-gray-400 mb-2">
              <FaMapMarkerAlt className="mr-2 text-gray-300" /> 123 Health St, Wellness City, HC 12345
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-400 mb-2">
              <FaPhoneAlt className="mr-2 text-gray-300" /> +91 123 456 7890
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-400">
              <FaEnvelope className="mr-2 text-gray-300" /> contact@healthcare.com
            </p>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-gray-400 hover:text-blue-600 transition duration-300 text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-400 hover:text-blue-400 transition duration-300 text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-400 hover:text-pink-500 transition duration-300 text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-gray-400 hover:text-blue-700 transition duration-300 text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-white transition duration-300">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="hover:text-white transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PatientFirst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
