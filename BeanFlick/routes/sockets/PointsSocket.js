﻿var userGameService = require('../../Services/UserGameService');
var gameService = require('../../Services/GameService');

var pointsSocket = function (server) {

    var totalPointClients = [];

    var io = require('socket.io')(server);

    var pointIo = io
        .of('points')
        .on('connection', function (socket) {

        socket.on('interaction', function(request) {

            userGameService.update(request._id, request.action).then(function(userGame) {

                socket.emit('update', userGame);

                // Trigger an update of the total point to all sockets
                gameService.sumLaunches().then(function(count) {
                    
                    io.of('/total-points').emit('update', count);
                });
            });

        });
    });

    var totalPointIo = io
        .of('/total-points')
        .on('connection', function (socket) {

    });

}

module.exports = pointsSocket;