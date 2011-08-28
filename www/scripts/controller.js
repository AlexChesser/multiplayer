(function(){

jo.Controller = Class.extend({
    init: function(_keys){
        this.keys = [];
        for(var i=0; i<_keys.length;i++){
            this.keys.push({
                keyCode: _keys[i].keyCode,
                name: _keys[i].name,
                isDown: false
            });
        }
    },
    onInput: function(evt){
        if(evt.type!="keydown"&&evt.type!="keyup")
            return false;
            
        evt.preventDefault();
            
        for(var i=0; i<this.keys.length;i++){
            if(this.keys[i].keyCode==evt.keyCode){
                this.keys[i].isDown = evt.type=="keydown";
                return {
                    event: evt.type,
                    key: this.keys[i].name
                };
            }
        }
        
        return false;
    },
    isKeyDown: function(name){
        for(var i=0; i<this.keys.length;i++){
            if(this.keys[i].name==name){
                return this.keys[i].isDown;
            }
        }
    }
});

})();