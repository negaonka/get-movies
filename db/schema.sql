DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE movie (
    id INT NOT NULL,
    movie_name VARCHAR(100) NOT NULL
);