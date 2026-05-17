import { createContext } from "react";
import type { IMessage } from "../Interfaces/IMessage";
import type { IProfesor } from "../Interfaces/IProfesor";

export interface ChatContextType {
  profesores: IProfesor[];
  mensajes: IMessage[];
  enviarMensaje: (texto: string) => Promise<void>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);