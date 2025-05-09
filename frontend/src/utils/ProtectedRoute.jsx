import { Navigate } from "react-router-dom";
import { getToken } from "./Tokens";

const ProtectedRoute = ({ children }) => {
    const token = getToken();
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
