import { Grafo } from "../Algoritmos/Grafo";

const grafoCursos = new Grafo();

grafoCursos.addEdge(
  "Fundamentos de Ciberseguridad",
  "Redes y Wireshark"
);

grafoCursos.addEdge(
  "Fundamentos de Ciberseguridad",
  "Phishing y Seguridad Web"
);

grafoCursos.addEdge(
  "Redes y Wireshark",
  "Introducción al Pentesting"
);

grafoCursos.addEdge(
  "Phishing y Seguridad Web",
  "Introducción al Pentesting"
);

grafoCursos.addEdge(
  "Introducción al Pentesting",
  "Fundamentos de Ciberseguridad"
);

export function obtenerCursosRelacionados(nombreCurso: string): string[] {
  return grafoCursos.getConnections(nombreCurso);
}