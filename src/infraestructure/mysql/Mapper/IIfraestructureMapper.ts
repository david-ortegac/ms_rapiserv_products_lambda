import { DomainProductEntity } from '../../../domain/Entities/DomainProductEntity';
import { Product } from '../Entity/Product';

export interface IInfraestructureMapper {
  toDomain(entity: Product): DomainProductEntity;
  toEntity(domain: DomainProductEntity): Product;
  toDomainList(entityList: Product[]): DomainProductEntity[];
  toEntityList(domainList: DomainProductEntity[]): Product[];
}
