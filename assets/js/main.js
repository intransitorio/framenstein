$(function(){
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
});

$(window).on("resize", function() {
// do something
});


