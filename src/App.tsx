import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cursos from "./Paginas/Cursos";
import DetallesCursos from "./Paginas/DetallesCursos";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cursos" />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/cursos/:id" element={<DetallesCursos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;