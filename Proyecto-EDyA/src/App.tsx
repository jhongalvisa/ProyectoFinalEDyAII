import { AuthProvider } from "./Context/AuthProvider";
import { ChatProvider } from "./Context/ChatProvider";
import { CursoProvider } from "./Context/CursoProvider";
import AppRoutes from "./Rutas/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <CursoProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </CursoProvider>
    </AuthProvider>
  );
}

export default App;