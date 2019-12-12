//ui 전역변수 추가하여 UI관련 함수 설정
var ui = {
	//소수점 콤마 체크
	numDecimal : function(x) {
		var str = x.replace(/,/gi,''); // 콤마 제거
		var regx = new RegExp(/(-?\d+)(\d{3})/);
		var bExists = str.indexOf(".",0);
		var strArr = str.split('.');
		while(regx.test(strArr[0])){
		strArr[0] = strArr[0].replace(regx,"$1,$2");
		}
		if (bExists > -1)
		x = strArr[0] + "." + strArr[1];
		else
		x = strArr[0];
		return x
	},
	//정수 콤마 체크
	numComma : function(x) {
		if (x.substring(0,1) == 0){x = x.substring(1, x.length)}
		x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return x
	},
	//숫자 한글 변환
	numHan : function(num) {
		var fnEach = String.prototype.each ;
		String.prototype.each = fnEach || function(callback) {
			var str = this;
			for( var i = 0 ; i < str.length ; i++) {
				callback(i, str.charAt(i));
			}
		};

		var baseNames =  ["천", "백", "십", ""];
		var levelNames = ["", "만 ", "억 ", "조 ",
						  "경 ", "해 ", "자 ", "양 ",
						  "구 ", "간 ", "정 ", "재 ",
						  "극 ", "항하사 ", "아승기 ", "나유타 ",
						  "불가사의 ", "무량대수 "];
		var type = "LOW";
		delimChar = "";

		var decimal = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];

		var level = parseInt(num.length / baseNames.length);
		var start = 0;
		var end = num.length % baseNames.length; // 0, 1, 2, 3
		/* start validation */
		if ( num.length > 69 ) {
			throw "too long number : " + num ;
		}
		if ( isNaN(num) ) {
			throw "not a number form : " + num ;
		}
		if ( ! isFinite(num) ) {
			throw "not finite : " + num ;
		}
		/* end validation */

		if ( end == 0) { // in case the length of num is => 0, 4, 8, 12, ...
			end = Math.min(num.length, baseNames.length) ;
			level --;
		} else {
			for( var k = 0 ; k < baseNames.length-end; k++) {
				num = "0" + num;
			}
			end = baseNames.length;
		}

		var toKorString = "";
		var fns = {
				"LOW" : function (i, ch) {
					if ( ch !== "0"){
						unitStr += ch;
					} else if ( ch === "0" && unitStr.length > 0 ) {
						unitStr += ch;
					}
				},
				"HALF" : function(i, ch) {
					if ( ch != "0" ) {
						unitStr += ch + baseNames[i];
					}
				},
				"HIGH" : function (i, ch) {
					if ( ch != "0") {
						unitStr += decimal [ parseInt(ch)] + baseNames[i];
					}
				}
			};

		while ( start < num.length ) {
			var partial = num.substring(start, end);
			var unitStr = "";

			partial.each ( fns[type] );

			if ( unitStr.length > 0 ) {
				toKorString += unitStr + levelNames[level] + delimChar ;
			}
			level --;
			start = end;
			end += baseNames.length;
		}

		toKorString = toKorString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return toKorString;
	},
	android_version : function () {
		var agentIndex = navigator.userAgent.indexOf('Android');
		var androidversion;
		// 안드로이드 os 버젼 체크 TODO 테스트 기기에서 검증필요.
		var deviceAgent = 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; device Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Safari/533.1';
		if ( agentIndex != -1) {
			androidversion = parseFloat(deviceAgent.match(/Android\s+([\d\.]+)/)[1]);
		} else {
			androidversion = 'ios';
		}
		return androidversion;
	},
	hasObject : function($elem) { return $elem.length > 0; },
}; //ui

