(function() {
  var COLORS, Confetti, NUM_CONFETTI, canvas, confetti, context, drawCircle, duration, i, progress, range, resizeWindow, xpos;

  NUM_CONFETTI = 500;

  COLORS = ['#20b6d4', '#1579fb', '#00ebeb', '#E5BB00'];

  duration = 0;

  progress = 1000;

  canvas = document.getElementById("confetti");

  context = canvas.getContext("2d");

  

  window.w = window.innerWidth;

  window.h = window.innerHeight;



  resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    return setTimeout(resizeWindow, 0);
  };

  range = function(a, b) {
    return (b - a) * Math.random() + a;
  };

  drawCircle = function(x, y, width, height, style, deg) {
    var rotDeg;
    rotDeg = deg * Math.PI / 180;
    context.beginPath();
    context.save();
    context.translate(x + width, y + height);
    context.rotate(rotDeg);
    context.fillStyle = style;
    context.fillRect(-width, -height, width, height);
    return context.restore();
  };

  xpos = 0.8;

  document.onmousemove = function(e) {
    return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 20);
    };
  })();

  Confetti = (function() {
    function Confetti() {
      this.style = COLORS[~~range(0, 4)];
      this.deg = range(10, 120);
      this.r = ~~range(4, 10);
      this.width = innerWidth / 40;
      this.height = innerWidth / 120;
      this.replace();
    }

    Confetti.prototype.replace = function() {
      this.opacity = 0;
      this.dop = 1;
      this.x = range(0, w - this.width);
      this.y = range(-(h - this.width), -this.width);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = 0;
      return this.vy = 1.1 * this.r + range(-1, 1);
    };

    Confetti.prototype.draw = function() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.width, this.height, this.style, this.deg);
    };

    return Confetti;

  })();

  confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      results.push(new Confetti);
    }
    return results;
  })();

  window.step = function() {
    var c, j, len;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      c.draw();
    }
    return progress -= 120;
  };

  step();

}).call(this);
  window.setTimeout(function(){
    knowledgePage.style.display = "block";
    confettiPage.style.display= "none";
}, 4500);

