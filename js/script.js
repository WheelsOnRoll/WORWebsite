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
				$('.menu_ic').on('click', menu_handler);
				}, 100);       
				console.log("External content loaded successfully!");
		 }if(statusTxt == "error")
	            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
    });
	 $(function(){$('.footer').load('footer.html')});  
	
	$(function(){
		$('.header').load('header.html');
		$('.footer').load('footer.html');
    
		setTimeout(function(){
			$('.home-text').css({'margin-top': '0', 'opacity': '1'});
			$('.navblocks').css({'margin-top': '0', 'opacity': '1'});
			$('.container').css({'margin-top': '0', 'opacity': '1'});
			$('.materialboxed').materialbox();
			$('.slider').slider({indicators: false, transition: 1000, interval: 4000});
			$('.slider').slider('start');
			$('.menu_ic').on('click', menu_handler);
		}, 100);
	});

	
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
	if(name.length==0 || email.length==0 || msg.length==0){
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
	menu_contents.style.display = 'inherit';
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
	
	$('.close').on('click', close_menu);
	
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
		$('.menu').remove();
	}, 300);		
}

var cardTop;
var cardLeft;
var nextMember;
var prevMember;

function initializeTeamMembers() {
	$('.next').on('click', goToNextMember);
	$('.prev').on('click', goToPreviousMember);
	nextMember = 4;
	prevMember = tech_members.length-1;
	var ids = "#core-member-";
	for(i = 0; i < core_members.length; i++) {
		$(ids+i).on('click', function(e){
			if($(e.target).is('img')){
				e.preventDefault();
				return;
			}
			displayMemberInfo.bind(this).call();
		});
	}
	ids = "#tech-member-";
	for(i = 0; i < tech_members.length; i++) {
		$(ids+i).on('click', function(e){
			if($(e.target).is('img')){
				e.preventDefault();
				return;
			}
			displayMemberInfo.bind(this).call();
		});
	}
}

function displayMemberInfo() {
	var card = document.createElement('div');
	card.className = 'expandable-card';
	var w = $(this).find('.card-content').width();
	var h = $(this).find('.card-content').height();
	var t = $(this).find('.team-member-bg').offset().top;
	t -= $(window).scrollTop();
	cardTop = t;
	var l = $(this).find('.team-member-bg').offset().left;
	cardLeft = l;
	var htmlc = '<div class="expandable-card-contents center">' + $(this).find('.card-content').html() + '</div>';

	$('body').append(card);
	$('.expandable-card').append(htmlc);
	$('.expandable-card-contents').css({
		margin: '10px 10px 0 0', 
		position: 'fixed',
		height: h,
		width: w,
		top: t,
		left: l,
		backgroundColor: '#fff'
	});
	setTimeout(function(e){
	$(function() {
		$('.expandable-card').css({			
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100vw',
			height: '100vh',
			backgroundColor: 'rgba(0, 0, 0, 0.6)',
			zIndex: 2
		});
		$('.expandable-card-contents').css({
			position: 'fixed',
			height: '60vh',
			width: '70vw',
			left: '15vw',
			top: '20vh',
			zIndex: 2
		});
		setTimeout(function(){
			$('.expandable-card').find('.team-member-info').css('display', 'inherit');
		}, 400);
	});
	}, 10);
	$('.expandable-card').on('click', closeMember);
}

function closeMember() {
	$(function() {
		$('.expandable-card').find('.team-member-info').css('display', 'none');
		var h = $('.card-content').height();
		var w = $('.card-content').width();
		$('.expandable-card-contents').css({
			position: 'fixed',
			height: h,
			width: w,
			top: cardTop,
			left: cardLeft
		});
		$(function(){$('expandable-card').css('opacity', '0');});
		setTimeout(function(){
			$('.expandable-card-contents').remove();
			$('.expandable-card').remove();
		}, 400);
	});
}

function goToNextMember() {
	if(nextMember == 4){
		prevMember = 1;
	}
	if(nextMember == 1){
		nextMember =4;
		var nextEl = document.getElementById('tech-member-'+nextMember);
		nextEl.scrollIntoView({behavior: 'smooth'});
		nextMember++;
		prevMember =0;
	} else if(nextMember < tech_members.length){
		var nextEl = document.getElementById('tech-member-'+nextMember);
		nextEl.scrollIntoView({behavior: 'smooth'});
		nextMember++;
		prevMember--;
	} else {
		nextMember = 0;
		var nextEl = document.getElementById('tech-member-'+nextMember);
		nextEl.scrollIntoView({behavior: 'smooth'});
		nextMember++;
		prevMember = tech_members.length;
	}
}

function goToPreviousMember() {
	if(prevMember == tech_members.length-1){
		nextMember = -1;
	}
	if(prevMember == tech_members.length -2){
		prevMember = tech_members.length - 4;
		var prevEl = document.getElementById('tech-member-'+prevMember);
		prevEl.scrollIntoView();
		prevMember--;
		nextMember++;
	} else if(prevMember >= 0){
		var prevEl = document.getElementById('tech-member-'+prevMember);
		prevEl.scrollIntoView();
		prevMember--;
		nextMember++;
	} else {
		prevMember = tech_members.length;
		var prevEl = document.getElementById('tech-member-'+prevMember);
		prevEl.scrollIntoView();
		prevMember--;
		nextMember = 0;
	}
}