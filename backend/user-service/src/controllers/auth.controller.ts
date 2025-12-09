import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { config } from '../config/config';

// Mock user store (in-memory for now)
const mockUsers: any[] = [];

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, first_name, last_name, role } = req.body;

        // In a real DB, check if user exists. 
        // For mock, we'll just proceed or check our array.
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
             res.status(400).json({ error: 'User already exists' });
             return;
        }

        const hashedPassword = await hashPassword(password);
        
        const newUser = {
            id: 'mock-user-id-' + Date.now(),
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role: role || 'student',
            created_at: new Date()
        };

        if (config.useMockDatabase) {
            mockUsers.push(newUser);
        }

        // Generate tokens for immediate login
        const tokenPayload = {
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
        };

        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                role: newUser.role
            },
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        let user;
        if (config.useMockDatabase) {
            user = mockUsers.find(u => u.email === email);
            // Fallback for default mock user if not in array
            if (!user && email === 'test@example.com' && password === 'password') {
                 user = {
                    id: 'mock-user-id',
                    email: 'test@example.com',
                    password: await hashPassword('password'), // runtime hash
                    first_name: 'Mock',
                    last_name: 'User',
                    role: 'student'
                 }
                 mockUsers.push(user);
            }
        }

        if (!user) {
             res.status(401).json({ error: 'Invalid credentials' });
             return;
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
             res.status(401).json({ error: 'Invalid credentials' });
             return;
        }

        const tokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role
        };

        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        res.status(200).json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role
            }
        });

    } catch (error) {
         console.error('Login error:', error);
         res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
             res.status(400).json({ error: 'Refresh token required' });
             return;
        }

        const decoded = verifyToken(refreshToken, true);
        if (!decoded) {
             res.status(401).json({ error: 'Invalid refresh token' });
             return;
        }

        const tokenPayload = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        const newAccessToken = generateAccessToken(tokenPayload);
        // Rotate refresh token? Often good practice
        const newRefreshToken = generateRefreshToken(tokenPayload); 

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        console.error('Refresh error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logout = async (req: Request, res: Response) => {
    // Invalidate token logic (e.g. blacklist in Redis)
    res.status(200).json({ message: 'Logout successful' });
};
