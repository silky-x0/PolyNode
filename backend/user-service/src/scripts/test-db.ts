import { checkConnection } from '../database';

async function test() {
    console.log('Testing database connection...');
    const connected = await checkConnection();
    if (connected) {
        console.log('✅ Success: Connected to database');
        process.exit(0);
    } else {
        console.error('❌ Error: Could not connect to database');
        process.exit(1);
    }
}

test();
