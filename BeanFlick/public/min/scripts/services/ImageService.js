App.service("ImageService",["$q",function(e){var r={launcherOne:"/images/launcherOne.png",launcherTwo:"/images/launcherTwo.png",launcherThree:"/images/launcherThree.png",launcherFour:"/images/launcherFour.png",throwableOne:"/images/throwableOne.png",throwableTwo:"/images/throwableTwo.png",throwableThree:"/images/throwableThree.png",throwableFour:"/images/throwableFour.png"};this.getImage=function(a,n){var h=new Image;h.src=r[a];var g=e.defer();return h.onload=function(){g.resolve({name:a,image:h,type:n,width:h.width,height:h.height,centerX:h.width/2,centerY:h.height/2})},g.promise}}]);