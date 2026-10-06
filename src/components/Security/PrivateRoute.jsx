import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    /*
     * Importante:
     * esperamos a que /auth/api/me termine.
     */
    if (loading) {
        return (
            <div className="route-loading">
                Cargando...
            </div>
        );
    }

    /*
     * Sin sesión -> login.
     */
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    /*
     * Tiene sesión -> puede continuar.
     */
    return children;
}

export default PrivateRoute;