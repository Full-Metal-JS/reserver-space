drop table locations cascade;
drop table users cascade;
drop table userslocations cascade;
drop table rooms cascade;
drop table reservations cascade;

create table locations (
  id serial primary key,
  location_name varchar(100)
);

create table users (
  id serial primary key,
  facebookid varchar(100),
  googleid varchar(100),
  email varchar(100) unique,
  password varchar(100),
  photo varchar(100),
  registered boolean
);

create table userslocations (
  id serial primary key,
  userid integer,
  locationid integer,
  
  foreign key (userid) references users(id),
  foreign key (locationid) references locations(id)
);

create table rooms (
  id serial primary key,
  room_name varchar(100),
  locationid integer,
  
  foreign key (locationid) references locations(id)
);

create table reservations (
  id serial primary key,
  reservation_name varchar(100),
  start_time varchar(100),
  end_time varchar(100),
  date varchar(100),
  userid integer,
  roomid integer,
  
  foreign key (userid) references users(id),
  foreign key (roomid) references rooms(id)
);