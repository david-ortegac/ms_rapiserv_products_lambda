import { inject, injectable } from "inversify";

import { ProductService } from "../../../../application/services/IProductService";
import { TYPES } from "../../../../ioc/Types";
import { AdapterProductEntity } from "./Entity/AdapterProductEntity";
import { IAdapterMapper } from "./Mapper/IAdapterMapper";
import { ProductController } from "./ProductController";

@injectable()
export class ProductControllerImpl implements ProductController {
  constructor(
    @inject(TYPES.ProductService)
    private readonly productService: ProductService,
    @inject(TYPES.IAdapterMapper) private readonly mapper: IAdapterMapper,
  ) {}

  async handleRequest(event: any): Promise<any> {
    try {
      switch (event?.requestContext?.http?.method) {
        case "GET": {
          if (event?.pathParameters?.id) {
            const product = await this.getProductById(
              Number.parseInt(event?.pathParameters?.id),
            );
            return product;
          } else {
            const products = await this.getProducts();
            return products;
          }
        }

        case "POST": {
          const createdProduct = await this.createProduct(
            JSON.parse(event?.body),
          );
          return createdProduct;
        }

        case "PUT": {
          if (event?.pathParameters?.id) {
            const updatedProduct = await this.updateProduct(
              Number.parseInt(event?.pathParameters?.id),
              JSON.parse(event?.body),
            );
            return updatedProduct;
          }
          return "ID is required for PUT request";
        }

        case "DELETE": {
          if (event?.pathParameters?.id) {
            await this.deleteProduct(
              Number.parseInt(event?.pathParameters?.id),
            );
            return {
              message: "Product deleted successfully",
            };
          }
          return {
            message: "ID is required for DELETE request",
          };
        }

        default:
          return {
            message: `Unsupported HTTP method: ${event?.requestContext?.http?.method}`,
          };
      }
    } catch (error) {
      return {
        message: `Error processing request: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

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
    console.log("product from controller", product);
    const productEntity = this.mapper.toDomain(product);
    console.log("productEntity from controller", productEntity);
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
