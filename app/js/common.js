$(document).ready(function () {

    // rating
    $(".rating").starRating({
        starSize: 25,
        callback: function(currentRating, $el){
            // make a server call here
        }
    });
    // rating end

    // slider
    $('.main-slider').slick({
        infinite: true,
        arrows: true,
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>',
        dots: true,
        slidesToShow: 1,
        fade: true,
        cssEase: 'linear'
    });

    $('.hits-slider').slick({
        infinite: true,
        arrows: true,
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>',
        dots: false,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.calendar-slider').slick({
        slidesToShow: 1,
        infinite: false,
        fade: true,
        swipe: false
    });
    // slider end

    // fancybox
    $('[data-fancybox="images"]').fancybox();
    // fancybox end


    // mobile menu
    $('.btn-mobile-menu').on('click', function () {
        $('#mobile-menu').css({
            left: '0px'
        });
        $('.overlay').fadeIn();
    });

    $('#mobile-menu .btn-close, .overlay').on('click', function () {
        $('#mobile-menu').css({
            left: '-100%'
        });
        $('.overlay').fadeOut();
    });
    // mobile menu end

    // sidebar mobile
    $('.btn-sidebar-mobile').on('click', function () {
        $('.sidebar').css({
            left: '0px'
        });
        $('.overlay').fadeIn();
    });

    $('.sidebar .btn-close, .overlay').on('click', function () {
        $('.sidebar').css({
            left: '-100%'
        });
        $('.overlay').fadeOut();
    });
    // sidebar mobile end



    // количество товаров
    $('.down').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.up').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    // количество товаров end

    // slider price
    $('.slider-range').slider({
        range: true,
        min: 0,
        max: 12500,
        values: [0, 0],
        classes: {
            "ui-slider-handle": "ui-corner-all"
        },
        slide: function (event, ui) {
            //Поле минимального значения
            $(".dec1").val(ui.values[0]);
            //Поле максимального значения
            $(".dec2").val(ui.values[1]);
        }
    });

    $(".dec1").val($(".slider-range").slider("value"));
    $(".dec2").val($(".slider-range").slider("value"));

    // slider price end

    // tab
    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.category-content__wrapper').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
    // tab end


    // filter
    $('.filter-box > .filter-box__title').click(function () {
        $(this).toggleClass('in').siblings('.filter-box__content').slideToggle();
    });
    // filter end


});

// модальные окна (несколько)
$(document).ready(function () {
    var overlay = $('.overlay');
    var open_modal = $('.open_modal');
    var close = $('.modal__close, .overlay');
    var modal = $('.modal__div');

    open_modal.click(function (event) {
        event.preventDefault();
        var div = $(this).attr('href');
        overlay.fadeIn(400,
            function () {
                $(div)
                    .css('display', 'flex')
                    .animate({
                        opacity: 1,
                        top: '50%'
                    }, 200);
            });
    });

    close.click(function () {
        modal
            .animate({
                    opacity: 0,
                    top: '45%'
                }, 200,
                function () {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                }
            );
    });
});
//end

$(window).on('load resize', function () {
    if ($(window).width() < 820) {
        $('.links-drop').on('click', function () {
            $(this).siblings('.dropdown-menu').fadeToggle();
        });

    } else {

    }
});

// btn top
$("body").on("click", "#top", function () {
    $("html, body").animate({
        scrollTop: 0
    }, "slow")
});
