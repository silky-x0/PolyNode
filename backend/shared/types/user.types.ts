export interface User {
    id: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    email_verfied: boolean;
    profile_picture_url?: string;
    bio?: string;
    timezone: string;
    language: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export enum UserRole {
    STUDENT = 'student',
    INSTRUCTOR = 'instructor',
    ADMIN = 'admin'
}

export interface UserResponse {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    email_verified: boolean;
    profile_picture_url?: string;
    bio?: string;
    timezone: string;
    language: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserSession {
    id: string;
    user_id: string;
    refresh_token_hash: string;
    device_info?: Record<string, any>;
    ip_address?: string;
    last_used_at: Date;
    expires_at: Date;
    created_at: Date;
}

export interface UserPreferences {
    id: string;
    user_id: string;
    email_notifications: boolean;
    push_notifications: boolean;
    marketing_emails: boolean;
    theme: 'dark' | 'light'
    notification_settings: Record<string, any>;
    privacy_settings: Record<string, any>;
    created_at: Date;
    updated_at: Date;
}