-- * create table
CREATE TABLE actors(
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    birth_date DATE NOT NULL,
    number_oscars SMALLINT NOT NULL
);



INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES ('Angelina', 'Jolie', '1975-06-04', 1),
    ('Jennifer', 'Aniston', '1969-02-11', 0),
    ('Matt', 'Damon', '08/10/1970', 5),
    ('George', 'Clooney', '06/05/1961', 2)RETURNING *;


--the number of actors in the table
select count(*)
from actors

-- adding a new actor with black fields

insert into actors (first_name, last_name, birth_date, number_oscars)
values ('hugo','vec',null,1)
-- an error because there is a not null constraint