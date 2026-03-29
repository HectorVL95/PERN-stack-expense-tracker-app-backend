CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  budget NUMERIC,
);

CREATE TABLE data_ranges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  budget NUMERIC,
  total_expenses NUMERIC
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  data_range_id INTEGER REFERENCES data_rang(id) ON DELETE CASCADE,
  name TEXT,
  amount NUMERIC,
  location TEXT,
  image Text,
  date_created DATE NOT NULL,
  hour_created TIME NOT NULL
);