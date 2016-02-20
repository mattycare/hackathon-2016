﻿App.controller('GameController', ['$scope', 'ImageService', 'CalculatorService', 'DrawService', 'CanvasFactory', 'InteractionFactory', 'ImageFactory',
    function ($scope, ImageService, CalculatorService, DrawService, CanvasFactory, InteractionFactory, ImageFactory) {
        
        $scope.dragAllowed = false;
        $scope.interactionAllowed = true;
        
        $scope.image = ImageService.getImage("throwableOne", "throwable");
        $scope.image.then(function (image) {
            ImageFactory[image.type] = image;
            DrawService.draw(image)
        })
        
        $scope.downInteraction = function ($event) {
            
            if ($event.pageX < InteractionFactory.x + ImageFactory.throwable.centerX + CanvasFactory.offsetLeft 
                && $event.pageX > InteractionFactory.x - ImageFactory.throwable.centerX + CanvasFactory.offsetLeft 
                && $event.pageY < InteractionFactory.y + ImageFactory.throwable.centerY + CanvasFactory.offsetTop 
                && $event.pageY > InteractionFactory.y - ImageFactory.throwable.centerY + CanvasFactory.offsetTop 
                && $scope.interactionAllowed) {
                
                $scope.dragAllowed = true;
                
                InteractionFactory.downData = {
                    x: $event.pageX - CanvasFactory.canvasElement.offsetLeft,
                    y: $event.pageY - CanvasFactory.canvasElement.offsetTop,
                    time: Date.now()
                }

            }

        };
        
        $scope.moveInteraction = function ($event) {
            if ($scope.dragAllowed && $scope.interactionAllowed) {
                InteractionFactory.x = $event.pageX - CanvasFactory.offsetLeft;
                InteractionFactory.y = $event.pageY - CanvasFactory.offsetTop;
            }
        }
        
        $scope.upInteraction = function ($event) {
            if ($scope.interactionAllowed) {
                $scope.dragAllowed = false;
                $scope.interactionAllowed = false;
                
                InteractionFactory.upData = {
                    x: $event.pageX - CanvasFactory.canvasElement.offsetLeft,
                    y: $event.pageY - CanvasFactory.canvasElement.offsetTop,
                    time: Date.now()
                }
                
                InteractionFactory.movementData = CalculatorService.movementData();
                
                DrawService.movement().then(function () {
                    $scope.interactionAllowed = true;
                })
            }
        }
        

    }]);