App.factory("CanvasFactory",function(){var t=document.getElementById("canvas"),e=t.getContext("2d"),n=t.offsetHeight,a=t.offsetWidth;return{canvasElement:t,canvasContext:e,height:n,width:a}});