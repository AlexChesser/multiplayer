
//
//  GameJS
//
var io = require('socket.io').listen(8090);

module.exports = function gamejs( game_port, socketfn ) {
    io.sockets.on('connection', function (socket) {
        socketfn(socket);
        socket.on('disconnect', function () {
            
        });
    });
};
