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

// function that get questions based on product id
const getQuestions = (id, count = 5) => {
  // const text = `SELECT * FROM questions WHERE product_id = $1`
  // const values = [id, count]

  // return pool.query('SELECT * FROM questions WHERE product_id = $1 LIMIT $2', [id, count])

  return pool.query('SELECT row_to_json(questions) as questions  FROM( SELECT questions.product_id, (SELECT json_agg(answers) FROM(SELECT * FROM answers WHERE questions_id = questions.id) answers) as answers FROM questions as questions) questions)')



};


module.exports = {
  // pool: pool,
  getQuestions : getQuestions
}