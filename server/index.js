const express = require('express');
const app = express();
const db = require('../database/index.js');

//path may not be right
app.use(express.static(__dirname + './../public'))
app.use(express.json());

app.get('/qa/questions', (req, res) => {
  let product_id = req.query.product_id;
  let count = req.query.count;
  // console.log('count',  count)
  // console.log('page', req.query.page)
  let page = req.query.page
  db.getQuestions(product_id, count)
    .then((data) => {
      console.log('data in server get', data.rows[0].row_to_json);
      res.status(200).send(data.rows[0].row_to_json);
    })
    .catch((err) => {
      console.log('error in server get', err);
      res.sendStatus(400);
    })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  // console.log('answers server', req.params)
  let question_id = req.params.question_id;
  let count = req.query.count;
  let page = req.query.page
  db.getAnswers(question_id, count, page)
    .then((data) => {
      // console.log('data in answer get server', data.rows)
      res.send(data.rows[0].json_build_object).status(200)
    })
    .catch((err) => {
      console.log('error in server answer get', err);
      res.sendStatus(418);
    })
});

app.post('/qa/questions', (req, res) => {
  let newquestion = req.body;
  db.addQuestion(newquestion)
    .then((data) => {
      res.status(201).send('Success posting question!');
    })
    .catch((err) => {
      res.status(400).send('Error posting question to database')
    })
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let newanswer = req.body;
  let questionid = Number(req.params.question_id);

  db.addAnswer(questionid, newanswer)
    .then((data) => {
      if (newanswer.photos.length > 0) {
        const answerId = Number(data.rows[0].id);
        db.addPhotos(answerId, newanswer)
          .then(() => {
            res.status(201).send('Success adding photo to database');
          })
          .catch((err) => {
            res.status(400).send('Error adding photos to database');
          })
      } else {
        res.status(200).send('Success posting answer!');
      }
    })
    .catch((err) => {
      res.status(400).send('Error posting answer!');
    })
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let id = Number(req.params.question_id);
  db.markHelful('questions', id)
    .then(() => {
      res.status(200).send('Success updating question helpful count!')
    })
    .catch((err) => {
      res.status(400).send('Error updating question helpful count!');
    })
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  let id = Number(req.params.question_id);

  db.report('questions', id)
    .then(() => {
      res.send('Success reporting question!').status(200)
    })
    .catch((err) => {
      console.log('err reporting q', err)
      res.send('Error reporting question!').status(400)
    })
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let id = Number(req.params.answer_id);
  db.markHelful('answers', id)
    .then(() => {
      res.status(200).send('Success updating question helpful count!')
    })
    .catch((err) => {
      console.log('err', err)
      res.status(400).send('Error updating answers helpful count!');
    })
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let id = Number(req.params.answer_id);
  console.log('param', req.params)
  db.report('answers', id)
    .then(() => {
      res.send('Success reporting question!').status(200)
    })
    .catch((err) => {
      console.log('err reporting a', err)
      res.send('Error reporting question!').status(400)
    })
});


const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});