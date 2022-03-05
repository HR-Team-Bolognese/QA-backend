const { Pool, Client } = require('pg');
const password = require('../config.js');

const pool = new Pool({
  user: 'sdcuser',
  host: 'localhost',
  database: 'qa',
  password: password,
  port: 5432
});

pool.connect()
  .then(() => {
    console.log('db connected!');
  })
  .catch((err) => {
    console.error(`db not connect - err message: `, err);
  })

//TODO refactor return a json object in the correct format
const getQuestions = (id, count = 5) => {
  // const text = `SELECT * FROM questions WHERE product_id = $1`
  // const values = [id, count]

  // return pool.query('SELECT * FROM questions WHERE product_id = $1 AND reported = false LIMIT $2', [id, count])

  return pool.query(`SELECT row_to_json(quest)
  from(
    select product_id,
    (


        select json_agg(json_build_object('question_id', id, 'question_body', body, 'question_date', date, 'asker_name', asker_name, 'question_helpfulness', helpfulness, 'reported', reported, 'answers',
        (
          select  json_build_object(
            id, json_build_object(
              'id', id,
              'body', body,
              'date', date,
              'answerer_name', answerer_name,
              'helpfulness', helpfulness

              )

          )
          from answers
          where id = questions.id

        )))


        from questions
        where product_id = $1

    ) as results
    from questions where product_id = $1
  ) quest`, [id])


  // return pool.query(`SELECT row_to_json(quest)
  // from(
  //   select product_id,
  //   (
  //     select json_agg(quest)
  //     from (
  //       select json_build_object('question_id', id, 'question_body', body, 'question_date', date, 'asker_name', asker_name, 'question_helpfulness', helpfulness, 'reported', reported, 'answers',
  //       (
  //         select  json_build_object(
  //           id, json_build_object(
  //             'id', id,
  //             'body', body,
  //             'date', date,
  //             'answerer_name', answerer_name,
  //             'helpfulness', helpfulness

  //             )

  //         )
  //         from answers
  //         where id = questions.id

  //       ))


  //       from questions
  //       where product_id = $1
  //     ) quest
  //   ) as results
  //   from questions where product_id = $1
  // ) quest`, [id])
};

//TODO refactor to return a json object in the correct format
const getAnswers = (id, count = 5) => {
  let
  return pool.query('SELECT * FROM answers WHERE questions_id = $1 AND reported = false LIMIT $2', [id, count] )


  // return pool.query('SELECT row_to_json(quest) as questions FROM(SELECT ) quest')


}

const addQuestion = (question) => {
  const values = [question.product_id, question.body, question.name, question.email, new Date().toISOString()]

  return pool.query('INSERT INTO questions(product_id, body, asker_name, email, reported, helpfulness, date) VALUES($1, $2, $3, $4, false, 0, $5)', values)
}

const addAnswer = (questionid, newanswer) => {
  const values = [questionid, newanswer.body, newanswer.name, newanswer.email, new Date().toISOString()]

  return pool.query('INSERT INTO answers(questions_id, body, answerer_name, email, reported, helpfulness, date) VALUES($1, $2, $3, $4, false, 0, $5) RETURNING id', values)

}

const addPhotos = async (answerId, newanswer) => {

  await newanswer.photos.forEach((photo) => {
    let values = [answerId];
    values.push(photo);
    return pool.query('INSERT INTO photos(answers_id, url) VALUES($1, $2)', values)
  })

}

const markHelful = async (table, id) => {

  await table === 'questions' ?
  pool.query('UPDATE questions SET helpfulness = helpfulness + 1 WHERE id = $1', [id])
  : pool.query('UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = $1', [id])
}

const report = async (table, id) => {

  await table === 'questions' ?
  pool.query('UPDATE questions SET reported = true WHERE id = $1', [id])
  : pool.query('UPDATE answers SET reported = true WHERE id = $1', [id])
}


module.exports = {
  // pool: pool,
  getQuestions: getQuestions,
  getAnswers: getAnswers,
  addQuestion: addQuestion,
  addAnswer: addAnswer,
  addPhotos: addPhotos,
  markHelful: markHelful,
  report: report
}