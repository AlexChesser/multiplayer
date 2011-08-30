#!node

// Dependencies
var express = require('express'),
    stylus = require('stylus');

// Create App/Server
var app = module.exports = express.createServer();

// GamesJS Server
var gamesjs = require('./scripts/multiplayer');
gamesjs.init(app);

// ----------------
// Configurations
// ----------------
var port = 8080;
    // General
app.configure(function(){
// Forward www.playbrassmonkey.com to playbrassmonkey.com
  app.use(function(req,res,next){
    if(req.headers.host=="www.playbrassmonkey.com"){
      res.writeHead(301, {'Location':'http://playbrassmonkey.com'+req.url, 'Expires': (new Date).toGMTString()});
      res.end();
    }
    else{
      next();
    }
  });

  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "hotPolarBearInHawaii"}));
  
  app.use(express.methodOverride());
  
  // Setup Stylus to compile files on change
  function compile(str, path, fn) {
    stylus(str)
      .set('filename', path)
      .set('compress', true)
      .render(fn);
  }
  
  app.use(stylus.middleware({ src: __dirname + '/../www' }));
  
  app.use(require('browserify')({
    require : __dirname + '/scripts/main.js',
    watch: true
  }));
  

  // We put the static middleware after our application routes
  // this way we can restrict file access based on credentials  
  app.use(app.router);
  app.use(express.static(__dirname + '/../www'));
});



    // Development specific 
/*app.configure('development', function(){
    app.use(require('browserify')({
        require : __dirname + '/scripts/main.js',
        watch: true
    }));

    app.use(express.static(__dirname + '/../www'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    console.log('Running in Development Mode');
});*/
    // Production specific (You don't have to worry about setting this. 
    // It is set by default on the live server.
/*app.configure('production', function(){
    app.use(require('browserify')({
        require : __dirname + '/scripts/main.js',
        filter : require('uglify-js'), 
        watch: true
    }));

    port = 80;
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/../www', { maxAge: oneYear }));
    app.use(express.errorHandler());
console.log('Running in Production Mode');
});*/

// Set EJS as our default Template Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Routes
app.get('/', function(req,res){
    res.render('index',{layout:false});
});

// Player Joins a Game
app.get( /^\/play\/(\w+)$/, function( req, res ) {
    gamesjs.join.apply( {}, req.params );
    res.render('play');
} );

// Start the server
app.listen(port);
console.log('Server running on port '+port);

// START NODE KNOCKOUT TRACKING CODE
// Remark: This code MUST be required ONCE somewhere in your application for,
// node knockout tracking to work.
require('./../vendor/nko')('2tDiu6H8P/Y44dI1', function(err, res) {
    if (err) {
        //console.error('Warning: Running in development mode.');
    }
});
//  END NODE KNOCKOUT TRACKING CODE
