import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token =
        localStorage.getItem("token");

    // IF NO TOKEN
    if (!token) {

        return <Navigate to="/" />;

    }

    // IF TOKEN EXISTS
    return children;

}

export default ProtectedRoute;