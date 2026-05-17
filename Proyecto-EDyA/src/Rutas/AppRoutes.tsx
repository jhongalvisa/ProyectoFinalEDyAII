import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Chat from "../Paginas/Chat";
import Cursos from "../Paginas/Cursos";
import Dashboard from "../Paginas/Dashboard";
import DetallesCursos from "../Paginas/DetallesCursos";
import Login from "../Paginas/Login";
import PanelProfesor from "../Paginas/PaginaProfesor";
import { useAuth } from "../Hooks/useAuth";

function AppRoutes() {
  const { usuario, rol, cargando, logout } = useAuth();

  if (cargando) {
    return <p className="cargando">Cargando...</p>;
  }

  if (usuario && rol === null) {
    return (
      <main className="login-page">
        <section className="login-card">
          <div className="login-logo">🛡️</div>
          <h1>Rol no encontrado</h1>
          <p>
            Esta cuenta inició sesión, pero todavía no tiene un rol guardado en
            la base de datos.
          </p>

          <button onClick={logout}>Volver al login</button>
        </section>
      </main>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !usuario ? (
              <Login />
            ) : rol === "profesor" ? (
              <Navigate to="/profesor" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            usuario && rol === "estudiante" ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/cursos"
          element={
            usuario && rol === "estudiante" ? (
              <Cursos />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/cursos/:id"
          element={
            usuario && rol === "estudiante" ? (
              <DetallesCursos />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/profesor"
          element={
            usuario && rol === "profesor" ? (
              <PanelProfesor />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/chat"
          element={usuario ? <Chat /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;