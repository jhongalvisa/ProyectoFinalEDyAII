import { NarioTree, NarioTreeNode } from "../Algoritmos/NarioTree";

const rutaAprendizaje = new NarioTree<string>("Ciberseguridad");

const fundamentos = new NarioTreeNode<string>("Fundamentos de Ciberseguridad");
const redesWireshark = new NarioTreeNode<string>("Redes y Wireshark");
const phishing = new NarioTreeNode<string>("Phishing y Seguridad Web");
const pentesting = new NarioTreeNode<string>("Introducción al Pentesting");

fundamentos.addChild(new NarioTreeNode<string>("Fundamentos de Linux"));
fundamentos.addChild(new NarioTreeNode<string>("Redes de Datos"));
fundamentos.addChild(new NarioTreeNode<string>("Fundamentos de Nmap"));

redesWireshark.addChild(new NarioTreeNode<string>("Análisis de paquetes"));
redesWireshark.addChild(new NarioTreeNode<string>("Seguridad de redes"));
redesWireshark.addChild(new NarioTreeNode<string>("Firewalls básicos"));

phishing.addChild(new NarioTreeNode<string>("OWASP Top 10"));
phishing.addChild(new NarioTreeNode<string>("Seguridad en formularios"));
phishing.addChild(new NarioTreeNode<string>("Ingeniería social"));

pentesting.addChild(new NarioTreeNode<string>("Reconocimiento"));
pentesting.addChild(new NarioTreeNode<string>("Enumeración"));
pentesting.addChild(new NarioTreeNode<string>("Reportes de pentesting"));

rutaAprendizaje.root.addChild(fundamentos);
rutaAprendizaje.root.addChild(redesWireshark);
rutaAprendizaje.root.addChild(phishing);
rutaAprendizaje.root.addChild(pentesting);

export function obtenerSiguientesCursos(nombreCurso: string): string[] {
  return rutaAprendizaje.getChildrenValues(nombreCurso);
}