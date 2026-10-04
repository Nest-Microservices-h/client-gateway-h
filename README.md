# Client Gateway - NestJS Microservices Gateway

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A robust API Gateway built with NestJS that serves as the entry point for microservices architecture. This gateway handles HTTP requests and routes them to appropriate microservices using NATS messaging system.

## 🏗️ Architecture

This project implements a microservices architecture pattern where the API Gateway acts as a single entry point that:

- Receives HTTP requests from clients
- Validates and transforms requests using DTOs
- Routes requests to appropriate microservices via NATS messaging
- Handles errors and responses consistently
- Provides pagination and filtering capabilities

### Microservices Integration

The gateway communicates with the following microservices using NATS:

- **Products Microservice** (via NATS)
- **Orders Microservice** (migration in progress)

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**
- **NATS Server** >= 2.10.0 (for message broker)

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
NATS_SERVERS="nats://localhost:4222"
```

### 4. Start NATS Server

Before starting the gateway and microservices, ensure NATS server is running:

```bash
# Using Docker (recommended)
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats

# Useful Docker commands for NATS management:
# View NATS container logs
docker logs nats-server

# Stop NATS container
docker stop nats-server

# Start NATS container again
docker start nats-server

# Remove NATS container
docker rm nats-server

# Or install locally
# Download from https://nats.io/download/
nats-server
```

### 5. Start microservices

Ensure that the required microservices are running and connected to NATS:

```bash
# Start Products Microservice (in products-ms directory)
cd ../products-ms
npm run start:dev

# Start Orders Microservice (in orders-ms directory)
cd ../orders-ms
npm run start:dev
```

### 6. Run the gateway

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

| Variable       | Description                        | Default                 | Required |
| -------------- | ---------------------------------- | ----------------------- | -------- |
| `PORT`         | Gateway port                       | 3000                    | Yes      |
| `NATS_SERVERS` | NATS server URLs (comma-separated) | "nats://localhost:4222" | Yes      |

## 🛠️ Tech Stack

- **Framework**: NestJS 12.1.1
- **Language**: TypeScript 6.0.3
- **Messaging**: NATS (@nats-io/transport-node)
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

### NATS Connection Issues

If you encounter NATS connection errors:

1. **Verify NATS server is running**: Check that NATS server is started and accessible
2. **Check NATS server URL**: Ensure `NATS_SERVERS` in `.env` is correct (e.g., `nats://localhost:4222`)
3. **Network connectivity**: Verify network access to NATS server
4. **Server status**: Check NATS server logs for connection issues
5. **Docker issues**: If using Docker NATS, ensure proper port mapping (-p 4222:4222)

### Microservices Not Responding

If microservices are not responding:

1. **Verify microservices are running**: Check that both products and orders microservices are started
2. **Check NATS subscription**: Ensure microservices are subscribed to correct NATS subjects
3. **Verify subject patterns**: Check that message patterns match between gateway and microservices
4. **Check logs**: Review microservice logs for NATS connection errors

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
- [NATS](https://nats.io/) - High-performance messaging system
- [Microservices Pattern](https://docs.nestjs.com/microservices) - Architecture inspiration
- [Oxlint](https://oxlint.com/) - Fast linter for TypeScript/JavaScript

## 📞 Support

For support and questions:

- Open an issue in the GitHub repository
- Check the [NestJS Documentation](https://docs.nestjs.com)
- Join the [NestJS Discord](https://discord.gg/G7Qnnhy)
