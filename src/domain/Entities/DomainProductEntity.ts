export interface DomainProductEntity {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: string;
  updatedBy: string;
}
