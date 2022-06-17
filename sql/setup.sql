-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists dogs;

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