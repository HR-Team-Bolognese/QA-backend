const frisby = require('frisby');
const { Pool, Client } = require('pg');
const password = require('../../config.js');

const pool = new Pool({
  user: 'sdcuser',
  host: 'localhost',
  database: 'qa',
  password: password,
  port: 5432
});

it('should return questions JSON object with a result and asker_name property', function () {
  return frisby.get('http://localhost:3000/qa/questions/?product_id=3&count=1')
    .expect('status', 200).inspectJSON()
    .expect('bodyContains', 'asker_name')
    .expect('bodyContains', 'results')
});

it('should return answers JSON object in correct format', function () {
  return frisby.get('http://localhost:3000/qa/questions/2683/answers')
    .expect('status', 200).inspectJSON()
    .expect('bodyContains', 'answerer_name')
    .expect('bodyContains', 'photos')
    .expect('json', {
      "question": 2683,
      "page": 0,
      "count": 5,
      "results": [
        {
          "answer_id": 5178,
          "body": "Laudantium eligendi laudantium alias sunt dolor inventore dignissimos.",
          "date": "2020-06-11T06:03:09.327",
          "answerer_name": "Loy.Hoppe35",
          "helpfulness": 4,
          "photos": [
            {
              "id": 1556,
              "url": "https://images.unsplash.com/photo-1500340520802-1687634cbe38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            }
          ]
        },
        {
          "answer_id": 5179,
          "body": "Incidunt velit aut eum nihil earum in necessitatibus et.",
          "date": "2021-01-20T10:52:42.053",
          "answerer_name": "Jonathan.Torphy13",
          "helpfulness": 13,
          "photos": null
        },
        {
          "answer_id": 5180,
          "body": "Laudantium earum molestiae qui commodi dolores nesciunt.",
          "date": "2020-05-19T02:50:11.109",
          "answerer_name": "Moshe24",
          "helpfulness": 16,
          "photos": null
        }
      ]
    })
});


it('POST question should return a status of 201 created', function () {
  return frisby.post('http://localhost:3000/qa/questions',
    {
      body: {
        "body": "This is an awesome shirt. Great material. Highly recommend!",
        "name": "Meow meow",
        "email": "123@gmail.com",
        "product_id": 1
      }
    })
    .expect('status', 201)

});

it('POST answer should return a status of 200 created', function () {
  return frisby.post('http://localhost:3000/qa/questions/8/answers',
    {
      body: {
        "body": "This shirt length is too long.",
        "name": "Oliver",
        "email": "meow@123.com",
        "photos": [
          "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnL-6fb5PhgkCkH3odiqgPmhqoWm6HeRjwQ&usqp=CAU"
        ]
      }
    })
    .expect('status', 201)

});

it('PUT to mark question helpful should return a status of 200 OK', function () {
  return frisby
    .put('http://localhost:3000/qa/questions/5/helpful')
    .expect('status', 200);
});

it('PUT to report question should return a status of 200 OK', function () {
  return frisby
    .put('http://localhost:3000/qa/questions/6/report')
    .expect('status', 200);
});

it('PUT to mark answer helpful should return a status of 200 OK', function () {
  return frisby
    .put('http://localhost:3000/qa/answers/65/helpful')
    .expect('status', 200);
});

it('PUT to report answer should return a status of 200 OK', function () {
  return frisby
    .put('http://localhost:3000/qa/answers/75/report')
    .expect('status', 200);
});