App.controller("ConfigurationController",function(t,e,n,a,o,l){t.startGame=function(t){a.start(t).then(function(t){o.userGame=t.userGame,o.game=t.game,l.startGame(),history.pushState&&history.pushState(null,null,"/"+t.game.UrlCode)})};var r=io("/total-points");r.on("update",function(e){$("#odometer").html(e),t.TotalLaunches=e,t.$apply()}),a.sumLaunches().then(function(t){$("#odometer").html(t)});var u=location.pathname.replace(/^\//,"");u.length>0&&/^[A-z0-9\-]*$/.test(u)&&n.getByUrl(u).then(function(e){null!=e&&t.startGame(e._id)})});