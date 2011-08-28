var Class = require('./class'),
    Simulation = require('./simulation'),
    Player = require('./player'),
    Controller = require('./controller'),
    Renderer = require('./renderer');

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
        
        this.player = new Player(this.sim,this.controller,0,0,0);
        this.sim.addEntity(this.player);
        
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
                
                self.renderer.render();
                
                lastLoopTime = newTime;
        },1000/60);
    },
    stop: function(){
        clearInterval(this.intervalId);
        this.intervalId = undefined;
    },

});
