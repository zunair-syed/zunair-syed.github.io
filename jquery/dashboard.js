$(document).ready(function(){
	console.log("TEEEEEEESSTTTT");

	var tab0 = document.getElementById( "tab0" );
	$(tab0).css("transform", "translateX(0vw)");
	$(tab0).nextAll().css("transform", "translateX(-80vw)");

	$( ".tab" ).hover(
	  function() {
	  	$(this).css("transform", "translateX(0vw)");
	  	$(this).prevAll().css("transform", "translateX(0vw)");
	  	$(this).nextAll().css("transform", "translateX(-80vw)");
		// console.log("ONNN");
	  }, function() {
		// console.log("OFF");
	  }
	);
});


//http://stackoverflow.com/questions/724911/how-do-i-find-out-with-jquery-if-an-element-is-being-animated