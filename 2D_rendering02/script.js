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
                _this.func.injectMouseData(); 
            }
            bootFunc();
            var resizeFunc = function(){
                _this.func.sizeCanvas();
            }
            window.addEventListener('resize',debounce(resizeFunc,250));
        },
        data:{
            ballarray:[],
            ballnum:5,
            mouseData:{},
            repulsiveDist:100
        },
        func:{
            sizeCanvas:function(){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            },
            injectMouseData: function(){

                window.addEventListener('mousemove',function(e){
                    canvasObj.data.mouseData.x = e.clientX;
                    canvasObj.data.mouseData.y = e.clientY;
                })
                window.addEventListener('mouseleave',function(e){
                    canvasObj.data.mouseData.x = -99999999999999999999999999;
                    canvasObj.data.mouseData.y = -99999999999999999999999999;
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
                        radius:50
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
                canvasObj.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // canvasObj.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                // canvasObj.ctx.fillRect(0, 0, canvas.width, canvas.height);
                var num =  canvasObj.data.ballnum;
                for(var j=0; j<num;j++){
                    var speedX= canvasObj.data.ballarray[j].physics.speedX;
                    var speedY= canvasObj.data.ballarray[j].physics.speedY;
                    var newLocX = canvasObj.data.ballarray[j].style.location.x+speedX;
                    var newLocY = canvasObj.data.ballarray[j].style.location.y+speedY;
                    
                    // 計算滑鼠位置與該粒子的距離
                    var distX = canvasObj.data.mouseData.x - newLocX;
                    var distY = canvasObj.data.mouseData.y - newLocY;
                    var dist = Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2));
                    if(dist<=canvasObj.data.repulsiveDist+canvasObj.data.ballarray[j].style.radius+canvasObj.data.ballarray[j].style.lineWidth){
                        //滑鼠點擊與粒子碰撞
                        // 計算碰撞當下粒子跟滑鼠中心的連線(法線)和水平線的夾角
                        var angle_1 = Math.atan(distY/distX);
                        // 計算當前速度向量跟水平線的夾角
                        var angle_2 = Math.atan(speedY/speedX); 
                        // 計算反射角
                        var angle_3 = 2*angle_1-angle_2;
                        // 計算當前速度向量的純量值
                        var speed_total = Math.sqrt(Math.pow(speedX,2)+Math.pow(speedY,2));
                        // 計算新的水平向量
                        var new_speedX  = Math.cos(angle_3)*speed_total;
                        // 計算新的垂直向量
                        var new_speedY = Math.sin(angle_3)*speed_total;
                        if(canvasObj.data.ballarray[j].physics.speedX>0){
                            canvasObj.data.ballarray[j].physics.speedX = -new_speedX;
                        }
                        else{
                            canvasObj.data.ballarray[j].physics.speedX = new_speedX;
                        }
                        if(canvasObj.data.ballarray[j].physics.speedY>0){
                            canvasObj.data.ballarray[j].physics.speedY = -new_speedY;
                        }
                        else{
                            canvasObj.data.ballarray[j].physics.speedY = new_speedY;
                        }
                        
                        
                        
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
                canvasObj.ctx.beginPath();
                canvasObj.ctx.arc(canvasObj.data.mouseData.x,canvasObj.data.mouseData.y,canvasObj.data.repulsiveDist,0,Math.PI*2,true);
                canvasObj.ctx.fillStyle = "#999999";
                canvasObj.ctx.fill();
                canvasObj.ctx.restore();
                window.requestAnimationFrame(canvasObj.func.setballPhysics)
            }
        }
    }
    if (canvas) {
        canvasObj.canvasInit();
        console.log(canvasObj.data.ballarray)
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