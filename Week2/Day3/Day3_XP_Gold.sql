---exercice 1

-1
select * from film
select * from rental

select rental_id, rental_date, return_date ,film.title ,customer.first_name || ' ' || customer.last_name as customer_name
from rental join inventory
on rental.inventory_id = inventory.inventory_id
join film
on inventory.film_id = film.film_id 
join customer
on rental.customer_id = customer.customer_id
where return_date is null


--2

select customer.first_name || ' ' || customer.last_name as customer_name, count(rental.rental_id) as nb_non_returned
from rental join customer
on rental.customer_id = customer.customer_id
where return_date is null
group by customer_name
ORDER BY nb_non_returned DESC

--3

select film.title as film_title, category.name as category_name, actor.first_name || ' ' || actor.last_name as actor_name
from film 
join film_actor on film.film_id = film_actor.film_id
join actor on film_actor.actor_id = actor.actor_id
join film_category on film.film_id = film_category.film_id
join category on film_category.category_id = category
.category_id
where actor.first_name = 'Joe' and actor.last_name = 'Swank'
and category.name = 'Action'

-------
CREATE VIEW action_films AS
SELECT 
    film.title AS film_title,
    category.name AS category_name,
    actor.first_name || ' ' || actor.last_name AS actor_name
FROM film 
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON film_actor.actor_id = actor.actor_id
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
where category.name = 'Action';



  SELECT * FROM action_films
  WHERE actor_name = 'Joe Swank';


----exercice 2
--1

select * from store
select * from address
select * from country
select * from city


select store.store_id,address.district ,country.country,city.city
from store 
join address on store.address_id = address.address_id
join city on address.city_id = city.city_id
join country on country.country_id = city.country_id
ORDER BY store.store_id

---number of stores in every country
SELECT 
    country.country,
    COUNT(store.store_id) as store_count
FROM store 
JOIN address ON store.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
right JOIN country ON country.country_id = city.country_id
GROUP BY country.country
ORDER BY store_count DESC;

--2

select * from store
select* from inventory
select * from film

select store.store_id, sum(film.length) as total_film_length
from store
join inventory on store.store_id = inventory.store_id
join film on inventory.film_id = film.film_id
group by store.store_id
order by total_film_length desc


--3

select store.store_id, sum(film.length) as total_film_length
from store
join inventory on store.store_id = inventory.store_id
join film on inventory.film_id = film.film_id
join rental on inventory.inventory_id = rental.inventory_id
where rental.return_date is not null
group by store.store_id
order by total_film_length desc

--4/5
select * from store
SELECT 
    customer.customer_id,
    customer.first_name,
    customer.last_name,
    city.city,
    country.country,
    address.district
FROM customer
JOIN address ON customer.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id
WHERE city.city_id IN (
    SELECT DISTINCT city.city_id
    FROM store
    JOIN address ON store.address_id = address.address_id
    JOIN city ON address.city_id = city.city_id
)
ORDER BY city.city

--6

SELECT 
    film.film_id,
    film.title,
    film.description,
    film.length,
    category.name as category
FROM film
LEFT JOIN film_category ON film.film_id = film_category.film_id
LEFT JOIN category ON film_category.category_id = category.category_id
WHERE (category.name != 'Horror' OR category.name IS NULL)
  AND (
    LOWER(film.title) NOT LIKE '%beast%' AND
    LOWER(film.title) NOT LIKE '%monster%' AND
    LOWER(film.title) NOT LIKE '%ghost%' AND
    LOWER(film.title) NOT LIKE '%dead%' AND
    LOWER(film.title) NOT LIKE '%zombie%' AND
    LOWER(film.title) NOT LIKE '%undead%'
  )
  AND (
    LOWER(film.description) NOT LIKE '%beast%' AND
    LOWER(film.description) NOT LIKE '%monster%' AND
    LOWER(film.description) NOT LIKE '%ghost%' AND
    LOWER(film.description) NOT LIKE '%dead%' AND
    LOWER(film.description) NOT LIKE '%zombie%' AND
    LOWER(film.description) NOT LIKE '%undead%'
  )
