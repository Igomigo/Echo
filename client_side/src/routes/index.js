import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CheckPasswordPage from "../pages/checkPasswordPage/CheckPasswordPage";
import CheckEmailPage from "../pages/checkEmailPage/CheckEmailPage";
import HomePage from "../pages/homePage/HomePage";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout/index";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "register",
            element: <AuthLayouts><RegisterPage/></AuthLayouts>
        },
        {
            path: "email",
            element: <AuthLayouts><CheckEmailPage/></AuthLayouts>
        },
        {
            path: "password",
            element: <AuthLayouts><CheckPasswordPage/></AuthLayouts>
        },
        {
            path: "forgotPassword",
            element: <AuthLayouts><ForgotPassword/></AuthLayouts>
        },
        {
            path: "",
            element: <HomePage/>,
            children: [
                {
                    path: ":userId",
                    element: <MessagePage/>
                }
            ]
        },
    ]
}]);

export default router;