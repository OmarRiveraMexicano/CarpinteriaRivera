import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export const AuthContext = createContext(null);

const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const response = await fetch(
                `${API_URL}/auth/api/users/me`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();

            setUser(data);
        } catch (error) {
            console.error(
                "Error al cargar usuario:",
                error
            );

            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch(
                `${API_URL}/auth/api/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
        } catch (error) {
            console.error(
                "Error al cerrar sesión:",
                error
            );
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                loadUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider"
        );
    }

    return context;
}