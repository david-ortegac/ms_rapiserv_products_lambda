import { AdapterProductEntity } from "./Entity/AdapterProductEntity";

export interface ProductController {
  handleRequest(event: any): Promise<any>;
  getProducts(): Promise<AdapterProductEntity[]>;
  getProductById(id: number): Promise<AdapterProductEntity>;
  createProduct(product: AdapterProductEntity): Promise<AdapterProductEntity>;
  updateProduct(
    id: number,
    product: AdapterProductEntity,
  ): Promise<AdapterProductEntity>;
  deleteProduct(id: number): Promise<void>;
}
