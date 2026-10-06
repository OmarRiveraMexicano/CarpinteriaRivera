import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FiArrowRight,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../Services/authService";

import "./Login.css";

import { useAuth } from "../../context/AuthContext";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { loadUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            const user = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            console.log("Login correcto:", user);
            await loadUser();
            navigate("/");
        } catch (error) {
            console.error(error);

            setError(
                error.message ||
                "No pudimos iniciar sesión."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <div className="login-decoration login-decoration--one" />
            <div className="login-decoration login-decoration--two" />

            <section className="login-container">
                <div className="login-intro">
                    <span className="login-eyebrow">
                        Área de clientes
                    </span>

                    <h1>
                        Bienvenido
                        <br />
                        de vuelta.
                    </h1>

                    <p>
                        Inicia sesión para consultar tus pedidos,
                        mantener tu información disponible y continuar
                        con tus compras.
                    </p>

                </div>

                <div className="login-card">
                    <div className="login-card-heading">
                        <span>Iniciar sesión</span>

                        <h2>Accede a tu cuenta</h2>

                        <p>
                            Ingresa tu correo y contraseña para continuar.
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="login-field">
                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <div className="login-input">
                                <FiMail />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <div className="login-field-header">
                                <label htmlFor="password">
                                    Contraseña
                                </label>

                                <button
                                    type="button"
                                    className="login-forgot"
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    ¿La olvidaste?
                                </button>
                            </div>

                            <div className="login-input">
                                <FiLock />

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Tu contraseña"
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="login-password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (current) => !current
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {showPassword ? (
                                        <FiEyeOff />
                                    ) : (
                                        <FiEye />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Ingresando..."
                                : "Iniciar sesión"}

                            {!loading && <FiArrowRight />}
                        </button>

                        <p className="login-register">
                            ¿Aún no tienes cuenta?
                            {" "}
                            <Link to="/register">
                                Crear una
                            </Link>
                        </p>
                    </form>

                </div>
            </section>
        </main>
    );
}

export default Login;