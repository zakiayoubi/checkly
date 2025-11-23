CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname VARCHAR(100),
  lname VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  -- text is an unlimited length variable
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),  -- TIMESTAMPTZ is usually better
  priority VARCHAR(10),                           -- consider CHECK constraint if needed
  deadline TIMESTAMPTZ,                           -- proper type, nullable
  CONSTRAINT todos_title_not_empty CHECK (title <> '' AND trim(title) <> '')
);