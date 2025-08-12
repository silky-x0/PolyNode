import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per window
  message: { error: 'Too many requests' }
});
app.use(limiter);

// Service discovery and routing
const services = {
  user: process.env.USER_SERVICE_URL || 'http://localhost:3002',
  course: process.env.COURSE_SERVICE_URL || 'http://localhost:3003',
  payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
  notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
  analytics: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:3006'
};

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
    services: Object.keys(services)
  });
});

// Service status check
app.get('/status', async (req: Request, res: Response) => {
  const serviceStatus: Record<string, string> = {};
  
  for (const [name, url] of Object.entries(services)) {
    try {
      const response = await fetch(`${url}/health`);
      serviceStatus[name] = response.ok ? 'healthy' : 'unhealthy';
    } catch (error) {
      serviceStatus[name] = 'unreachable';
    }
  }
  
  res.json({
    gateway: 'healthy',
    services: serviceStatus,
    timestamp: new Date().toISOString()
  });
});

// Route forwarding middleware
const forwardRequest = (serviceUrl: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const targetUrl = `${serviceUrl}${req.path}`;
      const method = req.method;
      
      // Convert headers to proper format for fetch
      const headers: Record<string, string> = {};
      Object.entries(req.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          headers[key] = Array.isArray(value) ? value.join(', ') : value;
        }
      });
      
      // Remove host header to avoid conflicts
      delete headers.host;
      
      const response = await fetch(targetUrl, {
        method,
        headers,
        body: method !== 'GET' ? JSON.stringify(req.body) : undefined
      });
      
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error(`Error forwarding to ${serviceUrl}:`, error);
      res.status(500).json({ error: 'Service temporarily unavailable' });
    }
  };
};

// Route definitions
app.use('/api/auth', forwardRequest(services.user));
app.use('/api/users', forwardRequest(services.user));
app.use('/api/courses', forwardRequest(services.course));
app.use('/api/payments', forwardRequest(services.payment));
app.use('/api/notifications', forwardRequest(services.notification));
app.use('/api/analytics', forwardRequest(services.analytics));

// Catch-all for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('API Gateway Error:', error);
  res.status(500).json({ error: 'Internal Gateway Error' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
  console.log('Available services:', Object.keys(services));
}); 