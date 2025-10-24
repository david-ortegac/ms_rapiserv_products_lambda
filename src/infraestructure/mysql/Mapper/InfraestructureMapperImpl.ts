import { DomainProductEntity } from '../../../domain/Entities/DomainProductEntity';
import { Product } from '../Entity/Product';
import { IInfraestructureMapper } from './IIfraestructureMapper';

export class InfraestructureMapperImpl implements IInfraestructureMapper {
  toDomain(entity: Product): DomainProductEntity {
    return {
      id: entity.id,
      name: entity.productName,
      description: entity.productDescription,
      price: entity.productPrice,
      category: entity.productCategory,
      subCategory: entity.subCategory,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
    };
  }
  toEntity(domain: DomainProductEntity): Product {
    return {
      id: domain.id,
      productName: domain.name,
      productDescription: domain.description,
      productPrice: domain.price,
      productCategory: domain.category,
      subCategory: domain.subCategory,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      createdBy: domain.createdBy,
      updatedBy: domain.updatedBy,
    } as Product;
  }
  toDomainList(entityList: Product[]): DomainProductEntity[] {
    return entityList.map(this.toDomain);
  }
  toEntityList(domainList: DomainProductEntity[]): Product[] {
    return domainList.map(this.toEntity);
  }
}
