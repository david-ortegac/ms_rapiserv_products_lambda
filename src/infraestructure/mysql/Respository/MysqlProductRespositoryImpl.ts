import { Repository } from "typeorm";
import { MysqlProductRespository } from "./MysqlProductRespository";
import { Product } from "../Entity/Product";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../ioc/Types";

@injectable()
export class MysqlProductRespositoryImpl implements MysqlProductRespository {
  constructor(
    @inject(TYPES.MysqlProductRespository)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findById(id: number): Promise<Product | null> {
    return (await this.productRepository.findOne({ where: { id } })) ?? null;
  }
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
  async update(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
