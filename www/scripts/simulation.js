(function(){

jo.Simulation = Class.extend({
    init: function(){
        this.entities = [];
        this.timeElapsed = 0.0;
    },
    update: function(elapsedTime){
        for(var i=0; i<this.entities.length;i++){
            this.entities[i].update(elapsedTime);
        }
    },
    render: function(ctx,cvs,elapsedTime){
        for(var i=0; i<this.entities.length;i++){
            this.entities[i].render(ctx,cvs,elapsedTime);
        }
    },
    addEntity: function(e){
        this.entities.push(e);
    }
});

})();