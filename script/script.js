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

        if ($html.is(':animated')) return;
        
    }, { passive: false });

    
    // 공통 기능 //
    
    // 내비게이션 페이지 스크롤
    console.log('스크롤 페이지 높이: ' + $window.scrollTop());
    let $navList = $('#nav > ul > li > a');
    
    $navList.on('click', function () {
        
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        });
        return false

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

}); // document.onready