import { NavLink } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

function Sidebar() {
  const { rol } = useAuth();

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icono">🛡️</div>
        <div>
          <h2>CyberLearn</h2>
          <p>Academy</p>
        </div>
      </div>

      <nav className="menu">
        {rol === "profesor" ? (
          <>
            <NavLink to="/profesor">Panel profesor</NavLink>
            <NavLink to="/chat">Chat académico</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/cursos">Cursos</NavLink>
            <NavLink to="/chat">Chat profesores</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;