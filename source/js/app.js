"use strict";

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var preloader = (function () {
    var percentsTotal = 0;
    var preloader = $('.preloader');
    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image');
        var isImg = $(element).is('img');
        var path = '';
        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }
        if (isImg) {
            path = $(element).attr('src');
        }
        if (path) return path;
    });

    var setPercents = function (total, current) {
        var percents = Math.ceil(current / total * 100);

        $('.loading-value').text(percents + '%');
        $('.big.circle').css({'stroke-dasharray': percents * 1.57 + ' ' + '157'});

        if (percents >= 100) {
            preloader.fadeOut();
        }
    };

    var loadImages = function (images) {

        if (!images.length) preloader.fadeOut();

        images.forEach(function (img, i, images) {
            var fakeImage = $('<img>', {
                attr: {
                    src: img
                }
            });

            fakeImage.on('load error', function () {
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });

    };
    return {
        init: function () {
            var imgs = imgPath.toArray();
            loadImages(imgs);
            //console.log(imgs);
        }
    }
}());

// preloader.init();


var boxFlip = (function () {
    var button = document.querySelector('.block_sts');
    if (button !== null) {
        CSSPlugin.defaultTransformPerspective = 1000;

//we set the backface
        TweenMax.set($(".answer"), {rotationY:-180});

        $.each($(".block_sts"), function(i,element)
        {
            var frontCard = $(this).children("div.quest"),
                backCard = $(this).children("div.answer"),
                tl = new TimelineMax({paused:true});

            tl
                .to(frontCard, 0.6, {rotationY:180, ease:Linear.easeNone})
                .to(backCard, 0.6, {rotationY:0, ease:Linear.easeNone},0);

            element.animation = tl;
        });

        var btn = $(".quest_close");

        $(".quest").click(function()
        {
            this.parentElement.animation.play(0);
        });

        btn.click(function()
        {
            this.parentElement.parentElement.animation.reverse();
        });
    }
});

boxFlip();

$(window).scroll(function() {
    var $height = $(window).scrollTop();
    if($height > 50) {
        $('#header').addClass('active');
    } else {
        $('#header').removeClass('active');
    }
    if($height > 700) {
        $('#gotop').addClass('active');
    } else {
        $('#gotop').removeClass('active');
    }
});

$(window).load(function() {
    var $height = $(window).scrollTop();
    if($height > 50) {
        $('#header').addClass('active');
    } else {
        $('#header').removeClass('active');
    }
    if($height > 700) {
        $('#gotop').addClass('active');
    } else {
        $('#gotop').removeClass('active');
    }
});

/* Video */

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: '611Yy41Rubg',
        playerVars: { 'autoplay': 0, 'controls': 0 },
        events: {
             'onReady': onPlayerReady
             //'onStateChange': onPlayerStateChange
        }
    });
}
// https://developers.google.com/youtube/iframe_api_reference?hl=ru#Playback_status

function onPlayerReady() {
    console.log('player dobe');
    $(window).scroll(function() {
        var $height = $(window).scrollTop();
        var vidoffset = $("#block_video").offset().top - 150;
        var vidheight =  $("#block_video").height();
        if($height > vidoffset && $height < vidoffset + vidheight ) {
            player.playVideo();
        }
        else{
            player.pauseVideo();
        }
    });
}


$('#icon_vid').click(function() {
$('html, body').animate({
    scrollTop: $("#block_video").offset().top
}, 1000);
       player.playVideo();

});

/* Scroll Top */
$('#gotop').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});
/* Menu vertical */

// var menuBlog = (function () {
//     var container = document.querySelector('.menu-blog-nav');
//     if (container !== null) {
//         var blogmenu = document.querySelector('.section-blog__menu');
//         var menuState = false;
//
//         container.addEventListener('click', function () {
//             if (!menuState) {
//                 blogmenu.classList.add('active');
//                 menuState = true;
//             }
//             else {
//                 blogmenu.classList.remove('active');
//                 menuState = false;
//             }
//         });
//         blogmenu.addEventListener('click', function () {
//             console.log('click');
//         });
//     }
// });
var blogscontent = document.querySelector('.section-blog__content');
if (blogscontent){
    var  menuOffsetTop = $('.section-blog__list').offset().top;
    var  menuOffsetTop2 = $('#footer').offset().top - $('#footer').height();
    $(document).scroll(function () {
        if ($(document).scrollTop() >= (menuOffsetTop - 100) && $(window).width() > 753){
            $('.section-blog__list').addClass('fixed-position');
        } else {
            $('.section-blog__list').removeClass('fixed-position');
        }
        if ($(document).scrollTop() >= menuOffsetTop2 - 200){
            $('.section-blog__list').addClass('opacity');
        } else {
            $('.section-blog__list').removeClass('opacity');
        }

        $(".section-blog__post").each(function () {
            if (($(document).scrollTop() - $(this).offset().top) >= -150){
                $(".section-blog__item").each(function () {
                    $(this).removeClass('section-blog__item--active');

                });
                var currentLink = $(".articles__link[href=\'#" + $(this).attr('id') + "\']");
                currentLink.parent().addClass('section-blog__item--active');
            }
        });
    });

    $(".articles__link").on("click", function (event) {
        event.preventDefault();
        var ids  = $(this).attr('href'),
            topsb = $(ids).offset().top -100;
        $('body,html').animate({scrollTop: topsb}, 1000);
    });
}
//menuBlog();

if ($(window).width() < 768) {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
    });
}

$('.menu-mob').click(function () {
   $(this).toggleClass('active');
    $('.menu-container').toggleClass('active');
});
$('.section-blog__menu span').click(function () {
    $('.section-blog__menu').toggleClass('active');
});
$('.blog_out').click(function () {
    $('.section-blog__menu').toggleClass('active');
});
