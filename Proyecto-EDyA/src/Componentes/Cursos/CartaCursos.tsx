import { Link } from "react-router-dom";
import type { ICurso } from "../../Interfaces/ICurso";
import { obtenerSiguientesCursos } from "../../Clases/RutaAprendizajes"

interface CartaCursosProps {
  curso: ICurso;
}

function CartaCursos({ curso }: CartaCursosProps) {
  const siguientesCursos: string[] = obtenerSiguientesCursos(curso.titulo);

  return (
    <article className="carta-curso">
      <div className="curso-icono">{curso.imagen}</div>

      <span>{curso.categoria}</span>
      <h3>{curso.titulo}</h3>
      <p>{curso.descripcion}</p>

      <div className="curso-info">
        <small>{curso.nivel}</small>
        <small>{curso.duracion}</small>
      </div>

      {siguientesCursos.length > 0 && (
        <div className="siguientes-cursos">
          <h4>Después puedes ver:</h4>

          <ul>
            {siguientesCursos.map((siguienteCurso: string) => (
              <li key={siguienteCurso}>{siguienteCurso}</li>
            ))}
          </ul>
        </div>
      )}

      <Link className="link-detalle" to={`/cursos/${curso.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}

export default CartaCursos;