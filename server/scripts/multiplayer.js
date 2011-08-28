//
//  GamesJS
//

var io         = require('socket.io').listen(8090)
,   event      = require('./event')
,   Player     = require('./player')
,   Simulation = require('./simulation')
,   Controller = require('./controller')
,   games      = {};

/*
    TODO
    controler abstract layer
*/
io.sockets.on( 'connection', function (socket) {
    socket.on( 'player-input', function (data) {
        /*
            data = {
                game_room_id
                player_id
                input
            }
        */

        var game   = games[data.game_room_id]
        ,   player = game[player.id];



        // Update Vector
        // ...

    } );
    //socket.on( 'disconnect', function () {});

    socket.on( 'player-connected', function (data) {
        //socket.broadcast.emit( 'player-connected', player );
        var game = games[data.game_room_id]
        game.sockets.push(socket);
    });
});

/*
    land on page
    random gen url

    player joins with /3hklasj
    add game room if not exists
    sp

    ---
*/


function game_loop_tick(game) {
    // ...tick
    game.timeElapsed = (new Date / 1000.0) - game.timeStart;
    game.simulation.update(game.timeElapsed);

    // Broadcast to single game room rather than everyone
    game.sockets.forEach(function(sock){
        sock.emit( 'server-tick', game );
    });
}

module.exports = function gamejs( game_room_id, socketfn ) {
    console.log('Launching New Game at http://gamesjs.com/' + game_room_id);

    // Create Game or Get 
    var game = games[game_room_id] = games[game_room_id] || {
        simulation   : new Simulation(),
        timeElapsed  : 0.0,
        timeStart    : new Date / 1000.0,
        sockets      : [],
        objects      : [], // players, blocks, cars, etc.
        queues       : [], // non-state events
        game_room_id : game_room_id,
        interval     : setInterval( function() {
            game_loop_tick(game);
        }, 16 )
    };

    // Add an object
    var controller = new Controller([{
            name: "left",
            keyCode: 37
        }, {
            name: "right",
            keyCode: 39
        }, {
            name: "up",
            keyCode: 38
        }, {
            name: "down",
            keyCode: 40
        },  
    ]);

    game.simulation.addEntity(new Player(
        game.simulation,
        controller,
        0, 0, 0
    ));
};
