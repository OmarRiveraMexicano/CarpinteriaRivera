import { useState } from "react";

import "./ForgotPassword.css";

const RESET_PASSWORD_REQUEST_URL =
    "http://localhost:8080/public/api/reset-password/request";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    /*
     * Por seguridad, el mensaje de éxito se muestra
     * siempre, sin importar si el correo existe o si
     * el backend responde con error. Así nadie puede
     * usar este formulario para averiguar qué correos
     * están registrados.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        try {
            await fetch(RESET_PASSWORD_REQUEST_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
        } catch (error) {
            // Se ignora a propósito: el mensaje de
            // éxito no depende de esta petición.
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="forgot-password">
                <div className="forgot-password__card">
                    <h1>Revisa tu correo</h1>

                    <p>
                        Si <strong>{email}</strong> está
                        registrado, te enviamos un enlace
                        para restablecer tu contraseña.
                        Revisa tu bandeja de entrada y la
                        carpeta de spam.
                    </p>

                    <a
                        className="forgot-password__back-link"
                        href="#/"
                    >
                        Volver al inicio de sesión
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="forgot-password">
            <form
                className="forgot-password__card"
                onSubmit={handleSubmit}
            >
                <h1>¿Olvidaste tu contraseña?</h1>

                <p>
                    Ingresa tu correo y te enviaremos un
                    enlace para restablecerla.
                </p>

                <label htmlFor="email">
                    Correo electrónico
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    placeholder="tucorreo@ejemplo.com"
                    autoComplete="email"
                    required
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Enviando..."
                        : "Enviar enlace"}
                </button>

                <a
                    className="forgot-password__back-link"
                    href="#/"
                >
                    Volver al inicio de sesión
                </a>
            </form>
        </div>
    );
}

export default ForgotPassword;
