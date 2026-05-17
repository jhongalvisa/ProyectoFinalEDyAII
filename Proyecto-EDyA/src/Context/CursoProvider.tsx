import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onValue, push, ref, set } from "firebase/database";

import { Queue } from "../Algoritmos/Queue";
import { Stack } from "../Algoritmos/Stack";
import { Trie } from "../Algoritmos/Trie";
import { cursos } from "../Clases/Cursos";
import { database } from "../Firebase/config";
import type { ICurso } from "../Interfaces/ICurso";
import { CursoContext } from "./CursoContext";

interface CursoProviderProps {
  children: ReactNode;
}

export function CursoProvider({ children }: CursoProviderProps) {
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");
  const [cursosFirebase, setCursosFirebase] = useState<ICurso[]>([]);
  const [historialCursos, setHistorialCursos] = useState<ICurso[]>(() => {
    const historialGuardado = localStorage.getItem("historialCursos");

    if (!historialGuardado) {
      return [];
    }

    return JSON.parse(historialGuardado) as ICurso[];
  });

  useEffect(() => {
    const cursosRef = ref(database, "cursos");

    const cancelarSuscripcion = onValue(cursosRef, (snapshot) => {
      const cursosCargados: ICurso[] = [];

      snapshot.forEach((childSnapshot) => {
        const curso = childSnapshot.val() as ICurso;
        cursosCargados.push(curso);
      });

      cursosCargados.sort(
        (a: ICurso, b: ICurso) => (a.createdAt || 0) - (b.createdAt || 0)
      );

      setCursosFirebase(cursosCargados);
    });

    return () => cancelarSuscripcion();
  }, []);

  const todosLosCursos: ICurso[] = [...cursos, ...cursosFirebase];

  function buscarCursosConTrie(listaCursos: ICurso[]): ICurso[] {
    if (textoBusqueda.trim() === "") {
      return listaCursos;
    }

    const trieCursos = new Trie();

    listaCursos.forEach((curso: ICurso) => {
      trieCursos.insert(curso.titulo, curso.titulo);

      const palabrasTitulo = curso.titulo.split(" ");

      palabrasTitulo.forEach((palabra: string) => {
        trieCursos.insert(palabra, curso.titulo);
      });

      trieCursos.insert(curso.categoria, curso.titulo);
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

  async function agregarCurso(
    curso: Omit<ICurso, "id" | "createdAt">
  ): Promise<void> {
    const cursosRef = ref(database, "cursos");
    const nuevoCursoRef = push(cursosRef);

    const nuevoCurso: ICurso = {
      ...curso,
      id: nuevoCursoRef.key || crypto.randomUUID(),
      createdAt: Date.now(),
    };

    await set(nuevoCursoRef, nuevoCurso);
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
        agregarCurso,
        registrarCursoVisto,
      }}
    >
      {children}
    </CursoContext.Provider>
  );
}