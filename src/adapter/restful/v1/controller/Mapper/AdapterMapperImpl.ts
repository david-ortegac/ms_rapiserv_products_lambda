import { DomainProductEntity } from '../../../../../domain/Entities/DomainProductEntity';
import { AdapterProductEntity } from '../Entity/AdapterProductEntity';
import { IAdapterMapper } from './IAdapterMapper';

export class AdapterMapperImpl implements IAdapterMapper {
  toDomain(adapterEntity: AdapterProductEntity): DomainProductEntity {
    return {
      id: adapterEntity.id,
      name: adapterEntity.nombre,
      description: adapterEntity.descripcion,
      price: adapterEntity.precio,
      category: adapterEntity.categoria,
      subCategory: adapterEntity.subcategoria,
      createdAt: adapterEntity.fechaCreacion,
      updatedAt: adapterEntity.fechaActualizacion,
      createdBy: adapterEntity.creadoPor,
      updatedBy: adapterEntity.actualizadoPor,
    };
  }
  toAdapter(domainEntity: DomainProductEntity): AdapterProductEntity {
    return {
      id: domainEntity.id,
      nombre: domainEntity.name,
      descripcion: domainEntity.description,
      precio: domainEntity.price,
      categoria: domainEntity.category,
      subcategoria: domainEntity.subCategory,
      fechaCreacion: domainEntity.createdAt,
      fechaActualizacion: domainEntity.updatedAt,
      creadoPor: domainEntity.createdBy,
      actualizadoPor: domainEntity.updatedBy,
    };
  }
  toDomainList(adapterList: AdapterProductEntity[]): DomainProductEntity[] {
    return adapterList.map(this.toDomain);
  }
  toAdapterList(domainList: DomainProductEntity[]): AdapterProductEntity[] {
    return domainList.map(this.toAdapter);
  }
}
