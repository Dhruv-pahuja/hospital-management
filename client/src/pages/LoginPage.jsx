import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "patient") navigate("/dashboard/patient");
      else if (data.role === "doctor") navigate("/dashboard/doctor");
      else if (data.role === "staff" || data.role === "admin") navigate("/dashboard/admin");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-900">Login</h2>
        <p className="text-gray-600 text-center mb-6">Login to your account</p>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Dont have an account?{" "}
          <button onClick={() => navigate("/auth/signup")} className="text-blue-600 font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
