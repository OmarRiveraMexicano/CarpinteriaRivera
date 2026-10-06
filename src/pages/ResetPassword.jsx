import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPassword.css";

const API_URL = "http://localhost:8080/public/api/reset-password";
const MIN_LENGTH = 8;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Tras el éxito, manda al login después de unos segundos
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(timer);
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < MIN_LENGTH) {
      setError(`La contraseña debe tener al menos ${MIN_LENGTH} caracteres.`);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        let message =
          "El enlace no es válido o ya venció. Solicita uno nuevo.";
        try {
          const data = await response.json();
          if (data.message) message = data.message;
        } catch {
          // la respuesta no trae JSON, se usa el mensaje por defecto
        }
        setError(message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Sin token en la URL
  if (!token) {
    return (
      <main className="reset-page">
        <div className="reset-card">
          <h1>Enlace incompleto</h1>
          <p className="reset-text">
            Este enlace no incluye el código de seguridad. Abre el enlace
            completo del correo o solicita uno nuevo.
          </p>
          <Link className="reset-button reset-link" to="/forgot-password">
            Solicitar nuevo enlace
          </Link>
        </div>
      </main>
    );
  }

  // Contraseña cambiada
  if (success) {
    return (
      <main className="reset-page">
        <div className="reset-card" role="status">
          <h1>Contraseña actualizada</h1>
          <p className="reset-text">
            Ya puedes iniciar sesión con tu nueva contraseña. Te llevamos al
            inicio de sesión en unos segundos.
          </p>
          <Link className="reset-button reset-link" to="/login">
            Ir a iniciar sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="reset-page">
      <form className="reset-card" onSubmit={handleSubmit} noValidate>
        <h1>Crea una nueva contraseña</h1>
        <p className="reset-text">
          Elige una contraseña de al menos {MIN_LENGTH} caracteres.
        </p>

        <div className="reset-field">
          <label htmlFor="newPassword">Nueva contraseña</label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="reset-field">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="button"
          className="reset-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Ocultar contraseñas" : "Mostrar contraseñas"}
        </button>

        {error && (
          <p className="reset-error" role="alert">
            {error}
          </p>
        )}

        <button className="reset-button" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar contraseña"}
        </button>
      </form>
    </main>
  );
}
