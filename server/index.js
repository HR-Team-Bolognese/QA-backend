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
      // console.log('data in server get', data.rows);
      res.send(data.rows).status(200);
    })
    .catch((err) => {
      console.log('error in server get', err);
      res.sendStatus(400);
    })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  // console.log('answers server', req.params)
  let question_id = req.params.question_id;
  db.getAnswers(question_id)
    .then((data) => {
      // console.log('data in answer get server', data.rows)
      res.send(data.rows).status(200)
    })
    .catch((err) => {
      // console.log('error in server answer get', err);
      res.sendStatus(418);
    })
});

app.post('/qa/questions', (req, res) => {
  let newquestion = req.body;
  db.addQuestion(newquestion)
    .then((data) => {
      console.log('Success posting question');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('err in question post server', err);
      res.sendStatus(400)
    })
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let newanswer = req.body;
  let questionid = Number(req.params.question_id);
  console.log('new answer in server', req.body)
  console.log('questionid', questionid)

  db.addAnswer(questionid, newanswer)
    .then((data) => {
      if (newanswer.photos.length > 0) {
        const answerId = Number(data.rows[0].id);

        db.addPhotos(answerId, newanswer)
          .then(() => {
            console.log('Success adding photo to db')
          })
          .catch((err) => {
            console.log('err with adding photos', err)
            res.status(400).send('Error adding photos to database');
          })
      }
      res.status(200).send('Succes posting answer!');
    })
    .catch((err) => {
      console.log('err posting answer', err)
      res.status(400).send('Error posting answer!');
    })
});


const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});