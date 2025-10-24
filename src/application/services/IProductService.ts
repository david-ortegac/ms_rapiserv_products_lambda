import { DomainProductEntity } from '../../domain/Entities/DomainProductEntity';

export interface ProductService {
  getProductById(id: number): Promise<DomainProductEntity>;
  getProducts(): Promise<DomainProductEntity[]>;
  createProduct(product: DomainProductEntity): Promise<DomainProductEntity>;
  updateProduct(id: number, product: DomainProductEntity): Promise<DomainProductEntity>;
  deleteProduct(id: number): Promise<void>;
}