if(typeof jQuery !== 'undefined'){
	//Document Ready Start
	$(document).ready(function(){

		//Device Class Add
		deviceInfo = ui.android_version();
		if(deviceInfo) $('body').attr('data-device', deviceInfo).addClass(deviceInfo);

		$body = $("body");
		//Contents Size Cal;
		var docH, docW;
		docW = $(window).width();
		docH = $(window).height();

		//입력전에도 우측 0원
		//$("input.comma_wonhan").siblings('em').removeClass('won_del');
		//$("input.comma_wonhan").siblings('em').text("0");

		//원 및 한글표시
		$("input.comma_wonhan").focusin(function(){
			if ($(this).is('[data-unit]')){
				var val = String(this.value.replace(/[^0-9]/g, ""))
			}else {
				var val = String(this.value.replace(/[^0-9]/g, ""))
				//0원 기본표시 처리 2018-04-23 JCK
				if ($(this).attr('placeholder') == '0원'){
					$(this).attr('data-placeholder','0원');
					if(val.length < 1) {
						this.value = '0원';
						this.value = ui.numComma(val)+"0원";
						return false
					}
				}

				//최소단위추가 2018-06-25 JCK (P2P_MASV02Z01)
				if ($(this).is('[data-minVal]')){
					var unit = $(this).attr('data-minVal')+'원';
				}

				//Default
				else {
					if(val.length < 1) return false;
					this.value = ui.numComma(val)+" 원"; //원표시
				}
				//if(val.length < 1) return false;
				//this.value = ui.numComma(val)+" 원"; //원표시
			}
		  }).focusout(function(){
			if ($(this).is('[data-type=decimal]')){
				var val = String(this.value.replace(/[^0-9.]/g, ""))
			} else {
				var val = String(this.value.replace(/[^0-9]/g, ""))
			}
			//0원 기본표시 처리 2018-04-23 JCK
			if ($(this).attr('data-placeholder') == '0원'){
				if (this.value == '0원') {
					this.value = "";
					$(this).attr('placeholder', $(this).attr('data-placeholder'));
				}
			}
			if (this.value == '0원') this.value = "";
			if(val.length < 1) return false;
		});

		//원표시 없이 콤마만
		$("input.comma_wonhan.notwon").focusin(
		  function(){
			var val = String(this.value.replace(/[^0-9]/g, ""));
			if(val.length < 1) return false;
			this.value = ui.numComma(val);
		}).focusout(
		  function(){
			var val = String(this.value.replace(/[^0-9]/g, ""));
			if(val.length < 1) return false;
			this.value = ui.numComma(val);
		});

		$("input.comma_wonhan").on("keyup focusOut", function(e) { //keyup의 경우 이벤트 충돌이 있음, "문제되면 mouseleave touchend"로 변경
			//정규식 : 소수점인경우 & 아닌경우
			if ($(this).data('type') == 'decimal'){
				var val = String(this.value.replace(/[^0-9.]/g, "")); // 숫자 + 소수점 제외	> 삭제
				val = val.replace(/(^[0]{2})/g, "0");				// 0 연속입력			> 0 한개
				//val = val.replace(/([0])([1-9])/g, "$2");			// 0 다음 숫자일때		> 0 없애기
				val = val.replace(/(^\.)/g, "");					// . 먼저입력시			> . 삭제
				val = val.replace(/(\.\.)/g, ".");					// . 연속입력시			> . 한개
				val = val.replace(/(\.)(.*)(\.)/g, "$1$2");			// . 이 있으면			> . 입력생략
				val = val.replace(/(\.)([0-9]{2})(.*)/g, "$1$2");	// 소수점 2자리 이후		> 삭제
				//val = val.replace(/([0-9]{2})(.*)/g, "$1$2");		// 바꾸는게 없는데 이건 뭐지;;
			} else {
				var val = String(this.value.replace(/[^0-9]/g, ""));
			}

			//20180314 국가별 단위 추가
			if ($(this).is('[data-unit]')){
				var unit = ''+$(this).data('unit');
			} else {
				if ($(this).is('[data-minVal]')){
					var unit = $(this).attr('data-minVal')+'원';
				} else {
					var unit = ' 원';
				}
			}

			//천단위도 표시하는 조건추가
			 if ($(this).hasClass('comma_all')){
				$(this).siblings('em').text(ui.numHan(val));
			 }

			 //일반적인 원처리
			// else {
				//if(val.length >= 4) { //4보다 작은 경우
					//$(this).siblings('em').removeClass('won_del');
					//$(this).siblings('em').text(ui.numHan(val));
				 //} else {
						//$(this).siblings('em').addClass('won_del');
						//$(this).siblings('em').text("");
				 //}
			 //}

			//소수점인 경우
			if ($(this).data('type') == 'decimal'){
				 if(val == '') { //1보다 작은 경우, val 0인경우 추가
					this.value = ui.numDecimal(val); //원표시
				 } else {
					this.value = ui.numDecimal(val)+unit; //원표시
				 }
			}
			//소수점이 아닌경우
			//1원부터 모두 노출 요청
			else {
				 if(val.length < 1 || val =='0') { //1보다 작은 경우, val 0인경우 추가
					//0원 기본표시 처리 2018-04-23 JCK
					if ($(this).attr('data-placeholder') == '0원'){
						this.value = '0원';
						$(this).siblings('em').text("0");
					} else {
						this.value = ui.numComma(val);
						//$(this).siblings('em').addClass('won_del');
						$(this).siblings('em').removeClass('won_del');
						$(this).siblings('em').text("0");
					}
				 }else {
					this.value = ui.numComma(val)+unit; //원표시
					$(this).siblings('em').removeClass('won_del');
					$(this).siblings('em').text(ui.numHan(val));
				 }
			}
			 if($(this).hasClass('notwon')){
				this.value = ui.numComma(val);
			}

			$("input.comma_wonhan").on('keydown change', function(e){
				//if ( e.keyCode == 8) { 개발요청 2018-04-03 ock
				if (e.keyCode == "8" || e.which == "8") {
					//개발요청 해당페이지에만 적용건
					if(window.location.pathname.indexOf("MAS90P0402.web") > -1){
						this.value = ui.numComma($(this).val());
					}else{
						this.value = ui.numComma(val);
					}
				}
			});

			//특정 모바일 기기에서 다중입력되는 이슈 대응
			/*
			if (!$('body').is('.ios')){
				$(this).blur();
				$(this).focus();
			}
			*/
		});


		//하나머니 및 한글표시
		$("input.comma_wonhan.text_money").focusin(
		  function(){
			var val = String(this.value.replace(/[^0-9]/g, ""));
			//this.value = val;
			if(val.length < 1) return false;
				this.value = ui.numComma(val)+" 머니"; //머니표시
		  }).focusout(
		  function(){
			var val = String(this.value.replace(/[^0-9]/g, ""));

			if(val.length < 1) return false;
		});
		//입력전에도 우측 0머니
		//$("input.comma_wonhan.text_money").siblings('em').removeClass('won_del');
		//$("input.comma_wonhan.text_money").siblings('em').text("0");
		$("input.comma_wonhan.text_money").on("keyup focusOut", function(e) { //keyup의 경우 이벤트 충돌이 있음, "문제되면 mouseleave touchend"로 변경

			var val = String(this.value.replace(/[^0-9]/g, ""));

			//if(val.length >= 4) { //4보다 작은 경우
				//$(this).siblings('em').removeClass('won_del');
				//$(this).siblings('em').text(ui.numHan(val));
			 //} else {
				//$(this).siblings('em').addClass('won_del');
				//$(this).siblings('em').text("");
			 //}

			//1원부터 모두 노출 요청
			 if(val.length < 1 || val =='0') { //1보다 작은 경우, val 0인경우 추가
				this.value = ui.numComma(val);
				//$(this).siblings('em').addClass('won_del');
				$(this).siblings('em').removeClass('won_del');
				$(this).siblings('em').text("0");
			 } else {
				this.value = ui.numComma(val)+" 머니"; //머니표시
				$(this).siblings('em').removeClass('won_del');
				$(this).siblings('em').text(ui.numHan(val));
			 }

			$("input.comma_wonhan").on('keydown change', function(e){
				//if ( e.keyCode == 8) { 개발요청 2018-04-03 ock
				if (e.keyCode == "8" || e.which == "8") {
					this.value = ui.numComma(val);
				}
			});

		});


		//input.
		//if ( $("input.comma_wonhan").length > 0 ) {
		//	var $input = $("input.comma_wonhan").each(function(){
		//		var inTxt = this.value;
		//		var val = String(inTxt.replace(/[^0-9]/g, ""));
			//	 if(val.length < 1) return false;
		//		 this.value = ui.numComma(val)+" 원";
		//		$(this).siblings('em').text(ui.numHan(val));
		//	});
		//}

		//$("input.comma_wonhan").on("keyup focusOut", function() { //keyup의 경우 이벤트 충돌이 있음, "문제되면 mouseleave touchend"로 변경
		//		var val = String(this.value.replace(/[^0-9]/g, ""));
		//	 if(val.length < 1) return false;
		//		 this.value = ui.numComma(val)+" 원"; /* 원표시 */
		//		$(this).siblings('em').text(ui.numHan(val));
		//	});

		//Autofocus Attribute
		//$("input").each(function() {
		//		var attr = $(this).attr("autofocus");
		//	if (typeof attr === typeof undefined || attr === false) {
		//		$(this).attr("autofocus","autofocus");
		//	}
		//});


		//help tooltips
		$('body').on("click","button[data-name=open_help]", function(e){
			e.stopPropagation();
			$("button[data-name=open_help]").removeClass('on').next(".layer_wrap").hide().removeClass('on');
			//if ($(this).hasClass("on")) {
				//$(this).removeClass("on").next(".layer_wrap").hide().removeClass("on");
			//} else {
				//e.stopPropagation();
			$(this).addClass("on").next(".layer_wrap").fadeIn(500).addClass("on");
			//}
		});
		//body click closed tooltip


		$('body').on('touchend',".wrap, .modal_wrap", function(e) { // //$("body").click(function(e) {
			//openToastPopup("touchend");
			$("button[data-name=open_help]").removeClass("on");
			$(".layer_wrap").hide().removeClass("on");

		});

		//select input collabo
		$('select.pselect').on('change', function(){
			var val = $(this).find("option:selected").val();
			$(this).prev().val(val);
		});


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
					//$(this).siblings('em').css("color", "#f74b20");
					//$(this).css("color", "#6417f3"); 삭제 2018-04-13 ock
				} else {
					$(this).parent().siblings('.kor_txt').css("color", "#999");
					//$(this).siblings('em').css("color", "#222");
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

		//2018-01-31 select 포커스 추가 phj
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

		//속도 이슈, 보안 필요 2018-01-31 data-name 변경. 공통으로 확정 phj  //select 위치 이동, 정리필요 2018-04-05
		$('.soft_select').on('change', 'select[data-name=inpFocus]', function (event) {
			$(this).addClass('color_change');
		});

		// 2018-01-30 주민번호 입력 인풋 phj
		$('.resident_num input').focus(function(){
			$(this).parents('.resident_num').addClass('inp_focus');
			if($(this).is('[readonly]')){
				$(this).parents('.resident_num').css({'background-color':'#fff'},{'color':'#222'},{'border-color':'#e0e0e0'});
				$(this).parents('.resident_num').removeClass('inp_focus');
			}
		}).blur(function(){
			$(this).parents('.resident_num').removeClass('inp_focus');
		});
		$('.resident_num input').each(function(){
			if($(this).is(':disabled')){
				$(this).parents('.resident_num').css({'background-color':'#eee'},{'color':'#c8c8c8'});
			}
		});

		//2018-02-09 search 포커스 추가 ock
		$('body').each(function(){
			//var focusArea = $(this).parent(".item");
			//$(this).focus(function(){
			$(this).on('focus','.sec_notice_search .box_search input[data-name=inpFocus]',function(){
				$(this).parents('.box_search').addClass('search_focus');
			//}).blur(function(){
			}).on('blur','.sec_notice_search .box_search input[data-name=inpFocus]',function(){
				$(this).parents('.box_search').removeClass('search_focus');
			});
		});

		//2018-02-09 search 검색어 삭제 on
		//$('.sec_notice_search .box_search input[data-name=inpFocus]').on("keyup", function(e) {
		$('.sec_notice_search').on("keyup",".box_search input[data-name=inpFocus]", function(e) {
			var textSum = $(this).val();
			 if(textSum.length < 1) { //1보다 작은 경우
				$(this).next('.search_del').removeClass('on');
			 } else {
				$(this).next('.search_del').addClass('on');
			 }
		});
		//2018-02-09 search 검색어 삭제 ock
		$('.sec_notice_search .box_search').each(function(){
			var placeText = $(this).find('input').attr('placeholder');
			$(this).on('click','.search_del',function(){
				$(this).removeClass('on');
				$(this).prev('input').attr('placeholder', placeText).attr('autofocus','autofocus').val('');

				//var attr = $(this).prev('input').attr('autofocus');
				//if (typeof attr === typeof undefined || attr === false) {
					//$(this).prev('input').attr('autofocus','autofocus');
				//}
			});
		})

		//tab
		$('.tab_wrap').on('click','.tab',function(){
			var tnum = $(this).index();
			$(this).siblings().removeClass('on').end().addClass('on');
			$tab = $(this).parent().next();
			$tab.find('.tab_content.on').removeClass("on").fadeOut();
			$tab.find('.tab_content').eq(tnum).addClass("on").fadeIn();
		});

		//button
		$('.sec_select').on('click','[data-name=acc-button]', function(event){
			$(this).addClass("ico_dot").parent('li').siblings().find('[data-name=acc-button]').removeClass("ico_dot");
		});

		//Init Function
		UI_Init();

		//모달팝업
		/* modal popup */
		/* $("button.open_modal,a.open_modal").on("click", function(){
			var $mpop = $(this);

			var $mpopType = $mpop.data("mtype");
			var $mpopID = "#"+$mpop.data("triger");
			var $mpopClose = $mpop.data("bgclose");
			var conH = $($mpopID).find(".modal_content").outerHeight();

			//popup contents height < window height
			if(conH >= docH || ($mpopType=="fullpop")) {
				$($mpopID +"> .modal_content").css({
					height: docH
				});
			}else {
				$($mpopID).addClass("normal");
			}
			if($mpopClose) 	$($mpopID).data("bgclose", true);

			switch($mpopType) {
				case "fullpop":
					$($mpopID).toggleClass("visible");
					break;
				case "doublepop":
					$($mpopID).addClass("double").toggleClass("visible");
					break;
				default:
					$($mpopID).toggleClass("visible");
			}
			return false;
		});
		$(".modal_wrap").on("click","button.close_modal", function(){
			$(this).closest('.modal_wrap').toggleClass("visible");
			return false;
		});
		$(".modal_wrap").on("click", function(e){
			var status = $(this).data("bgclose");
			if(!$(".modal_content").has(e.target).length && status ) {
				if($(this).data("bgclose")) $(this).toggleClass("visible");
			}
		}); */

		//2018-01-22 bottom sticky banner by phj
		// 사용안함 2018-04-12 ock
		//function stickybanner() {
			//var Wimg = $(".sticky_banner img").width();
			//$(".sticky_banner img").css('margin-left',-Wimg/2);
		//} //stickybanner();

		//2018-03-29 input 포커스로 키패드 올라올때 하단 스티키 버튼 fixed 해제
		/*$("input[type='text'], input[type='text'], input[type='password'], input[type='submit'], input[type='search'], input[type='date'], input[type='tel'], input[type='number']").focus(function(){
			$(".sticky_wrap").css('position','static');
		}).blur(function(){
			$(".sticky_wrap").css('position','fixed');
		});*/
	});
	//Document Ready End

	//Document Ready 에서 UI_Init() 호출
	function UI_Init(){
		//탭전환
		tab_purple();

		//혜택계산기
		calculation();

		//input text countdown 위치이동
		countdown();

		//checkFlow
		checkFlow();

		//할인율 증가 감소
		Discount();

		//마켓 비상금대출의 하나 로고 //2018-04-04 개발 협의 후 document ready 안에 펑션만 넣음 phj
		hanalogo();

		//agree_terms checked
		allCheck();

		//토글메뉴
		listexpend();

		//일반숫자 한글변환
		numHanString();

		//일반숫자 콤마추가
		numCommaString();

		//inputSET
		inputSET();

		//P2P 별점수
		starRating();

	}

	//2018-01-07 tab_purple by phj
	function tab_purple() {
		$('.tab_purple').on('click', 'li', function(){
			//중복선택
			if ($(this).parent().data('selected') == 'multiple'){
				$(this).toggleClass('on');
			}
			//Default (클릭된 대상만 선택)
			else {
				var tnum = $(this).index();
				$(this).addClass('on');
				$(this).siblings('li').removeClass('on');
				$tab = $(this).parents('.tab_wrap').next('.tab_content_wrap');
				$tab.find('.tab_content.on').removeClass("on").fadeOut();
				$tab.find('.tab_content').eq(tnum).addClass("on").fadeIn();
			}
		});
	}

	//결과 없음 페이지 배경색 조절
	function noResult(){
		$('.no_result').each(function(){
			var wrap = $(this).parents('.wrap');
			if(wrap.hasClass('bg_list')){
				wrap.removeClass('bg_list');
			}
		});
	}

	//할인율 증가 감소
	function Discount(){
		//감소
		$('body').on('click','.btn_control_down',function(e){
			e.preventDefault();
			var target = $(this).siblings('span').find('.amount_num');
			var stat = target.val();
			var num = parseInt(stat,10);
			num--;
			if(num<=-1){
				target.parents('.amount_control').addClass('warning');
				num =0;
			}
			target.val(num);
			target.parents('.amount_control').removeClass('warning');
		});
		//증가
		$('body').on('click','.btn_control_up',function(e){
			e.preventDefault();
			var target = $(this).siblings('span').find('.amount_num');
			var stat = target.val();
			var num = parseInt(stat,10);
			num++;
			target.parents('.amount_control').removeClass('warning');
			if(num>5){
				target.parents('.amount_control').addClass('warning');
				num=5;
			}
			target.val(num);
		});
	}

	//2018-01-25 checkFlow ock
	function checkFlow() {
		//핀크 서비스 이용 동의 활성화
		$('.agree_terms.term1 dt').on('click','input[type="checkbox"]',function() {
			if ($(this).prop("checked")){
				$('.agree_terms.term1 dd input[name="check_action"]').prop('checked',true);
			} else {
				$('.agree_terms.term1 dd input[name="check_action"]').prop('checked',false);
			}
		});

		//핀크 서비스 이용 동의 비활성화
		$('.agree_terms.term1 dd').on('click','input[name="check_action"]',function(){
			var allFlow = $('.agree_terms.term1 dd input[name="check_action"]').length;
			var onlyFlow = $('.agree_terms.term1 dd input[name="check_action"]:checked').length;
			if( allFlow === onlyFlow ) {
				$('.agree_terms.term1 dt input[type="checkbox"]').prop('checked',true);
			} else {
				$('.agree_terms.term1 dt input[type="checkbox"]').prop('checked',false);
			}
		});

		//하나멤버스 서비스 이용 동의 활성화
		$('.agree_terms.term2 dt').on('click','input[type="checkbox"]',function() {
			if ($(this).prop("checked")){
				$('.agree_terms.term2 dd input[name="check_action"]').prop('checked',true);
			} else {
				$('.agree_terms.term2 dd input[name="check_action"]').prop('checked',false);
			}
		});

		//하나멤버스 서비스 이용 동의 비활성화
		$('.agree_terms.term2 dd').on('click','input[name="check_action"]',function(){
			var allFlow = $('.agree_terms.term2 dd input[name="check_action"]').length;
			var onlyFlow = $('.agree_terms.term2 dd input[name="check_action"]:checked').length;
			if( allFlow === onlyFlow ) {
				$('.agree_terms.term2 dt input[type="checkbox"]').prop('checked',true);
			} else {
				$('.agree_terms.term2 dt input[type="checkbox"]').prop('checked',false);
			}
		});

		//이용권유 방법 동의 활성화
		$('.method_agree').on('click','input[type="checkbox"]',function(){
			//$(this).parent().siblings('.agree_follow').toggleClass('on');
			if ($(this).prop("checked")){
				$('.agree_follow input[name="check_action"]').prop('checked',true);
			} else {
				$('.agree_follow input[name="check_action"]').prop('checked',false);
			}
		});

		//이용권유 방법 동의 비활성화
		$('.agree_follow').on('click','input[name="check_action"]',function(){
			var allFlow = $('.agree_follow input[name="check_action"]').length;
			var onlyFlow = $('.agree_follow input[name="check_action"]:checked').length;
			if( onlyFlow >= 1 ) {
				$('.method_agree input[type="checkbox"]').prop('checked',true);
			} else {
				$('.method_agree input[type="checkbox"]').prop('checked',false);
			}
		});
	}

	//2018-01-08 혜택 계산기 by phj
	//2018-06-11 혜택 계산기 by jck (전체 일때 수정)
	//2018-06-15 혜택 계산기 by jck (상속, 속도 수정)
	function calculation() {
		var valW  = 0; //.active - width
		var valL  = 0; //.knob - left
		var durW  = 0; //.active - duration
		var durL  = 0; //.knob - duration
		var delay = 0;
		var theLast = false;
		$(".benefit_cal ul li").each(function(num){
			var $this = $(this);
			var dur   = 600;
			var bar   = $this.parents('.benefit_cal').find(".bar");
			var active= $this.parents('.benefit_cal').find(".active");
			var knob  = $this.parents('.benefit_cal').find(".knob");
			var liww  = $this.parents('.benefit_cal').find("ul li").width()+20;
			var aww   = $this.parents('.benefit_cal').find("ul li a").width()/2;
			var liww2 = $this.parents('.benefit_cal').find("ul li").width()-aww;
			var size  = $this.parents('.benefit_cal').find("ul li").size();

			//마크업 구조변경
			if (!$(this).parents('.benefit_cal').hasClass('flexible')){
				active.after(knob);
			}

			//길이로 퍼센트구하기 = 실제길이/전체길이 * 전체비율
			var calPer = function(valNow, valMax){return valNow/valMax * 100}

			//퍼센트로 시간구하기 = 퍼센트값/전체비율 * 전체시간
			var calDur = function(valNow, valMax){return (calPer(valNow, bar.width())/100) * dur}

			//Active Animate
			var action = function(numW, numL){

				valW = liww*num+liww/2;
				valL = liww*num+liww/2;
				durW = calDur(Math.abs(valW-numW), bar.width());
				durL = calDur(Math.abs(valL-numL), bar.width());

				//마지막인 경우
				if ($this.is(':last-child')){
					valW = bar.width();
					valL = liww*num+liww/2;
					durW = calDur(Math.abs(valW-numW), bar.width());
					durL = calDur(Math.abs(valL-numL), bar.width());
					delay = 0;
					theLast = true;
				} else {
					if (theLast == true){
						valW_Last = liww*(size-1)+liww/2;
						delay = calDur(Math.abs(valW_Last-numW), bar.width());
					} else {
						delay = 0;
					}
					theLast = false;
				}

				active.animate({width:valW}, durW);
				setTimeout(function(){
					knob.animate({left:valL}, durL);
				}, delay)
			}

			//Init Animate
			if($this.hasClass('on')){
				setTimeout(function(){
					action(valW, valL);
				},800)
			}

			//Event Animate
			$this.on('click',function(){
				$(this).addClass('on').siblings().removeClass('on');
				action(valW, valL);
			});
		});

		//2018-03-28 P2P by jck
		$(".benefit_cal.flexible").each(function(){
			var bar = $(this).find(".active");
			var barTotal = bar.attr('data-total');
			var barValue = bar.attr('data-value');
			var barWidth = (barValue/barTotal)*100;
			var padRight = 0;
			bar.css({width:'0%'});

			if ($(this).parents('.p2p_wrap')){
				if (barWidth == '100'){
					bar.addClass('full');
				}
			}
			setTimeout(function(){
				bar.css({width:barWidth+'%',paddingRight:padRight});
			},600)
		})
	}

	//2018-05-23 Document Ready 밖으로 이동 (여러개의 동의 구분을 위해 선택자 구조 변경 [id*=all_chk])
	//2018-01-23 agree_terms checked
	function allCheck() {
		//활성화
		$('body').on('click','.agree_terms #all_chk',function() {
			var checked = $('#all_chk').prop('checked');
			$('input:checkbox[name="check_action"]').prop('checked',checked);
		});

		$('body').on('click','.sec_all_check #all_chk, .sec_term_type1 #all_chk', function() {
			var checked = $('#all_chk').prop('checked');
			$('input:checkbox[name="check_action"]').prop('checked',checked);
		});

		//비활성화
		$('.sec_term_type1').on('click','input[name="check_action"]',function(){
			setTimeout(function() {
				var allFlow = $('.agree_terms input[name="check_action"]').length;
				var onlyFlow = $('.agree_terms input[name="check_action"]:checked').length;
				if( allFlow === onlyFlow ) {
					$('#all_chk').prop('checked',true);
				} else {
					$('#all_chk').prop('checked',false);
				}
			}, 0);
		});
		$('.sec_all_check').on('click','input[name="check_action"]',function(){
			setTimeout(function() {
				var term1 = $('.agree_terms.term1 dt input[type="checkbox"]');
				var term2 = $('.agree_terms.term2 dt input[type="checkbox"]');
				if( term1.is(':checked') == true && term2.is(':checked') == true) {
					$('#all_chk').prop('checked',true);
				} else{
					$('#all_chk').prop('checked',false);
				}
			}, 0);
		});
	}

	//2018-05-23 Document Ready 밖으로 이동
	//2018-01-08 토글매뉴 by phj 2018-04-10 토글매뉴 변경 phj
	function listexpend() {
		$('body').on('click','.list_expend .subject',function(e){
			var $this = $(this);
			var action = function($this){
				var detail= $this.next();
				var hh= detail.find(".con").outerHeight();

				if ($this.hasClass('on')) {
					$this.removeClass('on');
					detail.removeClass('on');
					detail.animate({height:0,overflow:"hidden"},300);
				} else {
					$(".list_expend .subject").not(this).removeClass('on');
					$(".list_expend .detail_set").not(detail).removeClass('on');
					//$(".list_expend .detail_set").not(detail).animate({height:0,overflow:"hidden"},300);

					if (!$('.list_expend').hasClass('not_move')) {
						//list_expend에 not_move 클래스가 없을 때: 전에 열려있던것 닫힐 때 css로 좀 딱딱하게 닫힘. 마켓쪽 상세페이지에 사용 중
						$(".list_expend .detail_set").not(detail).css({height:0,overflow:"hidden"});
					} else {
						//list_expend에 not_move 클래스가 있을 때: 전에 열려있던것 닫힐 때 애니메이션되며 부드럽게 닫힘.
						$(".list_expend.not_move .detail_set").not(detail).animate({height:0,overflow:"hidden"},300);
					}

					$this.addClass('on');
					detail.addClass('on');
					detail.animate({height:hh,overflow:"visible"},300);

					setTimeout(function(){
						$('.benefit_cal ul li.on a').focus();
					},100)
					//2018-04-17 상단 이동 다시 원복 phj
					setTimeout(function() {
						var position = $('.list_expend .subject.on').offset();
						if (!$('.list_expend').hasClass('not_move')) {
							$('html, body').animate({scrollTop: position.top}, 300);
						}
					}, 0);
				}


            	var status = $(this).parents('li').find('div').has('benefit_cal');

            	if ( status ) {
            		console.log('aa')

					$('.benefit_cal li').on('touchmove')

            		setTimeout(function(){
						$('.benefit_cal li.on').trigger('click');
						$('.benefit_cal li.on a').trigger('click');
            		}, 100)

            	}
			}

			//약관전체동의 일때
			if ($this.is('.agree_check_all')){
				//체크박스가 아닌곳을 클릭했을때
				if ($this.find('label').parent().has(e.target).length === 0){
					action($this);
				}

				//화살표를 클릭했을 때
				else if (e.target.tagName == 'I'){
					action($this);
				}
			}

			//Default
			else {
				action($this);
			}
		});
		// 2018-03-27 습관저금, 투뿔카드, 핀크카드, T핀크적금 [혜택 계산기], 해외 송금 [송금 미리보기] 디폴트로 열려있게
		$('.sec_habit_cate .list_expend li, .sec_twoplus_cate .list_expend li, .sec_finnqcard_cate .list_expend li, .sec_account_cate .list_expend li, .sec_foregin_cate .list_expend li').eq(0).find('.subject').addClass('on');
		$('.sec_habit_cate .list_expend li, .sec_twoplus_cate .list_expend li, .sec_finnqcard_cate .list_expend li, .sec_account_cate .list_expend li, .sec_foregin_cate .list_expend li').eq(0).find('.detail_set').css('height','auto').addClass('on');

	}

	//한글변환
	function numHanString(){
		$('.numHan').each(function(){
			var val = $(this).text(); //문자형식이어야 함
			$(this).text(ui.numHan(val));
		});
	}

	//콤마변환
	function numCommaString(){
		$('.numComma').each(function(){
			var val = $(this).text();
			var str = '';
			if (val.indexOf('-') > -1){
				str = '-';
				val = String(val.replace(/[^0-9]/g, ""));
			}
			if (parseInt(val) > 0){
				$(this).text(ui.numComma(str+val));
			}
		});
	}

	//마켓 비상금대출의 하나 로고 //2018-04-04 개발 협의 후 document ready 밖으로 phj
	function hanalogo(){
		var term = $('.add_hana_logo section.emergency_term'); //2018-04-04 추가
		$('.add_hana_logo section').not(term).each(function(){
			var winhh = $(window).height()-60;
			var conhh = $(this).innerHeight();
			var logo = $(this).find('.hana_logo');
			if(conhh<winhh){
				$('.add_sticky .hana_logo').css('bottom',60);
				$(this).parent("#contents").removeClass('add_hana_logo');
			}
		});
	}

	//2018-04-05 약관 부분만 적용 phj
	function hanalogo2(){
		$('.add_hana_logo section.emergency_term').each(function(){
			var winhh = $(window).height()-60;
			var conhh = $(this).innerHeight();
			var logo = $(this).find('.hana_logo');
			if(conhh<winhh){
				$('.add_sticky .hana_logo').css('bottom',60);
				$(this).parent("#contents").removeClass('add_hana_logo');
			}
		});
	}

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

		/* 2018-04-06 위치값에 따라서 사이드위치 맞춤(백업) JCK
		//90보다 작을때 (회수)
		if ($('.step_tooltip').outerWidth() < 90){
			var valMin = total * 0.03;
			var valMax = total * 0.95;
			if(val<valMin){
				$('.step_tooltip').css({'left':bar_width, 'margin-left':'-24px'});
			} else if(val>valMax){
				$('.step_tooltip').css({'left':bar_width, 'margin-left':'-64px'});
			} else {
				$('.step_tooltip').css({'left':bar_width});
			}
		}

		//105보다 클때 (500,000원)
		else if ($('.step_tooltip').outerWidth() < 106){
			var valMin = total * 0.1;
			var valMin2 = total * 0.15;
			var valMin3 = total * 0.88;
			var valMax = total * 0.95;
			if(val<valMin){
				$('.step_tooltip').css({'left':bar_width, 'margin-left':'-20px'});
			} else if(val<valMin2){
				$('.step_tooltip').css({'left':bar_width, 'margin-left':'-45px'});
			} else if(val>valMax){
				$('.step_tooltip').css({'left':bar_width, 'margin-left':'-90px'});
			} else if(val>valMin3){
				$('.step_tooltip').css({'left':bar_width, 'margin-left':'-75px'});
			} else {
				$('.step_tooltip').css({'left':bar_width});
			}
		} else {
			var obj_width = tooltip.outerWidth();
			var marignVal = obj_width / -2;
			var std_pos_left = 10;
			var std_pos_right = $(document).width() - 10;
			var obj_pos_left = bar_width + 20 - (obj_width/2);
			var obj_pos_right = bar_width + 20 + (obj_width/2);
			if (obj_pos_left < std_pos_left ){
				marignVal = (std_pos_left + bar_width) * -1;
			} else if (obj_pos_right > std_pos_right){
				marignVal = marignVal + (std_pos_right - obj_pos_right);
			}
			tooltip.css({'left':bar_width, 'margin-left':marignVal});
		}
		*/
	};
	// -------------@ 그래프 @	------------

	function inputSET(){
		$(document).on('focus', 'input[data-name=inpFocus], textarea[data-name=inpFocus]', function(){
			if ($(this).attr("placeholder") != ""){
				$(this).attr('data-placeholder', $(this).attr("placeholder"));
			}
			var focusArea = $(this).parent(".item");
			$(this).addClass('inp_focus');
			$(this).parent(".ico_won").addClass('on');
			$(this).parent().siblings('.kor_txt').css("color", "#6417f3");
		}).on('blur', 'input[data-name=inpFocus], textarea[data-name=inpFocus]', function(){
			var focusArea = $(this).parent(".item");
			$(this).removeClass('inp_focus');
			$(this).parent(".ico_won").removeClass('on');
			if(focusArea.hasClass('inp_error')){
				$(this).parent().siblings('.kor_txt').css("color", "#f74b20");
				//$(this).siblings('em').css("color", "#f74b20");
				//$(this).css("color", "#6417f3"); 삭제 2018-04-13 ock
			} else {
				$(this).parent().siblings('.kor_txt').css("color", "#999");
				//$(this).siblings('em').css("color", "#222");
			}
		}).on('keyup', 'input[data-name=inpFocus], textarea[data-name=inpFocus]', function(){
			var textSum = $(this).val();
			if(textSum.length >= 1) {
				$(this).attr('placeholder','');
			} else {
				$(this).attr('placeholder',$(this).attr('data-placeholder'));
			}
		})
	}

	//input text countdown //2018-04-09 keyup외에 input추가 phj
	//data-length 가 있는 경우는 data-length 로 체크, maxlength 엔터 이슈 2018-07-12 ock
	function countdown() {
		$(".inp_count").each(function(){
			var attrMax = $(this).attr("maxlength");
			var limit = parseInt(attrMax);
			if ($(this).is("textarea")){
				if (typeof attrMax !== typeof undefined && attrMax !== false) {
					var limit = parseInt($(this).attr("data-length"));
					$(this).attr("maxlength", "");
				}
			}
			var remain = $(this).parents('.wrap_count').find('.txt_count i');
			remain.html(limit);
		});

		var inpVal;
		$('.inp_count').bind('keyup input', function (e) {
			var attrMax = $(this).attr("maxlength");
			var limit = parseInt(attrMax);
			if ($(this).is("textarea")){
				if (typeof attrMax !== typeof undefined && attrMax !== false) {
					var limit = parseInt($(this).attr("data-length"));
					$(this).attr("maxlength", "");
				}
			}
			var count = $(this).parents('.wrap_count').find('.txt_count em');
			var length = $(this).val().length;
			//2018-04-17 안드로이드 관련 수정 조찬기 차장님
			if (length > limit){
				length = limit;
				inpVal = $(this).val().substring(0,limit);
				$(this).val(inpVal);
			}
			count.text(length);
		});

	}

	function reportRanking(){
		$('.fingo_report .list_ranking .progress_wrap').each(function() {
			var barWidth = $(this).find('._bar').outerWidth();
			var bar = $(this).find('._bar');
			if (barWidth <= 30){
				bar.css({'border-radius':'0','width':15}); //2018-04-16 width 15추가 phj
				bar.find('.icon').animate({'left':0});
			}
		});
	}

	//2018-03-26 안드로이드 폰트 사이즈 고정 스크립트
	//Star Rating
	function starRating(){
		$('.starRating').each(function(){
			var n;
			var $obj = $(this);

			//Click
			if ($(this).data('role') == 'click'){
				$(this).find('button').on('click', function(){
					n = $(this).index();
					$obj.find('.ico_star').removeClass('on');
					for (var i = 0; i <= n ; i++ ){
						$(this).parent().find('button').eq(i).find('.ico_star').addClass('on');
					}
				})
			}

			//View (data-value="")
			else {
				n = $(this).attr('data-value');
				$obj.find('button .ico_star').removeClass('on');
				for (var i = 0; i < n ; i++ ){
					$obj.find('button').eq(i).find('.ico_star').addClass('on');
				}
			}
		})
	}

	//만족도 멀티라인 활성화 체크
	function multiLineActive(){
		$('.satisfact_detail .txt_content').each(function(){
			var outerH = $(this).outerHeight();
			var innerH = $(this).find('.txt_inner').outerHeight();
			if (innerH - 5 < outerH){
				$(this).parent().removeClass('ellipsis');
			}
		})
		$('.satisfact_detail .cont_toggle button').on('click', function(){
			var $ellipsisObj = $(this).parent().prev();
			if ($ellipsisObj.attr('data-state') == 'compact'){$ellipsisObj.attr('data-state', 'extend')}//전체보기로 전환
			else if ($ellipsisObj.attr('data-state') == 'extend'){$ellipsisObj.attr('data-state', 'compact')}//간략히보기로 전환
		})
	}

	//P2P SVG그래프
	function svgGraph(){
		//실행하지 않은 요소.not('.active')만 실행
		$('.svg_graph:visible').not('.active').each(function(){
			//비율 구하기
			//수치 구하기
			var $this = $(this);
			var valRotate = -90; //circle의 각도 시작점
			var setRotate;
			var setDashArray; //circle의 r * 6.28
			var setDashoffset; //dashoffset은 0일때 100%
			var svgTarget;
			var svgValue;
			var time = 800;

			$this.addClass('active'); //실행 했다는 표시

			if ($this.is('[data-value]'))    {var dataValue   = $this.data('value')}  //기본값
			if ($this.is('[data-total]'))    {var dataTotal   = $this.data('total')}  //전체값
			if ($this.is('[data-repay]'))    {var dataRepay   = $this.data('repay')}  //상환금액
			if ($this.is('[data-overdue]'))  {var dataOverdue = $this.data('overdue')}//연체금액
			if ($this.is('[data-giveup]'))   {var dataGiveup  = $this.data('giveup')} //부도금액
			if ($this.is('[data-poor]'))   {var dataPoor  = $this.data('poor')} //부실 2018-11-27 ock

			//데이터로 퍼센트구하기 = 실제값/전체값 * 전체비율
			var calPercent = function(val, total){
				var value = val/total * 100;
				return value;
			}

			//퍼센트로 길이구하기 = 퍼센트값/100(%) * 전체길이
			var calDashoffset = function(val){
				if ($this.find('svg.basic circle').length > 0){valDashArray = parseInt($this.find('svg.basic circle').css('r')) * 6.28}
				var value = valDashArray - ((parseInt(val)/100) * valDashArray);
				return value;
			}

			//퍼센트로 각도구하기 = 퍼센트값/100(%) * 전체각도
			var calRotate = function(val){
				var value = ((parseInt(val)/100) * 360) + valRotate;
				return value;
			}


			//Default (data-value 값을 지정하는 경우)
			var action = function(){
				setTimeout(function(){
					if ($this.find('.label.animate').length > 0){
						//animate 해제 (개발요청)
						$this.find('.label.animate').html('<span class="num bold">'+ dataValue +'</span>%');
						/* animate 디자인적용
						var i = 0;
						$({i:0}).animate({i:dataValue}, {
							duration: 500,
							step: function() {$this.find('.label').html('<span class="num bold">'+ Math.floor(this.i) +'</span>%')},
							complete: function() {$this.find('.label').html('<span class="num bold">'+ Math.floor(this.i) +'</span>%')}
						})
						*/
					}

					//진행요소
					if ($this.find('svg.ing').length > 0){
						setDashoffset = calDashoffset(dataValue);
						var ingDashoffset = setDashoffset;
						$this.find('svg.ing circle').css('stroke-dashoffset', ingDashoffset);
					}

					//부도요소
					if ($this.find('svg.giveup').length > 0){
						var giveupPercent = calPercent(dataGiveup, dataTotal);
						var giveupRotate = calRotate(giveupPercent);
						var giveupDashoffset = calDashoffset(giveupPercent);
						if (giveupPercent > 0){
							$this.find('svg.giveup').css({'-webkit-transform':'rotate('+valRotate+'deg)', 'transform':'rotate('+valRotate+'deg)'});
							$this.find('svg.giveup circle').css('stroke-dashoffset', giveupDashoffset);
						}
					}

					//상환요소
					if ($this.find('svg.repay').length > 0){
						var repayPercent = calPercent(dataRepay, dataTotal);
						var repayRotate = calRotate(repayPercent);
						var repayDashoffset = calDashoffset(repayPercent);
						var sec = 0;
						//부도가 있을때
						if ($this.find('svg.giveup').length > 0){
							if (giveupPercent > 0){
								//sec = time;
								repayDashoffset = calDashoffset(repayPercent);
								$this.find('svg.repay').css({'-webkit-transform':'rotate('+giveupRotate+'deg)', 'transform':'rotate('+giveupRotate+'deg)'});
							}
						}
						setTimeout(function(){
							$this.find('svg.repay circle').css('stroke-dashoffset', repayDashoffset);
						},sec)
					}

					//연체요소
					if ($this.find('svg.overdue').length > 0){
						var overduePercent = calPercent(dataOverdue, dataTotal);
						var overdueRotate = calRotate(repayPercent);
						var overdueDashoffset = calDashoffset(overduePercent);
						var sec = 0;
						//부도가 있을때
						if ($this.find('svg.giveup').length > 0){
							//sec += time;
							overdueRotate += giveupRotate;
						}
						//상환이 있을때
						if ($this.find('svg.repay').length > 0){
							//sec = time;
							overdueRotate = repayRotate;
						}
						$this.find('svg.overdue').css({'-webkit-transform':'rotate('+overdueRotate+'deg)', 'transform':'rotate('+overdueRotate+'deg)'});

						if (overduePercent > 0){
							setTimeout(function(){
								$this.find('svg.overdue circle').css('stroke-dashoffset', overdueDashoffset);
							},sec)
						}
					}

					//부실요소
					if ($this.find('svg.poor').length > 0){
						var poorPercent = calPercent(dataPoor, dataTotal);
						var poorRotate = calRotate(poorPercent);
						var poorDashoffset = calDashoffset(poorPercent);
						var sec = 0;

						//부도가 있을때
						//if ($this.find('svg.giveup').length > 0){
							//poorRotate += giveupRotate;
						//}

						//부도, 상환이 있을때
						if ($this.find('svg.repay').length > 0){
							poorRotate = giveupRotate + repayRotate + 90;
						}
						$this.find('svg.poor').css({'-webkit-transform':'rotate('+poorRotate+'deg)', 'transform':'rotate('+poorRotate+'deg)'});
						if (poorPercent > 0){
							setTimeout(function(){
								$this.find('svg.poor circle').css('stroke-dashoffset', poorDashoffset);
							},sec)
						}
					}
				}, 0) //animate 적용시 1000으로 변경
			}

			action();
		})
	}

	//P2P 상환내역 리스트
	function listRepeat(){
		$('.list_repeat.list_toggle .list_box').on('click', function(){
			if (!$(this).is('.disabled')){
				var $target = $(this).find('.cal_detail_wrap');
				if ($target.is(':visible')){$target.stop().slideUp();}
				else {$target.stop().slideDown()}
			}
		})
	}

	function FilterSwith(){
		$('.filter_toggle').on('click', function(){
			$(this).find('.ico_filter').toggleClass('on');
		})
	}

	//정렬방법 선택
	function tabOrder(){
		$('.tab_order a').on('click', function(){
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
		})
	}

	//막대그래프
	function barsGraph(){
		setTimeout(function(){
			$('.graph_group .bar').each(function(){
				var $this = $(this);

				//라벨 배치
				$this.find('.bar_value').show();
				var barValueWidth = Math.ceil($this.find('.bar_value').outerWidth()/2);
				$this.find('.bar_value').css({marginLeft:-barValueWidth});

				//그래프 채우기
				var maxValue = $this.attr('data-max');
				var thisValue = $this.attr('data-value');
				var barHeight = (thisValue/maxValue) * 100;
					$this.css({height:barHeight+'%'});

				$this.parent().on('click', function(){
					$(this).addClass('on').siblings().removeClass('on');
				})
			})
		}, 500);
	}

	//막대그래프2
	function barsGraph2(){
		setTimeout(function(){
			$('.graph_group .bar:visible').each(function(){
				var $this = $(this);

				//라벨 배치
				$this.next('.label_value').show();
				var barValueWidth = Math.ceil($this.find('.bar').outerWidth()/2);
				$this.find('.bar_value').css({marginLeft:-barValueWidth});

				//그래프 채우기
				var maxValue = $this.attr('data-max');
				var thisValue = $this.attr('data-value');
				var barWidth = (thisValue/maxValue) * 100;
					$this.css({width:barWidth+'%'});

				$this.parent().on('click', function(){
					$(this).addClass('on').siblings().removeClass('on');
				})
			})
		}, 500);
	}


	//막대그래프3
	function barsGraph3(){
		setTimeout(function(){
			$('.graph_group .bar:visible').each(function(){
				var $this = $(this);
				//그래프 채우기
				var maxValue = $this.attr('data-max');
				var thisValue = $this.attr('data-value');
				var barWidth = Math.round((thisValue/maxValue) * 100);
				$this.css({width:barWidth+'%'}).find('strong').text(100 - barWidth+'%').css({'opacity':'1'},500);
			})
		}, 500);
	}

	function barsGraph4(){
		setTimeout(function(){
			$('.graph_group .bar:visible').each(function(){
				var $this = $(this);

				//라벨 배치
				$this.next('.label_value').show();
				var barValueWidth = Math.ceil($this.find('.bar').outerWidth()/2);
				$this.find('.bar_value').css({marginLeft:-barValueWidth});

				//그래프 채우기
				var maxValue = $this.attr('data-max');
				var thisValue = $this.attr('data-value');
				var barWidth = (maxValue - thisValue);

				$this.css({width:barWidth+'%'}).find('strong').text(thisValue+'%').css({'opacity':'1'},500);
			})
		}, 500);
	}


	//결과없음 자동높이
	function noDataHeight(target){
		var $this = $(target);
		var maxH = $(window).height();
		var objH = parseInt(maxH) - (parseInt($('.p2p_wrap section').outerHeight()) - parseInt($(target).outerHeight()));
		$this.css({height:objH});
		if ($('.bg_list').length > 0){
			$('.bg_list').removeClass('bg_list');
		}
	}

	//퍼센트 에니메이트 (HTML function 제거 후 삭제요망)
	function percentAnimate(target, dataValue){
		/*
		var $this = target;
		var i = 0;
		var dataValue = parseInt($this.text());
		$this.text('');

		$({i:0}).animate({i:dataValue}, {
			duration: 500,
			step: function() {$this.html('<span class="num">'+ Math.floor(this.i) +'</span>%')},
			complete: function() {$this.html('<span class="num">'+ Math.floor(this.i) +'</span>%')}
		})
		*/
	}

	//해외송금 상세내역 진행단계
	function stepOrsremt(){
		$('.step_orsremt').each(function(){
			//Design Set
			var $this = $(this);
			var $label = $this.find('.step_label');
			var $active = $this.find('.step_bar .active');
			var $target = $this.find('.step_bar .target');
			var stepMax = $label.length;
			var stepNow = parseInt($this.data('step'));
			var percent = 100/(stepMax-1);
			var widthVal = 0;
			var leftVal = 0;
			var startVal = 0;

			$label.each(function(k){
				//Grid SET
				if (k == stepMax-1){$label.eq(k).css({right:0})}
				else {$label.eq(k).css({left:(k*percent)+'%'})}

				//AddClass Active
				if (k < stepNow){ $label.eq(k).addClass('active')} else {$label.eq(k).removeClass('active')}

				//AddClass Current
				if (k == stepNow-1){
					$label.eq(k).addClass('current');
					widthVal = (100/(stepMax-1)) * (stepNow-1);
					if (k > 0){startVal = (100/(stepMax-1)) * (stepNow-2)} //현재단계의 전단계부터 시작
					if (k == stepMax-1){leftVal = -8} //현재단계의 전단계부터 시작
				} else {
					$label.eq(k).removeClass('current');
				}
			})
			$active.css({width:startVal+'%'});
			$target.css({left:startVal+'%'});

			//Event Set
			var action = function(){
				$this.addClass('e-trans');
				$active.css({width:widthVal+'%'});
				$target.css({left:widthVal+'%'});
				$target.css({marginLeft:leftVal});
			}
			setTimeout(function(){
				action();
			},500);
		})
	}

	//UI용 Modal
	var commModal = {
		event  : function(){
			$("button.open_modal,a.open_modal").on("click", function(){
				var $mpop = $(this);
				var $mpopID = $mpop.data("triger");
				var $mpopType = $mpop.data("mtype");
				var $mpopClose = $mpop.data("bgclose");
				commModal.open($mpopID, $mpopType, $mpopClose);
				return false;
			});
			$(".modal_wrap").on("click","button.close_modal", function(){
				commModal.close($(this));
				return false;
			});
			$(".modal_wrap").on("click", function(e){
				var status = $(this).data("bgclose");
				if(!$(".modal_content").has(e.target).length && status ) {
					if($(this).data("bgclose")) $(this).toggleClass("visible");
				}
			});
		},
		open : function($mpopID, $mpopType, $mpopClose){
			//Contents Size Cal;
			var $body, docH, docW;
			$body = $("body");
			docW = $(window).width();
			docH = $(window).height();
			var $mpopID = "#"+$mpopID;

			var conH = $($mpopID).find(".modal_content").outerHeight();
			//popup contents height < window height
			if(conH >= docH || ($mpopType=="fullpop")) {
				$($mpopID +"> .modal_content").css({
					height: docH
				});
			}else {
				$($mpopID).addClass("normal");
			}
			if($mpopClose) 	$($mpopID).data("bgclose", true);

			switch($mpopType) {
				case "fullpop":
					$($mpopID).toggleClass("visible");
					break;
				case "doublepop":
					$($mpopID).addClass("double").toggleClass("visible");
					break;
				default:
					$($mpopID).toggleClass("visible");
			}
		},
		close : function($this){
			$this.closest('.modal_wrap').toggleClass("visible");
		}
	}
}
