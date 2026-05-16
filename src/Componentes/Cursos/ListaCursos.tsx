import { useEffect, useState } from "react";
import { Queue } from "../../Algoritmos/Queue";
import type { ICurso } from "../../Clases/Cursos";
import CartaCursos from "./CartaCursos";

interface ListaCursosProps {
  cursos: ICurso[];
}

function ListaCursos({ cursos }: ListaCursosProps) {
  const [colaVisualCursos, setColaVisualCursos] = useState<ICurso[]>([]);

  useEffect(() => {
    setColaVisualCursos(cursos);
  }, [cursos]);

  function avanzarCola(): void {
    const cola = new Queue<ICurso>();

    colaVisualCursos.forEach((curso: ICurso) => {
      cola.enqueue(curso);
    });

    const primerCurso = cola.dequeue();

    if (primerCurso) {
      cola.enqueue(primerCurso);
    }

    setColaVisualCursos(cola.print());
  }

  const cursoVisible: ICurso | undefined = colaVisualCursos[0];

  if (colaVisualCursos.length === 0) {
    return (
      <section className="lista-cursos-vacia">
        <h3>No hay cursos disponibles</h3>
        <p>No se encontraron cursos con la búsqueda actual.</p>
      </section>
    );
  }

  return (
    <section className="contenedor-lista-cursos">
      <div className="cabecera-cola-cursos">
        <div>
          <h3>Cola de cursos</h3>
          <p>
            Visualización organizada con Queue. El primer curso mostrado pasa al
            final cuando avanzas.
          </p>
        </div>

        <button type="button" onClick={avanzarCola}>
          Siguiente curso
        </button>
      </div>

      <div className="indicador-cola">
        <span>Primero en cola:</span>
        <strong>{colaVisualCursos[0]?.titulo}</strong>
      </div>

      <div className="contenedor-curso-unico">
        {cursoVisible && <CartaCursos curso={cursoVisible} />}
      </div>
    </section>
  );
}

export default ListaCursos;