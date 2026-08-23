CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE,
    mobile VARCHAR(20) UNIQUE,

    password_hash TEXT NOT NULL,

    date_of_birth DATE,
    gender VARCHAR(30),

    community VARCHAR(100),
    surname VARCHAR(100),
    kul VARCHAR(150),

    city VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS users_email_idx
ON users(email);

CREATE INDEX IF NOT EXISTS users_mobile_idx
ON users(mobile);
