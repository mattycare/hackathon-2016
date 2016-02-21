﻿App.controller('ConfigurationController', function ($scope, GameDataService, UserGameDataService, CurrentGameFactory, GameService) {
    
    $scope.startGame = function(gameId) {

        UserGameDataService.start(gameId).then(function(gameContext) {

            CurrentGameFactory.userGame = gameContext.userGame;
            CurrentGameFactory.game = gameContext.game;

            GameService.startGame();
            
            if (history.pushState) {

                history.pushState(null, null, '/' + gameContext.game.UrlCode);
            }
        });
    }
     
    
    // Attempt to auto-start
    var urlCode = location.pathname.replace(/^\//, '');
    
    if (urlCode.length > 0 && /^[a-z\-]*$/.test(urlCode)) {
        
        // Lookup the Url
        GameDataService.getByUrl(urlCode).then(function (game) {
            
            if (game != null) {

                $scope.startGame(game._id);
            }
        });
    }   
});