// Export all shared types
export * from './types/user.types';
export * from './types/course.types';

// Export shared utilities (to be implemented)
export const sharedUtils = {
  generateId: () => crypto.randomUUID(),
  formatDate: (date: Date) => date.toISOString(),
  validateEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
};

// Export shared constants
export const SHARED_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_TIMEZONE: 'UTC'
} as const; 