import { createBrowserRouter } from "react-router-dom";
import LoginPage  from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
// import RegisterPage from "./pages/RegisterPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/authLayout";
// import CreateBook from "./pages/CreateBook";
// import UpdateBook from "./pages/UpdateBook";

const router = createBrowserRouter([
    {
        path: "dashboard",
        element: <AppLayout />,
        children:[
            {
                path : "",
                element : <HomePage/>
            },
        ]
    },
    {
        path: "/auth",
        element : <AuthLayout />,
        children:[
            {
                path: "login",
                element : <LoginPage />
            },
        ]
    },
    
]);


export default router;