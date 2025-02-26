
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between mb-8">
          {/* About Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-400 mb-4">
              We are dedicated to providing the best healthcare services and
              ensuring the well-being of our community. Our mission is to offer
              compassionate and high-quality care.
            </p>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="flex items-center text-gray-400 mb-2">
              <FaMapMarkerAlt className="mr-2 text-gray-300" /> 123 Health St,
              Wellness City, HC 12345
            </p>
            <p className="flex items-center text-gray-400 mb-2">
              <FaPhoneAlt className="mr-2 text-gray-300" /> +91 123 456 7890
            </p>
            <p className="flex items-center text-gray-400">
              <FaEnvelope className="mr-2 text-gray-300" />{" "}
              contact@healthcare.com
            </p>
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-gray-400 hover:text-blue-600 transition duration-300" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-gray-400 hover:text-blue-400 transition duration-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-gray-400 hover:text-pink-500 transition duration-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-gray-400 hover:text-blue-700 transition duration-300" />
              </a>
            </div>
          </div>

          {/* Additional Links Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a
                  href="/"
                  className="hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/services"
                  className="hover:text-white transition duration-300"
                >
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/about"
                  className="hover:text-white transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/contact"
                  className="hover:text-white transition duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li className="mb-2 ]">{/* <GoogleTranslate /> */}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PatientFirst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
