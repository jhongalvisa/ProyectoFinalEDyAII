import { Link } from "react-router-dom";
import { useCourses } from "../../Hooks/useCourses";
import type { ICurso } from "../../Interfaces/ICurso";

function HistorialCursos() {
    const { historialCursos } = useCourses();

    if (historialCursos.length === 0) {
        return null;
    }

    return (
        <section className="historial-stack">
            <div className="titulo-seccion">
                <h2>Historial reciente</h2>
                <p>
                    Esta sección usa Stack. El último curso visto aparece primero en la
                    pila.
                </p>
            </div>

            <div className="historial-lista">
                {historialCursos.map((curso: ICurso, index: number) => (
                    <Link
                    to={`/cursos/${curso.id}`}
                    className="historial-item"
                    key={curso.id}
                >
                    <span className="historial-posicion">
                        {index === 0 ? "Tope de la pila" : `Posición ${index + 1}`}
                    </span>

                    <strong>{curso.titulo}</strong>

                    <small>{curso.categoria}</small>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default HistorialCursos;