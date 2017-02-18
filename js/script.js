function init(){
	$(function(){$('.header').load('header.html',
		function(responseTxt, statusTxt, xhr){
	        if(statusTxt == "success"){
	         setTimeout(function(){
				$('.home-text').css({'margin-top': '0', 'opacity': '1'});
				$('.navblocks').css({'margin-top': '0', 'opacity': '1'});
				$('.container').css({'margin-top': '0', 'opacity': '1'});

				$('.materialboxed').materialbox();
				$('.slider').slider({indicators: false, transition: 1000, interval: 4000});
				$('.slider').slider('start');
				}, 100);       
				console.log("External content loaded successfully!");
		 }if(statusTxt == "error")
	            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
    });
	 $(function(){$('.footer').load('footer.html')}); 
	setTimeout(function(){
		menu_ic = document.getElementsByClassName('menu_ic')[0];
		menu_ic.onclick = menu_handler;
	}, 100);
	
	
}

var url = 'https://script.google.com/macros/s/AKfycbytrKHv5A3eUMBuN-SwT0o8ZBPy05cg-4mTQULBVjlAhb2he18/exec';

function validateEmail(email) {
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
    return true
}

function sendMail(){
	var name = $('#name').val();
	var email = $('#email').val();
	var msg = $('#msg').val();
	if(name.lenght==0 || email.lenght==0 || msg.length==0){
		Materialize.toast("Please fill all the details!", 3000 );
		return;
	}
	if(!validateEmail(email)){
		Materialize.toast("Please give valid email!", 3000 );
		return;
	}
	var body = "Name: "+name+"\n";
	body += "Email: "+email+"\n";
	body += "Message: \n"+msg;
	console.log(body);
	$('#send').addClass('disabled');
	$('.sending-mail').css('opacity', 1);
	console.log("Sending Get request");
	var request = $.ajax({
		crossDomain: true,
		url: url,
		method: "GET",
		data: {sub:"Contact", body: body, callback: "ctrlq"},
		dataType: "jsonp",
		jsonp: false,
		cache: true
	});
}


function ctrlq(e) {
    console.log(e);
    $('#send').removeClass('disabled');
	$('.sending-mail').css('opacity', 0);
	$('#name').val("");
	$('#email').val("");
	$('#msg').val("");
	Materialize.toast("Thanks for contacting us, we will get to you soon :)", 3000 );
}

function menu_handler() {

	menu_container = (document.getElementsByClassName('menu-container'))[0];
	menu_contents = (document.getElementsByClassName('menu-contents'))[0];
	$('.home-text').css({'display': 'none'});
	
	menu_container.style.display = 'inherit';
	var menu_t = document.createElement('div');
	menu_t.className = 'menu';
	menu_container.appendChild(menu_t);
	menu_container.style.overflow = 'hidden';
	menu = (menu_container.getElementsByClassName('menu'))[0];
	var x = event.clientX;
	var y = event.clientY;

	menu.style.top = y-25+'px';
	menu.style.right = y-25+'px';
	 $(function(){menu.style.transform = 'scale(20)';});
	
	close = (document.getElementsByClassName('close'))[0];
	close.onclick = close_menu;
	
	setTimeout(function() {
		menu_container.style.backgroundColor= '#fff';
		menu_container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)';
		menu_contents.style.display = 'inherit';
		menu.style.zIndex = -1;
	}, 300);
}

function close_menu() {
	menu_container = (document.getElementsByClassName('menu-container'))[0];
	menu = (document.getElementsByClassName('menu'))[0];
	menu_contents = (document.getElementsByClassName('menu-contents'))[0];
	$('.home-text').css({'display': 'inherit'});
	menu_container.style.backgroundColor='';
	menu_container.style.boxShadow = '';
	menu.style.zIndex = 20;
	menu_contents.style.display = 'none';
	menu.style.transform = 'scale(1)';
	setTimeout(function() {
		menu_container.style.display = 'none';
		menu_container.removeChild(menu);
		
	}, 300);		
}