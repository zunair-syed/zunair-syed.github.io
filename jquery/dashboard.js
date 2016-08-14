$(document).ready(function(){
	var showingCurrentTab = [true, false, false, false, false]

	var tab0 = document.getElementById( "tab0" );
	$(tab0).css("transform", "translateX(0vw)");
	$(tab0).nextAll().css("transform", "translateX(-75vw)");

	$( ".tab" ).hover(
	  function() {

	  	var prevIndex = getTrueIndex(showingCurrentTab);
	  	var index = parseInt($(this).attr('id').toString().split("tab")[1]);
		showingCurrentTab = makeCurrentTabTrue(showingCurrentTab, index);

		console.log("prevIndex: " + prevIndex );
		console.log("index: " + index );

		if(prevIndex != index){
		  	$(this).css("transform", "translateX(0vw)");
		  	$(this).prevAll().css("transform", "translateX(0vw)");
		  	$(this).nextAll().css("transform", "translateX(-75vw)");
		 }
		// console.log("ONNN");
	  }, function() {
		// console.log("OFF");
	  }
	);
});


function makeCurrentTabTrue(Arr, index){

	for (var i = Arr.length - 1; i >= 0; i--) {
		Arr[i] = false;
	}
	Arr[index] = true;
	return Arr;
}

function getTrueIndex(Arr){
	for (var i = Arr.length - 1; i >= 0; i--) {
		if(Arr[i] == true) return i;
	}
}

//http://stackoverflow.com/questions/724911/how-do-i-find-out-with-jquery-if-an-element-is-being-animated