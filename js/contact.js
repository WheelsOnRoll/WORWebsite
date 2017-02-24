var myVar;

// ('#textarea1').val('New Text');
//('#textarea1').trigger('autoresize');

 $(document).ready(function(){
      $('.carousel').carousel();
      myFunction();
    myVar = setInterval(alertFunc, 3000);
    });
 function myFunction() {
}

function alertFunc() {
  $('.carousel').carousel('next');
	console.log('next');
}

