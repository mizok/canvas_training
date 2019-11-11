window.addEventListener('DOMContentLoaded', function() {
    getShadowNull();
    initFunc();
})

function initFunc(){
    draw();
}

function getShadowNull(){
    var shadowExist = document.getElementById('shadow-null');
    if(!shadowExist){
        var shadowNull= document.createElement('div');
        shadowNull.id='shadow-null';
        shadowNull.setAttribute('style',
            'position:fixed;'+
            'z-index:-99999999999999999999999999999999999999999;'+
            'pointer-events:none;'+
            'width:100%;'+
            'height:100%;'+
            'top:0;'+
            'left:0;'
        )
        document.body.appendChild(shadowNull);
    }
    else{
        var shadowNullData = {
            width:shadowExist.getBoundingClientRect().width,
            height:shadowExist.getBoundingClientRect().height
        }
        return shadowNullData;
    }
    
}

function debounce(func, delay) {
    var timer = null;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args)
      }, delay);
    }
  }


function draw(){
    var canvas = document.getElementById('canvas');
    if(canvas&&canvas.getContext){
        var canvasObj = {
            ctx:canvas.getContext('2d'),
            data:{
                pointData:[],
                isDrawing:false,
                brushStyle:{
                    color:"rgba(0,0,0,.5)",
                    radius:10,
                }
            },
            func:{
                canvasInit :function(){
                    var _this=this; 
                    var bootFunc = function(){
                        _this.sizeCanvas();
                        _this.brush()
                    }
                    bootFunc();
                    var resizeFunc = function(){
                        _this.sizeCanvas();
                    }
                    window.addEventListener('resize',debounce(resizeFunc,250));
                },
                sizeCanvas:function(){
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                },
                brush:function(){
                    window.addEventListener('mousedown',function(e){
                        canvasObj.data.isDrawing = true;
                        canvasObj.ctx.beginPath();
                        canvasObj.ctx.lineCap='round';
                        canvasObj.ctx.lineJoin='round';
                        canvasObj.ctx.lineWidth=canvasObj.data.brushStyle.radius;
                        canvasObj.ctx.strokeStyle = canvasObj.data.brushStyle.color;
                        canvasObj.ctx.shadowBlur = 10;
                        canvasObj.ctx.shadowColor = canvasObj.data.brushStyle.color;
                    })
                    window.addEventListener('mouseup',function(){
                        canvasObj.data.isDrawing = false;
                    })
                    window.addEventListener('mousemove',function(e){
                        if(canvasObj.data.isDrawing){
                            canvasObj.ctx.lineTo(e.clientX,e.clientY);
                            canvasObj.ctx.stroke();
                        }
                    })
                }
            }
        }
        canvasObj.func.canvasInit();
    }
}