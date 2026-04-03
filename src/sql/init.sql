CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  budget NUMERIC
);

CREATE TABLE date_ranges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  budget NUMERIC,
  total_expenses NUMERIC
)

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_range_id UUID REFERENCES date_ranges(id) ON DELETE CASCADE,
  name TEXT,
  amount NUMERIC,
  location TEXT,
  image Text,
  date_created DATE NOT NULL,
  hour_created TIME NOT NULL
);