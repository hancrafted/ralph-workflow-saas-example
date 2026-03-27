-- Seed data for local development
-- Idempotent: safe to run multiple times

-- Ensure uuid-ossp extension exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Seed a sample project (idempotent via ON CONFLICT)
INSERT INTO project (id, name, description)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Sample Project',
  'A demo project created during setup'
)
ON CONFLICT (id) DO NOTHING;
