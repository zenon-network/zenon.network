(function hidingNavbar() {
    var navbar = document.getElementById('header');
    var lastScrollTop = 0;

    window.onscroll = function changeClass() {
        var scrollPosY = window.pageYOffset || document.body.scrollTop;

        if (scrollPosY < 95) {
            navbar.className = ('fixed');
        } else if (scrollPosY > lastScrollTop) {

            navbar.className = ('inactive');
            $('.navbar__menu').removeClass('opened');
        } else {

            navbar.className = ('active');
        }

        lastScrollTop = scrollPosY <= 0 ? 0 : scrollPosY;
    }
})();

(function countdownTimer() {
  // var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
  var today = new Date();
  var nowUTC = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 12, 0, 0).getTime();

  var countDownDate = new Date(nowUTC + (24 * 60 * 60 * 1000)).getTime();

  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var parsedHours = hours > 9 ? hours : '0'+hours;
    var parsedMinutes = minutes > 9 ? minutes : '0'+minutes;
    var parsedSeconds = seconds > 9 ? seconds : '0'+seconds;

    document.getElementById("time_hours").innerText = parsedHours;
    document.getElementById("time_minutes").innerText = parsedMinutes;
    document.getElementById("time_seconds").innerText = parsedSeconds;

    if (distance < 0) {
      clearInterval(x);
      // repeat
      countdownTimer();
      // document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
})();

// CUSTOM MODAL DYNAMIC FUNCTIONALITY
(function customModal(){
    var openModal = document.querySelectorAll('.modal--open');
    if (openModal) {
        for (var m = 0; m < openModal.length; m++) {
            openModal[m].addEventListener('click', function () {
                var modalNumber = this.dataset.modal;
                document.getElementById(modalNumber).style.visibility = 'visible';
                document.getElementById(modalNumber).classList.add('show');
            });
        }
    }

    var closeModal = document.querySelectorAll('.modal--close');
    if (closeModal) {
        for (var c = 0; c < closeModal.length; c++) {
            closeModal[c].addEventListener('click', function () {
                var modalNumber = this.dataset.dismiss;
                setTimeout(function () {
                    document.getElementById(modalNumber).style.visibility = 'hidden';
                }, 500);
                document.getElementById(modalNumber).classList.remove('show');
            });
        }
    }

    var overlay = document.querySelectorAll('.modal');
    if (overlay) {
        for (var o = 0; o < overlay.length; o++) {
            overlay[o].addEventListener('click', function () {
                var _this = this;
                setTimeout(function () {
                    _this.style.visibility = 'hidden';
                }, 500);
                this.classList.remove('show');
            });
        }
    }
})();

// Enhanced lazy loading with WebP support
(function() {
    // Check WebP support
    function supportsWebP() {
        var elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
        return false;
    }
    
    var webpSupported = supportsWebP();
    
    // Enhanced lazy loading for images
    function lazyLoadImages() {
        var lazyImages = document.querySelectorAll('img[data-lazy-src]');
        
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    var lazySrc = img.getAttribute('data-lazy-src');
                    console.log('Loading lazy image:', lazySrc);
                    
                    // Check if WebP version exists and is supported
                    // Use the webp class added by webp-detect.js
                    var hasWebPSupport = document.documentElement.classList.contains('webp');
                    
                    if (hasWebPSupport && img.hasAttribute('data-webp')) {
                        var webpSrc = img.getAttribute('data-webp');
                        console.log('Loading WebP version:', webpSrc);
                        img.src = webpSrc;
                        img.removeAttribute('data-lazy-src');
                        img.removeAttribute('data-webp');
                    } else if (hasWebPSupport && lazySrc.endsWith('.png')) {
                        var webpSrc = lazySrc.replace('.png', '.webp');
                        // Try to load WebP version first
                        var testImg = new Image();
                        testImg.onload = function() {
                            console.log('WebP found, using:', webpSrc);
                            img.src = webpSrc;
                            img.removeAttribute('data-lazy-src');
                        };
                        testImg.onerror = function() {
                            // Fall back to PNG
                            console.log('WebP not found, loading PNG:', lazySrc);
                            img.src = lazySrc;
                            img.removeAttribute('data-lazy-src');
                        };
                        testImg.src = webpSrc;
                    } else {
                        img.src = lazySrc;
                        img.removeAttribute('data-lazy-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '150px'
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // Run lazy loading on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', lazyLoadImages);
    } else {
        lazyLoadImages();
    }
    
    // Also run after jQuery ready to catch any dynamic content
    $(document).ready(function() {
        setTimeout(lazyLoadImages, 100);
    });
})();

$(document).ready(function() {
    $.get("https://api.coingecko.com/api/v3/simple/price?ids=zenon-2&vs_currencies=usd", function(data) {
        $("#znn-price").text(data['zenon-2'].usd.toFixed(2));
    });

    $.get("https://api.geckoterminal.com/api/v2/networks/eth/tokens/0x96546afe4a21515a3a30cd3fd64a70eb478dc174", function(response) {
        var priceUsd = response.data.attributes.price_usd;
        $("#qsr-price").text(parseFloat(priceUsd).toFixed(2));
    });
    
    $('.scroll').click(function() {
        $('body').animate({
            scrollTop: eval($($(this).attr('href')).offset().top - 70)
        }, 1000);
    });

    $(".protocol__tab").hide();
    $(".protocol__tab:first").show();

    $('.burger-menu').click(function() {
        $('.navbar__menu').toggleClass('opened');
    })

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      var buttons = document.querySelectorAll('.protocol__row');
      var tabs = document.querySelectorAll('.protocol__tab');

      for (var i = 0; i < tabs.length; i++) {
        $(tabs[i]).insertAfter($(buttons[i]));
      }
    }

    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  
      );
    }

    const box = document.querySelectorAll('.back-title');

    document.addEventListener('scroll', function () {
      for (let i = 0; i < box.length; i++) {
        if (isInViewport(box[i])) {
          $(box[i]).addClass('green');
        } else {
          $(box[i]).removeClass('green');
        }
      }
    }, {
        passive: true
    });
});

$(".protocol__card").click(function() {
    $(".protocol__tab").hide();

    var activeTab = $(this).attr("rel");

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("#" + activeTab).fadeOut();
    } else {
      $(".protocol__tab").removeClass("active");
      $(".protocol__card").removeClass("active");

      $("#" + activeTab).fadeIn();
      $(this).addClass("active");
    }

});

(function($) {
    "use strict";

    $(document).ready(function() {
        "use strict";

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(window).height();
            var progress = pathLength - (scroll * pathLength / height) - 20;
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        })


    });

})(jQuery);

