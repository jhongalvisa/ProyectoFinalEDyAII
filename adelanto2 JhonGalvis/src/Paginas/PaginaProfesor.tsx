import { useState } from "react";
import type { FormEvent } from "react";

import Chatbox from "../Componentes/Chat/Chatbox";
import { useAuth } from "../Hooks/useAuth";

interface CursoTemporal {
  id: string;
  titulo: string;
  categoria: string;
  nivel: string;
  duracion: string;
  descripcion: string;
  profesorId: string;
  imagen: string;
  createdAt: number;
}

function PanelProfesor() {
  const { usuario } = useAuth();

  const [titulo, setTitulo] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [nivel, setNivel] = useState<string>("Básico");
  const [duracion, setDuracion] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  function agregarCursoTemporal(curso: Omit<CursoTemporal, "id" | "createdAt">): void {
    const cursosGuardados = localStorage.getItem("cursosTemporalesProfesor");

    const cursosActuales: CursoTemporal[] = cursosGuardados
      ? JSON.parse(cursosGuardados)
      : [];

    const nuevoCurso: CursoTemporal = {
      ...curso,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    const nuevaListaCursos: CursoTemporal[] = [...cursosActuales, nuevoCurso];

    localStorage.setItem(
      "cursosTemporalesProfesor",
      JSON.stringify(nuevaListaCursos)
    );
  }

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

    agregarCursoTemporal({
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
    setMensaje("Curso agregado correctamente de forma temporal.");
  }

  return (
    <main className="layout">
      <section className="contenido">
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