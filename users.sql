CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NULL,
    last_name TEXT NULL,
    sex TEXT NULL,
    role TEXT NOT NULL DEFAULT 'visitor',
    CHECK (role IN ('admin', 'agent', 'visitor')),
    agency TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
