!(function () {
  "use strict";
  function o(t, i) {
    return null != t ? t : i;
  }
  function a(t) {
    (this.garden = t), this.reset();
  }
  var i = 1e3 / 60;
  (a.prototype.reset = function (t) {
    void 0 === t && (t = {});
    var i = t.x,
      e = t.y,
      n = t.vx,
      s = t.vy,
      h = t.m;
    (this.x = o(i, Math.random() * this.garden.width)),
      (this.y = o(e, Math.random() * this.garden.height)),
      (this.vx = o(n, 0.5 * Math.random() - 0.25)),
      (this.vy = o(s, 0.5 * Math.random() - 0.25)),
      (this.m = o(h, 2.5 * Math.random() + 0.5));
  }),
    (a.prototype.addForce = function (t, i) {
      (this.vx += (t * i.x) / this.m), (this.vy += (t * i.y) / this.m);
    }),
    (a.prototype.distanceTo = function (t) {
      var i = t.x - this.x,
        e = t.y - this.y;
      return { x: i, y: e, total: Math.sqrt(Math.pow(i, 2) + Math.pow(e, 2)) };
    }),
    (a.prototype.update = function (t) {
      (this.x += (this.vx * t) / i),
        (this.y += (this.vy * t) / i),
        (this.x > this.garden.width + 50 ||
          this.x < -50 ||
          this.y > this.garden.height + 50 ||
          this.y < -50) &&
          this.reset();
    }),
    (a.prototype.squaredDistanceTo = function (t) {
      return (t.x - this.x) * (t.x - this.x) + (t.y - this.y) * (t.y - this.y);
    }),
    (a.prototype.collideTo = function (t) {
      (t.vx =
        (t.m * t.vx) / (this.m + t.m) + (this.m * this.vx) / (this.m + t.m)),
        (t.vy =
          (t.m * t.vy) / (this.m + t.m) + (this.m * this.vy) / (this.m + t.m)),
        this.reset();
    }),
    (a.prototype.render = function () {
      this.garden.ctx.beginPath(),
        this.garden.ctx.arc(this.x, this.y, this.getDiameter(), 0, 2 * Math.PI),
        this.garden.ctx.fill();
    }),
    (a.prototype.getDiameter = function () {
      return this.m;
    });
  var r = window.devicePixelRatio;
  void 0 === r && (r = 1);
  function t(h) {
    var o = this;
    (this.nodes = []),
      (this.container = h),
      (this.canvas = document.createElement("canvas")),
      (this.ctx = this.canvas.getContext("2d")),
      (this.started = !1),
      r &&
        1 !== r &&
        ((this.canvas.style.transform = "scale(" + 1 / r + ")"),
        (this.canvas.style.transformOrigin = "0 0")),
      (this.canvas.id = "nodegarden"),
      window.addEventListener("mousedown", function (t) {
        t.preventDefault();
        var i = h.getBoundingClientRect(),
          e = window.scrollX,
          n = window.scrollY,
          s = new a(o);
        (s.x = (t.pageX - e - i.left) * r),
          (s.y = (t.pageY - n - i.top) * r),
          (s.m = 15),
          (s.update = function () {}),
          (s.reset = function () {}),
          (s.render = function () {}),
          o.nodes.unshift(s),
          window.addEventListener("mousemove", function (t) {
            (s.x = (t.pageX - e - i.left) * r),
              (s.y = (t.pageY - n - i.top) * r);
          }),
          window.addEventListener("mouseup", function (t) {
            for (var i = 0; i < o.nodes.length; i++)
              if (o.nodes[i] === s) {
                o.nodes.splice(i--, 1);
                break;
              }
          });
      }),
      this.container.appendChild(this.canvas),
      this.resize();
  }
  var p = window.requestAnimationFrame;
  (t.prototype.start = function () {
    this.playing || ((this.playing = !0), this.render(!0));
  }),
    (t.prototype.stop = function () {
      this.playing && (this.playing = !1);
    }),
    (t.prototype.resize = function () {
      (this.width = this.container.clientWidth * r),
        (this.height = this.container.clientHeight * r),
        (this.area = this.width * this.height),
        (this.nodes.length = (Math.sqrt(this.area) / 25) | 0),
        (this.canvas.width = this.width),
        (this.canvas.height = this.height),
        (this.ctx.fillStyle = "#DBD1EA");
      for (var t = 0; t < this.nodes.length; t++)
        this.nodes[t] || (this.nodes[t] = new a(this));
    }),
    (t.prototype.render = function (t, i) {
      var e = this;
      if (this.playing) {
        t &&
          p(function (t) {
            e.render(!0, t);
          });
        var n = i - (this.lastTime || i);
        (this.lastTime = i), this.ctx.clearRect(0, 0, this.width, this.height);
        for (var s = 0; s < this.nodes.length - 1; s++)
          for (var h = this.nodes[s], o = s + 1; o < this.nodes.length; o++) {
            var a,
              r,
              d = this.nodes[o],
              c = h.squaredDistanceTo(d),
              l = (h.m * d.m * 3) / c,
              v = 100 * l;
            v < 0.025 ||
              (c <= (h.m / 2 + d.m / 2) * (h.m / 2 + d.m / 2)
                ? h.m <= d.m
                  ? h.collideTo(d)
                  : d.collideTo(h)
                : ((r = {
                    x: (a = h.distanceTo(d)).x / a.total,
                    y: a.y / a.total,
                  }),
                  this.ctx.beginPath(),
                  (this.ctx.strokeStyle =
                    "rgba(219,209,234," + (v < 1 ? v : 1) + ")"),
                  this.ctx.moveTo(h.x, h.y),
                  this.ctx.lineTo(d.x, d.y),
                  this.ctx.stroke(),
                  h.addForce(l, r),
                  d.addForce(-l, r)));
          }
        for (var y = 0; y < this.nodes.length; y++)
          this.nodes[y].render(), this.nodes[y].update(n || 0);
      }
    });
  var s = window.devicePixelRatio,
    h = document.getElementById("nodegarden-container"),
    d = new t(h);
  d.start();
  var c = 0;
  h.addEventListener("click", function (t) {
    var i = h.getBoundingClientRect(),
      e = window.scrollX,
      n = window.scrollY;
    ++c > d.nodes.length - 1 && (c = 1),
      d.nodes[c].reset({
        x: (t.pageX - e - i.left) * s,
        y: (t.pageY - n - i.top) * s,
        vx: 0,
        vy: 0,
      });
  }),
    window.addEventListener("resize", function () {
      d.resize();
    });
})();
