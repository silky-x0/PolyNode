import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

interface Config {
    server: {
        port: number;
        env: string;
    };
    database: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
        ssl: boolean;
        maxConnection: number;
    };
    jwt : {
        secret: string;
        refreshSecret: string;
        accessTokenExpiry: string;
        refreshTokenExpiry: string;
    };
    redis: {
        host: string;
        port: number;
        password?: string;
    };
    frontend: {
        url: string;
    };
    useMockDatabase: boolean;
}

const requiredEnvVars = [
    'DB_HOST',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'JWT_SECRET',
    'REFRESH_SECRET',
    'REDIS_HOST'
];

// Validating env variables
requiredEnvVars.forEach((envVar)=> {
    if (!process.env[envVar]){
        throw new Error(`Missing env Var: ${envVar}`);
    }
});

export const config: Config = {
    server: {
        port: parseInt(process.env.PORT || '3002'),
        env: process.env.NODE_ENV || 'development'
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'mockdb',
        user: process.env.DB_USER || 'mockuser',
        password: process.env.DB_PASSWORD || 'mockpassword',
        ssl: process.env.NODE_ENV === 'production',
        maxConnection: parseInt(process.env.DB_MAX_CONNECTIONS || '20')
    },
    jwt: {
        secret: process.env.JWT_SECRET!,
        refreshSecret: process.env.REFRESH_SECRET!,
        accessTokenExpiry: '15m',
        refreshTokenExpiry: '7d'
    },
    redis: {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD
    },
    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:3000'
    },
    useMockDatabase: process.env.NODE_ENV === 'development' // for mock db
};