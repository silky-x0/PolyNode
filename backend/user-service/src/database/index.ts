import { Pool, PoolConfig } from 'pg';
import { config } from '../config/config';

const poolConfig: PoolConfig = {
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password,
    max: config.database.maxConnection,
    ssl: config.database.ssl ? {
        rejectUnauthorized: false
    } : undefined
};

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const getClient = () => pool.connect();

export const checkConnection = async (): Promise<boolean> => {
    try {
        const client = await pool.connect();
        try {
            await client.query('SELECT NOW()');
            return true;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Database connection failed:', err);
        return false;
    }
};
