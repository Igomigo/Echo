import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckPasswordPage from "../pages/checkPasswordPage";
import CheckEmailPage from "../pages/checkEmailPage";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "register",
            element: <RegisterPage/>
        },
        {
            path: "email",
            element: <CheckEmailPage/>
        },
        {
            path: "checkPassword",
            element: <CheckPasswordPage/>
        }
    ]
}]);

export default router;