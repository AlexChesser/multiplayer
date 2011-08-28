var Class        = require('./class'),
    Simulation   = require('./simulation'),
    Player       = require('./player'),
    Controller   = require('./controller'),
    socket       = io.connect(),
    game_room_id = location.href.split('/').slice(-1)[0];

console.log( io,'<- IO', socket, 'ROOM ->', game_room_id );

socket.on( 'connect', function () {
    socket.emit( 'player-connected', {
        game_room_id : game_room_id
    } );

    socket.on( 'server-tick', function (msg) {
        console.log(msg);
    } );
});

module.exports = GameClient = Class.extend({
    init: function(){
        var self = this;
        this.sim = new Simulation();
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
        
        this.player = new Player(this.sim,this.controller,0,0,0);
        this.sim.addEntity(this.player);
        
        this.cvs = document.getElementById('app-canvas');
        this.ctx = this.cvs.getContext('2d');
            
        this.cvs.style.width = this.width+"px";
        this.cvs.style.height = this.height+"px";
        
        this.cvs.width=this.width;
        this.cvs.height=this.height;
        
        document.addEventListener('keydown',function(e){
            if(self.controller.onInput(e)){
            }
        },false);
        document.addEventListener('keyup',function(e){
            if(self.controller.onInput(e)){
            }
        },false);
    },
    start: function(){
        var self = this,
            lastLoopTime = (new Date()).getTime()/1000.0;
            
        this.intervalId = setInterval(function(){
            var newTime = (new Date()).getTime()/1000.0;
                self.timeElapsed = newTime-lastLoopTime;
                
                self.sim.update(self.timeElapsed);
                
                self.ctx.fillStyle="rgba(0,0,0,1)";
                self.ctx.fillRect(0,0,self.width,self.height);
                self.sim.render(self.ctx,self.cvs,self.timeElapsed);
                
                lastLoopTime = newTime;
        },1000/60);
    },
    stop: function(){
        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }
});
