

create table students (
    id SERIAL PRIMARY KEY ,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    birth_date DATE NOT NULL
)


insert into students (first_name,last_name,birth_date)
values ('Lea','Benichou',to_date('27/07/1987','DD/MM/YYYY')),
       ('Mark','Benichou','02/11/1998'),
       ('Yoan','Cohen', '03/12/2010'),
       ('Amelia','Dux','07/04/1996'),
       ('David','Grez',to_date('14/06/2003','DD/MM/YYYY')),
       ('Omer','simpson','03/10/1980')

insert into students (first_name,last_name,birth_date)
values ('Hajar','Kassmi',to_date('15/11/1997','DD/MM/YYYY'))

select * from students

select first_name,last_name
from students

select first_name,last_name from students
where last_name ='Benichou'or first_name='Marc'

select first_name,last_name from students
where last_name ='Benichou'and first_name='Marc'

select first_name,last_name from students
where first_name like '%a%'

select first_name,last_name from students
where first_name like 'a%'

select first_name,last_name from students
where first_name like '%a'

select first_name,last_name from students
where first_name like '%a_'

select first_name,last_name from students
where id in (1,3)


select * from students
where birth_date >= '1/01/2000'