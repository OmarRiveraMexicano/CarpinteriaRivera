import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FiArrowRight,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
    FiUser,
} from "react-icons/fi";

import { registerUser } from "../../components/Services/userService.js";

import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

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

        setError("");

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password
        ) {
            setError(
                "Completa todos los campos."
            );
            return;
        }

        if (formData.password.length < 8) {
            setError(
                "La contraseña debe tener al menos 8 caracteres."
            );
            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            setError(
                "Las contraseñas no coinciden."
            );
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
            });

            navigate("/login", {
                state: {
                    registered: true,
                },
            });
        } catch (err) {
            setError(
                err.message ||
                "Ocurrió un error al crear tu cuenta."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="register-page">
            <div className="register-decoration register-decoration--one" />
            <div className="register-decoration register-decoration--two" />

            <section className="register-layout">

                <div className="register-intro">
                    <span className="register-eyebrow">
                        Carpintería Rivera
                    </span>

                    <h1>
                        Crea una cuenta
                        <br />
                        <em>hecha para ti.</em>
                    </h1>

                    <p>
                        Guarda tus datos, consulta tus pedidos
                        y disfruta de una experiencia más
                        sencilla al comprar nuestras piezas.
                    </p>

                    <div className="register-intro-line" />

                    <span className="register-small-text">
                        Muebles creados con detalle,
                        carácter y madera.
                    </span>
                </div>

                <div className="register-card">

                    <div className="register-card-header">
                        <span>Nuevo cliente</span>

                        <h2>Crear cuenta</h2>

                        <p>
                            Ingresa tus datos para comenzar.
                        </p>
                    </div>

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="register-field">
                            <label htmlFor="name">
                                Nombre
                            </label>

                            <div className="register-input">
                                <FiUser />

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Tu nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        <div className="register-field">
                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <div className="register-input">
                                <FiMail />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="register-field">
                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <div className="register-input">
                                <FiLock />

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Mínimo 8 caracteres"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    maxLength={100}
                                />

                                <button
                                    className="register-password-toggle"
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {showPassword
                                        ? <FiEyeOff />
                                        : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <div className="register-field">
                            <label htmlFor="confirmPassword">
                                Confirmar contraseña
                            </label>

                            <div className="register-input">
                                <FiLock />

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Repite tu contraseña"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                className="register-error"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            className="register-submit"
                            type="submit"
                            disabled={loading}
                        >
                            <span>
                                {loading
                                    ? "Creando cuenta..."
                                    : "Crear mi cuenta"}
                            </span>

                            {!loading && <FiArrowRight />}
                        </button>

                    </form>

                    <div className="register-login">
                        <span>
                            ¿Ya tienes una cuenta?
                        </span>

                        <Link to="/login">
                            Iniciar sesión
                        </Link>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default Register;