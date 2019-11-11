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
}