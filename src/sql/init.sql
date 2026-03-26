CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  nmail TEXT UNIQUE NOT NULL,
  password TEXT,
  budget NUMERIC,
  date_budget DATE
);

CREATE TABLE data_ranges (
  id SERIAL PRIMARY KEY,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  budget NUMERIC,
  total_expenses NUMERIC
);

CREATE TABLE Expenses (
  id SERIAL PRIMARY KEY,
  name TEXT,
  amount NUMERIC,
  location TEXT,
  image Text,
  date_created DATE NOT NULL,
  hour_created TIME NOT NULL
);