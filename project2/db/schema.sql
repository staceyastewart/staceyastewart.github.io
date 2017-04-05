-- db name is tennis
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courts;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest VARCHAR(255) NOT NULL,
  borough VARCHAR(50) NOT NULL,
  level VARCHAR(5) NOT NULL
);

CREATE TABLE courts (
  id SERIAL PRIMARY KEY,
  borough VARCHAR(10),
  court_name VARCHAR(255),
  court_address VARCHAR(500),
  court_zip_code VARCHAR(50)
);
