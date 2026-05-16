export interface ICurso {
  id: string;
  titulo: string;
  categoria: string;
  nivel: string;
  duracion: string;
  descripcion: string;
  profesorId: string;
  imagen: string;
  createdAt?: number;
}