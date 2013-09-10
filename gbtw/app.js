
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(request, respond) {
  fs.readFile('index.html', function(err, data){
    respond.end(data);
  });
});

app.get('/users', user.list);
//write post data to users.txt file 

app.post('/receive', function(request, respond) {
  var filePath = __dirname + '/users.txt';
  var name = request.body.name;
  var email = request.body.email;
//this is an anonymous function
//it can access all of the information in app.post(outside of it?)
//because javascript has a feature called lexical feature
//they depend on where that function is defined
  var appendFileCallback = function (err) {
    if (err) {
      respond.end("There was an error: " + err);
    } else {
      respond.end("Thank you for submitting your username and email.");
    }
  };
//fs is a library that comes with node, appendFileCallback is an anonymous function
//fs.appendfile gets run first, because it is not an anonymous function
  fs.appendFile(filePath, name + " " + email + "\n", appendFileCallback);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
