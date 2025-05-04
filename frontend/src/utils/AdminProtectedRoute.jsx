import { Navigate } from "react-router-dom";
import { getToken, getUser } from "./Tokens";

const AdminProtectedRoute = ({ children }) => {
    const token = getToken();
    const user = getUser();
    const isAdmin = user.role === "admin";
    return token && isAdmin ? children : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
