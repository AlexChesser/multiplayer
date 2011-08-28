var Class        = require('./class'),
    Simulation   = require('./simulation'),
    Player       = require('./player'),
    Controller   = require('./controller'),
    Renderer     = require('./renderer');
    socket       = io.connect(),
    game_room_id = location.href.split('/').slice(-1)[0];

console.log( io,'<- IO', socket, 'ROOM ->', game_room_id );

module.exports = GameClient = Class.extend({
    init: function(){
        var self = this;
        this.sim = new Simulation();
        this.renderer = new Renderer(this.sim);
        
        this.width = 800;
        this.height = 600;
        
        this.controller = new Controller([{
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

        var player = this.player = new Player(this.sim,this.controller,0,0,0);
        this.sim.addEntity( this.player, this.player.id );
        var sim = this.sim;

        socket.on( 'connect', function () {
            socket.emit( 'player-connected', {
                game_room_id : game_room_id,
                player_id    : player.id
            } );

            socket.on( 'server-tick', function (msg) {
                console.log(JSON.stringify(msg));

                msg.forEach(function(obj){
                    var player = sim.lookup(obj.id);
                    
                    if (!player) {
                        player = new Player(
                            sim, null, 0, 0, 0
                        );
                        sim.addEntity( player, player.id );
                    }

                    player.x = obj.x;
                    player.y = obj.y;
                    player.z = obj.z;
                    player.vx = obj.vx;
                    player.vy = obj.vy;
                    player.vz = obj.vz;
                });
            } );
        });

        document.addEventListener( 'keydown', function(e){
            var action = self.controller.onInput(e);
            if (!action) return;

            socket.emit( 'player-input', {
                player_id    : player.id,
                game_room_id : game_room_id,
                action       : action
            } );

        }, false );

        document.addEventListener('keyup',function(e){
            var action = self.controller.onInput(e);
            if (!action) return;

            socket.emit( 'player-input', {
                player_id    : player.id,
                game_room_id : game_room_id,
                action       : action
            } );

        },false);
    },
    start: function(){
        var self = this,
            lastLoopTime = (new Date()).getTime()/1000.0;
            
        this.intervalId = setInterval(function(){
            var newTime = (new Date()).getTime()/1000.0;
                self.timeElapsed = newTime-lastLoopTime;
                self.sim.update(self.timeElapsed);
                self.renderer.render();
                lastLoopTime = newTime;
        },1000/60);
    },
    stop: function(){
        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }
});
