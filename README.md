# PolyNode - Microservices Learning Platform

A scalable, full-stack microservices-based learning platform built with Next.js, Node.js, Docker, Redis, and Kubernetes — featuring authentication, course management, payments, analytics, and real-time notifications.

## 🏗️ Architecture

PolyNode follows a microservices architecture pattern with the following services:

- **API Gateway** (Port 3001) - Central entry point for all API requests
- **User Service** (Port 3002) - User management and authentication
- **Course Service** (Port 3003) - Course and content management
- **Payment Service** (Port 3004) - Payment processing and subscriptions
- **Notification Service** (Port 3005) - Multi-channel notifications
- **Analytics Service** (Port 3006) - Data analytics and reporting
- **Frontend** (Port 3000) - Next.js web application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- PostgreSQL (for production)
- Redis (for caching and events)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/silky-x0/PolyNode.git
   cd PolyNode
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Copy example environment files
   cp backend/user-service/.env.example backend/user-service/.env
   cp backend/api-gateway/.env.example backend/api-gateway/.env
   # ... repeat for other services
   ```

4. **Start with Docker (Recommended for development)**
   ```bash
   npm run docker:up
   ```

5. **Or start services individually**
   ```bash
   npm run dev
   ```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all services
- `npm run docker:up` - Start all services with Docker
- `npm run docker:down` - Stop all Docker services
- `npm run docker:build` - Rebuild Docker images

### Service Development

Each service can be developed independently:

```bash
# Start only the user service
npm run dev:user

# Start only the frontend
npm run dev:frontend
```

### API Testing

Once services are running, test the API:

```bash
# Test API Gateway health
curl http://localhost:3001/health

# Test User Service
curl http://localhost:3002/health

# Test API through Gateway
curl http://localhost:3001/api/users
```

## 📁 Project Structure

```
POLYNODE/
├── backend/                 # Microservices
│   ├── api-gateway/        # API Gateway Service
│   ├── user-service/       # User Management Service
│   ├── course-service/     # Course Management Service
│   ├── payment-service/    # Payment Processing Service
│   ├── notification-service/ # Notification Service
│   ├── analytics-service/  # Analytics Service
│   └── shared/             # Shared Libraries
├── frontend/               # Next.js Frontend
├── infrastructure/         # Infrastructure as Code
├── docs/                  # Documentation
└── tests/                 # Test Suites
```

## 🔧 Configuration

### Environment Variables

Each service requires specific environment variables. See `.env.example` files in each service directory.

Key variables:
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Database connection
- `JWT_SECRET`, `REFRESH_SECRET` - JWT authentication
- `REDIS_HOST`, `REDIS_PORT` - Redis connection
- `FRONTEND_URL` - Frontend URL for CORS

### Database Setup

1. **Development**: Use Docker Compose (includes PostgreSQL and Redis)
2. **Production**: Set up separate PostgreSQL instances for each service

## 🧪 Testing

```bash
# Run tests for specific service
cd backend/user-service && npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Docker Deployment

```bash
# Build and start all services
npm run docker:build
npm run docker:up
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f infrastructure/kubernetes/
```

### Production Considerations

- Set `NODE_ENV=production`
- Use proper SSL certificates
- Configure monitoring and logging
- Set up CI/CD pipelines
- Implement proper backup strategies

## 📊 Monitoring

- **Health Checks**: `/health` endpoint on each service
- **Service Status**: `/status` endpoint on API Gateway
- **Logs**: Structured logging across all services
- **Metrics**: Prometheus metrics collection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

- Create an issue for bugs or feature requests
- Check the documentation in the `docs/` folder
- Review the architecture documentation

## 🔄 Development Status

**Current Phase**: Foundation & Core Setup (Phase 1)

**Completed**:
- ✅ Project structure setup
- ✅ Basic service separation
- ✅ TypeScript configuration
- ✅ Docker setup
- ✅ Shared types and schemas
- ✅ API Gateway routing
- ✅ User service routes
- ✅ Frontend Next.js setup

**Next Steps**:
- 🔄 Database connections implementation
- 🔄 Authentication middleware
- 🔄 Service integration
- 🔄 Frontend authentication flow