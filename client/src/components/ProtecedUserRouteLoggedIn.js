import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedUserRouteLoggedIn = ({children}) => {

    const {user} = UserAuth()
    
    return user !== null ? <Navigate to="/dashboard"/> : children;
}

export default ProtectedUserRouteLoggedIn;