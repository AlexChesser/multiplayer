var Class = require('./class');

module.exports = Entity = Class.extend({
    init: function(sim,x,y,z){
        this.id = 'obj-' + Math.floor(Math.random()*10000000000);
        this.sim = sim;
        this.x = x||0.0;
        this.y = y||0.0;
        this.z = z||0.0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
    },
    update: function(elapsedTime){
    }
});

