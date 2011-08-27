(function(){

var cvs = document.getElementById('app-canvas'),
    ctx = cvs.getContext('2d'),
    width = 800,
    height = 600;
    
cvs.style.width = width+"px";
cvs.style.height = height+"px";

cvs.width=width;
cvs.height=height;

ctx.fillStyle="rgba(0,0,0,1)";
ctx.fillRect(0,0,width,height);


    
})();