import type { ICurso } from "../Interfaces/ICurso";

export const cursos: ICurso[] = [
  {
    id: "1",
    titulo: "Fundamentos de Ciberseguridad",
    categoria: "Introducción",
    nivel: "Básico",
    duracion: "4 horas",
    descripcion:
      "Aprende los conceptos principales de la seguridad informática, amenazas, riesgos y buenas prácticas.",
    profesorId: "1",
    imagen: "🛡️",
  },
  {
    id: "2",
    titulo: "Redes y Wireshark",
    categoria: "Redes",
    nivel: "Intermedio",
    duracion: "6 horas",
    descripcion:
      "Comprende cómo viaja la información en una red y analiza paquetes usando Wireshark.",
    profesorId: "2",
    imagen: "🌐",
  },
  {
    id: "3",
    titulo: "Phishing y Seguridad Web",
    categoria: "Seguridad Web",
    nivel: "Básico",
    duracion: "3 horas",
    descripcion:
      "Identifica ataques comunes de phishing y aprende medidas básicas para proteger cuentas y sitios web.",
    profesorId: "1",
    imagen: "🎣",
  },
  {
    id: "4",
    titulo: "Introducción al Pentesting",
    categoria: "Pentesting",
    nivel: "Avanzado",
    duracion: "8 horas",
    descripcion:
      "Explora pruebas de seguridad básicas, reconocimiento, análisis de vulnerabilidades y reportes.",
    profesorId: "3",
    imagen: "💻",
  },
];