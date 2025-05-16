# API NestJS en AWS Lambda con API Gateway

Este repositorio contiene una API NestJS desplegada en AWS Lambda y expuesta a través de API Gateway. La aplicación proporciona un endpoint para listar clientes.

## Detalles de la prueba
- Trunk base development como git branching lo cual consiste en tener una rama master principal y que todos los cambios lleguen por medio de un feature.
- Arquitectura serveless desplegada con sam
- Pruebas unitarias con jest.js
- Sonarqube como herramienta para el codigo estatico
- Terraform state en aws S3

## Estructura del Proyecto

```
.
├── src/
│   ├── modules/
│   │   └── clients/              # Módulo de clientes
│   │       ├── clients.controller.ts
│   │       ├── clients.controller.spec.ts
│   │       ├── clients.module.ts
│   │       ├── clients.service.ts
│   │       └── clients.service.spec.ts
│   ├── app.module.ts             # Módulo principal
│   ├── app.controller.spec.ts    # Pruebas del controlador principal
│   ├── main.ts                   # Punto de entrada para desarrollo local
│   ├── lambda.ts                 # Adaptador para AWS Lambda
│   └── lambda.spec.ts            # Pruebas del adaptador Lambda
├── template.yaml                 # Plantilla SAM para despliegue en AWS
├── jest.config.js                # Configuración de pruebas
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # Pipeline de CI/CD
├── package.json
└── tsconfig.json
```

## Endpoints

- `GET /clients`: Devuelve la lista de todos los clientes
- `GET /clients/:id`: Devuelve un cliente específico por ID

## Desarrollo Local

```bash
# Instalación de dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev

# Ejecutar linter
npm run lint
```

## Pruebas

El proyecto incluye pruebas unitarias para los componentes principales.

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo observador
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:cov
```

## Despliegue en AWS

Requisitos previos:
- AWS CLI configurado
- AWS SAM CLI instalado

```bash
# Compilar y empaquetar la aplicación
npm run package

# Desplegar con SAM
sam deploy
```

## CI/CD

El proyecto utiliza GitHub Actions para integración y despliegue continuos:

- **CI**: Se ejecuta en todas las ramas y realiza:
  - Instalación de dependencias
  - Linting
  - Compilación
  - Pruebas unitarias
  - Pre-commit hooks
  - Análisis estático con SonarQube

- **CD**: Se ejecuta solo en la rama principal (main) y realiza:
  - Empaquetado de la aplicación
  - Despliegue en AWS usando SAM

Para configurar el pipeline, necesitas configurar los siguientes secretos en tu repositorio de GitHub:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `SONAR_TOKEN`

## Tecnologías Utilizadas

- NestJS: Framework de backend
- TypeScript: Lenguaje de programación
- Jest: Framework de pruebas
- ESLint y Prettier: Herramientas de linting y formato
- AWS Lambda: Computación serverless
- Amazon API Gateway: Gestión de API
- AWS SAM: Modelo de Aplicación Serverless para despliegue
- GitHub Actions: CI/CD
- SonarQube: Análisis estático de código
