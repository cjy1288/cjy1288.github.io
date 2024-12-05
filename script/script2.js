$(function () {

    // 페이지 스크롤링 //

    const $html = $('html');
    const $window = $(window);

    let windowHeight = $window.height();
    let pageIndex = Math.round($window.scrollTop() / windowHeight);

    $html.animate({ scrollTop: pageIndex * windowHeight }, 10);
    
    const lastPageIndex = $('.page').length -1;

    window.addEventListener('wheel', function (event) {
        event.preventDefault();

        if ($html.is(':animated')) return;

        if (event.deltaY > 0) {
            
            if (pageIndex >= lastPageIndex) return;

            pageIndex++;
        }
        else if (event.deltaY < 0) {

            if (pageIndex <= 0) return;

            pageIndex--;
        }

        const posTop = windowHeight * pageIndex;

        $html.animate({ scrollTop: posTop });

    }, { passive: false });

    window.addEventListener('resize', function () {

        windowHeight = $window.height();

        const posTop = windowHeight * pageIndex;

        $html.animate({ scrollTop: posTop }, 200);

    });

    // 키보드 이벤트
    window.addEventListener('keypress', function (event) {
        // event.preventDefault();

        if ($html.is(':animated')) return; // 이벤트 연달아 발생X
        
        // 다시 확인하기

    }, { passive: false });

    
    // 공통 기능 //
    
    // 내비게이션 페이지 스크롤     // 클릭 후 휠 사용 시 문제 발생
    console.log('스크롤 페이지 높이: ' + $window.scrollTop());
    let $navList = $('#nav > ul > li > a');
    
    $navList.on('click', function () {
        
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        });
        return false

        // pageIndex = Math.round($window.scrollTop() / windowHeight);
        // $html.animate({ scrollTop: pageIndex * windowHeight }, 10);

    });

    // web 이미지 a태그
    $('#Wcontent > a').on('click', function (event) {
        event.preventDefault();
    });

    // design 이미지 오버레이
    const $overlay = $('#overlay');
    const $photo = $('#photo');
    const $imageList = $('.designImage > li > a');

    let imageIndex = 0;
    let overlayDURATION = 200;

    $imageList.on('click', function (event) {
        event.preventDefault();

        imageIndex = $imageList.index(this);

        $photo.attr('src', this.href);

        $overlay.fadeIn(overlayDURATION, function () {

            $photo.fadeIn(overlayDURATION);
        });
    });

    $overlay.on('click', function () {
        $photo.fadeOut(overlayDURATION, function () {

            $overlay.fadeOut(overlayDURATION);  
        });
    });

    $photo.on('click', function (event) {
        event.stopPropagation();
    });

    // design 버튼 기능
    const $designList = $('#Dcontent > ul');

    $('#next').on('click', function () {

        $designList.animate({ marginLeft: '-100%' }, function () {

            $designList.removeAttr('style').children(':first').appendTo(this);
        });
    });

    $('#prev').on('click', function () {

        $designList.prepend( $designList.children(':last') )
            .css('marginLeft', '-100%').animate({ marginLeft: 0 });

    });

    // contact 버튼(클립보드 복사) 기능
    $('#contactButton > li > button').on('click', function () {

        let $coypText = $(this).prev().text();

        console.log($coypText);
        const $alert = $('#alert');

        navigator.clipboard.writeText($coypText).then(() => {
            $alert.addClass('on');
        });

        const DURATION = 1200;

        window.setTimeout(function () {

            $alert.removeClass('on');

        }, DURATION);
        

    });

    // 모바일 버전 //
    
    // 메뉴 목록
    const $sidebar = $('#nav');

    $('#sideOpen').on('click', function () {
        $sidebar.css('right', 0);
    });

    $('#sideClose').on('click', function () {
        $sidebar.removeAttr('style');
    });
    
    // about 컨텐츠 버튼
    const $aboutButton = $('#aboutContent > button');
    const $aboutText = $('.aboutText');

    $aboutButton.on('click', function () {

       if ($(this).is('.on')) return;

        $(this).addClass('on').siblings().removeClass('on');

        $aboutText.removeClass('on');

        const index = $(this).attr('data-index');

        $aboutText.eq(index).addClass('on');

    });


    // 등장 모션 //
    // 첫 화면 페이지
    window.addEventListener('load', function () {
        const $profileBox= $('#profileBox');

        $profileBox.animate({   // 중심점 바꾸기
            width: '0',
            height: '0'
        }, 1).animate({   // 뷰포트 너비별로 수치 다르게 하기
            width: '92%',
            height: '92%'
        }, 400);

    });

    // 각 제목 모션
   

    // about
    const $aboutContent = $('#aboutContent');
    const $container = $('.container');

    $window.on('scroll', function () {

        $aboutContent.each(function () {   // 이해 못함

            const scroll_object = $(this).offset().top + $(this).outerHeight();
            const scroll_window = $(this).scrollTop() + $window.height();
            
            if (scroll_window > scroll_object /10) {
                $(this).animate({ 
                    'opacity': '1',
                    'top': '0'
                }, 600);
            }
            
        });
        
        // slik
        $container.each(function () {
            
            const scroll_object = $(this).offset().top + $(this).outerHeight();
            const scroll_window = $(this).scrollTop() + $window.height();

            if (scroll_window > scroll_object /10) {

                $(this).animate({
                    'opacity': '1',
                    'margin-top': '0'
                }, 600);

            }

        });

    });

    // 요소 위치 찾기
    function scroll_object() { $(this).offset().top + $(this).outerHeight(); }
    function scroll_window() { $(this).scrollTop() + $window.height(); }


}); // document.onready