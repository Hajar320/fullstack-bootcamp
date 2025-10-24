---Partie1
--1 
create table customer(
    customer_id serial primary key,
    first_name varchar,
    last_name varchar not null
)

create table customer_profile(
       profile_id serial primary key,
       isloggedin boolean DEFAULT False,
       customer_id int unique not null,
       foreign key(customer_id) references customer(customer_id)
       on delete cascade

)

--2
insert into customer(first_name,last_name)
values ('John','Doe'),
       ('Jerome','Lalu'),
       ('Lea','Rive')

select * from customer

--3
INSERT INTO customer_profile (isloggedin, customer_id)
values ('True', (select customer_id FROM customer WHERE first_name = 'John')),
        ( 'False',(select customer_id FROM customer WHERE first_name = 'Jerome'));

select * from customer_profile

--4
select c.first_name 
from customer c join customer_profile cp
on c.customer_id = cp.customer_id
where cp.isloggedin = TRUE

select c.first_name ,cp.isloggedin
from customer c left join customer_profile cp
on c.customer_id = cp.customer_id

select count(*) as number_customers_notloggedin
from customer c left join customer_profile cp
on c.customer_id = cp.customer_id
where cp.isloggedin = False OR cp.isLoggedIn IS NULL


--Part2

--1
create table Book (
     book_id serial primary key,
     title varchar not null,
     author varchar not null
      )
--2
insert into Book(title,author)
values ('Alice In Wonderland', 'Lewis Carroll'),
        ('Harry Potter', 'J.K Rowling'),
        ('To kill a mockingbird', 'Harper Lee')

select * from Book

--3
create table Student (
         student_id serial primary key,
         student_name varchar  NOT NULL UNIQUE,
         age integer check (age<=15)
)
--4
insert into Student(student_name,age)
values  ('john',12),
        ('lera',11),
        ('patrick',10),
        ('bob',14)
select * from student 
--5
-- Create Library junction table
CREATE TABLE Library (
    book_fk_id INTEGER NOT NULL,
    student_fk_id INTEGER NOT NULL,
    borrowed_date DATE NOT NULL,
    PRIMARY KEY (book_fk_id, student_fk_id),
    FOREIGN KEY (book_fk_id) REFERENCES Book(book_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (student_fk_id) REFERENCES Student(student_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

--6
-- Insert 4 records into Library table using subqueries
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date) VALUES
(
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE student_name = 'john'),
    '2022-02-15'
),
(
    (SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
    (SELECT student_id FROM Student WHERE student_name = 'bob'),
    '2021-03-03'
),
(
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE student_name = 'lera'),
    '2021-05-23'
),
(
    (SELECT book_id FROM Book WHERE title = 'Harry Potter'),
    (SELECT student_id FROM Student WHERE student_name = 'bob'),
    '2021-08-12'
);

select * from Library

--7
select * from Library

SELECT s.student_name , b.title AS book_title
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id;

SELECT AVG(s.age) AS average_age
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- Delete a student (e.g., Bob)
DELETE FROM Student WHERE student_name = 'bob';
--Due to the ON DELETE CASCADE constraint we defined, all library records associated with bob will be automatically deleted from the Library table.