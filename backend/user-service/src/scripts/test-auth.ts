import { login, register } from '../controllers/auth.controller';
import { Request, Response } from 'express';

interface MockResponse extends Response {
    data?: any;
}

// Mock objects
const mockReq = (body: any) => ({ body } as unknown as Request);
const mockRes = () => {
    const res: any = {};
    res.status = (code: number) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data: any) => {
        res.data = data;
        return res;
    };
    return res as unknown as MockResponse;
};

async function testAuth() {
    console.log('Testing Authentication Flow...');

    // 1. Register
    console.log('\n1. Testing Registration...');
    const regReq = mockReq({
        email: 'test-auth@example.com',
        password: 'password123',
        first_name: 'Test',
        last_name: 'Auth',
        role: 'student'
    });
    const regRes = mockRes();
    await register(regReq, regRes);
    
    // Cast to any to access custom data property
    if (regRes.statusCode === 201 && (regRes as any).data.accessToken) {
        console.log('✅ Registration successful. Token received.');
    } else {
        console.error('❌ Registration failed:', regRes.data);
    }

    // 2. Login
    console.log('\n2. Testing Login...');
    const loginReq = mockReq({
        email: 'test-auth@example.com',
        password: 'password123'
    });
    const loginRes = mockRes();
    await login(loginReq, loginRes);

    if (loginRes.statusCode === 200 && (loginRes as any).data.accessToken) {
        console.log('✅ Login successful. Token received.');
        console.log('Access Token:', (loginRes as any).data.accessToken.substring(0, 20) + '...');
    } else {
        console.error('❌ Login failed:', (loginRes as any).data);
    }
}

testAuth();
