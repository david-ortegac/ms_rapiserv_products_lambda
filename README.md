# MS Products Lambda

Microservicio de productos implementado como AWS Lambda usando TypeScript, TypeORM, MySQL e InversifyJS.

## 🏗️ Arquitectura

Este proyecto sigue una **arquitectura hexagonal (Clean Architecture)** con las siguientes capas:

- **Domain**: Lógica de negocio y entidades de dominio
- **Application**: Servicios de aplicación e interfaces
- **Infrastructure**: Implementaciones de repositorios y fuentes de datos
- **Adapter**: Controladores REST y mappers
- **IOC**: Configuración de inyección de dependencias con InversifyJS

## ✨ Características

- ✅ Arquitectura hexagonal (Clean Architecture)
- ✅ Inyección de dependencias con InversifyJS
- ✅ TypeORM para gestión de base de datos MySQL
- ✅ Validación de JWT para autenticación
- ✅ Bundle optimizado con esbuild
- ✅ Soporte para variables de entorno
- ✅ Reutilización de conexiones en Lambda (warm starts)

## 📋 Requisitos Previos

- Node.js 22.x o superior
- npm o yarn
- Acceso a base de datos MySQL
- AWS CLI (opcional, para despliegue)

## 🚀 Instalación

```bash
# Instalar dependencias
npm install
```

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
# Compilar TypeScript (modo desarrollo)
npm run build-app
```

### Build para Lambda

```bash
# Limpiar directorio de distribución
npm run clean

# Build completo con bundling de dependencias
npm run build

# Empaquetar para deploy (build + zip)
npm run package
```

### Linting y Formato

```bash
# Ejecutar linter
npm run lint

# Corregir problemas de linting
npm run lint:fix

# Formatear código con Prettier
npm run prettier

# Formatear código con Prettier (alias)
npm run prettier:write
```

### Stylelint (CSS)

```bash
# Ejecutar stylelint
npm run stylelint

# Corregir problemas de stylelint
npm run stylelint:fix

# Formatear estilos con stylelint
npm run stylelint:write
```

## 📦 Proceso de Build

El proyecto usa **esbuild** para crear un bundle optimizado que incluye:

1. Todo el código TypeScript compilado
2. Todas las dependencias necesarias (excepto aws-sdk)
3. Sourcemaps para debugging
4. Optimizado para Node.js 22 (AWS Lambda runtime)

El resultado se genera en la carpeta `dist/` con:

- `index.js` - Lambda handler y todo el código bundled
- `index.js.map` - Sourcemap
- `package.json` - Metadata del paquete

El build muestra el tamaño del bundle generado para monitoreo.

## 🚢 Despliegue a AWS Lambda

### Opción 1: Manual

```bash
# 1. Generar el paquete
npm run package

# 2. Subir el archivo .zip generado en releases/ a AWS Lambda mediante la consola de AWS
```

### Opción 2: AWS CLI

```bash
# Build y package
npm run package

# Deploy usando AWS CLI
aws lambda update-function-code \
  --function-name tu-funcion-lambda \
  --zip-file fileb://releases/ms-products-lambda-v0.0.1.zip
```

### Opción 3: SAM/CloudFormation

Incluir el .zip generado en tu template SAM o CloudFormation.

## 🏃 Ejecución Local (Desarrollo)

Para probar localmente, puedes usar AWS SAM CLI:

```bash
# Instalar SAM CLI primero
# https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

# Invocar localmente
sam local invoke -e event.json
```

## 🔧 Configuración

### Variables de Entorno

Configura las siguientes variables en tu función Lambda:

```bash
# Base de datos MySQL
DB_HOST=tu-host-mysql
DB_PORT=3306
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-password
DB_DATABASE=tu-base-de-datos
JWT_SECRET_KEY=Secret Key compartida desde ms_auth_lambda

