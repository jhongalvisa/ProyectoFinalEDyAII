import { useContext } from "react";
import { CursoContext } from "../Context/CursoContext";

export function useCourses() {
  const context = useContext(CursoContext);

  if (!context) {
    throw new Error("useCourses debe usarse dentro de CursoProvider");
  }

  return context;
}