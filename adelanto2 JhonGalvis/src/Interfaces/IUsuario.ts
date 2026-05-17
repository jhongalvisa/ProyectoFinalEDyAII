export type RolUsuario = "estudiante" | "profesor";

export interface IUsuario {
  uid: string;
  correo: string;
  rol: RolUsuario;
}