ORDER BY title;

--the total viewing time of safe movies:

SELECT 
    COUNT(*) as safe_movie_count,
    SUM(length) as total_minutes,
    ROUND(SUM(length) / 60.0, 2) as total_hours,
    ROUND(SUM(length) / 60.0 / 24.0, 2) as total_days,
    ROUND(AVG(length), 2) as average_minutes_per_movie
FROM film
LEFT JOIN film_category ON film.film_id = film_category.film_id
LEFT JOIN category ON film_category.category_id = category.category_id
WHERE (category.name != 'Horror' OR category.name IS NULL)
  AND (
    LOWER(film.title) NOT LIKE '%beast%' AND
    LOWER(film.title) NOT LIKE '%monster%' AND
    LOWER(film.title) NOT LIKE '%ghost%' AND
    LOWER(film.title) NOT LIKE '%dead%' AND
    LOWER(film.title) NOT LIKE '%zombie%' AND
    LOWER(film.title) NOT LIKE '%undead%'
  )
  AND (
    LOWER(film.description) NOT LIKE '%beast%' AND
    LOWER(film.description) NOT LIKE '%monster%' AND
    LOWER(film.description) NOT LIKE '%ghost%' AND
    LOWER(film.description) NOT LIKE '%dead%' AND
    LOWER(film.description) NOT LIKE '%zombie%' AND
    LOWER(film.description) NOT LIKE '%undead%'
  );

-------------

CREATE VIEW safe_movies AS
SELECT 
    film_id,
    title,
    description,
    length,
    rating,
    COALESCE(category.name, 'Uncategorized') as category
FROM film
LEFT JOIN film_category ON film.film_id = film_category.film_id
LEFT JOIN category ON film_category.category_id = category.category_id
WHERE (category.name != 'Horror' OR category.name IS NULL)
  AND (
    LOWER(film.title) NOT LIKE '%beast%' AND
    LOWER(film.title) NOT LIKE '%monster%' AND
    LOWER(film.title) NOT LIKE '%ghost%' AND
    LOWER(film.title) NOT LIKE '%dead%' AND
    LOWER(film.title) NOT LIKE '%zombie%' AND
    LOWER(film.title) NOT LIKE '%undead%'
  )
  AND (
    LOWER(film.description) NOT LIKE '%beast%' AND
    LOWER(film.description) NOT LIKE '%monster%' AND
    LOWER(film.description) NOT LIKE '%ghost%' AND
    LOWER(film.description) NOT LIKE '%dead%' AND
    LOWER(film.description) NOT LIKE '%zombie%' AND
    LOWER(film.description) NOT LIKE '%undead%'
  )
WITH CHECK OPTION;

SELECT * FROM safe_movies
ORDER BY title;

---7

--Total viewing time for ALL movies:

SELECT 
    COUNT(*) as total_movies,
    SUM(length) as total_minutes,
    ROUND(SUM(length) / 60.0, 2) as total_hours,
    ROUND(SUM(length) / 60.0 / 24.0, 2) as total_days,
    ROUND(AVG(length), 2) as avg_minutes_per_movie
FROM film;

--Total viewing time for SAFE movies:

SELECT 
    COUNT(*) as safe_movie_count,
    SUM(length) as total_minutes,
    ROUND(SUM(length) / 60.0, 2) as total_hours,
    ROUND(SUM(length) / 60.0 / 24.0, 2) as total_days,
    ROUND(AVG(length), 2) as avg_minutes_per_movie
FROM film
LEFT JOIN film_category ON film.film_id = film_category.film_id
LEFT JOIN category ON film_category.category_id = category.category_id
WHERE (category.name != 'Horror' OR category.name IS NULL)
  AND film.title NOT ILIKE ANY (ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
  AND film.description NOT ILIKE ANY (ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%']);