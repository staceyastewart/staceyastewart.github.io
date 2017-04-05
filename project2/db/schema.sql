-- db name is tennis
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courts;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)


);

CREATE TABLE courts (
  id SERIAL PRIMARY KEY,
  court_name VARCHAR(255),
  court_address VARCHAR(500),
  court_zip_code VARCHAR(50)
);
