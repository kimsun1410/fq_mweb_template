/*
****************************************************
	NXCertRelay_Instaerface.js 수정내역 
****************************************************
| Version		  작성자		    수정일		   변경사항 
 ---------		-------		-----------	 ----------	
| v2.1.0.6		 강남준		2017.03.07   모듈버전 정보변경
| v2.1.0.5		 강남준		2017.01.31
| v2.1.0.4       강남준		2016.12.21   
| v2.1.0.3       강남준		2016.11.23   모듈버전 정보변경
| v2.1.0.2       강남준		2016.10.27
| v2.1.0.1		 강남준		2016.10.06	

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
*/

/*
	CrossEX Prototype Interface
	iniLINE Co.,Ltd.
	%VERSIONINFO%
*/

// TODO Plugin Object Define
var KeySharpNX;
//var TOUCHENEX

// TODO Plugin Info Set
var keysharpnxInfo= {
	"exPluginCallName"	: "KeySharpNX",			// 제품명
	"exPluginName"		: "KeySharpNX",			// exinterface.js 최상단에 정의한 객체명
	"exPluginInfo"		: "keysharpnxInfo",		// exinterface.js 정의한 protocolInfo 객체명
	"exModuleName"		: "nxwirelesscert",				// 모듈명
	"exInstall"			: "KEYSHARPEX_INSTALL",	// exinstall.js에 정의한 객체명
	"ksInstallpage"		: keysharpnxBaseDir + "/cert/install/install.html"+"?url=" + encodeURIComponent(window.location.href),// 설치페이지,
	"ksMainpage"		: keysharpnxBaseDir + "/", //싸이트 설정에 맞제 수정필요
	"ksInstalled"		: false,
	"exInstalled"		: false,
	"clInstalled"		: false,
    "lic"				: "eyJ2ZXJzaW9uIjoiMS4wIiwiaXNzdWVfZGF0ZSI6IjIwMTcwNDI3MTcxODUxIiwicHJvdG9jb2xfbmFtZSI6InRvdWNoZW5leCIsInV1aWQiOiIxMzk0ZjJjN2YwMzQ0NTliODYxODU1Zjc3OGYzNjlhYiIsImxpY2Vuc2UiOiJSVVJCMzVmaE1sWnJxVWtIUlRubEkzeldIaGw1aTBUMm8zOEwrVW8xd0o0cGxQMzZVMFFONGdLOHVmQmVrQ1wvWFIxRk1zdlRJTnpnOTMrWjlYOTBvSWI2SGJiSEZjQTlWNmFRZVQ0UGlQdGNvZlZsOWlvanZ0MlpTWUcrcFNQWkFXQlVWaURaM0FndlJkSVRoYzlkck1BbVU5eEdLcVF4am9kQ0RscStJMEZGZG9ZRnlcL3M5TlNkSHZFMHR1MkdVRiJ9",
	
	// Module Info, 플러그인 설치파일 경로
	"moduleInfo" : {
		"exWinVer"			: "2.1.0.10",
		"exWinClient"		: keysharpnxBaseDir +"/cert/module/KSCertRelay_nx_Installer_32bit.exe",
		"exWin64Ver"		: "2.1.0.10",
		"exWin64Client"		: keysharpnxBaseDir +"/cert/module/KSCertRelay_nx_Installer_64bit.exe",
		"exMacVer"			: "1.0.0.2",
		"exMacClient"		: keysharpnxBaseDir +"/cert/module/KSCertRelay_nx_Installer.pkg"
	},
	
	//EX Protocol Info, EX를 포함한 플러그인 클라이언트 파일 경로
	"exProtocolInfo" : {
		"exWinProtocolVer"			: "1.0.1.981",
		"exWinProtocolDownURL"		: keysharpnxBaseDir +"/cert/module/KSCertRelay_nx_Installer_32bit.exe",
		"exWin64ProtocolDownURL"	: keysharpnxBaseDir +"/cert/module/KSCertRelay_nx_Installer_64bit.exe",
		"exMacProtocolVer"			: "1.0.1.981",
		"exMacProtocolDownURL"		: keysharpnxBaseDir +"/cert/module/KSCertRelay_nx_Installer.pkg"
	},
    
    //[2015.11] 로컬웹서버 방식.
    "exEdgeInfo" : {
		"isUse"			: false,
		"addScript"		: keysharpnxBaseDir + "/cert/common/exproto_ext_daemon.js",
		"portChecker"	: keysharpnxBaseDir + "/cert/common/crossex_port_checker.js",
		"localhost"		: "wss://127.0.0.1",
		"edgeStartPort"	: 34581,
		"portChkCnt"	: 3,
		"daemonVer"		: "1.0.2.3",
		"daemonDownURL"	: keysharpnxBaseDir +"/cert/module/KSCertRelay_nx_Installer_32bit.exe",
        "supportBrowser": ["EDGE","CHROME","FIREFOX","OPERA"]
        //"supportBrowser": ["EDGE"]
	},
	
	// module minimum specification
	// PASS, ALL, NO
	"checkSpec"	: true,
	"reqSpec"	: {
		"OS"	: {
			"WINDOWS"	: "5.1",	// XP=5.1, VISTA=6.0, Win7=6.1, Win8=6.2, Win8.1=6.3, Win10=6.4/10.0
			"MACOSX"	: "10.7",	// Leopard=10.5, Snow Leopard=10.6, Lion=10.7, Mountain Lion=10.8, Mavericks=10.9, Yosemite=10.10, El Capitan=10.11
			"LINUX"		: "NO"
		},
		"Browser": {
			"MSIE"		: "6",
			"EDGE"		: "ALL",
			"CHROME"	: "38",
			"FIREFOX"	: "36",
			"OPERA"		: "27",
			"SAFARI_WIN": "5",
			"SAFARI_MAC": "6"
		}
	},
    
	//////////////////////////////////////////////////////////////
	//////       CrossEX AREA DO NOT EDIT !!
	//////////////////////////////////////////////////////////////
    
    "isInstalled"		: false,				// 제품 정상 설치 여부
	"exProtocolName"	: "touchenex",
	"exExtHeader"		: "touchenex",
	"exNPPluginId"		: "touchenexPlugin",
	"exNPMimeType"		: "application/x-raon-touchenex",
	"exSiteName"		: "raon",
	"exFormName"		: "__CROSSEX_FORM__",
	"exFormDataName"	: "__CROSSEX_DATA__",
	// Extension Info
	"exExtensionInfo" : {
		// Extension info
		"exChromeExtVer"		: "0.9.0.1",
		"exChromeExtDownURL"	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
		//test 계정
		//"exChromeExtDownURL"	: " https://chrome.google.com/webstore/detail/touchen-pc%EB%B3%B4%EC%95%88-%ED%99%95%EC%9E%A5/dipflnflfklbccdlhcfpighagkolojkc?utm_source=gmail",
		"exFirefoxExtVer"		: "1.0.1.12",
		"exFirefoxExtDownURL"	: keysharpnxBaseDir + "/cert/extension/touchenex_firefox.xpi",
		"exFirefoxExtIcon"		: "",
		"exOperaExtVer"			: "1.0.1.12",
		"exOperaExtDownURL"		: keysharpnxBaseDir + "/cert/extension/touchenex_opera.nex"
	}
};

