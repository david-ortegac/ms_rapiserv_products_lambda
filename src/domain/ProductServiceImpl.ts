import { inject, injectable } from "inversify";

import { ProductService } from "../application/services/IProductService";
import { InfraestructureMapperImpl } from "../infraestructure/mysql/Mapper/InfraestructureMapperImpl";
import { MysqlProductRespository } from "../infraestructure/mysql/Respository/MysqlProductRespository";
import { TYPES } from "../ioc/Types";
import { DomainProductEntity } from "./Entities/DomainProductEntity";

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
    console.log("product from domain service", product);
    const entity = this.mapper.toEntity(product);
    console.log("entity from domain service", entity);
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
