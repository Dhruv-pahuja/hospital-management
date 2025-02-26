import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DoctorDashboard from "./components/doctor-dashboard";
import PatientDashboard from "./components/patient-dashboard";
import AdminDashboard from "./components/admin-dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/LogoutBtn";
import Home from "./components/Home";
import Specialists from "./components/Specialists";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
// import Emergency from "./components/Emergency";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/specialists", element: <Specialists /> },
      { path: "/services", element: <Services /> },
      { path: "/contactus", element: <ContactUs /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/dashboard",
    // element: <ProtectedRoute />, // Protect dashboard routes
    children: [
      { path: "doctor", element: <DoctorDashboard /> },
      { path: "patient", element: <PatientDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
  { path: "/logout", element: <Logout /> },
]);

export default router;
