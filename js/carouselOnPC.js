;(function($){
	var timer,
		setting;

	function carousel(obj){

	}
	function autoPlay(){
		console.log(2);
	};
	var a=1;


	$.fn.extend({
		carouselOnPC:carousel
	});
})(jQuery);



window.onload=function(){
	function a(p){
		console.log(p);
	}
	a.b=function(){
		console.log(this);
	}
	a.b();
}