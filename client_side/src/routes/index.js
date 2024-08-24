import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import HomePage from "../pages/HomePage";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout/index";

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
            path: "",
            element: <HomePage/>,
            children: [
                {
                    path: ":userId",
                    element: <MessagePage/>
                }
            ]
        }
    ]
}]);

export default router;