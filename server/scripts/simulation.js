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
    removeEntity: function(id) {
        
    },
    addEntity: function( e, id ) {
        this.entities.push(e);
        this.index[id] = e;
    },

    index  : {},
    lookup : function(id) { return this.index[id] }
});

})();
