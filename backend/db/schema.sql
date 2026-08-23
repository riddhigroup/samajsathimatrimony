-- ============================================
-- SAMAJ SAATHI MATRIMONY
-- DATABASE SCHEMA
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    -- Public account identifiers
    user_id VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,

    -- Basic information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    -- Contact information
    email VARCHAR(255) UNIQUE,
    mobile VARCHAR(20) UNIQUE,

    -- Authentication
    password_hash TEXT NOT NULL,

    -- Personal information
    date_of_birth DATE,
    gender VARCHAR(30),

    -- Community information
    community VARCHAR(100),
    surname VARCHAR(100),
    kul VARCHAR(150),

    -- Location
    city VARCHAR(150),

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS users_user_id_idx
ON users(user_id);

CREATE INDEX IF NOT EXISTS users_username_idx
ON users(username);

CREATE INDEX IF NOT EXISTS users_email_idx
ON users(email);

CREATE INDEX IF NOT EXISTS users_mobile_idx
ON users(mobile);
