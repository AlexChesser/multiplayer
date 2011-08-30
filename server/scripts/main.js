var GamesClient = require('./game-client')
    event       = require('./event');
    
    
$(document).ready(function(){
    var game = new GameClient();
    game.start();
});
