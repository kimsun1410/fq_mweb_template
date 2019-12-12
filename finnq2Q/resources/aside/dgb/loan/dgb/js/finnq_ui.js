
	// -------------@ 그래프 @	------------
	// # 프로그래스 그래프 그리기
	var drawProgress = function(_target) {
		var progress = $(_target);
		var pg_bar = progress.find('._bar');
		var total = progress.attr('data-value');
		var val = pg_bar.attr('data-value');
		var bg_width = progress.outerWidth();
		var rate = (val / total) * 100;
		var bar_width = Math.floor((bg_width * rate)/100);
		//break;
		pg_bar.css({'width':bar_width});

		//핀고 성적표 출석
		var text = progress.find('.txt');
		var tooltip = progress.find('.step_tooltip');
		//text.css({'right':0});
		text.find('em').html(val);
		//핀고 성적표 min, max값
		$(_target).each(function() { //2018-08-06 양일동M 핀고 성적표 수정 씽크맞춤
			var txt = $(this).find('.txt');
			var val = $(this).find('._bar').attr('data-value');
			var valMax = $(this).find('._bar').attr('data-rate');
			if(val == 0){
				txt.addClass('min');
			} else if(val == valMax){
				txt.addClass('max');
			} else {
				txt.css({'left':bar_width});
			}
		});

		//2018-02-11 비상금대출 그래프
		var text2 = progress.find('.count .num');
		var val2 = String(pg_bar.attr('data-value').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		text2.html(val2);

		//2018-04-06 위치값에 따라서 사이드위치 맞춤(추가) JCK
		var obj_width = tooltip.outerWidth();
		var marignVal = obj_width / -2;

		//type_2는 CSS그림자로 공백없음
		if (progress.parent().is('.type_2')){
			var std_pos_left = 10;
			var std_pos_right = $(document).width() - 10;
			var obj_pos_left = bar_width + 20 - (obj_width/2);
			var obj_pos_right = bar_width + 20 + (obj_width/2);
		}

		//Default
		else {
			var std_pos_left = 17;
			var std_pos_right = $(document).width() - 10;
			var obj_pos_left = bar_width + 15 - (obj_width/2);
			var obj_pos_right = bar_width + 12 + (obj_width/2);
		}

		//Action
		if (obj_pos_left < std_pos_left ){
			marignVal = (std_pos_left + bar_width) * -1;
		} else if (obj_pos_right > std_pos_right){
			marignVal = marignVal + (std_pos_right - obj_pos_right);
		}
		tooltip.css({'left':bar_width, 'margin-left':marignVal});
	};
	// -------------@ 그래프 @	------------
	//
$(function(){

	var winH 	= $(window).height(),
		btnFixWrap = $('.sticky_wrap');

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
	function dgbHeaderFix(){
		var _headerH = $('.sec_ows_head.finnq').outerHeight() + 28;
		$('#contents section').css({'padding-top' : _headerH + 'px'});
	}
	dgbHeaderFix();


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
