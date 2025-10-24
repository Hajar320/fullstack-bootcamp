

select * from students
--1
select first_name,last_name,birth_date
from students
order by last_name ASC
limit 4

--2

select first_name,last_name,birth_date
from students
order by birth_date DESC
limit 1
--3
select first_name,last_name,birth_date
from students
limit 3 offset 2
