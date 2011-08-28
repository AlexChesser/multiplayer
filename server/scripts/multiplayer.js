//
//  GamesJS
//

var io         = require('socket.io')
,   event      = require('./event')
,   Player     = require('./player')
,   Simulation = require('./simulation')
,   Controller = require('./controller')
,   games      = {};

/*
    TODO
    controler abstract layer
*/

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
    // TODO use socket routes
    game.sockets.forEach(function(sock){
        sock.emit( 'server-tick', game.simulation.entities.map(function(obj) {
            return {
                id : obj.id,
                x  : obj.x,
                y  : obj.y,
                z  : obj.z,
                vx : obj.vx,
                vy : obj.vy,
                vz : obj.vz
            };
        }) );
    });
}

module.exports = {
    init : function(app) {
        io = io.listen(app);
        io.sockets.on( 'connection', function (socket) {
            socket.on( 'player-input', function (data) {
                console.log(data);
                /*
                    data = {
                        game_room_id
                        player_id
                        input
                    }
                */

                var game   = games[data.game_room_id] || {}
                ,   player = game[player.id] || {};

                if (!(game && player)) return;

                // Update Vector
                // ...

            } );
            //socket.on( 'disconnect', function () {});

            socket.on( 'player-connected', function (data) {
                var game   = games[data.game_room_id];
                if (!game) return console.log(
                    'ERROR, Game should exist -> ',
                    data.game_room_id
                );

                if (game) game.sockets.push(socket);

                var player = game.simulation.lookup(data.player_id);


                // Leave if player already exists
                if (player) return;

                console.log(
                    'Player Joined at http://gamesjs.com/ -> ',
                    data.game_room_id,
                    data.player_id
                );

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
                    }
                ]);

                var player = new Player(
                    game.simulation,
                    controller,
                    0, 0, 0
                );
                player.id = data.player_id;
                game.simulation.addEntity( player, data.player_id );
            });
        });
    },
    join : function gamejs(game_room_id) {
        // Create Game or Get 
        var game = games[game_room_id] = games[game_room_id] || {
            simulation   : new Simulation(),
            timeElapsed  : 0.0,
            timeStart    : new Date / 1000.0,
            sockets      : [],
            queues       : [], // non-state events
            game_room_id : game_room_id,
            interval     : setInterval( function() {
                game_loop_tick(game);
            }, 160 ),
            creating     : (function(){
                console.log('New Game at http://gamesjs.com/' + game_room_id);
            })()
        };
    }
};