/**
 * CHROME, FIREFOX, OPERA 브라우저에 대해 아래와 같이 동작한다.
 * mainextension : case1 : 데몬미설치,익스텐션 설치시 익스텐션으로 동작 
 *                 case2 : 데몬설치 ,익스텐션 미설치시 데몬으로 동작
 *                 case3 : 둘다 미설치일경우 데몬설치
 * onlydaemon    : 데몬으로 동작 및 설치
 * 공백 일 경우  : 익스텐션 동작 및 설치 
 */
 
//var TOUCHEN_RUNTYPE = ""; // 내부망
var TOUCHEN_RUNTYPE = "onlydaemon"; // 외부망 (운영시)
//var TOUCHEN_RUNTYPE = "mainextension";
UserSelectType();


// TOUCHEN_RUNTYPE에 따라서 동작방식을 달리한다
function UserSelectType()
{
	if (TOUCHENEX_UTIL.isMac() || TOUCHENEX_UTIL.isIE() || (TOUCHENEX_UTIL.isSafari() && !TOUCHENEX_UTIL.isChrome())) 
		return;
	
		// edge 이거나 onlydaemon 이면 
	if(TOUCHENEX_UTIL.isEdge() || TOUCHEN_RUNTYPE == "onlydaemon")
	{
		keysharpnxInfo.exEdgeInfo.isUse = true;
		return;
	} 
	else if(TOUCHEN_RUNTYPE == "mainextension")
	{
		// extension 이 동작 중이면
		if(typeof touchenex_nativecall != "undefined")  
			keysharpnxInfo.exEdgeInfo.isUse = false; //extension으로 동작
   		 else
			keysharpnxInfo.exEdgeInfo.isUse = true; //daemon으로 동작
	}
}


