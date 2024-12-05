$(function () {

    // 첫 이미지
    const $bigImages = $('#bigImage');
    const $bigImage = $('#bigImage > li');
    // window.addEventListener('load', function () {

    //     $bigImage.addClass('on');

    // }, function () {

    //     $bigImages.css('transfrom', 'scale(0)').css('opasity', '0');

    // });

    // 텍스트 모션


    // TOP 버튼
    $('#topButton').on('click', function () {

        $('body, html').animate({ scrollTop: 0 }, 300);

    });

    // 공지사항 슬라이드
    const INTERVAL = 2500;
    const $notification = $('#notification > ul');

    const slideLength = $notification.children().length;

    let NtimerId = window.setInterval(Nslide, INTERVAL);

    $('#notification').on({

        mouseenter: function () {
            window.clearInterval(NtimerId);
        },
        mouseleave: function () {
            NtimerId = window.setInterval(Nslide, INTERVAL);
        }
        
    });

    // 공지사항 슬라이드 함수
    function Nslide() {

        $notification.animate({ marginTop: '-40px' }, function () {
            $notification.removeAttr('style').children(':first').appendTo(this);
        });
        
    }

    // 내비게이션
    const $submenu = $('.subMenu');
    const $menuItem = $('#mainMenu > li > a');
    const $window = $(window);
    const $nav = $('#nav');

    const navTop = $nav.offset().top;
    const navHeight = $nav.outerHeight(true);

    $menuItem.on('click', function (event) {
        event.preventDefault();

        const $next = $(this).next();

        $submenu.not($next).hide();
        $next.toggle();

    });
    $submenu.on('mouseleave', function () {

        $submenu.hide();

    });

    $window.on('scroll', function () {

        const scrollTop = $window.scrollTop();

        if (scrollTop > navTop) {
            $nav.addClass('fixed');
        }
        else {
            $nav.removeClass('fixed').next().removeAttr('style');
        }

    });

    // 사이드바
    const $sideButton = $('#nav > button');
    const $sidebar = $('#sidebar');

    $sideButton.on('click', function () {

        $sidebar.css('display', 'block');

    });
    $sidebar.on('mouseleave', function () {

        $sidebar.removeAttr('style');

    });

    // 이미지 슬라이드
    const $imageList = $('#imageSlide > div > ul');

    const imageLength = $imageList.children().length;
    
    let timerId = window.setInterval(slideImage, INTERVAL);

    $('#imageSlide > div').on({

        mouseenter: function () {
            window.clearInterval(timerId);
        },
        mouseleave: function () {
            timerId = window.setInterval(slideImage, INTERVAL);
        }

    });

    $('#slideNext').on('click', slideImage);

    $('#slidePrev').on('click', function () {

        $imageList.prepend( $imageList.children(':last') )
        .css('margin-left', '-100%').animate({ marginLeft: 0 });

    });

    // 이미지 슬라이드 함수
    function slideImage() {

        $imageList.animate({ marginLeft: '-100%' }, function () {
            $imageList.removeAttr('style').children(':first').appendTo(this);
        });
        
    }


    // 독도수분초 탭 기능
    const $tabButton = $('#tabButton > li');
    const $tabImage = $('.tabImage');
    const $tabText = $('.tabText');

    $tabButton.on('click', function () {

        if ($(this).is('.on')) return;

        $(this).addClass('on').siblings().removeClass('on');
        $tabImage.removeClass('on');
        $tabText.removeClass('on');

        const index = $(this).attr('data-index');

        $tabImage.eq(index).addClass('on');
        $tabText.eq(index).addClass('on');

    });


    // 신발 탭 기능
    const $Smenu = $('#Smenu > li');
    const $Simage = $('#Simage > li');
    const $shoes = $('.shoes');

    $Smenu.on('click', function () {

        if ($(this).is('.on')) return;

        $(this).addClass('on').siblings().removeClass('on');
        $Simage.removeClass('on');
        $shoes.removeClass('on');

        const index = $(this).attr('data-index');

        $Simage.eq(index).addClass('on');
        $shoes.eq(index).addClass('on');

    });


    // 액세서리&컵 탭 기능
    const $Amenu = $('#Amenu > li');
    const $images = $('.images');

    $Amenu.on('click', function () {

        if ($(this).is('.on')) return;

        $(this).addClass('on').siblings().removeClass('on');
        $images.removeClass('on');

        const index = $(this).attr('data-index');

        $images.eq(index).addClass('on');

    });
    
    // 배경 요소 추가
    const $bgRbox = $('<div></div>').attr('id', 'bg_Lbox').appendTo('#container');
    const $bgLbox = $('<div></div>').attr('id', 'bg_Rbox').appendTo('#container');


    // 옷 탭 기능
    const $Cmenu = $('#Cmenu > li');
    const $Cimage = $('.Cimage > li');
    const $blackImage = $('#blackImage > li');

    $Cmenu.on('click', function () {

        if ($(this).is('.on')) return;

        $(this).addClass('on').siblings().removeClass('on');
        $Cimage.removeClass('on');
        $blackImage.removeClass('on');

        const index = $(this).attr('data-index');

        $Cimage.eq(index).addClass('on');
        $blackImage.eq(index).addClass('on');

    });


    // 어린이 의류 슬라이드 및 탭 기능
    const $Kthumbnail = $('#Kthumbnail > ul');
    const $Kimage = $('#Kimage > ul');

    const $Kmenu = $('#Kthumbnail > ul > li');
    const $Kcontent = $('#Kimage > ul > li');
    
    let i = 1;
    const KimageLength = $Kimage.get(0).childElementCount;

    let KtimerId = window.setInterval(KslideImage, INTERVAL);

    window.setTimeout(function () {
        let K_ItimerId = window.setInterval(K_IslideImage, INTERVAL);
    }, INTERVAL);

    // $Kthumbnail.parent().on({

    //     mouseenter: function () {
    //         window.clearInterval(KtimerId);
    //         window.clearInterval(K_ItimerId); // 적용 안됨
    //     },
    //     mouseleave: function () {
    //         KtimerId = window.setInterval(KslideImage, INTERVAL);
    //         K_ItimerId = window.setInterval(K_IslideImage, INTERVAL);
    //     }

    // });

    // 슬라이드 함수
    function KslideImage() {

        $Kthumbnail.animate({ marginLeft: '-33.33%'}, function () {

            $Kthumbnail.removeAttr('style').children(':first').appendTo(this);

        });

    }

    function K_IslideImage() {
        $Kimage.css('margin-left', i * -100 + '%');
        i++;
        i %= KimageLength;
    }
    // 탭 기능
    // $Kmenu.on('click', function () {

    //     if ($(this).is('.on')) return;

    //     $(this).addClass('on').siblings().removeClass('on');
    //     $Kcontent.removeClass('on');

    //     const index = $(this).attr('data-index');

    //     $Kcontent.eq(index).addClass('on');

    // });

});