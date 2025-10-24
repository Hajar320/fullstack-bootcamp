--1
select first_name,last_name
from customers
order by first_name DESC ,last_name DESC
limit 2

--2
select * from purchases

DELETE FROM purchases 
WHERE id = (
    SELECT id 
    FROM customers 
    WHERE first_name = 'Scott' AND last_name = 'Scott'
);

--3
select * from customers
--Scott stil exist ,The DELETE operation only removed records from the purchases table,
-- not from the customers table.

--4
select p. * ,first_name, last_name
from purchases p right join customers c
on p.id = c.id

--5

SELECT p.*, c.first_name, c.last_name
FROM purchases p
INNER JOIN customers c ON p.id = c.id;

--select *from purchases