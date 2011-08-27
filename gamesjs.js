
//
//  GameJS
//

var io    = require('socket.io').listen(8090)
,   games = {}
,   ;


io.sockets.on( 'connection', function (socket) {
    socket.on( 'player-input', function () {
        /*
            data = {
                game_room_id
                player_id
                input
            }
        */
        // Game Room is Room ID
        var game_room_id = data.game_room_id;

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
}

module.exports = function gamejs( game_room, socketfn ) {
    console.log('Launching New Game at http://gamesjs.com/' + game_room_id);

    var game = games[game_room_id] = {
        objects      : [],
        game_room_id : game_room_id
        interval     : setInterval( function() {
            game_loop_tick(game);
        }, 20 )
    };

    // Add an object
    ///game.objects.push(player);

    return;
    //socketfn(sockets);
};
