"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _x = {
  x: 1
};
x = _x.x;

var RippleScreen = /*#__PURE__*/function () {
  function RippleScreen(ele) // 波紋透明度
  {
    var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var maxBorder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
    var lineColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'white';
    var fillColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'rgba(255,255,255,.25)';
    var fadeInSpan = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 500;
    var lifeSpan = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 5000;
    var maxSize = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 750;
    var minRate = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0.5;
    var randomFill = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
    var radiusMetaRate = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 10;
    var speedMetaRate = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0.5;
    var globalAlpha = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0.35;

    _classCallCheck(this, RippleScreen);

    this.ele = ele;
    this.points = points;
    this.maxBorder = maxBorder;
    this.lineColor = lineColor;
    this.fillColor = fillColor;
    this.fadeInSpan = fadeInSpan;
    this.lifeSpan = lifeSpan;
    this.maxSize = maxSize;
    this.minRate = minRate;
    this.randomFill = randomFill;
    this.radiusMetaRate = radiusMetaRate;
    this.speedMetaRate = speedMetaRate;
    this.globalAlpha = globalAlpha;
    this.pool = [];
    this.init();
  }

  _createClass(RippleScreen, [{
    key: "init",
    value: function init() {
      var space = document.createElement('canvas');
      this.ele.appendChild(space);
      this.canvasWidth = this.ele.getBoundingClientRect().width;
      this.canvasHeight = this.ele.getBoundingClientRect().height;
      this.space = this.ele.querySelectorAll('canvas')[0];
      this.ctx = this.space.getContext('2d');
      this.size();
      var $this = this;
      window.addEventListener('resize', $this.debounce(function () {
        $this.size();
        $this.drawAll();
      }, 200));

      for (var i = 0; i < $this.points; i++) {
        var isFill = i % 2 === 0 && $this.randomFill;
        var newPulse = $this.createPulse(isFill, this.radiusMetaRate, this.speedMetaRate);
        $this.pool.push(newPulse);
      }

      this.drawAll();
    }
  }, {
    key: "drawAll",
    value: function drawAll() {
      var _this = this;

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.pool.forEach(function (ele) {
        ele.draw();
      });
      cancelAnimationFrame(this.loop);
      this.loop = window.requestAnimationFrame(function () {
        _this.pulseMeta();

        _this.drawAll();
      });
    }
  }, {
    key: "pulseMeta",
    value: function pulseMeta() {
      var _this2 = this;

      this.pool.forEach(function (ele, i) {
        ele.radius += .5;
        ele.center.x += ele.speedX;
        ele.center.y += ele.speedY;

        if (ele.life <= _this2.fadeInSpan / 16) {
          ele.opacity += _this2.globalAlpha / (_this2.fadeInSpan / 16);
          ele.life += 1;
        } else {
          if (ele.opacity < 0) {
            var isFill = i % 2 === 0 && _this2.randomFill;

            var newPulse = _this2.createPulse(isFill, _this2.radiusMetaRate, _this2.speedMetaRate);

            _this2.pool[i] = newPulse;
          } else {
            ele.opacity -= _this2.globalAlpha * 16 / _this2.lifeSpan;
          }
        }
      });
    }
  }, {
    key: "createPulse",
    value: function createPulse(isFill, radiusMetaRate, speedMetaRate) {
      var $this = this;
      var pulse = {
        center: {
          x: $this.canvasWidth * Math.random(),
          y: $this.canvasHeight * Math.random()
        },
        speedX: (Math.random() > 0.5 ? 1 : -1) * Math.random() * speedMetaRate,
        speedY: (Math.random() > 0.5 ? 1 : -1) * Math.random() * speedMetaRate,
        radiusMeta: (Math.random() > 0.5 ? 1 : -1) * radiusMetaRate * Math.random(),
        borderWidth: $this.maxBorder * Math.random(),
        lifeSpan: $this.lifeSpan,
        life: 0,
        opacity: 0,
        radius: $this.maxSize * (Math.random() > $this.minRate ? Math.random() : $this.minRate) / 2,
        draw: function draw() {
          $this.ctx.beginPath();
          $this.ctx.lineWidth = this.borderWidth;
          $this.ctx.strokeStyle = $this.lineColor;
          $this.ctx.fillStyle = $this.fillColor;
          $this.ctx.globalAlpha = this.opacity;
          $this.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);

          if (isFill) {
            $this.ctx.fill();
          } else {
            $this.ctx.stroke();
          }

          $this.ctx.closePath();
        }
      };
      return pulse;
    }
  }, {
    key: "size",
    value: function size() {
      var eleWidth = this.ele.getBoundingClientRect().width;
      var eleHeight = this.ele.getBoundingClientRect().height;

      if (this.space.width !== eleWidth || this.space.width !== eleHeight) {
        this.canvasWidth = this.ele.getBoundingClientRect().width;
        this.canvasHeight = this.ele.getBoundingClientRect().height;
        this.space.width = this.canvasWidth;
        this.space.height = this.canvasHeight;
      }
    }
  }, {
    key: "debounce",
    value: function debounce(func, delay) {
      var _arguments = arguments;
      var timer = null;
      var $this = this;
      return function () {
        var context = $this;
        var args = _arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      };
    }
  }]);

  return RippleScreen;
}();

var space = document.getElementById('space');
var fx = new RippleScreen(space);