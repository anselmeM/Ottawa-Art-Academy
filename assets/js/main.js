$(window).load(function() {
	$(".se-pre-con").fadeOut("slow");
});
// preloader end

$(document).ready(function() {
	$('.nav__toggler').click(function () {
		$(this).toggleClass('active');
		$('.nav-list-box').toggleClass('active');
	});
	// navbar end
	$('.search-btn').click(function () {
		$('.search-input').toggleClass('active');
	});
});


		