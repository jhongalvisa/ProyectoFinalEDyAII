import { Link, useParams } from "react-router-dom";
import { cursos } from "../Clases/Cursos";

function DetallesCursos() {
  const { id } = useParams<{ id: string }>();

  const curso = cursos.find((cursoActual) => cursoActual.id === id);

  if (!curso) {
    return (
      <main className="layout">
        <aside className="sidebar">
          <h2>CyberLearn</h2>
          <p>Academy</p>
        </aside>

        <section className="contenido">
          <header className="cabecera">
            <h1>Detalle del curso</h1>
          </header>

          <h2>Curso no encontrado</h2>
          <Link to="/cursos">Volver a cursos</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="layout">
      <aside className="sidebar">
        <h2>CyberLearn</h2>
        <p>Academy</p>
      </aside>

      <section className="contenido">
        <header className="cabecera">
          <h1>Detalle del curso</h1>
          <p>Información general del curso seleccionado.</p>
        </header>

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

          <Link className="link-detalle" to="/cursos">
            Volver a cursos
          </Link>
        </article>
      </section>
    </main>
  );
}

export default DetallesCursos;