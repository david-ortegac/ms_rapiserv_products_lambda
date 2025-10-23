import { inject, injectable } from "inversify";
import { TYPES } from "../../../../ioc/Types";
import { ProductService } from "../../../../application/services/IProductService";
import { AdapterProductEntity } from "./Entity/AdapterProductEntity";
import { IAdapterMapper } from "./Mapper/IAdapterMapper";

@injectable()
export class ProductController {
  constructor(
    @inject(TYPES.ProductService)
    private readonly productService: ProductService,
    @inject(TYPES.IAdapterMapper) private readonly mapper: IAdapterMapper,
  ) {}

  async getProducts(): Promise<AdapterProductEntity[]> {
    const products = await this.productService.getProducts();
    return this.mapper.toAdapterList(products);
  }

  async getProductById(id: number): Promise<AdapterProductEntity> {
    const product = await this.productService.getProductById(id);
    return this.mapper.toAdapter(product);
  }

  async createProduct(
    product: AdapterProductEntity,
  ): Promise<AdapterProductEntity> {
    const productEntity = this.mapper.toDomain(product);
    const createdProduct =
      await this.productService.createProduct(productEntity);
    return this.mapper.toAdapter(createdProduct);
  }

  async updateProduct(
    id: number,
    product: AdapterProductEntity,
  ): Promise<AdapterProductEntity> {
    const productEntity = this.mapper.toDomain(product);
    const updatedProduct = await this.productService.updateProduct(
      id,
      productEntity,
    );
    return this.mapper.toAdapter(updatedProduct);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productService.deleteProduct(id);
  }
}
