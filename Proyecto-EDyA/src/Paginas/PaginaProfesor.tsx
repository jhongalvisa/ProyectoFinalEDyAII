import { useState } from "react";
import type { FormEvent } from "react";

import Chatbox from "../Componentes/Chat/Chatbox";
import Cabecera from "../Componentes/Compartidos/Cabecera";
import Sidebar from "../Componentes/Compartidos/Sidebar";
import { useAuth } from "../Hooks/useAuth";
import { useCourses } from "../Hooks/useCourses";

function PanelProfesor() {
  const { usuario } = useAuth();
  const { agregarCurso } = useCourses();

  const [titulo, setTitulo] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [nivel, setNivel] = useState<string>("Básico");
  const [duracion, setDuracion] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  async function handleAgregarCurso(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setMensaje("");

    if (
      titulo.trim() === "" ||
      categoria.trim() === "" ||
      duracion.trim() === "" ||
      descripcion.trim() === ""
    ) {
      setMensaje("Completa todos los campos del curso.");
      return;
    }

    await agregarCurso({
      titulo,
      categoria,
      nivel,
      duracion,
      descripcion,
      profesorId: usuario?.uid || "profesor",
      imagen: "📘",
    });

    setTitulo("");
    setCategoria("");
    setNivel("Básico");
    setDuracion("");
    setDescripcion("");
    setMensaje("Curso agregado correctamente.");
  }

  return (
    <main className="layout">
      <Sidebar />

      <section className="contenido">
        <Cabecera />

        <section className="panel-profesor-grid">
          <article className="formulario-profesor">
            <div className="titulo-seccion">
              <h2>Panel del profesor</h2>
              <p>Agrega cursos nuevos para los estudiantes.</p>
            </div>

            <form onSubmit={handleAgregarCurso}>
              <input
                type="text"
                placeholder="Nombre del curso"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
              />

              <input
                type="text"
                placeholder="Categoría"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
              />

              <select
                value={nivel}
                onChange={(event) => setNivel(event.target.value)}
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>

              <input
                type="text"
                placeholder="Duración, ejemplo: 4 horas"
                value={duracion}
                onChange={(event) => setDuracion(event.target.value)}
              />

              <textarea
                placeholder="Descripción del curso"
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              />

              {mensaje !== "" && <p className="mensaje-panel">{mensaje}</p>}

              <button type="submit">Agregar curso</button>
            </form>
          </article>

          <article>
            <div className="titulo-seccion">
              <h2>Mensajes de estudiantes</h2>
              <p>Responde dudas en tiempo real desde el chat.</p>
            </div>

            <Chatbox />
          </article>
        </section>
      </section>
  </main>
  );
}

export default PanelProfesor;