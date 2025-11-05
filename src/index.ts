import 'reflect-metadata';

import { ProductController } from './adapter/restful/v1/controller/ProductController';
import { AppDataSource } from './infraestructure/mysql/data-source';
import { container } from './ioc/inversify.config';
import { TYPES } from './ioc/Types';
import { validateTokenFromEvent } from './utils/jwt-validator';

// Variables globales para reutilización entre invocaciones
let isDataSourceInitialized = false;
let controller: ProductController;

export const handler = async (event: any) => {
  const validation = validateTokenFromEvent(event);

  if (!validation.valid) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized', error: validation.error }),
    };
  }

  console.log('event', event);
  try {
    // Inicializar DataSource solo una vez (reutilización de contenedor)
    if (!isDataSourceInitialized) {
      console.log('Inicializando DataSource...');
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      isDataSourceInitialized = true;
      console.log('DataSource inicializado');
    }

    console.log('Resolviendo dependencias...');
    controller = container.get<ProductController>(TYPES.ProductController);
    console.log('Dependencias resueltas');

    // Procesar la petición
    const result = await controller.handleRequest(event);
    console.log('result', result);
    return result;
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      body: {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};
