import type { ReactNode } from "react";

interface BotonProps {
  children: ReactNode;
  tipo?: "primario" | "secundario";
  onClick?: () => void;
}

function Boton({ children, tipo = "primario", onClick }: BotonProps) {
  return (
    <button className={`boton boton-${tipo}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Boton;