import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const API_URL = "http://localhost:8080/auth/api/login";

const NAME_MIN = 3;
const NAME_MAX = 100;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Tras el registro, manda al login después de unos segundos
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(timer);
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const name = form.name.trim();

    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      return `El nombre debe tener entre ${NAME_MIN} y ${NAME_MAX} caracteres.`;
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      return "Escribe un correo electrónico válido.";
    }
    if (
      form.password.length < PASSWORD_MIN ||
      form.password.length > PASSWORD_MAX
    ) {
      return `La contraseña debe tener entre ${PASSWORD_MIN} y ${PASSWORD_MAX} caracteres.`;
    }
    if (form.password !== form.confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Mismo formato que UserRequestDTO: name, email, password
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      if (!response.ok) {
        let message = "No se pudo crear la cuenta. Revisa los datos e intenta de nuevo.";
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

  if (success) {
    return (
      <main className="register-page">
        <div className="register-card" role="status">
          <h1>Cuenta creada</h1>
          <p className="register-text">
            Ya puedes iniciar sesión con tu correo y contraseña. Te llevamos al
            inicio de sesión en unos segundos.
          </p>
          <Link className="register-button register-link" to="/login">
            Ir a iniciar sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="register-page">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h1>Crea tu cuenta</h1>
        <p className="register-text">
          Regístrate para hacer pedidos y dar seguimiento a tus productos.
        </p>

        <div className="register-field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={NAME_MAX}
            required
          />
        </div>

        <div className="register-field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="register-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            maxLength={PASSWORD_MAX}
            required
          />
          <span className="register-hint">
            Mínimo {PASSWORD_MIN} caracteres.
          </span>
        </div>

        <div className="register-field">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            maxLength={PASSWORD_MAX}
            required
          />
        </div>

        <button
          type="button"
          className="register-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Ocultar contraseñas" : "Mostrar contraseñas"}
        </button>

        {error && (
          <p className="register-error" role="alert">
            {error}
          </p>
        )}

        <button className="register-button" type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="register-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
}