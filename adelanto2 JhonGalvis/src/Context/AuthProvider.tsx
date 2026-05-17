import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import type { User } from "firebase/auth";
import { get, ref, set } from "firebase/database";

import { auth, database } from "../Firebase/config";
import { AuthContext } from "./AuthContext";
import type { RolUsuario } from "../Interfaces/IUsuario";

interface AuthProviderProps {
  children: ReactNode;
}

interface DatosUsuarioFirebase {
  uid: string;
  correo: string;
  rol: RolUsuario;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [rol, setRol] = useState<RolUsuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(
      auth,
      async (usuarioActual) => {
        setCargando(true);

        if (!usuarioActual) {
          setUsuario(null);
          setRol(null);
          setCargando(false);
          return;
        }

        setUsuario(usuarioActual);

        const usuarioRef = ref(database, `usuarios/${usuarioActual.uid}`);
        const snapshot = await get(usuarioRef);

        if (snapshot.exists()) {
          const datosUsuario = snapshot.val() as DatosUsuarioFirebase;
          setRol(datosUsuario.rol);
        } else {
          setRol(null);
        }

        setCargando(false);
      }
    );

    return () => cancelarSuscripcion();
  }, []);

  async function login(
    correo: string,
    password: string,
    rolSeleccionado: RolUsuario
  ): Promise<void> {
    const credencial = await signInWithEmailAndPassword(auth, correo, password);

    const usuarioRef = ref(database, `usuarios/${credencial.user.uid}`);
    const snapshot = await get(usuarioRef);

    if (!snapshot.exists()) {
      await set(usuarioRef, {
        uid: credencial.user.uid,
        correo: credencial.user.email || correo,
        rol: rolSeleccionado,
      });

      setUsuario(credencial.user);
      setRol(rolSeleccionado);
      return;
    }

    const datosUsuario = snapshot.val() as DatosUsuarioFirebase;

    if (datosUsuario.rol !== rolSeleccionado) {
      await signOut(auth);
      setUsuario(null);
      setRol(null);
      throw new Error("El rol seleccionado no coincide con esta cuenta.");
    }

    setUsuario(credencial.user);
    setRol(datosUsuario.rol);
  }

  async function registrar(
    correo: string,
    password: string,
    rolSeleccionado: RolUsuario
  ): Promise<void> {
    const credencial = await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    );

    await set(ref(database, `usuarios/${credencial.user.uid}`), {
      uid: credencial.user.uid,
      correo: credencial.user.email || correo,
      rol: rolSeleccionado,
    });

    setUsuario(credencial.user);
    setRol(rolSeleccionado);
  }

  async function logout(): Promise<void> {
    await signOut(auth);
    setUsuario(null);
    setRol(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        rol,
        cargando,
        login,
        registrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}