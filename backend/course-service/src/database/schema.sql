CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    instsructor_id UUID NOT NULL REFERENCES users(id),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    price DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    estimated_duration INT,
    language VARCHAR(50) DEFAULT 'en',
    thumbnail_url VARCHAR(255),
    preview_video_url VARCHAR(255),
    status VARCHAR(20) CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    tags TEXT[],
    requirements TEXT[],
    what_you_will_learn TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);

CREATE TABLE course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (course_id, order_index)      -- Ensure unique order per course
);

CREATE TABLE lessons ( 
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('video', 'article', 'quiz', 'assignment')),
    content_url VARCHAR(255),
    content_data JSONB,
    duration INTEGER, -- Duration in Minutes
    order_index INTEGER NOT NULL,
    is_free BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (module_id, order_index) -- Ensure unique order per module
);

CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    enrollment_date TIMESTAMP DEFAULT NOW(),
    completion_date TIMESTAMP NULL,
    progress_percentage DECIMAL(5, 2) DEFAULT 0.00,
    last_accessed_at TIMESTAMP DEFAULT NOW(),
    access_expires_at TIMESTAMP NOT NULL,
    payment_id UUID REFERENCES payments(id),
    status VARCHAR(20) CHECK (status IN ('active', 'completed', 'suspended', 'refunded')) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (student_id, course_id) -- Ensure a student can enroll in a course only once
);

CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    lesson_id UUID NOT NULL REFERENCES lessons(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP NULL,
    time_spent_seconds INTEGER DEFAULT 0,
    completion_percentage DECIMAL(5, 2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (student_id, lesson_id, course_id) -- Ensure unique progress tracking per student per lesson per course
);