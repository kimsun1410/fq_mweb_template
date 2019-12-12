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
	});
}


