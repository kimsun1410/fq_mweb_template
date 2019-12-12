/******************************************************************************
*	용도		:	이벤트 / 콜라보에 사용되는 공통 UI.js
*	대상 		:	Finnq 홈페이지 서버에 올라가는 이벤트 및 콜라보 페이지
*	주의		:	스크립트 작성시 간략한 주석 표기
*	참고사항	:	없음
*	기타		:	퍼블리싱 UI 개발용
*	작성일자	:	2019.01.17
*******************************************************************************/

//ui 전역변수 추가하여 UI관련 함수 설정
var ui = {
	android_version : function () {
		var agentIndex = navigator.userAgent.indexOf('Android');
		var androidversion;
		// 안드로이드 os 버젼 체크 TODO 테스트 기기에서 검증필요.
		var deviceAgent = 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; device Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Safari/533.1';
		if ( agentIndex != -1) {
			//console.log(deviceAgent.match(/Android\s+([\d\.]+)/)[1]);
			androidversion = parseFloat(deviceAgent.match(/Android\s+([\d\.]+)/)[1]);
		} else {
			androidversion = 'ios';
		}
		return androidversion;
	},
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

		//Init Function
		UI_Init();

		//모달팝업
		/* modal popup */
		$("button.open_modal,a.open_modal").on("click", function(){
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
		});
	});
	//Document Ready End

	//Document Ready 에서 UI_Init() 호출
	function UI_Init(){
		//agree_terms checked
		allCheck();

	}
	//agree_terms checked
	function allCheck() {
		//활성화
		$('body').on('click','.agree_terms #all_chk',function() {
			var checked = $('#all_chk').prop('checked');
			$('input:checkbox[name="check_action"]').prop('checked',checked);
		});
		//비활성화
		$('.agree_terms').on('click','input[name="check_action"]',function(){
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


