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
