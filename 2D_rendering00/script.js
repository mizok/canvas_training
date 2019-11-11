document.addEventListener('DOMContentLoaded',function(){
    readyFunc();
    resizeinit();
});

function readyFunc(ff){
    var canvas = document.getElementById('canvas');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.setAttribute('width',width);
    canvas.setAttribute('height',height);
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        var ctx1 = canvas.getContext('2d');
        var isDrawing = false;
        canvas.addEventListener("mousedown",function(e){
            isDrawing = true;
        })
        canvas.addEventListener("mouseup",function(e){
            isDrawing = false;
        })
        canvas.addEventListener("mousemove",function(e) {
            if(isDrawing){
                position = getPosition(canvas,e);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeRect(position.x,position.y,2*(width/2 - position.x), 2*(height/2 - position.y));
                console.log(width/2 - position.x);
                ctx.fillText("x: "+position.x +", y:" + position.y, 10, 10);
                drawTri();
            }
          })

          function drawTri(){
            ctx1.beginPath();
            ctx1.moveTo(75,50);
            ctx1.lineTo(100,75);
            ctx1.lineTo(100,25);
            ctx1.lineTo(75,50);
            ctx1.stroke();
            ctx1.closePath();
          }
          
          
          
          function getPosition(p,e) {
          
             var a = p.getBoundingClientRect();
             return {
               x : e.clientX - a.left,
               y : e.clientY - a.top
             };
          }
        
        // var radius = height/2;
        // ctx.clea
        // ctx.strokeStyle='#000';
        // ctx.moveTo(width/2 + radius, height/2 );
        // ctx.arc(width/2 ,height/2,radius,0,2*Math.PI,true);
        // ctx.fill();
    }
    else{
    }
}

function resizeinit(){
    var resize = debounce(readyFunc,50,false);
    window.addEventListener('resize',resize);
}

function debounce(func, wait, immediate) {
   var timeout;
   return function() {
      var context = this, args = arguments;
      var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
       var callNow = immediate && !timeout;
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
       if (callNow) func.apply(context, args);
   };
};