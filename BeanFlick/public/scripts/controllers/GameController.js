App.controller('GameController', function ($scope, ImageService, CalculatorService, DrawService, CanvasFactory, InteractionFactory, ImageFactory, GameService, ScoreService, GlobalSettingsFactory) {
    
    $scope.dragAllowed = false;
    $scope.interactionAllowed = true;
    
    $scope.downInteraction = function ($event) {
        
        var x = $event.type === "touchstart" ? $event.originalEvent.touches[0].pageX : $event.pageX;
        var y = $event.type === "touchstart" ? $event.originalEvent.touches[0].pageY : $event.pageY;
        var xTollerance = $event.type=== "touchstart" ? ImageFactory.throwable.centerX + 50 : ImageFactory.throwable.centerX;
        var yTollerance = $event.type=== "touchstart" ? ImageFactory.throwable.centerY + 50 : ImageFactory.throwable.centerY;
        

        if (x < InteractionFactory.x + xTollerance
                && x > InteractionFactory.x - xTollerance
                && y < InteractionFactory.y + yTollerance
                && y > InteractionFactory.y - yTollerance 
                && $scope.interactionAllowed) {
            
            $scope.dragAllowed = true;
            
            InteractionFactory.downData = {
                x: x,
                y: y,
                time: Date.now()
            }

        }

    };
    
    $scope.moveInteraction = function ($event) {
        
        var x = $event.type === "touchmove" ? $event.originalEvent.touches[0].pageX : $event.pageX;
        var y = $event.type === "touchmove" ? $event.originalEvent.touches[0].pageY : $event.pageY;

        if ($scope.dragAllowed && $scope.interactionAllowed) {
            CalculatorService.moveBuffer(x, y);

            if (y < CanvasFactory.height - GlobalSettingsFactory.throwAreaHeight) {
                $scope.launch(x, y);
            } else {
                InteractionFactory.x = x;
                InteractionFactory.y = y;
            }
        }
    }
    
    $scope.upInteraction = function ($event) {
        if ($scope.interactionAllowed && $scope.dragAllowed) {
            $scope.dragAllowed = false;
        }
    }
    
    $scope.launch = function (x, y) {

        if ($scope.interactionAllowed && $scope.dragAllowed) {
            $scope.dragAllowed = false;
            $scope.interactionAllowed = false;
            
            InteractionFactory.upData = {
                x: x,
                y: y,
                time: Date.now()
            }
            
            InteractionFactory.movementData = CalculatorService.movementData();
            
            DrawService.movement().then(function (promise) {
                if (promise.scored) {
                    ScoreService.scored();
                }
                
                if (!promise.scored) {
                    ScoreService.notScored();
                }
                
                $scope.interactionAllowed = true;
            })
        }
    }
        

});