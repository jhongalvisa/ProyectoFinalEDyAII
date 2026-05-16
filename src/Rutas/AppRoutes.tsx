import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cursos from "../Paginas/Cursos";
import DetallesCursos from "../Paginas/DetallesCursos";


function AppRoutes() {
 
  const cargando = false;
  const usuario = true; 
  const rol: string = "estudiante"; 

  if (cargando) {
    return <p className="cargando">Cargando...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !usuario ? (
              <div>Login</div> // Temporal: <Login />
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
              <div>Dashboard</div> 
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
              <div>Panel Profesor</div> 
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/chat"
          element={usuario ? <div>Chat</div> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;