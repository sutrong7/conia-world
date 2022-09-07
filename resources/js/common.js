(function () {
    'use strict';
    $(document).ready(function () {
        const html = $('html');
        const body = $('body');

        // 1. 헤더, 상단이동 버튼 상태 변경

        $(window).scroll(function () {
            let scrollT = $(window).scrollTop();
            let winH = $(window).height();
            let footerT = $(".footer").offset().top;

            if (scrollT > 0) {
                $('.header').addClass('active');
                $(".fixed_icon").fadeIn();
            } else {
                $('.header').removeClass('active');
                $(".fixed_icon").fadeOut(300);
            }

            if(footerT <= winH + scrollT) {
                $(".fixed_icon").removeClass("active");
            }else{
                $(".fixed_icon").addClass("active");
            }
        });

        // 2. 모바일 헤더 노출

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


        // 3. 상단 이동
        const srlBtn = $('.fixed_icon'); // 20220819 클래스 이름 수정 ksk
        srlBtn.on('click', function () {
            $('html, body').animate({scrollTop: 0}, 400);
            return false;
        });

        // 4. 애니메이션
        function reveal() {
            let reveals = document.querySelectorAll(".reveal");

            for (let i = 0; i < reveals.length; i++) {
                let windowHeight = window.innerHeight;
                let elementTop = reveals[i].getBoundingClientRect().top;
                let elementVisible = 100; // 20220822 수정 ksk

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                } else {
                    // reveals[i].classList.remove("active");
                }
            }
        }

        window.addEventListener("scroll", reveal);

        // 5. 카운터
        if ($('main').hasClass('mc') || $('main').hasClass('pa')) {
            let a = 0;
            $(window).scroll(function () {
                let oTop = ($(".counter_box").offset().top) - window.innerHeight;
                if (a === 0 && $(window).scrollTop() > oTop) {
                    $(".counter").each(function () {
                        let $this = $(this),
                            countTo = $this.attr("data-number");
                        $({
                            countNum: $this.text()
                        }).animate(
                            {
                                countNum: countTo
                            },
                            {
                                duration: 1000,
                                easing: "swing",
                                step: function () {
                                    $this.text(
                                        Math.ceil(this.countNum).toLocaleString("en")
                                    );
                                },
                                complete: function () {
                                    $this.text(
                                        Math.ceil(this.countNum).toLocaleString("en")
                                    );
                                }
                            }
                        );
                    });
                    a = 1;
                }
            });
        }

        // 6. 이용약관 탭
        if ($('.main_con').hasClass('policy') || $('main').hasClass('mc')) {
            const tabSelect = $('.tab.mo');

            function changeValue(e) {
                const tabBtn = $('.tab .tabBtn');
                let idx = e.value;
                const tabCon = $('.tabCon');
                tabCon.removeClass('active');
                tabCon.eq(idx).addClass('active');
                tabBtn.removeClass('active');
                tabBtn.eq(idx).addClass('active');
            }

            $(function () {
                const tabBtn = $('.tab .tabBtn');
                const tabCon = $('.tabCon');

                tabBtn.on('click', function () {
                    tabBtn.removeClass("active");
                    $(this).addClass("active");
                    let idx = $(this).eq();
                    tabCon.removeClass("active");
                    let activeTabNum = $(this).index();
                    $(tabCon[activeTabNum]).addClass('active');
                    $('.tab.mo').find('option:eq(' + idx + ')').prop("selected", true);
                });
            });

            tabSelect.on('change', function () {
                changeValue(this);
            })
        }
    });
}());