//[2015.11] 로컬웹서버 방식.
/****************************
 ** edge condition
 ** include exproto_ext_daemon.js
 ****************************/
 if(TOUCHENEX_UTIL.typeDaemonEX(keysharpnxInfo)){
	document.write("<script type='text/javascript' src='" + keysharpnxInfo.exEdgeInfo.addScript + "'></script>");
}

// TODO Plugin Interface Define
var KSCertRelayNXInterface = {
	//////////////////////////////////////////////
	// UserDefinition Interface Code Area......
	//////////////////////////////////////////////

	KS_LoadMain : function( params, callback ){
		exlog("LoadMain", params);
		var exCallback = "";
		KeySharpNX.Invoke("LoadMain", params, exCallback, callback);
	},

	KS_SetRelayServer : function( params, callback ){
		
		var exCallback = "";
		KeySharpNX.Invoke("SetRelayServer", params, exCallback, callback);
	},

	KS_SetFunction : function( params, callback ){
		exlog("SetFunction", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetFunction", params, exCallback, callback);
	},

	KS_SetDisplayOID : function( params, callback ){
		exlog("SetDisplayOID", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetDisplayOID", params, exCallback, callback);
	},

	KS_SetBannerImg : function( params, callback ){
		exlog("SetBannerImg", params);
		var exCallback = "";
		KeySharpNX.Invoke("GetImage", params, exCallback, callback);
	},
	KS_SetPwdCount : function( params, callback ){
		exlog("SetPwdCount", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetPwdCount", params, exCallback, callback);
	},

	KS_SetPKCS12 : function( params, callback ){
		exlog("SetPKCS12", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetPKCS12", params, exCallback, callback);
	},

	KS_SetAutoFocus : function( params, callback ){
		exlog("SetAutoFocus", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetAutoFocus", params, exCallback, callback);
	},

	KS_SetLanguage : function( params, callback ){
		exlog("SetLanguage", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetLanguage", params, exCallback, callback);
	},

	KS_SetRequiredAlg : function( params, callback ){
		exlog("SetRequiredAlg", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetRequiredAlg", params, exCallback, callback);
	},

	KS_SetKmcertsupport : function( params, callback ){
		exlog("SetKmcertsupport", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetKmcertsupport", params, exCallback, callback);
	},
	KS_SetCertDN : function( params, callback ){
		exlog("SetCertDN", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetCertDN", params, exCallback, callback);
	},

	KS_SetCertDelete : function( params, callback ){
		exlog("SetCertDelete", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetCertDelete", params, exCallback, callback);
	},
	
	KS_SetCertDelete_ENG : function( params, callback ){
		exlog("SetCertDelete", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetCertDelete_ENG", params, exCallback, callback);
	},
	KS_SetKeypro : function( params, callback ){
		exlog("SetKeypro", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetKeypro", params, exCallback, callback);
	},

	KS_nxCR_SetTranskey : function( params, callback ){
		exlog("SetTranskey", params);
		var exCallback = "";
		KeySharpNX.Invoke("nxCR_SetTranskey", params, exCallback, callback);
	},
    
    KS_SetCodeSignVerify : function( params, callback ){
		exlog("SetCodeSignVerify", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetCodeSignVerify", params, exCallback, callback);
	},
	
	KS_SetFontSizeEditCtrl : function( params, callback ){
		exlog("SetFontSizeEditCtrl", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetFontSizeEditCtrl", params, exCallback, callback);
	},
	KS_SetFontSizeCnum : function( params, callback ){
		exlog("SetFontSizeCnum", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetFontSizeCnum", params, exCallback, callback);
	},
	
			//[간편인증서내보내기/가져오기] 문구 설정. 메인 타이틀.한글.
	KS_SetStr_ICRP_MAIN_TITLE : function( params, callback ){
		exlog("SetStr_ICRP_MAIN_TITLE", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_ICRP_MAIN_TITLE", params, exCallback, callback);
	},
	
	//[간편인증서내보내기/가져오기] 문구 설정. 메인 타이틀.영문.
	KS_SetStr_ICRP_MAIN_TITLE_ENG : function( params, callback ){
		exlog("SetStr_ICRP_MAIN_TITLE_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_ICRP_MAIN_TITLE_ENG", params, exCallback, callback);
	},
		
	//설명 문구 설정. 인증서 내보내기 문구.한글.
	KS_SetStr_CERTEXPORT_INTRO : function( params, callback ){
		exlog("SetStr_CERTEXPORT_INTRO", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_INTRO", params, exCallback, callback);
	},
	
	//설명 문구 설정. 인증서 내보내기 문구.한글.
	KS_SetStr_CERTEXPORT_INTRO_ENG : function( params, callback ){
		exlog("SetStr_CERTEXPORT_INTRO_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_INTRO_ENG", params, exCallback, callback);
	},
	
	//내보내기. 인증서 선택.한글.
	KS_SetStr_CERTEXPORT_CERTSELECT_2 : function( params, callback ){
		exlog("SetStr_CERTEXPORT_CERTSELECT_2", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_CERTSELECT_2", params, exCallback, callback);
	},

	//내보내기. 인증서 선택.영문.
	KS_SetStr_CERTEXPORT_CERTSELECT_2_ENG : function( params, callback ){
		exlog("SetStr_CERTEXPORT_CERTSELECT_2_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_CERTSELECT_2_ENG", params, exCallback, callback);
	},
	
	// 내보내기. 인증번호 입력.한글.
	KS_SetStr_CERTEXPORT_INPUTCNUM_3 : function( params, callback ){
		exlog("SetStr_CERTEXPORT_INPUTCNUM_3", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_INPUTCNUM_3", params, exCallback, callback);
	},

	// 내보내기. 인증번호 입력.영문.
	KS_SetStr_CERTEXPORT_INPUTCNUM_3_ENG : function( params, callback ){
		exlog("SetStr_CERTEXPORT_INPUTCNUM_3_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_INPUTCNUM_3_ENG", params, exCallback, callback);
	},
	
	// 내보내기. 내보내기 완료 문구.한글.
	KS_SetStr_CERTEXPORT_SUC_4 : function( params, callback ){
		exlog("SetStr_CERTEXPORT_SUC_4", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_SUC_4", params, exCallback, callback);
	},

	// 내보내기. 내보내기 완료 문구.영문
	KS_SetStr_CERTEXPORT_SUC_4_ENG : function( params, callback ){
		exlog("SetStr_CERTEXPORT_SUC_4_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTEXPORT_SUC_4_ENG", params, exCallback, callback);
	},
	
	// 인증서 가져오기. 시작.한글.
	KS_SetStr_CERTIMPORT_INTRO_1 : function( params, callback ){
		exlog("SetStr_CERTIMPORT_INTRO_1", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_INTRO_1", params, exCallback, callback);
	},

	// 인증서 가져오기 시작.영문.
	KS_SetStr_CERTIMPORT_INTRO_1_ENG : function( params, callback ){
		exlog("SetStr_CERTIMPORT_INTRO_1_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_INTRO_1_ENG", params, exCallback, callback);
	},

	// 인증서 가져오기 인증서 선택.한글
	KS_SetStr_CERTIMPORT_CERTSELECT_2 : function( params, callback ){
		exlog("SetStr_CERTIMPORT_CERTSELECT_2", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_CERTSELECT_2", params, exCallback, callback);
	},
	
	//인증서 가져오기 인증서 선택.영문
	KS_SetStr_CERTIMPORT_CERTSELECT_2_ENG : function( params, callback ){
		exlog("SetStr_CERTIMPORT_CERTSELECT_2_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_CERTSELECT_2_ENG", params, exCallback, callback);
	},
	
	// 인증서 가져오기. 인증번호 생성.한글
	KS_SetStr_CERTIMPORT_MAKECNUM_3 : function( params, callback ){
		exlog("SetStr_CERTIMPORT_MAKECNUM_3", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_MAKECNUM_3", params, exCallback, callback);
	},
	
	// 인증서 가져오기. 인증번호 생성.영문
	KS_SetStr_CERTIMPORT_MAKECNUM_3_ENG : function( params, callback ){
		exlog("SetStr_CERTIMPORT_MAKECNUM_3_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_MAKECNUM_3_ENG", params, exCallback, callback);
	},
	
	// 인증서 가져오기. 인증번호가 존재하지 않을 경우.한글. (인증서를 내보내는 쪽에서 인증번호를 입력하지 않았을 경우)
	KS_SetStr_CERTIMPORT_WRONGCNUM : function( params, callback ){
		exlog("SetStr_CERTIMPORT_WRONGCNUM", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_WRONGCNUM", params, exCallback, callback);
	},
	
	// 인증서 가져오기. 인증번호가 존재하지 않을 경우.영문. (인증서를 내보내는 쪽에서 인증번호를 입력하지 않았을 경우)
	KS_SetStr_CERTIMPORT_WRONGCNUM_ENG : function( params, callback ){
		exlog("SetStr_CERTIMPORT_WRONGCNUM_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_WRONGCNUM_ENG", params, exCallback, callback);
	},

	//인증서 가져오기 완료시. 한글
	KS_SetStr_CERTIMPORT_SUC : function( params, callback ){
		exlog("SetStr_CERTIMPORT_SUC", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_SUC", params, exCallback, callback);
	},

	//인증서 가져오기 완료시. 영문
	KS_SetStr_CERTIMPORT_SUC_ENG : function( params, callback ){
		exlog("SetStr_CERTIMPORT_SUC_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_CERTIMPORT_SUC_ENG", params, exCallback, callback);
	},
	
	// QR 인증서복사.
	KS_LoadMainQR : function( params, callback ){
		exlog("LoadMainQR", params);
		var exCallback = "";
		KeySharpNX.Invoke("LoadMainQR", params, exCallback, callback);
	},

	KS_SetServerSendCert_QR : function( params, callback ){
		exlog("SetServerSendCert_QR", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetServerSendCert_QR", params, exCallback, callback);
	},

	KS_SetServerMyCert_QR : function( params, callback ){
		exlog("SetServerMyCert_QR", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetServerMyCert_QR", params, exCallback, callback);
	},

	KS_SetQRTimer : function( params, callback ){
		exlog("SetQRTimer", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetQRTimer", params, exCallback, callback);
	},

	KS_SetServerAuthQuery_QR : function( params, callback ){
		exlog("SetServerAuthQuery_QR", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetServerAuthQuery_QR", params, exCallback, callback);
	},

	KS_SetHttpVer_QR : function( params, callback ){
		exlog("SetQRHttpVer", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetQRHttpVer", params, exCallback, callback);
	},

	
	//QR복사 메인 타이틀 설정.한글. 
	KS_SetStr_QRCODE_Main_Name : function( params, callback ){
		exlog("SetStr_QRCODE_Main_Name", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_Main_Name", params, exCallback, callback);
	},
	
	//QR복사 메인 타이틀 설정.영문. 
	KS_SetStr_QRCODE_Main_Name_ENG : function( params, callback ){
		exlog("SetStr_QRCODE_Main_Name_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_Main_Name_ENG", params, exCallback, callback);
	},

	//QR 코드 이미지가 나오는 창 초기 문구.한글.
	KS_SetStr_QRCODE_DLG1_INTRO : function( params, callback ){
		exlog("SetStr_QRCODE_DLG1_INTRO", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG1_INTRO", params, exCallback, callback);
	},
	
	//QR 코드 이미지가 나오는 창 초기 문구.영문.
	KS_SetStr_QRCODE_DLG1_INTRO_ENG : function( params, callback ){
		exlog("SetStr_QRCODE_DLG1_INTRO_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG1_INTRO_ENG", params, exCallback, callback);
	},

	//QR 코드 인증서 선택 문구.한글.
	KS_SetStr_QRCODE_DLG1_CERTSELECT : function( params, callback ){
		exlog("SetStr_QRCODE_DLG1_CERTSELECT", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG1_CERTSELECT", params, exCallback, callback);
	},

	//QR 코드 인증서 선택 문구.영문.
	KS_SetStr_QRCODE_DLG1_CERTSELECT_ENG : function( params, callback ){
		exlog("SetStr_QRCODE_DLG1_CERTSELECT_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG1_CERTSELECT_ENG", params, exCallback, callback);
	},
	
	//QR코드 창 아래 문구.한글.
	KS_SetStr_QRCODE_DLG2_INTRO : function( params, callback ){
		exlog("SetStr_QRCODE_DLG2_INTRO", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG2_INTRO", params, exCallback, callback);
	},
	
	//QR코드 창 아래 문구.한글.
	KS_SetStr_QRCODE_DLG2_INTRO_ENG : function( params, callback ){
		exlog("SetStr_QRCODE_DLG2_INTRO_ENG", params);
	
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG2_INTRO_ENG", params, exCallback, callback);
	},

	//QR 코드 생성 문구.한글
	KS_SetStr_QRCODE_DLG2_DISPLAYQRCODE : function( params, callback ){
		exlog("SetStr_QRCODE_DLG2_DISPLAYQRCODE", params);
		
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG2_DISPLAYQRCODE", params, exCallback, callback);
	},

	//QR 코드 생성 문구.영문
	KS_SetStr_QRCODE_DLG2_DISPLAYQRCODE_ENG : function( params, callback ){
		exlog("SetStr_QRCODE_DLG2_DISPLAYQRCODE_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_DLG2_DISPLAYQRCODE_ENG", params, exCallback, callback);
	},
	
	//QR코드 인증서 삭제문구.한글
	KS_SetStr_QRCODE_CERT_DEL_EXPLAIN : function( params, callback ){
		exlog("SetStr_QRCODE_CERT_DEL_EXPLAIN", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_CERT_DEL_EXPLAIN", params, exCallback, callback);
	},

	//QR코드 인증서 삭제 문구.영문
	KS_SetStr_QRCODE_CERT_DEL_EXPLAIN_ENG : function( params, callback ){
		exlog("SetStr_QRCODE_CERT_DEL_EXPLAIN_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_CERT_DEL_EXPLAIN_ENG", params, exCallback, callback);
	},
	
	//QR코드 인증서 삭제 확인 문구.한글
	KS_SetStr_QRCODE_CERT_DEL_CONFIRM_STR : function( params, callback ){
		exlog("SetStr_QRCODE_CERT_DEL_CONFIRM_STR", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_CERT_DEL_CONFIRM_STR", params, exCallback, callback);
	},

	//QR코드 인증서 삭제 확인 문구.영문
	KS_SetStr_QRCODE_CERT_DEL_CONFIRM_STR_ENG : function( params, callback ){
		exlog("SetStr_QRCODE_CERT_DEL_CONFIRM_STR_ENG", params);
		var exCallback = "";
		KeySharpNX.Invoke("SetStr_QRCODE_CERT_DEL_CONFIRM_STR_ENG", params, exCallback, callback);
	}
    
    
    
}