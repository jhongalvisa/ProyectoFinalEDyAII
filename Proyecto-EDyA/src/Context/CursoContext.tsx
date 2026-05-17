import { createContext } from "react";
import type { ICurso } from "../Interfaces/ICurso";

export interface CursoContextType {
  listaCursos: ICurso[];
  historialCursos: ICurso[];
  textoBusqueda: string;
  setTextoBusqueda: (texto: string) => void;
  obtenerCursoPorId: (id: string) => ICurso | undefined;
  agregarCurso: (curso: Omit<ICurso, "id" | "createdAt">) => Promise<void>;
  registrarCursoVisto: (curso: ICurso) => void;
}

export const CursoContext = createContext<CursoContextType | undefined>(
  undefined
);