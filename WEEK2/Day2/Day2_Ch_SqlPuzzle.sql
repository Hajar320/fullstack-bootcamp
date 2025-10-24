CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
)

INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar')

SELECT * FROM FirstTab

CREATE TABLE SecondTab (
    id integer 
)

INSERT INTO SecondTab VALUES
(5),
(NULL)


SELECT * FROM SecondTab

--1
SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL )

--id = 5: 5 <> NULL → UNKNOWN → FALSE.

--id = 6: 6 <> NULL → UNKNOWN → FALSE.

--id = 7: 7 <> NULL → UNKNOWN → FALSE.

--id = NULL: NULL <> NULL → UNKNOWN → FALSE.

--Expected output: 0

--2

SELECT COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 )

--id = 5 → FALSE (not included)

--id = 6 → TRUE

--id = 7 → TRUE

--id = NULL → NULL NOT IN (5) = UNKNOWN → FALSE

--Expected output: 2

--3
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (SELECT id FROM SecondTab)

--presence of NULL in list makes the result UNKNOWN for any id (even 6 or 7) because 6 NOT IN (5, NULL) = 6 <> 5 AND 6 <> NULL = TRUE AND UNKNOWN = UNKNOWN → FALSE.

--Expected output: 0

--4

SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NOT NULL)

--id=5 → FALSE

--id=6 → TRUE

--id=7 → TRUE

--id=NULL → UNKNOWN → FALSE

--Expected output: 2