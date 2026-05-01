CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,

    name TEXT,
    last_name TEXT,

    sex TEXT DEFAULT 'NAN',
    CHECK (sex IN ('male', 'female', 'other', 'NAN')),

    role TEXT NOT NULL DEFAULT 'visitor',
    CHECK (role IN ('admin', 'agent', 'visitor')),

    agency TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CHECK (
        (role = 'visitor' AND name IS NOT NULL)
        OR
        (role = 'agent' AND agency IS NOT NULL)
        OR
        (role = 'admin')
    )
);
