$(window).on("load", function() {
    // Smooth Scroll
    $('a.smooth').filter(function(){
       return ($(this).attr('href')||'').match(/^#.+$/);
    }).on( 'click', function(e) {
       e.preventDefault();

       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
           var byId, byName;
           var target = (byId = $(this.hash)).length ? byId : ((byName = $('[name='+this.hash.slice(1) +']')).length ? byName : false);

           if(target) {
               $('html,body').animate({
                   scrollTop: target.offset().top
               }, 1000);
           }
       }
    });
});

