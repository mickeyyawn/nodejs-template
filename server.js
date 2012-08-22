var express = require('express');
var config = require('./config');
var io = require('socket.io');
var app = module.exports = express();
var server = require('http').createServer(app);
var port;
var host;

process.env.NODE_ENV = (process.env.NODE_ENV || "development");

app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.set('view options', {pretty: true})
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  //config.setProdEnvironment();
  //var mongoURL = config.getConnectionAsURL();
  //var store = new mongoStore({url:mongoURL});
  //app.use(express.session({secret:"turner!", "store":store} ));
  app.use(express.errorHandler());
  app.use(app.router);
});

// env config
app.configure('development', function(){
  console.log("running in dev");
  port = 3001;
  host = '127.0.0.1';
  //config.setDevEnvironment();
  app.use(express.session({"secret":"turner!"}));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

// env config
app.configure('production', function(){
  console.log("running in production");
  port = 80;
  host = '0.0.0.0';
  //config.setDevEnvironment();
  app.use(express.session({"secret":"turner!"}));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});


process.on('uncaughtException', function(err){
  console.log(err);
});


if(!module.parent){
  console.log('listening on ip: ' + host + ' on port: ' + port);
  server.listen(port, host);
};


app.get('/', function(req, res){
  res.render('root');
});

module.exports.app = app;
routes = require('./routes');