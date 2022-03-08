ALTER TABLE questions ADD COLUMN time timestamp;
UPDATE questions SET stamp = to_timestamp(date/1000);
ALTER TABLE questions DROP COLUMN date;
ALTER TABLE questions RENAME COLUMN time TO date;
ALTER TABLE questions ALTER COLUMN date set NOT NULL;


ALTER TABLE answers ADD COLUMN time timestamp;
UPDATE answers SET stamp = to_timestamp(date/1000);
ALTER TABLE answers DROP COLUMN date;
ALTER TABLE answers RENAME COLUMN time TO date;
ALTER TABLE answers ALTER COLUMN date set NOT NULL;
