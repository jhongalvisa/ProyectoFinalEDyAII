import { useState } from "react";
import ListaCursos from "../Componentes/Cursos/ListaCursos";
import { cursos } from "../Clases/Cursos";

function Cursos() {
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");

  const cursosFiltrados = cursos.filter((curso) =>
    curso.titulo.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  return (
    <main className="layout">
      <aside className="sidebar">
        <h2>CyberLearn</h2>
        <p>Academy</p>
      </aside>

      <section className="contenido">
        <header className="cabecera">
          <h1>Cursos</h1>
          <p>Explora rutas de aprendizaje en ciberseguridad.</p>
        </header>

        <div className="titulo-seccion">
          <h2>Cursos de ciberseguridad</h2>
          <p>Busca y selecciona un curso para ver más información.</p>
        </div>

        <input
          className="buscador"
          type="text"
          placeholder="Buscar curso..."
          value={textoBusqueda}
          onChange={(event) => setTextoBusqueda(event.target.value)}
        />

        <ListaCursos cursos={cursosFiltrados} />
      </section>
    </main>
  );
}

export default Cursos;