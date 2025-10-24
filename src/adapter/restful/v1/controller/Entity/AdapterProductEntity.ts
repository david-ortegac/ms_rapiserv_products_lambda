export interface AdapterProductEntity {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  subcategoria: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  creadoPor: string;
  actualizadoPor: string;
}
