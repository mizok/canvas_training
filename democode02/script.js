window.addEventListener('DOMContentLoaded',function(){
    init();
})

function init(){
    
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if(canvas.getContext('2d')){
        var ctx = canvas.getContext('2d');
        var isDrawing = false;
        window.addEventListener('mousedown',function(e){
            isDrawing = true;
            ctx.moveTo(e.clientX,e.clientY);
        });
        window.addEventListener('mousemove',function(e){
            if(isDrawing){
                ctx.lineTo(e.clientX,e.clientY);
                ctx.lineCap='round';
                ctx.lineJoin='round';
                ctx.strokeStyle='brown';
                ctx.lineWidth="30";
                ctx.stroke();
            }
        });
        window.addEventListener('mouseup',function(){
            isDrawing = false;
        });
    }
    
}