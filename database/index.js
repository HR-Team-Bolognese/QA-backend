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

  return pool.query('SELECT * FROM questions WHERE product_id = $1 AND reported = false LIMIT $2', [id, count])

  // return pool.query('SELECT row_to_json(questions) as questions  FROM( SELECT questions.product_id, (SELECT json_agg(answers) FROM(SELECT * FROM answers WHERE questions_id = questions.id) answers) as answers FROM questions as questions) questions)')

};

//TODO refactor to return a json object in the correct format
const getAnswers = (id, count = 5) => {
  return pool.query('SELECT * FROM answers WHERE questions_id = $1 LIMIT $2', [id, count] )
}

const addQuestion = (question) => {
  const values = [question.product_id, question.body, question.name, question.email, new Date().toISOString()]

  return pool.query('INSERT INTO questions(product_id, body, asker_name, email, reported, helpfulness, date) VALUES($1, $2, $3, $4, false, 0, $5)', values)
}

const addAnswer = (questionid, newanswer) => {
  const values = [questionid, newanswer.body, newanswer.name, newanswer.email, new Date().toISOString()]

  //insert answer to answer table then get the answer id somehow and use that ti insert photos into photos table
  return pool.query('INSERT INTO answers(questions_id, body, answerer_name, email, reported, helpfulness, date) VALUES($1, $2, $3, $4, false, 0, $5) RETURNING id', values)

}

const addPhotos = (answerId, newanswer) => {
  //for each url, gener
  // let values = [answerId];
  // newanswer.photos.forEach((photo) => {
  //   values.push(photo);
  // })
  // return pool.query('INSERT INTO photos(answers_id, url) VALUES($1, $2), ($1, $3), ($1, $4),($1, $5), ($1, $6)', values)

  return newanswer.photos.map((photo) => {
    let values = [answerId];
    values.push(photo);
    pool.query('INSERT INTO photos(answers_id, url) VALUES($1, $2)', values)
  })
}

module.exports = {
  // pool: pool,
  getQuestions: getQuestions,
  getAnswers: getAnswers,
  addQuestion: addQuestion,
  addAnswer: addAnswer,
  addPhotos: addPhotos
}