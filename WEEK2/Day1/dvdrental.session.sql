
--1
select * from customer

--2
select concat(first_name,' ',last_name) as full_name
from customer

--3

select DISTINCT create_date
from customer

--4
select * from customer
order by first_name desc

--5
select film_id,title,description,release_year,rental_rate
from film
order by rental_date

--6
select address,phone,district
from address
where district = 'Texas'

--7
