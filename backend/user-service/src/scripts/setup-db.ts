import { Client } from 'pg';
import { config } from '../config/config';

const client = new Client({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: 'postgres' // Connect to default DB
});

async function run() {
    try {
        await client.connect();
        console.log('Connected to postgres default DB.');
        const res = await client.query('SELECT datname FROM pg_database WHERE datname = $1', [config.database.name]);
        if (res.rows.length === 0) {
            console.log(`Database ${config.database.name} does not exist. Creating...`);
            await client.query(`CREATE DATABASE ${config.database.name}`);
            console.log(`Database ${config.database.name} created.`);
        } else {
            console.log(`Database ${config.database.name} exists.`);
        }
        await client.end();
    } catch (e: any) {
        console.error('Connection failed:', e.message);
        process.exit(1);
    }
}

run();
