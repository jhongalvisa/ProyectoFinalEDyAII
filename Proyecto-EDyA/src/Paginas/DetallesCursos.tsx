import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Cabecera from "../Componentes/Compartidos/Cabecera";
import Sidebar from "../Componentes/Compartidos/Sidebar";
import { obtenerCursosRelacionados } from "../Clases/GrafoCursos";
import { useCourses } from "../Hooks/useCourses";

function DetallesCursos() {
  const { id } = useParams();
  const { obtenerCursoPorId, registrarCursoVisto } = useCourses();

  const curso = obtenerCursoPorId(id || "");

  useEffect(() => {
    if (curso) {
      registrarCursoVisto(curso);
    }
  }, [curso, registrarCursoVisto]);

  if (!curso) {
    return (
      <main className="layout">
        <Sidebar />

        <section className="contenido">
          <Cabecera />

          <article className="detalle-curso">
            <h2>Curso no encontrado</h2>
            <p>No se encontró información para este curso.</p>

            <Link className="link-detalle" to="/cursos">
              Volver a cursos
            </Link>
          </article>
        </section>
      </main>
    );
  }

  const cursosRelacionados: string[] = obtenerCursosRelacionados(curso.titulo);

  return (
    <main className="layout">
      <Sidebar />

      <section className="contenido">
        <Cabecera />

        <article className="detalle-curso">
          <div className="detalle-icono">{curso.imagen}</div>

          <span>{curso.categoria}</span>

          <h2>{curso.titulo}</h2>

          <p>{curso.descripcion}</p>

          <div className="detalle-info">
            <p>
              <strong>Nivel:</strong> {curso.nivel}
            </p>

            <p>
              <strong>Duración:</strong> {curso.duracion}
            </p>
          </div>

          {cursosRelacionados.length > 0 && (
            <section className="grafo-cursos">
              <h3>Cursos relacionados</h3>

              <p>
                Esta sección usa Grafo. Cada curso es un nodo y cada relación es
                una conexión entre cursos.
              </p>

              <div className="grafo-lista">
                {cursosRelacionados.map((cursoRelacionado: string) => (
                  <div className="grafo-conexion" key={cursoRelacionado}>
                    <span className="grafo-nodo">{curso.titulo}</span>

                    <span className="grafo-flecha">→</span>

                    <span className="grafo-nodo grafo-nodo-destino">
                      {cursoRelacionado}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="acciones-detalle">
            <Link className="link-detalle" to="/chat">
              Hablar con un profesor
            </Link>

            <Link className="link-volver" to="/cursos">
              Volver a cursos
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default DetallesCursos;