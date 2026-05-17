export interface IMessage {
  id: string;
  emisor: "estudiante" | "profesor";
  texto: string;
  fecha: string;
  autorId?: string;
  autorCorreo?: string;
  createdAt?: number;
}