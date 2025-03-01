import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DoctorDashboard from "./components/doctor-dashboard";
import PatientDashboard from "./components/patient-dashboard";
import AdminDashboard from "./components/admin-dashboard";
import Home from "./components/Home";
import Specialists from "./components/Specialists";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import ProtectedRoute from "./components/ProtectedRoute"; 
import SignupPage from "./pages/SignupPage";
import QueueSystem from "./components/QueueSystem";
import BookAppointment from "./components/BookAppointment";

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
      { path: "signup", element: <SignupPage /> },
      
    ],
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "doctor",
        element: (
          // <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          // </ProtectedRoute>
        ),
      },
      {
        path: "patient",
        element: (
          // <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          // {/* </ProtectedRoute> */}
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/queue",
    element: <QueueSystem />,
  },
  {
    path: "/appointment",
    element: <BookAppointment/>
  },
]);

export default router;
