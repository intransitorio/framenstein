$(window).on("load", function() {
    // Carrossel fundo home
        $('.carrossel-fundo .carrossel').each(function(){
            $(this).carouFredSel({
                auto         : {
                    play     : true,
                    timeoutDuration: 3500
                },
                swipe        : true,
                width        : '100%',
                height       : $(this).data('height'),
                responsive   : true,
                items        : {
                    height   : 'variable',
                    visible  : 1
                },
                scroll       : {
                    duration : 250,
                    items    : 1,
                    fx       : 'crossfade'
                }
            });
        })
    // Smooth Scroll
        $('a[href*=#]:not([href=#])').on( 'click', function($event) {
            $click_nav = true;
            var $this = $(this);
            $event.preventDefault();
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
             var target = $(this.hash);
             target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
             if (target.length) {
                 $('.logo').addClass('scrolling');
                 $('html,body').animate({
                   scrollTop: target.offset().top
                 }, 1000, function() {
                     $click_nav = false;
                     $(window).trigger('scroll');
                     $('.logo').removeClass('scrolling');
                     //window.location.hash = $this.attr("href");
                 });
             }
            }
        });    
    // Padrão Fancybox
        $(".fancybox").fancybox({
            padding     : 0,
            margin      : 0,
            helpers: {
                overlay: {
                  locked: false
                }
            }
        });
});

$(window).on("resize", function() {
// do something
});


