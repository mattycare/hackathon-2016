App.service("CalculatorService",function(t,e,a){var n=[],i=[];this.friction=function(){var a=t.movementData.speedY,n=t.movementData.speedX,i=e.friction,h=!1,o=!1;return a>0&&(a-i>0?t.movementData.speedY-=i:h=!0),0>a&&(0>a+i?t.movementData.speedY+=i:h=!0),n>0&&(n-i>0?t.movementData.speedX-=i:o=!0),0>n&&(0>n+i?t.movementData.speedX+=i:o=!0),h&&o},this.movementData=function(){var e=t.downData,a=t.upData,n=e.y-a.y,i=a.x-e.x,h=a.time-e.time,o=h/1e3;return{clickLength:h,distanceX:i,distanceY:n,distanceXY:Math.sqrt(Math.pow(i,2)+Math.pow(n,2)),speedX:i/o,speedY:n/o,speedXY:Math.sqrt(Math.pow(i,2)+Math.pow(n,2))/o,raidanDirection:Math.atan2(n,-i),degreeDirection:180*Math.atan2(n,-i)/Math.PI}},this.scored=function(){return t.x>e.mouthData.mouthLeft.x&&t.x<e.mouthData.mouthRight.x&&t.y<e.mouthData.mouthRight.y&&t.mouthOpening>=a.throwable.height?!0:void 0},this.sizeImage=function(t){var a=e.throwableSize.width,n=t.width/a;return{width:a,height:t.height/n}},this.moveBuffer=function(e){n.push(e.pageX),i.push(e.pageY),i.length>=20&&(i[0]-i[i.length-1]<-20&&(t.downData.y=e.pageY,t.downData.time=Date.now()),i.length>=20)}});