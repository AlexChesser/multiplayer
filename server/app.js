// Dependencies
var express = require('express'),
    stylus = require('stylus');

// GamesJS Server
var gamesjs = require('./scripts/multiplayer');

// Create App/Server
var app = module.exports = express.createServer();

// ----------------
// Configurations
// ----------------
var port = 8080;
    // General
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    
    // Setup Stylus (Will Compile files on change
    function compile(str, path, fn) {
    stylus(str)
        .set('filename', path)
        .set('compress', true)
        .render(fn);
    }
    app.use(stylus.middleware({ src: __dirname + '/../www' }));
    
    app.use(app.router);    
});
    // Development specific 
app.configure('development', function(){
    app.use(require('browserify')({
        require : __dirname + '/scripts/main.js',
        watch: true
    }));

    app.use(express.static(__dirname + '/../www'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    console.log('Running in Development Mode');
});
    // Production specific (You don't have to worry about setting this. 
    // It is set by default on the live server.
app.configure('production', function(){
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
});

// Set EJS as our default Template Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Routes
app.get('/', function(req,res){
    res.render('index');
});

// Player Joins a Game
app.get( /^\/play\/(\w+)$/, function( req, res ) {
    gamesjs( req.params.shift(), function(sockets) {} );
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
