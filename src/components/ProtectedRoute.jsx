import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = ({
    user,
    redirectPath = '/',
    children,
}) => {
    if (!Cookies.get('token')) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};
export default ProtectedRoute;