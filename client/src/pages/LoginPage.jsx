import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../utils/api";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const { data } = await login({ email: formData.email, password: formData.password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "patient") navigate("/dashboard/patient");
        else if (data.role === "doctor") navigate("/dashboard/doctor");
        else if (data.role === "staff" || data.role === "admin") navigate("/dashboard/admin");
        else navigate("/");
      } else {
        await register({ ...formData, role: "patient" });
        alert("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-900">{isLogin ? "Login" : "Sign Up"}</h2>
        <p className="text-gray-600 text-center mb-6">
          {isLogin ? "Login to your account" : "Create a new account"}
        </p>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleForm} className="text-blue-600 font-semibold">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
