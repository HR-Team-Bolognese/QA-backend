CREATE TABLE photos (
  id int not null primary key,
  answers_id int references answers (id),
  url varchar(250)
)

