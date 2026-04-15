export interface Arreglo {
  __backendId?: string; // ID real del documento en Firestore
  id: string;           // ID visual del producto
  nombre: string;
  precio: number;
  precioAnterior?: number | null;
  descripcion: string;
  incluye: string;
  imagenUrl: string;
  rutaAlmacenamiento: string;
  esTopEnVenta: boolean;
  esAgotado: boolean;
  categoria: string;
  fechaCreacion?: string;
}