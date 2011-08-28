var Entity = require('./entity');
var acceleration = 15,
    friction = 0.97;


module.exports = Player = Entity.extend({
    init: function(sim,controller,x,y,z){
        this._super(sim,x,y,z);
        this.controller = controller;
    },
    update: function(elapsedTime){
        if(this.controller.isKeyDown('left')){
            this.vx-=acceleration*elapsedTime;
        }
        if(this.controller.isKeyDown('right')){
            this.vx+=acceleration*elapsedTime;
        }
        if(this.controller.isKeyDown('up')){
            this.vy-=acceleration*elapsedTime;
        }
        if(this.controller.isKeyDown('down')){
            this.vy+=acceleration*elapsedTime;
        }
        
        this.x +=this.vx;
        this.y +=this.vy;
        this.z +=this.vz;
        
        this.vx*=friction;
        this.vy*=friction;
        this.vz*=friction;
    },
    render: function(ctx,cvs,elapsedTime){
        ctx.fillStyle="red";
        ctx.fillRect(this.x,this.y,100,100);
    }
});
