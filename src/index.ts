import { ProductController } from "./adapter/restful/v1/controller/ProductController";
import { container } from "./inversify.config";
import { TYPES } from "./ioc/Types";

export const handler = async (event: any) => {
  const productController = container.get<ProductController>(
    TYPES.ProductController,
  );

  try {
    const products = await productController.getProducts();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
