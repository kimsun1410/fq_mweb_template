$(function(){

	var winH 		= $(window).height(),
		btnFixWrap	= $('.sticky_wrap');

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

	// 아이폰 X 버튼 대응
	function iphoneXFunc(){
		var winH = $(window).height();
		if ( $('body').hasClass('ios') ) {
			if (winH >= 812) {
				$('body').addClass('iphoneX');
			}else {
				$('body').removeClass('iphoneX');
			}
		}
	}
	iphoneXFunc();

	$(window).resize(function(){
		iphoneXFunc();
	});
	// 아이폰 X 버튼 대응

	// 아이폰 키패트 공통 JS
	function iphoneKeypadFocus()
	{
		if ( $('body').hasClass('ios') )
		{
			var windowH = $(window).height();

			$(window).resize(function(){
				// alert(winH)
				if (( windowH + 100 ) >= windowH ) {
					btnFixWrap.show();
				} else {
					btnFixWrap.hide();
				}
			});
		}
	}
	iphoneKeypadFocus();


	// INPUT FOCUS
	$('input[data-name=inpFocus], textarea[data-name=inpFocus]').each(function(){
		var placeText = $(this).attr("placeholder");
		$(this).focus(function(){
			var focusArea = $(this).parent(".item");
			$(this).addClass('inp_focus');
			$(this).parent(".ico_won").addClass('on');
			$(this).parent().siblings('.kor_txt').css("color", "#6417f3");
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

	//help tooltips
	$('body').on("click","button[data-name=open_help]", function(e){
		e.stopPropagation();
		$("button[data-name=open_help]").removeClass('on').next(".layer_wrap").hide().removeClass('on');
		$(this).addClass("on").next(".layer_wrap").fadeIn(500).addClass("on");
	});
	//body click closed tooltip

	// 툴팁 이벤트
	$(document).on('touchend',".wrap, .modal_wrap", function(e) {
		$("button[data-name=open_help]").removeClass("on");
		$(".layer_wrap").hide().removeClass("on");
	});

	// 해더 고정
	function kdbHeaderFix(){
		var _headerH = $('.sec_ows_head.finnq').outerHeight() + 28;
		$('#contents section').css({'padding-top' : _headerH + 'px'});
	}
	kdbHeaderFix();

	// 안드로이드 키패드 스크립트
	function androidKeypadFunc()
	{
		if ( !$('body').hasClass('ios') )
		{
			$(window).resize(function(){
				if ( $(window).height() + 100 >= winH ) {
					// 키패드 비활성화
					btnFixWrap.show();
				} else {
					// 키패드 활성화
					btnFixWrap.hide();
				}
			});
		}
	}
	androidKeypadFunc();

	// 아이폰 용 키패드 스크립트
	function iosKeypadFunc()
	{
		if ( $('body').hasClass('ios') )
		{
			$('input[data-name=inpFocus], textarea[data-name=inpFocus]').each(function(){
				$(this).on('focusin', function(){
					btnFixWrap.css({'position':'static', 'padding-top' : '40px'});
				}).on('focusout', function(){
					btnFixWrap.css({'position':'fixed', 'padding-top' : '0px'});
				});
			});

			// SELECT FOCUS
			$('select[data-name=inpFocus]').each(function(){
				$(this).on('focusin', function(){
					btnFixWrap.css({'position':'static', 'padding-top' : '40px'});
				}).on('focusout', function(){
					btnFixWrap.css({'position':'fixed', 'padding-top' : '0px'});
				});
			});
		}
	}
	// iosKeypadFunc();
});
