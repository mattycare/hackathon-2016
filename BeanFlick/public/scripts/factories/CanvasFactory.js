App.factory('CanvasFactory', function () {
    
    var canvasElement = document.getElementById('canvas');
    var canvasContext = canvasElement.getContext("2d");
    
    canvasElement.height = $(window).height();

    var height = canvasElement.height;
    var width = 900;
    
    return {
        canvasElement: canvasElement,
        canvasContext: canvasContext,
        height: height,
        width: width
    }
})