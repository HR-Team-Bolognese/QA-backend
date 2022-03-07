CREATE TABLE photos (
  id int not null primary key,
  answers_id int references answers (id),
  url varchar(250)
)

CREATE INDEX answers_id
ON photos (answers_id);