var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
var axios = require('axios');

app.get('/users', function (req, res) {
  axios
    .get('https://swapi.dev/api/starships')
    .then((response) => {
      res.json({
        success: 'get call succeed!',
        url: req.url,
        users: response.data.results,
      });
    })
    .catch((err) => {
      res.json({ error: true });
    });
});

app.get('/people', function (req, res) {
  axios
    .get('https://swapi.dev/api/people')
    .then((response) => {
      res.json({
        success: 'get call succeed!',
        url: req.url,
        people: response.data.results,
      });
    })
    .catch((err) => {
      res.json({ error: true });
    });
});

app.get('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

app.post('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
