$(document).ready(function(){
    $("#top").mouseenter(function(){
         $("#top").css("opacity", "0");
         $("#bottom").css("opacity", "1");
   	});
    $("#top").mouseleave(function(){
         $("#top").css("opacity", "1");
         $("#bottom").css("opacity", "0");
   	});
});