--Exerice 1

--1
select *
from items
order by price 
--2
select *
from items
where price >= 80 
order by price desc
--3
select first_name,last_name
from customers
order by first_name 
limit 3
--4
select last_name
from customers
order by last_name desc


--Exercice 2


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
order by rental_rate

--6
select address,phone
from address
where district = 'Texas'

--7
 select *from film 
 where film_id in (15,150)

--8
select film_id,title,description, Length, rental_rate
from film 
where title ='Home alone'

--9
select film_id,title,description, Length, rental_rate
from film 
where title like 'Ho%'

--10
select title ,rental_rate
from film
order by rental_rate asc
limit 10 

--11
select title ,rental_rate  from (
select title ,rental_rate ,row_number()over(order by rental_rate asc,title ) as row_num
from film) 
where row_num between 11 and 20

--12
select c.first_name,c.last_name,p.amount ,p.payment_date
from customer c join payment p
on c.customer_id =p.customer_id
order by c.customer_id

--13
select film_id ,title 
from film 
where film_id  not in (select film_id from inventory )


--14

select c.city ,co.country
from city c join country co
on c.country_id = co.country_id

--15
select p.staff_id ,p.amount, p.payment_date, c.customer_id, concat(c.first_name,' ',c.last_name) as name 
from customer c join payment p
on  c.customer_id = p.customer_id
order by p.staff_id