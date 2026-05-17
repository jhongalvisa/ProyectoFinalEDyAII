import Cabecera from "../Componentes/Compartidos/Cabecera";
import Sidebar from "../Componentes/Compartidos/Sidebar";
import HistorialCursos from "../Componentes/Cursos/HistorialCursos";
import ListaCursos from "../Componentes/Cursos/ListaCursos";
import { useCourses } from "../Hooks/useCourses";

function Cursos() {
  const { textoBusqueda, setTextoBusqueda } = useCourses();

  return (
    <main className="layout">
      <Sidebar />

      <section className="contenido">
        <Cabecera />

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

        <ListaCursos />

        <HistorialCursos />
      </section>
    </main>
  );
}

export default Cursos;