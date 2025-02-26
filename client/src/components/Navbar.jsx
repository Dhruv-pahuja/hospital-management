import { Link, useLocation, useNavigate } from "react-router-dom";
import useTokenStore from "../store"; // Assuming Zustand for token management

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, removeToken } = useTokenStore();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 w-full left-0 z-50 bg-white flex justify-between items-center py-4 px-8 shadow-md">
      <div className="flex items-center">
        <img
          src="https://romaletodiani.github.io/Hospital-Website/assets/Logo-53d3708b.png"
          width="40px"
          height="40px"
          alt="Your Health Logo"
        />
        <h1 className="ml-3 text-2xl font-extrabold tracking-tight text-blue-900">
          PatientFirst
        </h1>
      </div>
      <div className="flex space-x-6">
        {[
          { name: "Home", path: "/" },
          { name: "Specialists", path: "/specialists" },
          { name: "Services", path: "/services" },
          { name: "Contact Us", path: "/contactus" },
        ].map(({ name, path, isButton }) => (
          <Link key={path} to={path}>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                location.pathname === path ? "text-blue-600 font-bold" : "text-gray-500"
              } hover:text-blue-600 transition duration-300 ${isButton ? "bg-red-500 text-white font-semibold text-xl rounded-full hover:bg-red-600 shadow-lg" : ""}`}
            >
              {name}
            </button>
          </Link>
        ))}

        {!token ? (
          <Link to="/auth/login">
            <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-blue-600 transition duration-300">
              Login/Sign Up
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:text-red-700 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
