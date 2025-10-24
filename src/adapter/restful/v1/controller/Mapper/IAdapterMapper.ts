import { DomainProductEntity } from "../../../../../domain/Entities/DomainProductEntity";
import { AdapterProductEntity } from "../Entity/AdapterProductEntity";

export interface IAdapterMapper {
  toDomain(adapterEntity: AdapterProductEntity): DomainProductEntity;
  toAdapter(domainEntity: DomainProductEntity): AdapterProductEntity;
  toDomainList(adapterList: AdapterProductEntity[]): DomainProductEntity[];
  toAdapterList(domainList: DomainProductEntity[]): AdapterProductEntity[];
}
