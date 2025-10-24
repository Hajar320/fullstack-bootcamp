--exercice 1
--1
select rating ,count(*) as number_of_films
from film
group by rating

--2
select title, rating
from film
where rating in ('G','PG-13')
and length = 120 
and rental_rate < 3.00
order by title

--3

update customer set first_name = 'Hajar',
                    last_name ='Kassmi',
                    email ='hajarkassmi.hk@gmail.com'
where customer_id = 1


--select * from customer
--where customer_id = 1

--4
update address set address = 'n21 massira mohammedia' ,address2 ='masira' ,district = 'mohammedia'
where address_id  = (select address_id from customer 
                      where customer_id =1)
                  
--select * from address
--where address_id  = (select address_id
--                       from customer 
--                       where customer_id =1)

--exercie 2

select * from  students
--update
update students 
set birth_date =  '02/11/1998'
where last_name ='Benichou'
--
update students 
set last_name ='Guez'
where last_name ='Grez'

--Delete
delete from students
where first_name ='Lea' and last_name='Benichou'

--count
select count(*) as number_of_students
from students

select count(*) as born_after_2000
from students
where birth_date >'01/01/2000'

--insert/alter

--1
alter table students 
ADD column math_grade int
--2
UPDATE students SET math_grade = 80 WHERE id = 1;
--3
UPDATE students SET math_grade = 90 WHERE id in (2,4) returning *;
--4
UPDATE students SET math_grade = 40 WHERE id = 6 returning *;
--5
select count(*) as grade_bigger_than83
from students
where math_grade >83
--6
insert into students (first_name,last_name,birth_date,math_grade)
values        ('Omer','simpson','03/10/1980',70)

--7
select concat(first_name,' ',last_name) full_name ,count(*) as total_grades
from students
group by full_name

--sum
select sum(math_grade) as sum_of_grades
from students


--exercice 3
select * from customers
select * from items

create table purchases (
    purchase_id SERIAL PRIMARY KEY,
    id int,
    items_id int not null,
    quantity_purshased int not null,
    foreign key (id )  REFERENCES customers(id),
   
    foreign key (items_id )  REFERENCES items(items_id)
)

--2
insert into purchases(id,items_id,quantity_purshased)
values ((select id from customers where first_name='Scott'and last_name='Scott'),
       (select items_id from items where item_name='Fan' ),1)

insert into purchases(id,items_id,quantity_purshased)
values((select id from customers where first_name='Melanie'and last_name='Johnson'),
       (select items_id from items where item_name='largedesk' ),10)

insert into purchases(id,items_id,quantity_purshased)
values ((select id from customers where lower(first_name)='greg'and lower(last_name)='jones'),
       (select items_id from items where item_name='smalldesk' ), 2)


--Part 2

--1
select* from purchases
-- yes, it show the number of purchases of every customer
--
select *
from purchases p join customers c
on p.id = c.id
--
select * 
from purchases
where id =5
--
select * 
from purchases p join items i
on p.items_id =i.items_id
where item_name in ('largedesk','smalldesk')

--2
select c.first_name,c.last_name,i.item_name
from customers c join purchases p
on c.id = p.id 
join items i
on p.items_id = i.items_id

--3

insert into purchases(id,items_id,quantity_purshased)
values ((select id from customers where lower(first_name)='greg'and lower(last_name)='jones')
       ,null,4)

--it depends on the not_null constraints.
--the null value here violates not-null constraint