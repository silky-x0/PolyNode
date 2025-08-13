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
- GitHub repository (for CI/CD pipeline)
- Vercel account (for frontend deployment)

### Recent Improvements

- ✅ **CI/CD Pipeline**: Automated deployment with GitHub Actions
- ✅ **Frontend Deployment**: Seamless Vercel integration
- ✅ **Code Quality**: ESLint configuration and automated checks
- ✅ **Development Workflow**: Preview deployments and automated testing

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

### Development Workflow

PolyNode now features an enhanced development workflow with automated quality checks:

- **Automated Testing**: Every push triggers GitHub Actions workflows
- **Code Quality**: ESLint ensures consistent code style
- **Preview Deployments**: See changes live before merging
- **Continuous Integration**: Automated builds and tests

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all services
- `npm run docker:up` - Start all services with Docker
- `npm run docker:down` - Stop all Docker services
- `npm run docker:build` - Rebuild Docker images

### Frontend Development

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint with auto-fix
npm run lint:check   # Check code quality
npm run test         # Run tests and build
```

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

### CI/CD Pipeline

PolyNode now features a complete CI/CD pipeline for automated deployment:

- **GitHub Actions**: Automated testing, building, and deployment
- **Vercel Integration**: Frontend deployment with preview environments
- **Automated Testing**: Linting, building, and validation on every push
- **Preview Deployments**: Automatic preview URLs for pull requests
- **Production Deployment**: Automated deployment from main branch

#### Frontend Deployment

The frontend automatically deploys to Vercel:
- **Preview**: Every pull request gets a preview deployment
- **Production**: Merges to main trigger production deployment
- **Zero-downtime**: Seamless updates with automatic rollbacks

#### Backend Services

Backend services can be deployed using:
```bash
# Docker deployment
npm run docker:build
npm run docker:up

# Kubernetes deployment
kubectl apply -f infrastructure/kubernetes/
```

### Production Considerations

- Set `NODE_ENV=production`
- Use proper SSL certificates
- Configure monitoring and logging
- CI/CD pipelines are now configured ✅
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

**Current Phase**: Foundation & Core Setup + CI/CD Implementation (Phase 1-2)

**Completed**:
- ✅ Project structure setup
- ✅ Basic service separation
- ✅ TypeScript configuration
- ✅ Docker setup
- ✅ Shared types and schemas
- ✅ API Gateway routing
- ✅ User service routes
- ✅ Frontend Next.js setup
- ✅ **CI/CD Pipeline Setup**
  - GitHub Actions workflows for automated testing and deployment
  - Vercel integration for frontend deployment
  - Automated preview deployments for pull requests
  - Production deployment pipeline
- ✅ **Frontend Enhancements**
  - Modern, responsive UI with Tailwind CSS
  - ESLint configuration for code quality
  - Automated testing and build processes
- ✅ **Development Workflow**
  - Automated linting and testing on every push
  - Preview deployments for feature branches
  - Production deployment from main branch

**In Progress**:
- 🔄 Database connections implementation
- 🔄 Authentication middleware
- 🔄 Service integration
- 🔄 Frontend authentication flow

**Next Milestones**:
- 🎯 Complete backend service integration
- 🎯 Implement user authentication system
- 🎯 Add course management functionality
- 🎯 Set up monitoring and analytics