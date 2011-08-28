
//
//  GameJS
//

var io    = require('socket.io').listen(8090)
,   games = {};


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

    socket.on( 'player-connected', function (player) {
        socket.broadcast.emit( 'player-connected', player );
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
    /*
        
    */

    socket.broadcast.emit( 'server-tick', game );
}

module.exports = function gamejs( game_room, socketfn ) {
    console.log('Launching New Game at http://gamesjs.com/' + game_room_id);

    var game = games[game_room_id] = {
        objects      : [], // players, blocks, cars, etc.
        queues       : [], // non-state events
        game_room_id : game_room_id,
        interval     : setInterval( function() {
            game_loop_tick(game);
        }, 16 )
    };

    // Add an object
    ///game.objects.push(player);

    return;
    //socketfn(sockets);
};
