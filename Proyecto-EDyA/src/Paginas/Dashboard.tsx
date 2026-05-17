import CartaProfesor from "../Componentes/Chat/CartaProfesor";
import Cabecera from "../Componentes/Compartidos/Cabecera";
import Sidebar from "../Componentes/Compartidos/Sidebar";
import ListaCursos from "../Componentes/Cursos/ListaCursos";
import { useChat } from "../Hooks/useChat";

function Dashboard() {
  const { profesores } = useChat();

  return (
    <main className="layout">
      <Sidebar />

      <section className="contenido">
        <Cabecera />

        <section className="hero">
          <div>
            <span>Ruta recomendada</span>
            <h2>Comienza tu camino en seguridad informática</h2>
            <p>
              Explora cursos sobre redes, phishing, pentesting, análisis de
              tráfico y buenas prácticas digitales.
            </p>
          </div>
        </section>

        <section className="dashboard-grid">
          <div>
            <div className="titulo-seccion">
              <h2>Cursos recomendados</h2>
              <p>Contenido inicial para avanzar paso a paso.</p>
            </div>

            <ListaCursos />
          </div>

          <aside className="panel-profesores">
            <div className="titulo-seccion">
              <h2>Profesores</h2>
              <p>Consulta tus dudas con un instructor.</p>
            </div>

            {profesores.map((profesor) => (
              <CartaProfesor key={profesor.id} profesor={profesor} />
            ))}
          </aside>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;