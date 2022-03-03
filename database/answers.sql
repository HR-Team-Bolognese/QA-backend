CREATE TABLE answers (
  id int not null primary key,
  questions_id int references questions (id),
  body varchar(1000) not null,
  date double precision not null,
  answerer_name varchar(60) not null,
  email varchar(60) not null,
  reported boolean not null,
  helpfulness int not null
)