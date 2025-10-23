import { AdapterProductEntity } from "../Entity/AdapterProductEntity";
import { DomainProductEntity } from "../../../../../domain/Entities/DomainProductEntity";

export interface IAdapterMapper {
  toDomain(adapterEntity: AdapterProductEntity): DomainProductEntity;
  toAdapter(domainEntity: DomainProductEntity): AdapterProductEntity;
  toDomainList(adapterList: AdapterProductEntity[]): DomainProductEntity[];
  toAdapterList(domainList: DomainProductEntity[]): AdapterProductEntity[];
}
