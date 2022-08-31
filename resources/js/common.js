(function () {
    'use strict';
    $(document).ready(function () {
        const body = $('body');

        // 1. 헤더 변경

        $(window).scroll(function () {
            if ($(window).scrollTop() > 0) {
                $('.header').addClass('active');
            } else {
                $('.header').removeClass('active');
            }
        });

        // 2. 모바일 헤더 노출

        const html = $('html');
        const moGnb = $('.mo_header');
        const moGnbBtn = $('.gnb_btn');
        moGnbBtn.on('click', function () {
            if (moGnb.hasClass('active')) {
                moGnb.removeClass('active');
                html.removeClass('locked');
            } else {
                moGnb.addClass('active');
                html.addClass('locked');
            }
        });
    });
}());


