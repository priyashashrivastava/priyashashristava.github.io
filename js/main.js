/*
Theme Name: SLAMR
Author: CREATEBRILLIANCE - Media & Consulting
Author URI: http://www.createbrilliance.com
Version: 1.1
*/

var SLAMR;

(function ($) {
  "use strict";

  SLAMR = window.SLAMR || {};

  /****************************************************************************************************
   * NAV
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.nav = function (options) {
    // add class after scrolling
    //don't do this on small devices

    $(window).resize(function () {
      scrollEffect();
    });

    function scrollEffect() {
      if (!($(window).width() > 768)) {
        if (!$(".navbar-fixed-top").hasClass("top-nav-collapse")) {
          $(".navbar-fixed-top").addClass("top-nav-collapse");
        }
      } else {
        if ($(".navbar-fixed-top").hasClass("top-nav-collapse")) {
          $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
      }

      $(window).scroll(function () {
        if ($(window).width() > 768) {
          if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
        } else {
          $(".navbar-fixed-top").addClass("top-nav-collapse");
        }
      });
    }

    scrollEffect();

    if (options == "dropdown") {
      $(".navbar-nav .dropdown").onePageNav({
        currentClass: "active-sub",
        changeHash: true,
        scrollSpeed: 750,
        scrollOffset: 0,
        scrollThreshold: 0.5,
        easing: "easeOutExpo",
        filter: ":not(.ex)",
      });
    } else {
      $(".navbar-nav").onePageNav({
        currentClass: "active",
        changeHash: false,
        scrollSpeed: 750,
        scrollOffset: 0,
        scrollThreshold: 0.5,
        easing: "easeOutExpo",
        filter: ":not(.ex)",
      });
    }
  };
  /****************************************************************************************************
   * SLIDE DOWN HEAD
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.slideDownHead = function (option) {
    if (option) {
      $(document).ready(function () {
        $(".pageHead").css({
          top: "-500px",
          opacity: "0",
        });
        $(".pageHead .hero h1, .pageHead .hero h3").css({
          opacity: "0",
        });
      });
      $(window).load(function () {
        $(".pageHead")
          .stop(true, true)
          .delay(500)
          .animate(
            { top: "0px", opacity: "1" },
            500,
            "easeOutCubic",
            function () {
              $(".pageHead .hero h1").animate(
                { opacity: "1" },
                500,
                function () {
                  $(".pageHead .hero h3").animate({ opacity: "1" }, 300);
                }
              );
            }
          );
      });
    }
  };
  /****************************************************************************************************
   * PARALLAX
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.parallax = function (option) {
    if (option) {
      if (!Modernizr.touch) {
        var s = skrollr.init({
          mobileDeceleration: 1,
          constants: {},
          edgeStrategy: "set",
          forceHeight: false,
          smoothScrolling: true,
          easing: {
            WTF: Math.random,
            inverted: function (p) {
              return 1 - p;
            },
          },
        });
      }
    }
  };
  /****************************************************************************************************
   * PRELOADER
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.preloader = function () {
    $(window).load(function () {
      $("#preloader").fadeOut(800, function () {
        $("body").css("overflow", "visible");
        SLAMR.setUpNodeGarden();
      });
      SLAMR.setUpTyped();
    });
  };

  SLAMR.setUpTyped = function () {
    var typed = new Typed("#typed", {
      strings: [
		'I design your custom marketing strategy.',
		'I handle your digital communication.',
		'I manage your digital project.'
      ],
      loop: true,
      smartBackspace: true,
	  typeSpeed: 60,
	  typeDelay: 0,
	  backSpeed: 25,
	  backDelay: 60
    });
  };

  /****************************************************************************************************
   * SUPERSLIDES
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.slider = function (selector, options) {
    $(window).load(function () {
      $(selector).superslides(options);
    });
  };

  /****************************************************************************************************
   * OWL CAROUSEL
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.owlCarousel = function (options) {
    $.each(options, function (index, value) {
      if (value != null) {
        //if carousel has parameters
        $(index).owlCarousel(value);
      } else {
        //if there are no parameters
        $(index).owlCarousel();
      }
    });
  };

  /****************************************************************************************************
   * ANIMATED SKILLBAR
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.skillbar = function (animated) {
    if (animated == "animated") {
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
      ) {
        // Triggering only when it is inside viewport

        $(".skillbar").waypoint(
          function () {
            var $this = $(this);
            $this
              .find(".skillbar-bar")
              .animate({ width: $this.attr("data-percent") }, 2000);
          },
          {
            triggerOnce: true,
            offset: function () {
              return $(window).height() - $(this).outerHeight();
            },
          }
        );
      } else {
        $(".skillbar").each(function () {
          var $this = $(this);
          $this
            .find(".skillbar-bar")
            .css({ width: $this.attr("data-percent") });
        });
      }
    } else {
      //if not animated
      $(".skillbar").each(function () {
        var $this = $(this);
        $this.find(".skillbar-bar").css({ width: $this.attr("data-percent") });
      });
    }
  };

  /****************************************************************************************************
   * header carousel
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.bootstrapCarousel = function (options) {
    $.each(options, function (index, value) {
      if (value != null) {
        //if carousel has parameters
        $(index).carousel(value);
      } else {
        //if there are no parameters
        $(index).carousel();
      }
    });
  };

  /****************************************************************************************************
   * Set Up Node Garden
   *
   *
   *
   ****************************************************************************************************/

  SLAMR.setUpNodeGarden = function () {
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
        return {
          x: i,
          y: e,
          total: Math.sqrt(Math.pow(i, 2) + Math.pow(e, 2)),
        };
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
        return (
          (t.x - this.x) * (t.x - this.x) + (t.y - this.y) * (t.y - this.y)
        );
      }),
      (a.prototype.collideTo = function (t) {
        (t.vx =
          (t.m * t.vx) / (this.m + t.m) + (this.m * this.vx) / (this.m + t.m)),
          (t.vy =
            (t.m * t.vy) / (this.m + t.m) +
            (this.m * this.vy) / (this.m + t.m)),
          this.reset();
      }),
      (a.prototype.render = function () {
        this.garden.ctx.beginPath(),
          this.garden.ctx.arc(
            this.x,
            this.y,
            this.getDiameter(),
            0,
            2 * Math.PI
          ),
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
        console.log(this.container);
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
          (this.lastTime = i),
            this.ctx.clearRect(0, 0, this.width, this.height);
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
  };
  /****************************************************************************************************
   * PORTFOLIO FILTER
   *
   *
   *
   *
   ****************************************************************************************************/

  SLAMR.portfolioFilter = function (selector, item) {
    $(selector).click(function (e) {
      e.preventDefault();
      $(selector).removeClass("current");
      $(this).addClass("current");
      var filter = $(this).attr("data-group");

      if (filter != "all") {
        $(item).each(function () {
          var theItem = $(this);
          $(".portfolio-link", theItem).addClass("inactive");
          var categories = $(this).attr("data-group");
          if (typeof categories !== "undefined" && categories !== false) {
            categories = categories.split(",");
            $.each(categories, function (i, currentCat) {
              if (filter == currentCat) {
                $(".portfolio-link", theItem).removeClass("inactive");
                return;
              }
            });
          }
        });
      } else {
        $(item).each(function () {
          $(".portfolio-link", $(this)).removeClass("inactive");
        });
      }
    });

    //hover effects
    $(document).ready(function () {
      $(item).each(function () {
        $(this).hover(
          function () {
            if (!$(".portfolio-link", this).hasClass("inactive")) {
              $(".portfolio-link", this).addClass("hover");
            }
          },
          function () {
            $(".portfolio-link", this).removeClass("hover");
          }
        );
      });
    });
  };
  /****************************************************************************************************
   * PORTFOLIO
   *
   *
   *
   *
   ****************************************************************************************************/

  SLAMR.portfolio = function (selector, options) {
    $(selector).portfolioExpander(options);
  };

  /****************************************************************************************************
   *  SCROLLING ANIMATIONS
   *
   *	takes data-animation, data-animation-delay as data attributes. Element needs to have class animation
   *
   ****************************************************************************************************/

  SLAMR.scrollAnim = function (option) {
    $(window).load(function () {
      if (option == "yes") {
        //trigger css3 animations
        // Handle appear event for animated elements
        var wpOffset = 80;
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
            navigator.userAgent
          )
        ) {
          wpOffset = 100;

          $.fn.waypoint.defaults = {
            context: window,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false,
          };

          $(".animated").waypoint(
            function () {
              var elem = $(this);
              var animation = elem.data("animation");
              if (
                !elem.hasClass("visible") &&
                elem.attr("data-animation") !== undefined
              ) {
                if (elem.attr("data-animation-delay") !== undefined) {
                  var timeout = elem.data("animation-delay");
                  setTimeout(function () {
                    elem.addClass(animation + " visible");
                  }, timeout);
                } else {
                  elem.addClass(elem.data("animation") + " visible");
                }
              }
            },
            {
              offset: wpOffset + "%",
            }
          );
        } else {
          //if mobile, don't do it just display elements
          $(".animated").each(function () {
            $(this).css("visibility", "visible");
          });
        }
      } else {
        //don't trigger css3 animation, but display elements
        $(".animated").each(function () {
          $(this).css("visibility", "visible");
        });
      }
    }); //window load
  };
  /****************************************************************************************************
   * HELPER
   *
   *
   *
   ****************************************************************************************************/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    $(".background-middle-full").removeClass("fixed");
  }

  /****************************************************************************************************
   * MAGNIFIC
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.magnific = function (options) {
    $.each(options, function (index, value) {
      if (value != null) {
        //if carousel has parameters
        $(index).magnificPopup(value);
      } else {
        //if there are no parameters
        $(index).magnificPopup();
      }
    });
  };

  /****************************************************************************************************
   * CONTACT FORM
   *
   *
   *
   ****************************************************************************************************/
  SLAMR.contactForm = function () {
    $("#contact-submit").on("click touchstart", function (e) {
      e.preventDefault();
      $("#contact-submit")
        .html("<i class='fa fa-cog fa-spin'></i> SENDING")
        .prop("disabled", true);
      var $contact_form = $("#contact-form");
      var fields = $contact_form.serialize();
      $.ajax({
        type: "POST",
        url: "inc/contact.php",
        data: fields,
        dataType: "json",
        success: function (response) {
          if (response.status) {
            $("#contact-form input").val("");
            $("#contact-form textarea").val("");
          }
          $("#contact-form-response").empty().html(response.html);
          $("#contact-submit")
            .html("<i class='fa fa-check'></i> SUBMIT")
            .prop("disabled", false);
        },
      });
      return false;
    });
  };
})(jQuery);
