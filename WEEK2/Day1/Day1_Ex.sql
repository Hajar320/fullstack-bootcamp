create table items (
    items_id serial primary key,
    item_name  VARCHAR not null,
    price INT not null
)

create table customers (
    id serial primary key,
    first_name VARCHAR not null,
    last_name VARCHAR not null
)

insert into items (item_name , price)
values('smalldesk' , 100),
       ('largedesk',300),
       ('Fan',80);

insert into customers (first_name , last_name)
values ('Greg','Jones'),
('Sandra','Jones'),('Scott','Scott'),('Trevor','Green'),
('Melanie','Johnson')

--all the items
SELECT * from items;

--items with price > 80:
select * from items
where price > 80;

--items with price <=300
select* from items
where price <= 300

--customers with the last name "Smith"
select * from customers
where last_name ='Smith'
-- no one have this last name

--customers with the last name "Jones"
select * from customers
where last_name ='Jones'

--customers whose first name not "Scott"
select * from customers
where first_name != 'Scott'

--all the customers
select * from customers