const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/presentations', { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(helmet());
app.use('/', routes);

const PORT = 3001;

app.listen(PORT);
console.log(`APP LISTENING ON ${PORT}`);