"use strict";

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};


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
    }

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

    }
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
    var button = document.querySelector('.quest');
    if (button !== null) {
        $('.quest').click(function() {
            $(this).parent().addClass('flipped');
        });

        $('.quest_close').click(function() {
            console.log($(this).parent().parent());
            $(this).parent().parent().removeClass('flipped');
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
});


var vid = document.querySelector('#my_video_1');
if (vid !== null) {

    var myPlayer = videojs('my_video_1');
}


$('#icon_vid').click(function() {
$('html, body').animate({
    scrollTop: $("#block_video").offset().top
}, 1000);
    myPlayer.ready(function () {
        if(myPlayer.paused()){
            myPlayer.play();
        }
    })
});





