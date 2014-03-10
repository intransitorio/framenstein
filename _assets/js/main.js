function initPage(){
	scrollUniversal();
}

$(window).resize(function(){		
	scrollUniversal();
});






function scrollUniversal(){
	var bars = '.jspHorizontalBar, .jspVerticalBar';

	$('.jscrollpane-universal').bind('jsp-initialised', function (event, isScrollable) {
		
		//hide the scroll bar on first load
		$(this).find(bars).hide();
	
	}).jScrollPane({
            mouseWheelSpeed : 70,
            verticalGutter  : 0

	}).hover(
	
		//hide show scrollbar
		function () {
			$(this).find(bars).stop().fadeTo('fast', 1);
		},
		function () {
			$(this).find(bars).stop().fadeTo('fast', 0);
		}

	);

}