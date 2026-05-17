import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { onValue, push, ref, set } from "firebase/database";

import { profesores } from "../Clases/Profesores";
import type { IMessage } from "../Interfaces/IMessage";
import { ChatContext } from "./ChatContext";
import { database } from "../Firebase/config";
import { useAuth } from "../Hooks/useAuth";

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const { usuario, rol } = useAuth();
  const [mensajes, setMensajes] = useState<IMessage[]>([]);

  useEffect(() => {
    const mensajesRef = ref(database, "mensajes");

    const cancelarSuscripcion = onValue(mensajesRef, (snapshot) => {
      const mensajesCargados: IMessage[] = [];

      snapshot.forEach((childSnapshot) => {
        const mensaje = childSnapshot.val() as IMessage;
        mensajesCargados.push(mensaje);
      });

      mensajesCargados.sort(
        (a: IMessage, b: IMessage) => (a.createdAt || 0) - (b.createdAt || 0)
      );

      setMensajes(mensajesCargados);
    });

    return () => cancelarSuscripcion();
  }, []);

  async function enviarMensaje(texto: string): Promise<void> {
    if (texto.trim() === "" || !usuario || !rol) {
      return;
    }

    const mensajesRef = ref(database, "mensajes");
    const nuevoMensajeRef = push(mensajesRef);

    const nuevoMensaje: IMessage = {
      id: nuevoMensajeRef.key || crypto.randomUUID(),
      emisor: rol,
      texto,
      fecha: new Date().toLocaleString(),
      autorId: usuario.uid,
      autorCorreo: usuario.email || "Sin correo",
      createdAt: Date.now(),
    };

    await set(nuevoMensajeRef, nuevoMensaje);
  }

  return (
    <ChatContext.Provider value={{ profesores, mensajes, enviarMensaje }}>
      {children}
    </ChatContext.Provider>
  );
}