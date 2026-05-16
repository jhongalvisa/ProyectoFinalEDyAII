import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { Queue } from "../Algoritmos/Queue";
import { Stack } from "../Algoritmos/Stack";
import { Trie } from "../Algoritmos/Trie";
import { cursos } from "../Clases/Cursos";

import type { ICurso } from "../Interfaces/ICurso";
import { CursoContext } from "./CursoContext";

interface CursoProviderProps {
  children: ReactNode;
}

export function CursoProvider({ children }: CursoProviderProps) {
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");
  const [historialCursos, setHistorialCursos] = useState<ICurso[]>(() => {
    const historialGuardado = localStorage.getItem("historialCursos");

    if (!historialGuardado) {
      return [];
    }

    return JSON.parse(historialGuardado) as ICurso[];
  });


  const todosLosCursos: ICurso[] = [...cursos];

  function buscarCursosConTrie(listaCursos: ICurso[]): ICurso[] {
    if (textoBusqueda.trim() === "") {
      return listaCursos;
    }

    const trieCursos = new Trie();

    listaCursos.forEach((curso: ICurso) => {
      trieCursos.insert(curso.titulo);

      const palabrasTitulo = curso.titulo.split(" ");

      palabrasTitulo.forEach((palabra: string) => {
        trieCursos.insert(palabra);
      });

      trieCursos.insert(curso.categoria);
    });

    const titulosEncontrados: string[] = trieCursos.searchByPrefix(textoBusqueda);

    const titulosUnicos = new Set(
      titulosEncontrados.map((titulo: string) => titulo.toLowerCase())
    );

    return listaCursos.filter((curso: ICurso) =>
      titulosUnicos.has(curso.titulo.toLowerCase())
    );
  }

  const cursosFiltrados: ICurso[] = buscarCursosConTrie(todosLosCursos);

  function organizarCursosConQueue(lista: ICurso[]): ICurso[] {
    const colaCursos = new Queue<ICurso>();
    const cursosOrdenados: ICurso[] = [];

    lista.forEach((curso: ICurso) => {
      colaCursos.enqueue(curso);
    });

    while (!colaCursos.isEmpty()) {
      const cursoActual = colaCursos.dequeue();

      if (cursoActual) {
        cursosOrdenados.push(cursoActual);
      }
    }

    return cursosOrdenados;
  }

  const listaCursos: ICurso[] = organizarCursosConQueue(cursosFiltrados);

  function obtenerCursoPorId(id: string): ICurso | undefined {
    return todosLosCursos.find((curso: ICurso) => curso.id === id);
  }

  const registrarCursoVisto = useCallback((curso: ICurso): void => {
    setHistorialCursos((historialActual: ICurso[]) => {
      const pilaHistorial = new Stack<ICurso>();

      const historialSinRepetidos = historialActual.filter(
        (cursoHistorial: ICurso) => cursoHistorial.id !== curso.id
      );

      historialSinRepetidos.reverse().forEach((cursoHistorial: ICurso) => {
        pilaHistorial.push(cursoHistorial);
      });

      pilaHistorial.push(curso);

      const nuevoHistorial: ICurso[] = pilaHistorial
        .print()
        .reverse()
        .slice(0, 5);

      localStorage.setItem("historialCursos", JSON.stringify(nuevoHistorial));

      return nuevoHistorial;
    });
  }, []);

  return (
    <CursoContext.Provider
      value={{
        listaCursos,
        historialCursos,
        textoBusqueda,
        setTextoBusqueda,
        obtenerCursoPorId,
        registrarCursoVisto,
      }}
    >
      {children}
    </CursoContext.Provider>
  );
}