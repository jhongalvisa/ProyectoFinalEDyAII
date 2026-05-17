import { useState } from "react";
import type { FormEvent } from "react";
import type { IMessage } from "../../Interfaces/IMessage";
import { useChat } from "../../Hooks/useChat";

function Chatbox() {
  const { mensajes, enviarMensaje } = useChat();
  const [texto, setTexto] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await enviarMensaje(texto);
    setTexto("");
  }

  return (
    <section className="chatbox">
      <div className="mensajes">
        {mensajes.map((mensaje: IMessage) => (
          <div key={mensaje.id} className={`mensaje ${mensaje.emisor}`}>
            <small>
              {mensaje.emisor === "profesor" ? "Profesor" : "Estudiante"} ·{" "}
              {mensaje.autorCorreo}
            </small>

            <p>{mensaje.texto}</p>
          </div>
        ))}
      </div>

      <form className="form-chat" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Chatbox;