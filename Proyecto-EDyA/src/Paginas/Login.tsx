import { useState } from "react";
import type { FormEvent } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import type { RolUsuario } from "../Interfaces/IUsuario";

function Login() {
  const { login, registrar } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rolSeleccionado, setRolSeleccionado] =
    useState<RolUsuario>("estudiante");
  const [mensajeError, setMensajeError] = useState<string>("");

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setMensajeError("");

    try {
      await login(correo, password, rolSeleccionado);

      if (rolSeleccionado === "profesor") {
        navigate("/profesor");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setMensajeError("Correo, contraseña o tipo de usuario incorrecto.");
    }
  }

  async function handleRegistro(): Promise<void> {
    setMensajeError("");

    try {
      await registrar(correo, password, rolSeleccionado);

      if (rolSeleccionado === "profesor") {
        navigate("/profesor");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setMensajeError(
        "No se pudo registrar. Revisa el correo y usa mínimo 6 caracteres."
      );
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">🛡️</div>

        <h1>CyberLearn Academy</h1>
        <p>Inicia sesión como estudiante o profesor.</p>

        <div className="selector-rol">
          <button
            type="button"
            className={rolSeleccionado === "estudiante" ? "rol-activo" : ""}
            onClick={() => setRolSeleccionado("estudiante")}
          >
            Estudiante
          </button>

          <button
            type="button"
            className={rolSeleccionado === "profesor" ? "rol-activo" : ""}
            onClick={() => setRolSeleccionado("profesor")}
          >
            Profesor
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {mensajeError !== "" && <p className="mensaje-error">{mensajeError}</p>}

          <button type="submit">Ingresar</button>

          <button
            type="button"
            className="boton-registro"
            onClick={handleRegistro}
          >
            Crear cuenta como {rolSeleccionado}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;