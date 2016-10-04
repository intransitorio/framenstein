$(window).on("load", function() {
    // Smooth Scroll
        $('a').not('.institutional-tab-content a').filter(function(){
            return ($(this).attr('href')||'').match(/^#.+$/);
        }).on( 'click', function($event) {
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
            margin      : 40,
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


