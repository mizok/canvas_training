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
function draw(){
    var canvas = document.getElementById('canvas');
    var canvasObj = {
        ctx: canvas.getContext('2d'),
        canvasInit :function(){
            var _this=this; 
            var bootFunc = function(){
                _this.func.sizeCanvas();
                _this.func.createBallsData();
                _this.func.setballPhysics();
                // _this.func.injectMouseData(); 未完成
            }
            bootFunc();
            var resizeFunc = function(){
                _this.func.sizeCanvas();
            }
            window.addEventListener('resize',debounce(resizeFunc,250));
        },
        data:{
            ballarray:[],
            ballnum:100,
            mouseData:{}
        },
        func:{
            getParent:function(){
                return canvasObj;
            },
            sizeCanvas:function(){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            },
            injectMouseData: function(){

                window.addEventListener('mousedown',function(e){
                    canvasObj.data.mouseData.x = e.clientX;
                    canvasObj.data.mouseData.y = e.clientY;
                })
                window.addEventListener('mouseup',function(e){
                    canvasObj.data.mouseData.x = null;
                    canvasObj.data.mouseData.y = null;
                })

            },
            createABall: function(){
                var ctx = canvasObj.ctx;
                var ball = {
                    style:{
                        location:{
                            x: window.getShadowNull().width*Math.random(),
                            y: window.getShadowNull().height*Math.random()
                        },
                        lineWidth:.5,
                        lineColor:"#999999",
                        radius:10
                    },
                    physics:{
                        speedX:5*Math.random() * (Math.floor(Math.random()*2) == 1 ? 1 : -1),
                        speedY:5*Math.random() * (Math.floor(Math.random()*2) == 1 ? 1 : -1)
                    },
                    draw:function(){
                        ctx.beginPath();
                        ctx.lineWidth = this.style.lineWidth;
                        ctx.strokeStyle=this.style.lineColor;
                        ctx.arc(
                            this.style.location.x,
                            this.style.location.y,
                            this.style.radius,
                            0,
                            Math.PI*2,
                            true
                            );
                        ctx.stroke();
                        ctx.save();
                        ctx.closePath();
                    }
                }
                return ball;
            },
            createBallsData:function(){
                var num =  canvasObj.data.ballnum;
                for(var i=0; i<num;i++){
                    canvasObj.data.ballarray[i] = this.createABall();
                    canvasObj.data.ballarray[i].draw();
                }
                

            },
            setballPhysics:function(){
                // canvasObj.ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvasObj.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                canvasObj.ctx.fillRect(0, 0, canvas.width, canvas.height);
                var num =  canvasObj.data.ballnum;
                for(var j=0; j<num;j++){
                    var speedX= canvasObj.data.ballarray[j].physics.speedX;
                    var speedY= canvasObj.data.ballarray[j].physics.speedY;
                    var newLocX = canvasObj.data.ballarray[j].style.location.x+speedX;
                    var newLocY = canvasObj.data.ballarray[j].style.location.y+speedY;
                    
                    if(Math.abs(newLocX-canvasObj.data.mouseData.x)<300){
                        canvasObj.data.ballarray[j].physics.speedX = -speedX*1.000;
                    }
                    if(Math.abs(newLocY-canvasObj.data.mouseData.y)<300){
                        canvasObj.data.ballarray[j].physics.speedY = -speedY*1.000;
                    }
                    if(newLocX>getShadowNull().width||newLocX<0){
                        canvasObj.data.ballarray[j].physics.speedX = -speedX;
                    }
                    if(newLocY>getShadowNull().height||newLocY<0){
                        canvasObj.data.ballarray[j].physics.speedY = -speedY;
                    }
                    

                    canvasObj.data.ballarray[j].style.location.x += canvasObj.data.ballarray[j].physics.speedX;
                    canvasObj.data.ballarray[j].style.location.y += canvasObj.data.ballarray[j].physics.speedY;
                    canvasObj.data.ballarray[j].draw();
                }
                
                window.requestAnimationFrame(canvasObj.func.setballPhysics)
            }
        }
    }
    if (canvas) {
        canvasObj.canvasInit();
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