module.exports = {
    list : {},
    bind : function( name, fun ) {
        (event.list[name] = event.list[name] || []).push(fun)
    },
    fire : function( name, data ) {
        (event.list[name] || []).forEach(function(fun) { fun(data) })
    }
};
