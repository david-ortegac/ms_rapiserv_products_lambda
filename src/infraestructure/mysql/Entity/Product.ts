import { Column, Entity, PrimaryColumn } from "typeorm";
import "reflect-metadata";

@Entity("products")
export class Product {
  @PrimaryColumn({ type: "bigint", width: 18 })
  id!: number;

  @Column({ type: "varchar", length: 255 })
  productName!: string;

  @Column({ type: "varchar", length: 255 })
  productDescription!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  productPrice!: number;

  @Column({ type: "varchar", length: 255 })
  productCategory!: string;

  @Column({ type: "varchar", length: 255 })
  subCategory!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @Column({ type: "varchar", length: 255 })
  createdBy!: string;

  @Column({ type: "varchar", length: 255 })
  updatedBy!: string;
}
