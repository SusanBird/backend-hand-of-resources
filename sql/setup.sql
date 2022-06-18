-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists dogs;
DROP table if exists shows;
DROP table if exists songs;
-- DROP table if exists games;
-- DROP table if exists food;

CREATE table dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    iq INT NOT NULL,
    energy VARCHAR NOT NULL
);

CREATE table shows (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    seasons INT NOT NULL,
    rating INT NOT NULL
);

CREATE table songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    artist VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE table games (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    players INT NOT NULL,
    difficulty INT NOT NULL
);

-- CREATE table food (
--     id BIGINT GENERATED ALWAYS AS IDENTITY,
--     name VARCHAR NOT NULL,
--     country VARCHAR NOT NULL,
--     type VARCHAR NOT NULL
-- );

INSERT INTO dogs (name, age, iq, energy) VALUES
('Chance', 7, 60, 'high'),
('Tate', 2, 115, 'medium'),
('Harley', 4, 110, 'low'),
('Tess', 1, 130, 'high');

INSERT INTO shows (title, seasons, rating) VALUES
('Schitts Creek', 5, 10),
('Tayo', 7, 3),
('The Great British Baking Show', 8, 10),
('The Office', 11, 10);

INSERT INTO songs (title, artist, released) VALUES
('Never Gonna Give You Up', 'Rick Astley', 1880),
('Cruise', 'Some Country Band', 2015),
('Baby Shark', 'Someone Without A Soul', 2020),
('Gangam Style', 'Mr. Gangham', 2012);

INSERT INTO games (name, players, difficulty) VALUES
('Cover Your Assets', 5, 3),
('Monopoly', 4, 6),
('Twister', 2, 10),
('Sorry', 4, 3);

-- INSERT INTO food (name, country, type) VALUES
-- ('bananas', 'Brazil', 'fruit'),
-- ('tacos', 'Mexico', 'meat'),
-- ('roti', 'Fiji', 'grains'),
-- ('lumpia', 'Philippines', 'vegetables');