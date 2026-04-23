 create database job_app_v2;
 use job_app_v2;
 
select * from select_master;

create table select_master(
	select_master_id int primary key auto_increment,
    html_id varchar(255),
	html_type varchar(255),
    unique_name varchar(255),
	html_value varchar(255),
    html_name varchar(255),
    created_at timestamp default current_timestamp
);

insert into select_master(html_id,html_type,unique_name,html_value,html_name)
values('preferred','select','preferred','','');

-- values('department','select','department','','');
values('gujarati','checkbox','language[]','gujarati','gujarati'),
-- ('english','checkbox','language[]','english','english'),
-- ('hindi','checkbox','language[]','hindi','hindi'),
-- ('java','checkbox','tech[]','java','Java'),
-- ('php','checkbox','tech[]','php','php'),
-- ('mysql','checkbox','tech[]','mysql','mysql'),
-- ('city','select','city','',''),
-- ('gender','select','gender','',''),
-- ('state','select','state','',''),
-- ('relationship_status','select','relationship_status','','');

drop table option_master;
create table option_master(
	option_master_id int primary key auto_increment,
    select_master_id int,
    option_html_id varchar(255),
    option_html_type varchar(255),
    option_unique_name varchar(255),
	option_html_value varchar(255),
    option_html_name varchar(255),
    created_at timestamp default current_timestamp,
    foreign key (select_master_id) references select_master(select_master_id)
);

select * from option_master;

insert into option_master(select_master_id,option_html_id,option_html_type,option_unique_name,option_html_value,option_html_name)
values (12,'','','','ahmedabad','ahmedabad'),
(12,'','','','gandhinagar','gandhinagar'),
(12,'','','','surat','surat'),
(12,'','','','vadodara','vadodara'),
(12,'','','','bhavanagar','bhavanagar'),
(12,'','','','anand','ganand'),
(12,'','','','dwarka','dwarka'),
(12,'','','','rajkot','rajkot');



-- values (11,'','','','development','development'),
--  (11,'','','','marketing','marketing'),
--   (11,'','','','QA','QA'),
--    (11,'','','','BA','BA'),
--     (11,'','','','testing','testing'),
--      (11,'','','','managment','management'),
--       (11,'','','','HR','HR'),
--        (11,'','','','executive','executive'),
--         (11,'','','','devops','devops');
--  values(1,'guj_read','checkbox','guj_skill[]','read','Read'),
--  (1,'guj_write','checkbox','guj_skill[]','write','Write'),
--  (1,'guj_speak','checkbox','guj_skill[]','speak','Speak'),
--  (2,'eng_read','checkbox','eng_skill[]','read','Read'),
--  (2,'eng_write','checkbox','eng_skill[]','write','Write'),
--  (2,'eng_speak','checkbox','eng_skill[]','speak','Speak'),
--  (3,'hindi_read','checkbox','hindi_skill[]','read','Read'),
--  (3,'hindi_write','checkbox','hindi_skill[]','write','Write'),
--  (3,'hindi_speak','checkbox','hindi_skill[]','speak','Speak'),
--  (4,'java_beginner','radio','java_level','Beginner','Beginner'),
--  (4,'java_Mediator','radio','java_level','Mediator','Mediator'),
--  (4,'java_Expert','radio','java_level','Expert','Expert'),
--  (5,'php_beginner','radio','php_level','Beginner','Beginner'),
--  (5,'php_Mediator','radio','php_level','Mediator','Mediator'),
--  (5,'php_Expert','radio','php_level','Expert','Expert'),
--  (6,'mysql_beginner','radio','mysql_level','Beginner','Beginner'),
--  (6,'mysql_Mediator','radio','mysql_level','Mediator','Mediator'),
--  (6,'mysql_Expert','radio','mysql_level','Expert','Expert'),
--  (7,'','','','dwarka','dwarka'),
-- (7,'','','','gandhinagar','gandhinagar'),
-- (7,'','','','ahemedabad','ahemedabad'),
-- (7,'','','','surat','surat'),
-- (7,'','','','vadodara','vadodara'),
-- (7,'','','','jamnagar','jamnagar'),
-- (7,'','','','rajkot','rajkot'),
--  (8,'','','','male','male'),
--  (8,'','','','female','female'),
--  (9,'','','','gujarat','gujarat'),
-- (9,'','','','himachal','himachal'),
-- (9,'','','','rajsthan','rajsthan'),
-- (9,'','','','uttarPradesh','uttarPradesh'),
-- (9,'','','','kerela','kerela'),
-- (9,'','','','kerela','kerela'),
-- (9,'','','','arunachal','arunachal'),
-- (9,'','','','panjab','panjab'),
-- (9,'','','','delhi','delhi'),
-- (9,'','','','madhypradesh','madhypradesh'),
--  (10,'','','','single','single'),
--  (10,'','','','marride','marride');

 --  --------------------------------------------------------------

