import type { IProfesor } from "../../Interfaces/IProfesor";

interface CartaProfesorProps {
  profesor: IProfesor;
}

function CartaProfesor({ profesor }: CartaProfesorProps) {
  return (
    <div className="carta-profesor">
      <div className="avatar-profesor">{profesor.nombre.charAt(0)}</div>

      <div>
        <h3>{profesor.nombre}</h3>
        <p>{profesor.especialidad}</p>
        <small>{profesor.estado}</small>
      </div>
    </div>
  );
}

export default CartaProfesor;