import { createContext } from "react";
import type { User } from "firebase/auth";
import type { RolUsuario } from "../Interfaces/IUsuario";

export interface AuthContextType {
  usuario: User | null;
  rol: RolUsuario | null;
  cargando: boolean;
  login: (
    correo: string,
    password: string,
    rolSeleccionado: RolUsuario
  ) => Promise<void>;
  registrar: (
    correo: string,
    password: string,
    rolSeleccionado: RolUsuario
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);