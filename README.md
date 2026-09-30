# Client Gateway - NestJS Microservices Gateway

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A robust API Gateway built with NestJS that serves as the entry point for microservices architecture. This gateway handles HTTP requests and routes them to appropriate microservices using TCP communication.

## 🏗️ Architecture

This project implements a microservices architecture pattern where the API Gateway acts as a single entry point that:

- Receives HTTP requests from clients
- Validates and transforms requests using DTOs
- Routes requests to appropriate microservices via TCP
- Handles errors and responses consistently
- Provides pagination and filtering capabilities

### Microservices Integration

The gateway communicates with the following microservices:

- **Products Microservice** (Port 3001)
- **Orders Microservice** (Port 3002)

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Nest-Microservices-h/client-gateway-h.git
cd client-gateway-h
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory based on `.env.template`:

```bash
cp .env.template .env
```

Update the `.env` file with your microservices configuration:

```env
PORT=3000
PRODUCTS_MICROSERVICE_HOST=localhost
PRODUCTS_MICROSERVICE_PORT=3001
ORDERS_MICROSERVICE_HOST=localhost
ORDERS_MICROSERVICE_PORT=3002
```

### 4. Start microservices

Before starting the gateway, ensure that the required microservices are running:

```bash
# Start Products Microservice (in products-ms directory)
cd ../products-ms
npm run start:dev

# Start Orders Microservice (in orders-ms directory)
cd ../orders-ms
npm run start:dev
```

### 5. Run the gateway

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The gateway will be available at `http://localhost:3000/api`

## 📁 Project Structure

```
client-gateway-h/
├── src/
│   ├── common/              # Shared utilities and DTOs
│   │   ├── dto/            # Common DTOs (PaginationDto)
│   │   ├── exceptions/     # Custom exception filters
│   │   └── index.ts
│   ├── config/             # Configuration files
│   │   ├── envs.ts         # Environment variables validation
│   │   ├── service.ts      # Microservice constants
│   │   └── index.ts
│   ├── orders/             # Orders module
│   │   ├── dto/           # Orders DTOs
│   │   ├── enum/          # Order status enums
│   │   ├── orders.controller.ts
│   │   ├── orders.module.ts
│   │   └── orders.service.ts
│   ├── products/           # Products module
│   │   ├── dto/           # Products DTOs
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
├── test/                   # E2E tests
├── .env.template          # Environment variables template
├── oxlint.json            # Oxlint configuration
├── package.json
└── tsconfig.json
```

## 🔧 Available Scripts

```bash
# Development
npm run start              # Start application
npm run start:dev          # Start in watch mode (recommended for development)
npm run start:debug        # Start in debug mode
npm run start:prod         # Start in production mode

# Building
npm run build              # Build the project

# Code Quality
npm run lint               # Run oxlint for code linting
npm run format            # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:e2e          # Run end-to-end tests
npm run test:cov          # Run tests with coverage
npm run test:watch        # Run tests in watch mode
```

## 🌐 API Endpoints

### Products

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| POST   | `/api/products`     | Create a new product               |
| GET    | `/api/products`     | Get all products (with pagination) |
| GET    | `/api/products/:id` | Get a specific product by ID       |
| PATCH  | `/api/products/:id` | Update a product                   |
| DELETE | `/api/products/:id` | Delete a product                   |

### Orders

| Method | Endpoint              | Description                                        |
| ------ | --------------------- | -------------------------------------------------- |
| POST   | `/api/orders`         | Create a new order                                 |
| GET    | `/api/orders`         | Get all orders (with pagination and status filter) |
| GET    | `/api/orders/:status` | Get orders by status                               |
| GET    | `/api/orders/id/:id`  | Get a specific order by ID                         |
| PATCH  | `/api/orders/:id`     | Change order status                                |

## 🔐 Environment Variables

| Variable                     | Description                | Default   | Required |
| ---------------------------- | -------------------------- | --------- | -------- |
| `PORT`                       | Gateway port               | 3000      | Yes      |
| `PRODUCTS_MICROSERVICE_HOST` | Products microservice host | localhost | Yes      |
| `PRODUCTS_MICROSERVICE_PORT` | Products microservice port | 3001      | Yes      |
| `ORDERS_MICROSERVICE_HOST`   | Orders microservice host   | localhost | Yes      |
| `ORDERS_MICROSERVICE_PORT`   | Orders microservice port   | 3002      | Yes      |

## 🛠️ Tech Stack

- **Framework**: NestJS 12.1.1
- **Language**: TypeScript 6.0.3
- **Validation**: class-validator, class-transformer
- **Environment**: dotenv, joi
- **Code Quality**: oxlint, Prettier
- **Testing**: Jest 30.5.2

## 🔍 Code Quality

This project uses **oxlint** instead of ESLint for faster linting. Run the linter before committing:

```bash
npm run lint
```

TypeScript configuration is set to be strict but allows for DTO flexibility:

- `strictNullChecks: true`
- `strictPropertyInitialization: false` (for DTOs)

## 🐛 Troubleshooting

### Connection Refused Errors

If you encounter `ECONNREFUSED` errors:

1. **Verify microservices are running**: Check that both products and orders microservices are started
2. **Check ports**: Ensure no other services are using ports 3001 and 3002
3. **Verify environment variables**: Check your `.env` file has correct host and port values
4. **Network issues**: If using Docker, ensure containers are on the same network

### TypeScript Errors

If you encounter TypeScript errors with DTOs:

- The project uses `strictPropertyInitialization: false` to allow DTOs without initializers
- This is intentional for class-validator DTOs that are populated dynamically

### Build Issues

If you encounter build issues:

```bash
# Clean build artifacts
rm -rf dist
rm tsconfig.build.tsbuildinfo

# Rebuild
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Commit Convention

This project follows conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for maintenance tasks
- `refactor:` for code refactoring
- `docs:` for documentation changes

Example: `feat(orders): add order status filtering`

## 📄 License

This project is [UNLICENSED](LICENSE).

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The framework used
- [Microservices Pattern](https://docs.nestjs.com/microservices) - Architecture inspiration
- [Oxlint](https://oxlint.com/) - Fast linter for TypeScript/JavaScript

## 📞 Support

For support and questions:

- Open an issue in the GitHub repository
- Check the [NestJS Documentation](https://docs.nestjs.com)
- Join the [NestJS Discord](https://discord.gg/G7Qnnhy)
