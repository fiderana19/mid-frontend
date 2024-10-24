import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleBasedRouteProps {
    allowedRoles: string[];
}
const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
    const { token, isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/" />
    }

    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const userRole = decodedToken ? decodedToken.role[0] : null;
  
    if(allowedRoles.includes(userRole)) {
        return <Outlet />;
    } else {
        return <Navigate to="/unauthorized" />;
    }
}

export default RoleBasedRoute;
