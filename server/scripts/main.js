var $ = require('./jquery'),
    GamesClient = require('./game-client');
    
    
$(document).ready(function(){
    var game = new GameClient();
    game.start();
});