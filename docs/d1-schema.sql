CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  duration TEXT,
  description TEXT,
  image TEXT,
  tags TEXT,
  visibility TEXT DEFAULT 'Draft',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT,
  authorImage TEXT,
  tags TEXT,
  visibility TEXT DEFAULT 'Draft',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  visibility TEXT DEFAULT 'Draft',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
-- Apply db/schema.sql as the canonical full D1 migration.
-- This convenience copy is retained for deployment documentation only.

CREATE TABLE IF NOT EXISTS consultation_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS consultation_requests_status_created_at ON consultation_requests(status, created_at DESC);
