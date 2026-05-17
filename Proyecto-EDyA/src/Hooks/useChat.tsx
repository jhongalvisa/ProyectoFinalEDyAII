import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat debe usarse dentro de ChatProvider");
  }

  return context;
}