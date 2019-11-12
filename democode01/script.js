window.addEventListener('DOMContentLoaded',function(){
    init();
})

function init(){
    
    var canvas = document.getElementById('canvas');
    if(canvas.getContext('2d')){
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle="brown";
        ctx.lineWidth=30;
        ctx.arc(100,100,50,0,Math.PI*2,true);
        ctx.arc(500,500,50,0,Math.PI*2,true);
        ctx.arc(300,500,1,0,Math.PI*2,true);
        ctx.arc(100,100,50,0,Math.PI*2,true);
        ctx.stroke();
        ctx.fill();
    }
    
}