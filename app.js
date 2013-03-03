
/**
* Module dependencies.
*/

var express = require('express')
  , routes = require('./routes')
  //, phantom = require('./routes/phantom')
  , http = require('http')
  , path = require('path')
  , childProcess = require('child_process')
  , binPath = "vendor/phantomjs/bin/phantomjs"
  , phantomFilePath = path.join(__dirname, 'color-crawler.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


function isValidURL(url){
  var urlRegEx = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if(urlRegEx.test(url)){
    return true;
  }else{
    return false;
  }
};

app.get('/', routes.index);

app.get('/query', function(req, res){
  var url = req.query["url"];
  if(url && isValidURL(url)){
    var childArgs = [phantomFilePath, req.query["url"]];
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      res.send('PHANTOM SAYS('+url+'):'  + '\n\r' + __dirname + '\n\r' + phantomFilePath + '\n\r' + err + '\n\r' + stdout + '\n\r' + stderr);
    });
  }else{
    res.send('INVALID URL!');
  }
});

app.get('/queryA', function(req, res){
  var url = req.query["url"];
  if(url && isValidURL(url)){
    var childArgs = ['color-crawler.js', req.query["url"]];
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      res.send('PHANTOM SAYS('+url+'):'  + '\n\r' + __dirname + '\n\r' + phantomFilePath + '\n\r' + err + '\n\r' + stdout + '\n\r' + stderr);
    });
  }else{
    res.send('INVALID URL!');
  }
});

app.get('/queryB', function(req, res){
  var url = req.query["url"];
  if(url && isValidURL(url)){
    var childArgs = ['./color-crawler.js', req.query["url"]];
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      res.send('PHANTOM SAYS('+url+'):'  + '\n\r' + __dirname + '\n\r' + phantomFilePath + '\n\r' + err + '\n\r' + stdout + '\n\r' + stderr);
    });
  }else{
    res.send('INVALID URL!');
  }
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
