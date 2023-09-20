CREATE SCHEMA buildings;

CREATE TABLE buildings.properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  locality VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);