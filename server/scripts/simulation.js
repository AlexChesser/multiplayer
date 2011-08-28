(function(){

module.exports = Simulation = Class.extend({
    init: function(){
        this.entities = [];
        this.timeElapsed = 0.0;
    },
    update: function(elapsedTime){
        for(var i=0; i<this.entities.length;i++){
            this.entities[i].update(elapsedTime);
        }
    },
    addEntity: function(e){
        this.entities.push(e);
    }
});

})();