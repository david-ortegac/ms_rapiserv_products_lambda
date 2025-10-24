import { Product } from '../Entity/Product';

export interface MysqlProductRespository {
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
