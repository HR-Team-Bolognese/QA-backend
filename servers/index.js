const express = require('express');
const app = express();

//path may not be right
app.use(express.static(__dirname + './../public'))
app.use(express.json());



const port = 3000;

app.listen(port, () => ){
  console.log(`Listening on port ${port}!`);
}