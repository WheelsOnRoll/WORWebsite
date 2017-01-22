function init(){
	setTimeout(function(){
		$('.home-text').css({'margin-top': '0', 'opacity': '1'});
		$('.navblocks').css({'margin-top': '0', 'opacity': '1'});
		$('.materialboxed').materialbox();
		$('.slider').slider({indicators: false, transition: 1000, interval: 4000});
		$('.slider').slider('start');
	}, 1000);
}