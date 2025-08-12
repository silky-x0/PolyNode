export interface Course {
    id: string;
    title: string;
    slug: string;
    description?: string;
    instructor_id: string;
    category?: string;
    subcategory?: string;
    difficulty_level: DifficultyLevel;
    price: number;
    currency: string;
    estimated_hours?: number;
    language: string;
    thumbnail_url?: string;
    preview_video_url?: string;
    status: CourseStatus;
    tag: string[];
    requirements: string[];
    what_you_learn: string[];
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export enum DifficultyLevel {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced'
}

export enum CourseStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived'
}

export interface CourseModule {
    id: string;
    course_id: string;
    title: string;
    description?: string;
    order_index: number;
    is_published: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Lesson {
    id: string;
    module_id: string;
    title: string;
    description?: string;
    content_type: ContentType;
    content_url: string;
    content_data: string;
    duration_minutes: number;
    order_index: number;
    is_free: boolean;
    is_published: boolean;
    created_at: Date;
    updated_at: Date;
}

export enum ContentType {
    VIDEO = 'video',
    TEXT = 'text',
    QUIZ = 'quiz',
    ASSIGNMENT = 'assignment'
}

export interface CourseEnrollment {
    id: string;
    student_id: string;
    course_id: string;
    enrollment_date: Date;
    completion_date?: Date;
    progress_percentage: number;
    last_accessed_at: Date;
    access_expires_at?: Date;
    payment_id?: string;
    status: EnrollmentStatus;
    created_at: Date;
    updated_at: Date;
}

export enum EnrollmentStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    SUSPENDED = 'suspended',
    REFUNDED = 'refunded'
}

export interface LessonProgress {
    id: string;
    student_id: string;
    lesson_id: string;
    course_id: string;
    started_at: Date;
    completed_at?: Date;
    time_spent_seconds: number;
    completion_percentage: number;
    notes?: string;
    created_at: Date;
    updated_at: Date;
}

