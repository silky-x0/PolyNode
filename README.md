# PolyNode
A scalable, full-stack microservices-based learning platform built with Next.js, Node.js, Docker, Redis, and Kubernetes — featuring authentication, course management, payments, analytics, and real-time notifications.

---

## Project Structure

```
frontend/                # Next.js Frontend Application
backend/                 # Microservices (API Gateway, User, Course, Payment, Notification, Analytics)
infrastructure/docker/   # Docker and docker-compose files
scripts/                 # Automation scripts
```

## Getting Started (Development)

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Install Dependencies

Install root dependencies (for scripts):
```bash
npm install
```

Install dependencies for each service (example for API Gateway):
```bash
cd backend/api-gateway
npm install
# Repeat for each backend service and frontend
```

### 2. Environment Variables

Copy `.env.example` to `.env` in each service and fill in values as needed:
```bash
cp backend/api-gateway/.env.example backend/api-gateway/.env
# Repeat for each service
```

### 3. Run All Services with Docker Compose

From the `infrastructure/docker` directory:
```bash
cd infrastructure/docker
# Build and start all services
docker-compose up --build
```

- Frontend: http://localhost:3000
- API Gateway: http://localhost:3001
- User Service: http://localhost:3002
- Course Service: http://localhost:3003
- Payment Service: http://localhost:3004
- Notification Service: http://localhost:3005
- Analytics Service: http://localhost:3006

### 4. Stopping Services
```bash
docker-compose down
```

## Development (Without Docker)

You can run each service individually for development:
```bash
cd backend/api-gateway
npm run dev
# Repeat for each service
```

## Adding More Services
- Add a new folder in `backend/`
- Add a Dockerfile and update `docker-compose.yml`