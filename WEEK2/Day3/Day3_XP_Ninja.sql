--all films with a rating of G or PG, which are are not currently rented (they have been returned/have never been borrowed).

SELECT DISTINCT
    f.film_id,
    f.title,
    f.rating,
    f.rental_rate,
    f.length
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id 
WHERE f.rating IN ('G', 'PG')
AND ( r.rental_id IS NULL or r.return_date IS NULL)
ORDER BY f.title;

---

CREATE TABLE children_movie_waitlist (
    waitlist_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL,
    child_name VARCHAR(100) NOT NULL,
    parent_email VARCHAR(255) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_waiting BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (film_id) REFERENCES film(film_id)
);
select* from children_movie_waitlist;

-- Add children to waitlist
INSERT INTO children_movie_waitlist 
    (film_id, child_name, parent_email)
VALUES
    (5, 'Mason Miller', 'mason.parent@email.com'),
    (5, 'Ava Garcia', 'ava.parent@email.com'),
    (4, 'James Rodriguez', 'james.parent@email.com'),
    (7, 'Isabella Martinez', 'isabella.parent@email.com');

SELECT 
    film_id,
    COUNT(*) as people_waiting
FROM children_movie_waitlist 
WHERE is_waiting = TRUE
GROUP BY film_id
ORDER BY people_waiting DESC;