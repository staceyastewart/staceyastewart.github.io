-- db name is tennis
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
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

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100),
  content VARCHAR(450),
  category VARCHAR(100),
  level VARCHAR(5),
  borough VARCHAR(50)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  content VARCHAR(450),
  level VARCHAR(5),
  borough VARCHAR(50)
);
