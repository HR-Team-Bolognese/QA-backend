CREATE sequence questions_id_seq;

ALTER TABLE questions ALTER COLUMN id SET DEFAULT nextval('questions_id_seq');

ALTER SEQUENCE questions_id_seq OWNED BY questions.id;

SELECT setval('questions_id_seq',  COALESCE(max(id), 0)) from questions;



CREATE sequence answers_id_seq;

ALTER TABLE answers ALTER COLUMN id SET DEFAULT nextval('answers_id_seq');

ALTER SEQUENCE answers_id_seq OWNED BY answers.id;

SELECT setval('answers_id_seq',  COALESCE(max(id), 0)) from answers;