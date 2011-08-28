(function(){

module.exports = Simulation = Class.extend({
    init: function(){
        this.entities = [];
        this.timeElapsed = 0.0;
    },
    update: function(elapsedTime){
        for ( var id in this.index ) {
        //for(var i=0; i<this.entities.length;i++){
            this.index[id].update(elapsedTime);
        }
    },
    removeEntity: function(id) {
        for(var i=0; i<this.entities.length; i++){
            if (!this.entities[i]) continue;
            if (this.entities[i].id === id) {
                this.entities[i] = null;
            }
        }
        delete this.index[id];
    },
    addEntity: function( e, id ) {
        this.entities.push(e);
        this.index[id] = e;
    },

    index  : {},
    lookup : function(id) { return this.index[id] }
});

})();
