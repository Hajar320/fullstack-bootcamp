--exercice 1
--1
select * from language
--2
select f.title,f.description,l.name
from film f join language l
on f.language_id = l.language_id

select * from film
--3
select f.title,f.description,l.name
from film f right join language l
on f.language_id = l.language_id

--4
create table new_film (
             id  serial primary key,
             name varchar
)
select * from new_film
  
insert into new_film (name)
values  ('Home Alone'),
        ('Leon the professional'),
        ('V for vendetta')

--5

create table customer_review (
        review_id serial primary key,
        id int,
        language_id int,
        foreign key(id) references new_film(id)
        on delete cascade,
        foreign key(language_id) references language(language_id)
        on delete cascade,
        review_title  varchar,
        score int,
        review_text text,
        last_update date
)
select *from customer_review
--6
insert into customer_review(id,language_id,review_title,score,review_text,last_update)
values (2,1,'old but gold',9,'a movie that never gets old','1990-01-20'),
        (1,1,'cozy vibes',8.5,'a family movie to enjoy your time','2000-11-15')

--7
delete from new_film
where id =3
--the on delete cascade constraint will Automatically deletes all related reviews from customer_review table.


--exercice 2
--1
select* from film
update table film
set language_id = 3
where film_id = 4
--2
select * from information_schema.table_constraints
where table_name = 'customer'
--"address_id"cannot insert a customer with a non-existent address_id

--3
drop table customer_review
--a child table , we dont need an extra checkup.

--4
select count(*) as not_returned_yet
from rental
where return_date is null
--5
SELECT 
    f.film_id,
    f.title,
    f.rental_rate,
    r.rental_date,
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC, f.title
LIMIT 30;

--6
select * from film
--1
select *
from film f join film_actor fa
     on f.film_id = fa.film_id
     join actor a 
     on fa.actor_id = a.actor_id
where a.first_name = 'Penelope'and a.last_name ='Monroe'

--2
select *
from film f join film_actor fa
     on f.film_id = fa.film_id
     join actor a 
     on fa.actor_id = a.actor_id
where f.rating = 'R'and f.length = 60
--3
select * from rental

select *
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
where (r.return_date between '2005-07-28'and '2005-08-01')
    and f.rental_rate > 4 
    and c.first_name ='Matthew'and c.last_name='Mahan'

--4
select *
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
where  (c.first_name ='Matthew'and c.last_name='Mahan')
and ( f.description like '%boat%' or f.title like '%boat%')
order by f.replacement_cost desc