select * from basic_details;
create table basic_details(
	basic_detail_id int primary key auto_increment,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(255) unique not null,
    designation varchar(100) not null,
    phone_number varchar(15) not null,
    gender enum('male','female') not null,
    relationship_status enum('single','married') not null,
    dob date not null,
    created_at timestamp default current_timestamp
    );
    


create table address(
	address_id int primary key auto_increment,
    basic_detail_id int ,
    city varchar(100) not null,
    state varchar(100) not null,
    zip_code varchar(10) not null,
    address_1 text,
    address_2 text,
    created_at timestamp default current_timestamp,
    foreign key (basic_detail_id) references basic_details(basic_detail_id)
    on delete set null
    );
    
create table eduction_detail(
	eduction_detail_id int primary key auto_increment,
    basic_detail_id int ,
    course_name varchar(100) not null,
    passing_year year not null,	
    uni_board varchar(200) not null,
    result varchar(100) not null,
    created_at timestamp default current_timestamp,
    
       foreign key (basic_detail_id) references basic_details(basic_detail_id)
    on delete set null
    );

create table work_experience(
	work_experience_id int primary key auto_increment,
    basic_detail_id int,
    company_name varchar(255) not null,
    designation varchar(200) not null,
    start_date date not null,
    end_date date ,
    created_at timestamp default current_timestamp,
    
	foreign key (basic_detail_id) references basic_details(basic_detail_id)
    on delete set null
    );
    
    update work_experience set basic_detail_id=1 where work_experience_id=4;
insert into work_experience (basic_detail_id,company_name,designation,start_date,end_date)
values(1,'zenithiv','BDA','2019/02/02','2019/02/02');


create table language_known(
		language_known_id  int primary key auto_increment,
        basic_detail_id int,
        language_name varchar(200) not null,
        can_read boolean default false,
        can_write boolean default false,
        can_speak boolean default false,
        created_at timestamp default current_timestamp,
        unique(basic_detail_id,language_name),
		    foreign key (basic_detail_id) references basic_details(basic_detail_id)
    on delete set null
        );

create table technology_known(
		technology_know_id int primary key auto_increment,
        basic_detail_id int,
        technology_name varchar(200) not null,
        skill_level enum('Beginner','Mediator','Expert'),
        created_at timestamp default current_timestamp,
		    foreign key (basic_detail_id) references basic_details(basic_detail_id)
    on delete set null
        );
 
 create table reference_detail(
		reference_detail_id int primary key auto_increment,
        basic_detail_id int,
        name varchar(255) not null,
        contact_number varchar(20) not null,
        relation varchar(200) not null,
        created_at timestamp default current_timestamp,
	    foreign key (basic_detail_id) references basic_details(basic_detail_id)
    on delete set null
        );
 
 drop table preferences;
 create table preferences(
		preferences_id int primary key auto_increment,
        basic_detail_id int,
        prefered_location_1 varchar(100),
        prefered_location_2 varchar(100),
        prefered_location_3 varchar(100),
        notice_period varchar(50) not null,
        department varchar(200) not null,
        current_ctc decimal(15,2) not null,
        expected_ctc decimal(15,2) not null,
        created_at timestamp default current_timestamp,
		    foreign key (basic_detail_id) references basic_details(basic_detail_id)
    on delete set null
        );
    
    
  set foreign_key_checks=1;      
truncate basic_details;    
select * from basic_details;

select * from address;
truncate address; 

select * from language_known;
truncate language_known; 

select * from eduction_detail;
truncate eduction_detail; 

select * from preferences;
truncate preferences; 

select * from reference_detail;
truncate reference_detail; 

select * from technology_known;
truncate technology_known; 

select * from work_experience;
truncate work_experience; 

-- joins

select distinct bs.*,a.*,ed.*,l.*,p.*,r.*,t.*,w.*
from 
basic_details as bs
join address as a
on bs.basic_detail_id=a.basic_detail_id
join eduction_detail as ed
on ed.basic_detail_id=bs.basic_detail_id
join language_known  as l
on l.basic_detail_id=bs.basic_detail_id
join preferences as p
on p.basic_detail_id=bs.basic_detail_id
join reference_detail as r
on r.basic_detail_id=bs.basic_detail_id
join technology_known as t
on t.basic_detail_id=bs.basic_detail_id
join work_experience as w
on w.basic_detail_id=bs.basic_detail_id
where bs.basic_detail_id=1

