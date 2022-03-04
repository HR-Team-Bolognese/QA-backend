const express = require('express');
const app = express();
const db = require('../database/index.js');

//path may not be right
app.use(express.static(__dirname + './../public'))
app.use(express.json());

app.get('/qa/questions', (req, res) => {
  let product_id = req.query.product_id;
  db.getQuestions(product_id)
    .then((data) => {
      console.log('data in server get', data.rows);
      return data.rows;
    })
    .catch((err) => console.log('error in server get', err))
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});