$(function(){

	var winH 	= $(window).height(),
		btnFixWrap = $('.sticky_wrap');


	$(window).resize(function(){
		if ( $('body').hasClass('android') ) {
			if ( $(window).height() + 100 >= winH ) {
				// 키패드 비활성화
				btnFixWrap.show();
			} else {
				// 키패드 활성화
				btnFixWrap.hide();
			}
		}
	});

	// SELECT
	$('.soft_select').on('change', 'select[data-name=inpFocus]', function (event) {
		$(this).addClass('color_change');
	});

	function deviceModel(){
		var currentOS;
		var mobile = (/iphone|ipad|ipod|android/i.test( navigator.userAgent.toLowerCase() ));
		if (mobile)
		{
			var userAgent = navigator.userAgent.toLowerCase();
			if (userAgent.search("android") > -1) {
				currentOS = "android";
			} else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1)) {
				currentOS = "ios";
			} else { currentOS = "else"; }
		}
		else  {  currentOS = "nomobile"; }

		$('body').addClass(currentOS);
	}
	deviceModel();

	// INPUT FOCUS
	$('input[data-name=inpFocus], textarea[data-name=inpFocus]').each(function(){
		var placeText = $(this).attr("placeholder");
		$(this).focus(function(){
			var focusArea = $(this).parent(".item");
			$(this).addClass('inp_focus');
			$(this).parent(".ico_won").addClass('on');
			$(this).parent().siblings('.kor_txt').css("color", "#6417f3");
			//$(this).siblings('em').css("color", "#6417f3");
		}).blur(function(){
			var focusArea = $(this).parent(".item");
			$(this).removeClass('inp_focus');
			$(this).parent(".ico_won").removeClass('on');
			if(focusArea.hasClass('inp_error')){
				$(this).parent().siblings('.kor_txt').css("color", "#f74b20");
			} else {
				$(this).parent().siblings('.kor_txt').css("color", "#999");
			}
		}).keyup(function(){ //keyup 결함 수정 test
			var textSum = $(this).val();
			if(textSum.length >= 1) {
				$(this).attr('placeholder','');
			} else {
				$(this).attr('placeholder',placeText);
			}
		});
	});


	// SELECT FOCUS
	$('select[data-name=inpFocus]').each(function(){
		var focusArea = $(this).parent(".item");
		$(this).focus(function(){
		//$(this).on('focus',function(){
			$(this).addClass('inp_focus');
			$(this).parent('.soft_select').addClass('select_focus');
			//2018-03-28 아이콘타입 활성화 jck
			if ($(this).parent().hasClass('soft_ico')){
				$(this).parent().addClass('on');
			}
			$(this).parents('.soft_select').addClass('select_focus');
		}).blur(function(){
		//}).on('blur','select[data-name=inpFocus]',function(){
			$(this).removeClass('inp_focus');
			$(this).parents('.soft_select').removeClass('select_focus');
			//2018-03-28 아이콘타입 비활성화 jck
			if ($(this).parent().hasClass('soft_ico')){
				$(this).parent().removeClass('on');
			}
			$(this).parents('.soft_select').removeClass('select_focus');
		});
	});
});