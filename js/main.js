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

$("document").ready(function() {
    $.get("https://api.coingecko.com/api/v3/simple/price?ids=zenon&vs_currencies=usd", function(data) {
        $("#znn-price").text(data.zenon.usd.toFixed(2));
        $("#qsr-price").text((data.zenon.usd / 10).toFixed(2));
    });

    $('.scroll').click(function() {
        $('body').animate({
            scrollTop: eval($($(this).attr('href')).offset().top - 70)
        }, 1000);
    });

    $(".tab-slider__body").hide();
    $(".tab-slider__body:first").show();

    $('.burger-menu').click(function() {
        $('.navbar__menu').toggleClass('opened');
    })
});

$(".tab-slider__nav li").click(function() {
    $(".tab-slider__body").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();
    if ($(this).attr("rel") == "tab2") {
        $('.tab-slider__tabs').addClass('slide');
        $('.tab-slider__nav').addClass('slide');
    } else {
        $('.tab-slider__tabs').removeClass('slide');
        $('.tab-slider__nav').removeClass('slide');
    }
    $(".tab-slider__nav li").removeClass("active");
    $(this).addClass("active");
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