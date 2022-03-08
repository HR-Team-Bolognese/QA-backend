CREATE TABLE questions (
  id int not null primary key,
  product_id int not null,
  body varchar(1000) not null,
  date double precision not null,
  asker_name varchar(60) not null,
  email varchar(60) not null,
  reported boolean not null,
  helpfulness int not null
);

CREATE INDEX product_id
ON questions (product_id);