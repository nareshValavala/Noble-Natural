(function ($) {

    emailjs.init("lfemI6Mj5wYbdxLWu")
  
  document.addEventListener("DOMContentLoaded", function () {
    const articles = document.querySelectorAll(".gallery article");

    function revealOnScroll() {
      const windowHeight = window.innerHeight;
      articles.forEach((el) => {
        const position = el.getBoundingClientRect().top;
        if (position < windowHeight - 100) {
          el.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial trigger
  });

  var $window = $(window),
    $body = $("body"),
    $header = $("#header"),
    $all = $body.add($header);

  // Breakpoints
  breakpoints({
    xxlarge: ["1681px", "1920px"],
    xlarge: ["1281px", "1680px"],
    large: ["1001px", "1280px"],
    medium: ["737px", "1000px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Page load animation
  $window.on("load", function () {
    setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch mode
  if (browser.mobile) $body.addClass("is-touch");
  else {
    breakpoints.on("<=small", function () {
      $body.addClass("is-touch");
    });

    breakpoints.on(">small", function () {
      $body.removeClass("is-touch");
    });
  }

  // IE fix
  if (browser.name == "ie") {
    var $main = $(".main.fullscreen"),
      IEResizeTimeout;

    $window
      .on("resize.ie-flexbox-fix", function () {
        clearTimeout(IEResizeTimeout);
        IEResizeTimeout = setTimeout(function () {
          var wh = $window.height();
          $main.each(function () {
            var $this = $(this);
            $this.css("height", "");
            if ($this.height() <= wh)
              $this.css("height", wh - 50 + "px");
          });
        });
      })
      .triggerHandler("resize.ie-flexbox-fix");
  }

  // Gallery
  $window.on("load", function () {
    var $gallery = $(".gallery");
    $gallery.poptrox({
      baseZIndex: 10001,
      useBodyOverflow: false,
      usePopupEasyClose: false,
      overlayColor: "#1f2328",
      overlayOpacity: 0.65,
      usePopupDefaultStyling: false,
      usePopupCaption: true,
      popupLoaderText: "",
      windowMargin: 50,
      usePopupNav: true,
    });

    breakpoints.on(">small", function () {
      $gallery.each(function () {
        $(this)[0]._poptrox.windowMargin = 50;
      });
    });

    breakpoints.on("<=small", function () {
      $gallery.each(function () {
        $(this)[0]._poptrox.windowMargin = 5;
      });
    });
  });

  // Section transitions
  if (browser.canUse("transition")) {
    var on = function () {
      $(".gallery").scrollex({
        top: "30vh",
        bottom: "30vh",
        delay: 50,
        initialize: function () {
          $(this).addClass("inactive");
        },
        terminate: function () {
          $(this).removeClass("inactive");
        },
        enter: function () {
          $(this).removeClass("inactive");
        },
        leave: function () {
          $(this).addClass("inactive");
        },
      });

      $(".main.style1, .main.style2").scrollex({
        mode: "middle",
        delay: 100,
        initialize: function () {
          $(this).addClass("inactive");
        },
        terminate: function () {
          $(this).removeClass("inactive");
        },
        enter: function () {
          $(this).removeClass("inactive");
        },
        leave: function () {
          $(this).addClass("inactive");
        },
      });

      $("#contact").scrollex({
        top: "50%",
        delay: 50,
        initialize: function () {
          $(this).addClass("inactive");
        },
        terminate: function () {
          $(this).removeClass("inactive");
        },
        enter: function () {
          $(this).removeClass("inactive");
        },
        leave: function () {
          $(this).addClass("inactive");
        },
      });
    };

    var off = function () {
      $(".gallery, .main.style1, .main.style2, #contact").unscrollex();
    };

    breakpoints.on("<=small", off);
    breakpoints.on(">small", on);
  }

  // Resize handling
  var resizeTimeout;
  $window.on("resize", function () {
    $body.addClass("is-resizing");
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      $("a[href^='#']").scrolly({
        speed: 1500,
        offset: $header.outerHeight() - 1,
      });

      setTimeout(function () {
        $body.removeClass("is-resizing");
        $window.trigger("scroll");
      }, 0);
    }, 100);
  }).trigger("resize");

  // EmailJS form handler (custom)

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs
        .sendForm("service_icuyaem", "template_wekr6co", this)
        .then(function () {
          const popup = document.getElementById("status-popup");
          popup.style.display = "block";
          setTimeout(() => (popup.style.display = "none"), 5000);
        })
        .catch(function (error) {
          alert("Oops! Something went wrong. Please try again.");
          console.error("EmailJS Error:", error);
        });
    });
  }
})(jQuery);
