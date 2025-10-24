import { inject, injectable } from "inversify";
import { TYPES } from "../../../../ioc/Types";
import { ProductService } from "../../../../application/services/IProductService";
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
    // Detectar método HTTP en diferentes formatos de evento
    const httpMethod = 
      event?.requestContext?.http?.method ||  // HTTP API v2 / Function URL
      event?.httpMethod ||                    // REST API v1 / ALB
      event?.method ||                        // Tests manuales
      'GET';                                  // Default para eventos vacíos

    const pathParameters = event?.pathParameters || event?.path || {};
    const body = event?.body ? (typeof event.body === 'string' ? JSON.parse(event.body) : event.body) : {};

    console.log('HTTP Method:', httpMethod);
    console.log('Path Parameters:', pathParameters);
    console.log('Body:', body);

    try {
      switch (httpMethod) {
        case 'GET': {
          if (pathParameters.id) {
            const product = await this.getProductById(Number.parseInt(pathParameters.id));
            return { product };
          } else {
            const products = await this.getProducts();
            return { products };
          }
        }
        
        case 'POST': {
          const createdProduct = await this.createProduct(body);
          return { product: createdProduct };
        }
        
        case 'PUT': {
          if (pathParameters.id) {
            const updatedProduct = await this.updateProduct(Number.parseInt(pathParameters.id), body);
            return { product: updatedProduct };
          }
          throw new Error('ID is required for PUT request');
        }
        
        case 'DELETE': {
          if (pathParameters.id) {
            await this.deleteProduct(Number.parseInt(pathParameters.id));
            return { message: 'Product deleted successfully' };
          }
          throw new Error('ID is required for DELETE request');
        }
        
        default:
          throw new Error(`Unsupported HTTP method: ${httpMethod}`);
      }
    } catch (error) {
      throw new Error(`Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