# Entorno (opcional)
NODE_ENV=production  # o development para habilitar logging y sincronización automática
```

**Nota**: Las credenciales se leen desde variables de entorno. Asegúrate de configurarlas en la consola de AWS Lambda o mediante AWS Systems Manager Parameter Store / AWS Secrets Manager para mayor seguridad.

### Configuración de Lambda

- **Runtime**: Node.js 22.x
- **Handler**: `index.handler`
- **Timeout**: Configurar según tus necesidades (recomendado: 30 segundos mínimo)
- **Memory**: Ajustar según el tamaño del bundle y necesidades de procesamiento
- **VPC**: Si tu base de datos MySQL está en una VPC privada, configura la Lambda para acceder a la VPC

## 📁 Estructura del Proyecto

```
src/
├── adapter/              # Controladores REST y mappers
│   └── restful/v1/
│       └── controller/
├── application/          # Servicios de aplicación e interfaces
│   └── services/
├── domain/               # Lógica de negocio y entidades
│   ├── Entities/
│   └── ProductServiceImpl.ts
├── infraestructure/      # Repositorios y conexión a DB
│   └── mysql/
│       ├── Entity/
│       ├── Mapper/
│       └── Respository/
├── ioc/                  # Configuración de inyección de dependencias
│   ├── inversify.config.ts
│   └── Types.ts
├── models/               # Modelos de respuesta
├── utils/                # Utilidades (JWT validator, etc.)
└── index.ts              # Lambda handler principal

build.config.mjs          # Configuración de build con esbuild
tsconfig.json             # Configuración de TypeScript
eslint.config.mjs         # Configuración de ESLint
```

## 🔐 Seguridad

El proyecto incluye validación de JWT mediante el módulo `utils/jwt-validator.ts`. Todas las peticiones deben incluir un token JWT válido para ser procesadas.

### Autenticación JWT

El token JWT debe ser enviado en el header `Authorization` con el formato Bearer:

```
Authorization: Bearer <token_jwt>
```

**Importante**: El token JWT debe ser generado desde el microservicio `ms_auth_lambda`. Solo los tokens emitidos por este servicio serán aceptados y validados.

## 🧪 Testing

```bash
# TODO: Implementar tests
npm test
```

## 📝 Dependencias Principales

### Runtime

- `inversify` - Inyección de dependencias
- `typeorm` - ORM para MySQL
- `mysql2` - Driver de MySQL
- `jsonwebtoken` - Validación de JWT
- `axios` - Cliente HTTP
- `reflect-metadata` - Soporte para decoradores

### Desarrollo

- `typescript` - Compilador TypeScript
- `esbuild` - Bundler y minificador
- `eslint` - Linter
- `prettier` - Formateador de código
- `bestzip` - Utilidad para crear paquetes ZIP

## 📝 Notas Importantes

1. **Reflect Metadata**: El proyecto usa decoradores y necesita `reflect-metadata`. El bundling con esbuild incluye esta dependencia automáticamente.
2. **TypeORM**: Se usa TypeORM para la gestión de la base de datos MySQL. La conexión se reutiliza entre invocaciones de Lambda para mejorar el rendimiento.
3. **InversifyJS**: Inyección de dependencias usando InversifyJS para mantener bajo acoplamiento y alta cohesión.
4. **Tamaño del Bundle**: El bundle final incluye todas las dependencias. Monitorea el tamaño durante el build para mantenerlo optimizado.
5. **Warm Starts**: El handler está optimizado para reutilizar conexiones de base de datos entre invocaciones, mejorando el rendimiento en warm starts.
6. **Sincronización de DB**: La sincronización automática de TypeORM está deshabilitada en producción (`NODE_ENV=production`). Usa migraciones para cambios en producción.

## 🐛 Troubleshooting

### Error: Cannot find module 'reflect-metadata'

✅ **Solucionado**: El nuevo proceso de build con esbuild incluye todas las dependencias.

### Error: ErrorOptions not found

✅ **Solucionado**: Actualizado tsconfig.json a ES2022.

### Error al comprimir

Verifica que tienes `bestzip` instalado y que el directorio `releases/` existe:

```bash
npm install --save-dev bestzip
mkdir releases
```

### Error de conexión a la base de datos

- Verifica que las variables de entorno estén configuradas correctamente en Lambda
- Si la DB está en una VPC, asegúrate de que la Lambda tenga acceso a la VPC
- Verifica los grupos de seguridad y las reglas de red

### Timeout en Lambda

- Aumenta el timeout de la función Lambda
- Verifica que la base de datos esté accesible desde la Lambda
- Revisa los logs de CloudWatch para identificar cuellos de botella

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autor

David Ortega
