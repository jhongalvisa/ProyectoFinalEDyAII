import { useAuth } from "../../Hooks/useAuth";

function Cabecera() {
  const { usuario, logout } = useAuth();

  return (
    <header className="cabecera">
      <div>
        <p className="texto-pequeno">Bienvenido a CyberLearn Academy</p>
        <h1>Aprende ciberseguridad paso a paso</h1>
      </div>

      <div className="usuario-box">
        <span>{usuario?.email}</span>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </header>
  );
}

export default Cabecera;