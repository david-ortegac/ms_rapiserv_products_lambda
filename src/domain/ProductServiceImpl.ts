import { inject, injectable } from "inversify";
import { ProductService } from "../application/services/IProductService";
import { MysqlProductRespository } from "../infraestructure/mysql/Respository/MysqlProductRespository";
import { DomainProductEntity } from "./Entities/DomainProductEntity";
import { TYPES } from "../ioc/Types";
import { InfraestructureMapperImpl } from "../infraestructure/mysql/Mapper/InfraestructureMapperImpl";

@injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @inject(TYPES.MysqlProductRespository)
    private readonly repository: MysqlProductRespository,
    @inject(TYPES.IInfraestructureMapper)
    private readonly mapper: InfraestructureMapperImpl,
  ) {}

  async getProducts(): Promise<DomainProductEntity[]> {
    const products = await this.repository.findAll();
    if (!products) {
      throw new Error("Products not found");
    }
    return this.mapper.toDomainList(products);
  }

  async getProductById(id: number): Promise<DomainProductEntity> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return this.mapper.toDomain(product);
  }

  async createProduct(
    product: DomainProductEntity,
  ): Promise<DomainProductEntity> {
    const entity = this.mapper.toEntity(product);
    const createdProduct = await this.repository.create(entity);
    return this.mapper.toDomain(createdProduct);
  }

  async updateProduct(
    id: number,
    product: DomainProductEntity,
  ): Promise<DomainProductEntity> {
    const productEntity = await this.repository.findById(id);
    if (!productEntity) {
      throw new Error("Product not found");
    }
    const entity = this.mapper.toEntity({ ...productEntity, ...product });
    const updatedProduct = await this.repository.update(entity);
    return this.mapper.toDomain(updatedProduct);
  }

  async deleteProduct(id: number): Promise<void> {
    const productEntity = await this.repository.findById(id);
    if (!productEntity) {
      throw new Error("Product not found");
    }
    await this.repository.delete(id);
  }
}
