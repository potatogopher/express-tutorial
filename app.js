var express = require('express') // require express as our web framework
var mongoose = require('mongoose') // mongoose is a simple package that gives us easy to use functions to use a mongodb
var bodyParser = require('body-parser') // body-parser parses incoming request so that we can handle them easier
var app = express() // create an express app

// use the body parser
app.use(bodyParser.json())

////////////////////
///// MongoDB //////
////////////////////

// Conncect to the mongodb
mongoose.connect('mongodb://localhost/myDatabaseName')

// Create our schema for our cat
var CatSchema = new mongoose.Schema({
		name: String
});

// Create out model for our resource
var Cat = mongoose.model('Cat', CatSchema)

////////////////////
///// Routing //////
////////////////////

// app.get creates an endpoint that express will recognize
// as the '/' endpoint is known as the root of the 
// project. When we go to the root of the project
// we will respond with the text 'Hello World'
app.get('/', function(req, res) {
  res.send('Hello World')
})

// GET '/cats'
// this endpoint will return us a list of cats
app.get('/cats', function(req, res) {
  Cat.find({}, function(err, cats) {
    res.json(cats);  
  });
})

// POST '/cats'
// this endpoint will save a cat to our database
app.post('/cats', function(req, res) {
    var cat = new Cat({
      name: req.body.name
    })
    cat.save()

    res.json(cat);  
})

////////////////////
///// Server ///////
////////////////////

// app.listen creates the server on the specified
// port that we are going to listen on. In our case,
// we are going to spin up the server on localhost:3000
app.listen(3000, function() {
  console.log('Server started on localhost:3000')
})

