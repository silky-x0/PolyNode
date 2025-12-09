import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.accessTokenExpiry as any });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshTokenExpiry as any });
};

export const verifyToken = (token: string, isRefreshToken = false): TokenPayload | null => {
    try {
        const secret = isRefreshToken ? config.jwt.refreshSecret : config.jwt.secret;
        return jwt.verify(token, secret) as TokenPayload;
    } catch (error) {
        return null;
    }
};

export const decodeToken = (token: string): any => {
    return jwt.decode(token);
}
