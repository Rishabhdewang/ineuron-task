CREATE TABLE users (
    id bigserial PRIMARY KEY,
    username text UNIQUE, 
    password text,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone
);
