﻿// returns a new image to be drawn to the canvas

App.service('ImageService', function ($q, CalculatorService, ImageFactory, DrawService, GlobalSettingsFactory, CanvasFactory) {
    
    var imagePaths = {
        launcherOne: "/images/launcherOne.png",
        launcherTwo: "/images/launcherTwo.png",
        launcherThree: "/images/launcherThree.png",
        launcherFour: "/images/launcherFour.png",
        
        throwableOne: "/images/throwableOne.png",
        throwableTwo: "/images/throwableTwo.png",
        throwableThree: "/images/throwableThree.png",
        throwableFour: "/images/throwableFour.png"
    }
    
    this.getImages = function ($images) {
        
        var promises = [];
        var $this = this;
        
        function loadImage(imageData) {
            return $q(function (resolve, reject) {
                var image = new Image();
                image.src = imageData[0];
                image.onload = function () {
                    var resizedThrowable = CalculatorService.sizeImage(image, GlobalSettingsFactory.throwableImageWidth);
                    var resizedFace = CalculatorService.sizeImage(image, GlobalSettingsFactory.faceImageWidth);
                    
                    var type = imageData[1];
                    
                    var height = image.height;
                    var width = image.width;
                    var centerX = width / 2;
                    var centerY = height / 2;
                    
                    if (type === "throwable") {
                        height = resizedThrowable.height;
                        width = resizedThrowable.width;
                        centerX = resizedThrowable.width / 2;
                        centerY = resizedThrowable.height / 2;
                    }
                    
                    if (type === "face") {
                        height = resizedFace.height;
                        width = resizedFace.width;
                        centerX = resizedFace.width / 2;
                        centerY = resizedFace.height / 2;
                    }
                    
                    resolve({
                        image: image,
                        type: imageData[1],
                        width: width,
                        height: height,
                        centerX: centerX,
                        centerY: centerY
                    })
                }
            })
        }
        
        $images.forEach(function (image) {
            promises.push(loadImage(image));
        })
        
        $q.all(promises).then(function (images) {
            
            for (var i = 0; i < images.length; i++) {
                var type = images[i].type;
                ImageFactory[type] = images[i]
            }
            
            $this.positionImage();
            DrawService.draw()
        })

    }

    this.positionImage = function () {
        GlobalSettingsFactory.mouthLargestY = GlobalSettingsFactory.mouthData.mouthLeft.y > GlobalSettingsFactory.mouthData.mouthRight.y ? GlobalSettingsFactory.mouthData.mouthLeft.y : GlobalSettingsFactory.mouthData.mouthRight.y;
        GlobalSettingsFactory.mouthSmallestY = GlobalSettingsFactory.mouthData.mouthLeft.y < GlobalSettingsFactory.mouthData.mouthRight.y ? GlobalSettingsFactory.mouthData.mouthLeft.y : GlobalSettingsFactory.mouthData.mouthRight.y;
        ImageFactory.face.shiftX = (CanvasFactory.width - ImageFactory.face.width) / 2;
        ImageFactory.face.positionY = 0;
        
        if (CanvasFactory.height - GlobalSettingsFactory.throwAreaHeight < GlobalSettingsFactory.mouthLargestY + 500) {
            ImageFactory.face.positionY = -GlobalSettingsFactory.mouthLargestY + 200;
        }

    }

})