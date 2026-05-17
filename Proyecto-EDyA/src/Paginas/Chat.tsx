import CartaProfesor from "../Componentes/Chat/CartaProfesor";
import Chatbox from "../Componentes/Chat/Chatbox";
import Cabecera from "../Componentes/Compartidos/Cabecera";
import Sidebar from "../Componentes/Compartidos/Sidebar";
import { useChat } from "../Hooks/useChat";

function Chat() {
  const { profesores } = useChat();

  return (
    <main className="layout">
      <Sidebar />

      <section className="contenido">
        <Cabecera />

        <section className="chat-page-grid">
          <aside className="panel-profesores">
            <div className="titulo-seccion">
              <h2>Profesores disponibles</h2>
              <p>Selecciona un profesor para consultar tus dudas.</p>
            </div>

            {profesores.map((profesor) => (
              <CartaProfesor key={profesor.id} profesor={profesor} />
            ))}
          </aside>

          <div>
            <div className="titulo-seccion">
              <h2>Chat académico</h2>
              <p>Simulación visual del chat en tiempo real.</p>
            </div>

            <Chatbox />
          </div>
        </section>
      </section>
    </main>
  );
}

export default Chat;