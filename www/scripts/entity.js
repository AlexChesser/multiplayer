(function(){

jo.Entity = Class.extend({
    init: function(sim,x,y,z){
        this.sim = sim;
        this.x = x||0.0;
        this.y = y||0.0;
        this.z = z||0.0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
    },
    update: function(elapsedTime){
    },
    render: function(ctx,cvs,elapsedTime){
    }
});

})();