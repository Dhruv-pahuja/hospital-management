import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/authLayout";
import DoctorDashboard from "./components/doctor-dashboard";
import PatientDashboard from "./components/patient-dashboard";
// import AdminDashboard from "./components/admin-dashboard";
import Home from "./components/Home";
import Specialists from "./components/Specialists";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
// import ProtectedRoute from "./components/ProtectedRoute"; 
import SignupPage from "./pages/SignupPage";
import QueueSystem from "./components/QueueSystem";
import BookAppointment from "./components/BookAppointment";
import Inventory from "./components/Inventory";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";

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
        element: <DoctorDashboard />

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
        children : [
          {path : 'inventory', element : <Inventory/>},
          {path : "patients", element : <Patients/>},
          {path : "doctors", element : <Doctors/>},
        ],
      },
    ],
  },
  {
    path: "/queue",
    element: <AppLayout />,
    children: [
      {
        path : "",
        element : <QueueSystem/>
      },
    ],
  },
  {
    path: "/appointment",
    element: <AppLayout />,
    children: [
      {
        path : "",
        element : <BookAppointment/>
      },
    ],
  },
]);

export default router;
