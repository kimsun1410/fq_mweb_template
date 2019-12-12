/*
****************************************************
	NXCertRelay.js 수정내역 
****************************************************
| Version		 작성자		 수정일		 변경사항 
 ---------		-------		---------	----------	
| v2.1.0.5       강남준		2017.01.31	 
| v2.1.0.4       강남준		2016.12.21
| v2.1.0.3       강남준		2016.10.27
| v2.1.0.2 		 강남준		2016.10.19
| v2.1.0.1		 강남준		2016.10.06	

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
*/

var keysharpnxBaseDir = "";

var ksloadflag = false;

document.write("<script type='text/javascript' charset='utf-8' src='" + keysharpnxBaseDir+ "/cert/common/exproto.js'></script>");
document.write("<script type='text/javascript' charset='utf-8' src='" + keysharpnxBaseDir + "/cert/js/NXCertRelay_Install.js'></script>");
document.write("<script type='text/javascript' charset='utf-8' src='" + keysharpnxBaseDir + "/cert/js/NXCertRelay_Interface.js'></script>");

//[간편인증서내보내기/가져오기] 관련 변수. 
var g_ICRP_ServerIP = getServerIP();

var g_ICRP_ServerPort = "10500";
var g_ICRP_PwdCount = "3";
var g_ICRP_Function = "3"; // 인증서 내보내기 기능만 수행
var g_ICRP_BannerImgURL = "";		//QR코드인증서복사에서도 사용.	//QR코드인증서복사에서도 사용.
var g_ICRP_AutoFocus ="0";
var g_ICRP_PKCS12 ="0";
var g_ICRP_Language = "1";
var g_ICRP_RequiredAlg = "0";
var g_ICRP_Kmcertsupport= "0";
var g_ICRP_Keypro = "1"; //개발 : 활성화, 운영: 비활성화
var g_ICRP_Transkey_URL=""; //Transkey v4.6 적용 테스트 url "http://d.touchen.co.kr:8080/TranskeyWeb4.6.2/attribute/Transkey_crt.jsp";
var g_ICRP_Transkey_Size ="2"; //1 :Transkey v4.5 키패드 크기, 2 : Transkey v4.6 키패드크기
var g_ICRP_CodeSignVerify = "1"; //개발 : 활성화, 운영: 비활성화
var g_ICRP_FontSizeEditCtrl = "15";
var g_ICRP_FontSizeCnum = "40";
var g_ICRP_CertDN = "";

//[QR코드인증서복사] 관련 변수
var g_QRServerSendCertURL   = "https://211.32.131.182:8600/QR_CERTMOVE/client/sendcert.jspx";
var g_QRServerMyCertURL     = "https://211.32.131.182:8600/QR_CERTMOVE/phone/mycert.jspx";
var g_QRServerAuthqueryURL = "https://211.32.131.182:8600/QR_CERTMOVE/client/checkcert.jspx";

var g_QR_TimerSecond = "120"; //시간 변경시 QR서버 설정파일에서 동일시간으로 변경 필요
var g_QR_TimerFlag = "1";
var g_QR_HttpVer = "0";


//[공통][간편인증서내보내기/가져오기]인증서 정책 설정 변수.
//셋팅 리얼:TRUE 테스트:FALSE
var IsOnLine ='TRUE';
//var IsOnLine ='FALSE';
//var IsOnLine ='ALL';

var policyoid_yessign = ":1.2.410.200005.1.1.1";		//범용개인
	policyoid_yessign += ":1.2.410.200005.1.1.2";		//금융기업
	policyoid_yessign += ":1.2.410.200005.1.1.4";		//은행-보험
	policyoid_yessign += ":1.2.410.200005.1.1.5"; 		//범용기업
	policyoid_yessign += ":1.2.410.200005.1.1.6.1"; 	//법인, 용도제한(기업뱅킹)
	policyoid_yessign += ":1.2.410.200005.1.1.6.8"; 	//이세로, 용도제한(세금계산서)
	
var policyoid_signkorea = ":1.2.410.200004.5.1.1.5";  	//범용개인
	policyoid_signkorea += ":1.2.410.200004.5.1.1.7";   //범용법인
	policyoid_signkorea += ":1.2.410.200004.5.1.1.9";   //개인, 용도제한

var policyoid_signgate = ":1.2.410.200004.5.2.1.1";		//범용기업
	policyoid_signgate += ":1.2.410.200004.5.2.1.2";	//범용개인
	policyoid_signgate += ":1.2.410.200004.5.2.1.7.1";	//은행-보험
	
var policyoid_crosscert = ":1.2.410.200004.5.4.1.1";	//범용개인
	policyoid_crosscert += ":1.2.410.200004.5.4.1.2"; 	//범용기업
	policyoid_crosscert += ":1.2.410.200004.5.4.1.101"; //은행-보험
	
var policyoid_tradesign = ":1.2.410.200012.1.1.1";		//범용개인
	policyoid_tradesign += ":1.2.410.200012.1.1.3";		//범용기업
	policyoid_tradesign += ":1.2.410.200012.1.1.101";	//은행-보험

var policyoid_ncasign = ":1.2.410.200004.5.3.1.9";		//범용개인
	policyoid_ncasign += ":1.2.410.200004.5.3.1.2";		//범용기업
	
var accept_list = "";
var accept_list_real="yessignCA";
	accept_list_real+=policyoid_yessign;
	
	// 증권전산원 인증서 수용 부분
	accept_list_real+=",SignKorea CA";
	accept_list_real+=policyoid_signkorea;
	
	// 한국정보인증 인증서 수용 부분
	accept_list_real+=",signGATE CA2";
	accept_list_real+=policyoid_signgate;
	
	// 한국전자인증 인증서 수용 부분
	accept_list_real+=",CrossCert Certificate Authority";
	accept_list_real+=policyoid_crosscert;
	
	// 한국무역정보통신 인증서 수용 부분
	accept_list_real+=",TradeSignCA";
	accept_list_real+=policyoid_tradesign;
	
	// 한국전산원 인증서 수용 부분
	accept_list_real+=",NCASignCA";
	accept_list_real+=policyoid_ncasign;
	
	//2048
	accept_list_real+=",yessignCA Class 1";
	accept_list_real+=policyoid_yessign;
//2048 new
	accept_list_real+=",yessignCA Class 2";
	accept_list_real+=policyoid_yessign;	
	
	accept_list_real+=",SignKorea CA2";
	accept_list_real+=policyoid_signkorea;	
	
	accept_list_real+=",SignKorea CA3";
	accept_list_real+=policyoid_signkorea;
	
	accept_list_real+=",signGATE CA4";
	accept_list_real+=policyoid_signgate;
	
	accept_list_real+=",signGATE CA5";
	accept_list_real+=policyoid_signgate;
	
	accept_list_real+=",CrossCertCA2";
	accept_list_real+=policyoid_crosscert;
	
	accept_list_real+=",CrossCertCA3";
	accept_list_real+=policyoid_crosscert;
	
	accept_list_real+=",TradeSignCA2";
	accept_list_real+=policyoid_tradesign;
	
	accept_list_real+=",TradeSignCA3";
	accept_list_real+=policyoid_tradesign;

var accept_list_test="yessignCA-TEST";
	accept_list_test+=policyoid_yessign;
	
	accept_list_test+=",SignGateFTCA CA";
	accept_list_test+=policyoid_signgate;
	
	accept_list_test+=",signGATE FTCA02";
	accept_list_test+=policyoid_signgate;
	
	accept_list_test+=",SignKorea Test CA";
	accept_list_test+=policyoid_signkorea;
	
	accept_list_test+=",NCATESTSign";
	accept_list_test+=policyoid_ncasign;
	
	accept_list_test+=",CrossCertCA-Test2";
	accept_list_test+=policyoid_crosscert;
	
	accept_list_test+=",TestTradeSignCA";
	accept_list_test+=policyoid_tradesign;
	
	//2010.08.05 추가 yhp
	accept_list_test+=",yessignCA-Test Class 0";
	accept_list_test+=policyoid_yessign;
	
	//2048
	accept_list_test+=",yessignCA-Test Class 1";
	accept_list_test+=policyoid_yessign;
	
	//2048 new 2015.12
	accept_list_test+=",yessignCA-Test Class 2";
	accept_list_test+=policyoid_yessign;
	accept_list_test+=",signGATE FTCA04";
	accept_list_test+=policyoid_signgate;
	
	accept_list_test+=",SignKorea Test CA2";
	accept_list_test+=policyoid_signkorea;
	
	accept_list_test+=",CrossCertTestCA2";
	accept_list_test+=policyoid_crosscert;
	
	accept_list_test+=",TradeSignCA2009Test2";
	accept_list_test+=policyoid_tradesign;
	
if(IsOnLine == 'TRUE'){
	//리얼 인증서
	accept_list = accept_list_real;
}else if(IsOnLine == 'FALSE'){
	//테스트 인증서
	accept_list = accept_list_test;
}else if(IsOnLine == 'ALL'){
	accept_list = accept_list_real + "," + accept_list_test;
}



//////////////////////////////간편 인증서 복사 관련 문구.
function SetExplainStr() {
	//메인 타이틀 설정. 
	KSCertRelayNXInterface.KS_SetStr_ICRP_MAIN_TITLE(["인증서 내보내기"]);
	KSCertRelayNXInterface.KS_SetStr_ICRP_MAIN_TITLE_ENG(["Certificate Export"]);
	
	//설명 문구 설정. 인증서 내보내기 문구. 
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INTRO(["<PC -> 스마트기기로 복사하실 인증서를 선택합니다.>\r\n\r\n좌측에서 스마트기기로 복사하실 인증서 선택 후 하단에 인증서 비밀번호 입력 후 확인"]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INTRO_ENG(["Please select a certificate to copy to your PC -> smart device.\r\n\r\nSelect a certificate to copy to your smart device from the left list and input the password at the bottom. Then, click [Confirm]."]);
	
	//내보내기. 인증서 선택.
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_CERTSELECT_2(["<PC -> 스마트기기로 복사하실 인증서를 선택합니다.>\r\n\r\n좌측에서 스마트기기로 복사하실 인증서 선택 후 하단에 인증서 비밀번호 입력 후 확인"]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_CERTSELECT_2_ENG(["Please select a certificate to copy to your PC -> smart device.\r\n\r\n1. Select [Export certificate] shown above.\r\n2. Select a certificate to copy to your smart device from the left list and input the password at the bottom. Then, click [Confirm]."]);
	
	// 내보내기. 인증번호 입력.	
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INPUTCNUM_3(["<스마트기기에서 생성된 인증번호를 PC에 입력합니다.>\r\n\r\n1. Finnq 앱 실행 후 금융기관 연결 설정\r\n2. 금융기관 연결 추가\r\n3. 공인인증서 인증 \r\n4. 스마트기기의 인증번호를 하단 인증번호 입력란에 입력 후 확인"]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INPUTCNUM_3_ENG(["<Please enter the PIN number generated by the smart device.>\r\n\r\n1. Enter 'Certificate Center' after run 'Finnq'\r\n2. Select [Copy certificate PC -> smart device]\r\n3. Enter your PIN number to input box at the bottom. Then click [Confirm] to continue.\r\n4. Select [import PIN number] in your smart device."]);
	
	// 내보내기. 내보내기 완료 문구.
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_SUC_4(["인증서 내보내기 완료."]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_SUC_4_ENG(["Success certificate export ."]);
		
	// 가져오기. 시작.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_INTRO_1(["<스마트기기 -> PC 인증서 복사 절차>\r\n\r\n1.상단 [인증서가져오기] 선택 후 확인\r\n2. 인증번호 생성\r\n3. Finnq 실행하여 인증센터 접속\r\n4. [스마트기기 -> PC 인증서복사] 메뉴선택\r\n5. PC로 복사하실 인증서 선택 후 암호입력\r\n6. PC에서 생성된 인증번호를 스마트기기에 입력\r\n7. 스마트기기에서 인증서 내보내기 선택"]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_INTRO_1_ENG(["<Copy certificate procedure from smart device to PC>\r\n\r\n1. Select [import certificate]. Then click [Confirm] to continue.\r\n2. Generate PIN number.\r\n3. Enter 'Certificate Center' after run 'Finnq'\r\n4. Select [Copy certificate smart device -> PC]\r\n5. Enter the password after select the certificate you want to copy to PC.\r\n6. Enter the PIN number generated by PC.\r\n7. Select [Export certificate] in your smart device."]);
	
	// 가져오기. 인증서 선택.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_CERTSELECT_2(["<스마트기기 -> PC 인증서 복사 절차>\r\n\r\n1.상단 [인증서가져오기] 선택 후 확인\r\n2. 인증번호 생성\r\n3. Finnq 실행하여 인증센터 접속\r\n4. [스마트기기 -> PC 인증서복사] 메뉴선택\r\n5. PC로 복사하실 인증서 선택 후 암호입력\r\n6. PC에서 생성된 인증번호를 스마트기기에 입력\r\n7. 스마트기기에서 인증서 내보내기 선택"]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_CERTSELECT_2_ENG(["<Copy certificate procedure from smart device to PC>\r\n\r\n1. Select [import certificate]. Then click [Confirm] to continue.\r\n2. Generate PIN number.\r\n3. Enter 'Certificate Center' after run 'Finnq'\r\n4. Select [Copy certificate smart device -> PC]\r\n5. Enter the password after select the certificate you want to copy to PC.\r\n6. Enter the PIN number generated by PC.\r\n7. Select [Export certificate] in your smart device."]);
	
	// 가져오기. 인증번호 생성.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_MAKECNUM_3(["*아래 생성된 인증번호를 복사하실 스마트기기에 입력해 주십시오.\r\n\r\n                                                - Finnq 입력경로 : Finnq 실행 -> [인증센터] 또는 [공인인증센터]\r\n->[스마트기기->PC인증서복사]"]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_MAKECNUM_3_ENG(["Please input the smart device to copy the authentication number generated below.\r\n(Input menu: Run 'Finnq' > Certification center > [Copy Certificate (Smart Device→PC) ]\r\n"]);
	
	// 가져오기. 인증번호가 존재하지 않을 경우. (인증서를 내보내는 쪽에서 인증번호를 입력하지 않았을 경우)
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_WRONGCNUM(["[페이지입력문구] [인증서 가져오기]\r\n보내는 단말에서 인증번호를 입력하세요.\r\nSetStr_CERTIMPORT_WRONGCNUM"]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_WRONGCNUM_ENG(["[Page input message] [Certificate Import]\r\nPlease, input Authentication Number in the device.\r\nSetStr_CERTIMPORT_WRONGCNUM"]);
	
	// 가져오기. 가져오기완료.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_SUC(["[페이지입력문구] [인증서 가져오기]\r\n인증서 가져오기 완료.\r\nSetStr_CERTIMPORT_SUC"]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_SUC_ENG(["[Page input message] [Certificate Import]\r\nsuccess import.\r\nSetStr_CERTIMPORT_SUC"]);
}

function SetExplainStr_QR() {
	//메인 타이틀 설정. 
	KSCertRelayNXInterface.KS_SetStr_QRCODE_Main_Name(["[페이지입력문구] [QR인증서복사]메인타이틀"]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_Main_Name_ENG(["[Page input message] [QR]Main Title"]);

	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_INTRO(["[페이지입력문구] [QRcode 인증서복사]\r\nSetStr_QRCODE_DLG1_INTRO"]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_INTRO_ENG(["[Page input message] [QR] \r\nSetStr_QRCODE_DLG1_INTRO"]);

	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_CERTSELECT(["[페이지입력문구] [QRcode 인증서복사]\r\n인증서가 선택되었습니다.\r\nSetStr_QRCODE_DLG1_CERTSELECT"]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_CERTSELECT_ENG(["[Page input message] [QR] \r\nSetStr_QRCODE_DLG1_CERTSELECT"]);
	
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_INTRO(["[페이지입력문구] [QRcode 인증서복사]\r\nSetStr_QRCODE_DLG2_INTRO"]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_INTRO_ENG(["[Page input message] [QR] \r\nSetStr_QRCODE_DLG2_INTRO"]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_DISPLAYQRCODE(["[페이지입력문구] [QRcode 인증서복사]\r\nQR코드가 생성되었습니다.\r\nSetStr_QRCODE_DLG2_DISPLAYQRCODE"]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_DISPLAYQRCODE_ENG(["[Page input message] [QR] \r\nSetStr_QRCODE_DLG2_DISPLAYQRCODE"]);
	
	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_EXPLAIN(["[페이지입력문구] [QRcode 인증서복사]\r\n인증서를 삭제합니다."]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_EXPLAIN_ENG(["[Page input message] [QR] \r\nCertificate delete"]);

	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_CONFIRM_STR(["[페이지입력문구] [QRcode 인증서복사]\r\n정말 인증서를 삭제 하시겠습니까?"]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_CONFIRM_STR_ENG(["[Page input message] [QR] \r\nCertificate delete"]);
}
//###################  Browser check ########################//
//////////////////////////////////////
// TODO EX plugin - Web
//////////////////////////////////////

if (!window.console)
	console = {log : function(msg) {}};

function KS_loading() {
	exlog("==============loading================");
	try {
		if(!ksloadflag){
			TOUCHENEX_CHECK.check([keysharpnxInfo] , "KS_loading_callback");
			//ksloadflag=true;
		}
	} catch (e) {}
}
function KS_loading_callback(check) {
	exlog("KS_loading_callback", check);
	try {
        currStatus = check;
        if (currStatus.status) {
        	// 인증서 복사 모듈을 실행합니다.
            keysharpnxInfo.ksInstalled = currStatus.status;
            TOUCHENEX_LOADING("KS_loadingCallback");
            
            // [2017.07.26][백선철] 플로우 변경
            LoadMain();
        } else {
        	// 설치 로직을 실행합니다.
        	KS_notInstall(currStatus);
        }
    } catch (e) {}
}

function KS_loadingCallback(check) {
//console.log("==============KS_loadingCallback================");	
}

function KS_extensionInstall() {
	if(TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || TOUCHENEX_UTIL.isOpera()){
		KS_extensiondownload();
	}
}

function KS_extensiondownload() {
    KEYSHARPEX_INSTALL.download('nxwirelesscert', 'extension');
}

function KS_installPage() {
    if (typeof Keysharp_installpage == "undefined") {
        location.href = keysharpnxInfo.ksInstallpage;
    }
	
}

function KS_isInstallcheck() {
    try {
        KS_installCheck('KS_installCheckCallback');
    } catch (e) {}
}

function KS_installCheck(callback) {
    try {
        TOUCHENEX_CHECK.check([keysharpnxInfo], callback);
  	} catch (e) {}
}

function KS_installCheckCallback(check) {
    try {
        currStatus = check;
        if (currStatus.status) {
            keysharpnxInfo.isInstalled = currStatus.status;
            if (typeof Keysharp_installpage != "undefined") {
                KS_moveMainPage();
            }
        } else {
            KS_notInstall(currStatus); 
        }
    } catch (e) {}
}

function KS_moveMainPage() {
    location.href = keysharpnxInfo.ksMainpage;
}

function KS_notInstall(currStatus) {
	try {
        if (!currStatus.status) {
			keysharpnxInfo.ksInstalled = currStatus.status;
            if (typeof Keysharp_installpage == "undefined") {
            	KS_installPage();
            } else {
                if (!currStatus.info[0].isInstalled) {
                    if (!currStatus.info[0].extension) {
                        if (TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || (TOUCHENEX_UTIL.isOpera())) {
                            ////KS_extensiondownload();
                            keysharpnxInfo.exInstalled = false;
                        }
                    }//test
                    else{
                    	keysharpnxInfo.exInstalled = true;
                    }

                    if (!currStatus.info[0].client || !currStatus.info[0].EX) {
                       //Keysharpnx_download();
                        keysharpnxInfo.clInstalled = false;
                    }//test
                    else{
                    	keysharpnxInfo.clInstalled = true;
                    }
                } else {
                    if (typeof Keysharp_installpage != "undefined") {
                        KS_moveMainPage();
                    }
                }
            }
        } else {
            keysharpnxInfo.isInstalled = currStatus.status;
            if (typeof Keysharp_installpage != "undefined") {
                KS_moveMainPage();
            }
        }
    } catch (e) {}
}
function KS_download() {
   if( TOUCHENEX_UTIL.isWin() && (TOUCHEN_RUNTYPE == "onlydaemon" || TOUCHEN_RUNTYPE == "mainextension"))
	{
		KEYSHARPEX_INSTALL.download('nxwirelesscert', 'daemon');
	}
	else
	{
		KEYSHARPEX_INSTALL.download('nxwirelesscert', 'client');
	}
}


function LoadMain() {
	if(SupportCheck())
	{
		exlog("LoadMain");
		SetRelayServer();
		SetBannerImg();
		SetFunction();
		SetExplainStr();
		SetDisplayOID();
		SetPwdCount();
		//SetPKCS12();
		//SetAutoFocus();
		//SetLanguage();
		//SetKmcertsupport();
		//SetRequiredAlg();
		// SetKeypro(); //개발 : 활성화, 운영: 비활성화
		nxCR_SetTranskey();
		// SetCodeSignVerify(); //개발 : 활성화, 운영: 비활성화
		//SetCertDN();
		//SetFontSizeEditCtrl();
		//SetFontSizeCnum();
		//SetCertDelete();
		KSCertRelayNXInterface.KS_LoadMain(["NONE" , "NONE"]);
	}
	else
	{
		//안내페이지 이동시 사용
		//location.href = keysharpnxInfo.ksInstallpage;
	}
}


function SetRelayServer() {
   
	KSCertRelayNXInterface.KS_SetRelayServer([g_ICRP_ServerIP , g_ICRP_ServerIP , g_ICRP_ServerPort]);
}

function SetFunction() {
	KSCertRelayNXInterface.KS_SetFunction([g_ICRP_Function]);
}

function SetDisplayOID() {
	KSCertRelayNXInterface.KS_SetDisplayOID([accept_list]);
}

function SetBannerImg() {
	KSCertRelayNXInterface.KS_SetBannerImg([g_ICRP_BannerImgURL]);
}

function SetPwdCount() {
	KSCertRelayNXInterface.KS_SetPwdCount([g_ICRP_PwdCount]);
}

function SetPKCS12() {
	KSCertRelayNXInterface.KS_SetPKCS12([g_ICRP_PKCS12]);
}

function SetAutoFocus() {
	KSCertRelayNXInterface.KS_SetAutoFocus([g_ICRP_AutoFocus]);
}

function SetLanguage() {
	KSCertRelayNXInterface.KS_SetLanguage([g_ICRP_Language]);
}

function SetKmcertsupport() {
	KSCertRelayNXInterface.KS_SetKmcertsupport([g_ICRP_Kmcertsupport]);
}

function SetRequiredAlg(){	
	KSCertRelayNXInterface.KS_SetRequiredAlg([g_ICRP_RequiredAlg]);
}

function SetKeypro(){
	KSCertRelayNXInterface.KS_SetKeypro([g_ICRP_Keypro]);
}

function nxCR_SetTranskey(){
	KSCertRelayNXInterface.KS_nxCR_SetTranskey([g_ICRP_Transkey_URL,g_ICRP_Transkey_Size]);
}

function SetCodeSignVerify(){	
	KSCertRelayNXInterface.KS_SetCodeSignVerify([g_ICRP_CodeSignVerify ]);
}

function SetCertDN() {
	KSCertRelayNXInterface.KS_SetCertDN([g_ICRP_CertDN]);
}

function SetCertDelete() {
	KSCertRelayNXInterface.KS_SetCertDelete(["1","[페이지입력문구]인증서 내보내기 후 인증서를 삭제하는게 안전합니다."]);
	KSCertRelayNXInterface.KS_SetCertDelete_ENG(["1","[Page input message]Delete Cert"]);
}

function SetFontSizeEditCtrl(){	
	KSCertRelayNXInterface.KS_SetFontSizeEditCtrl([g_ICRP_FontSizeEditCtrl]);
}

function SetFontSizeCnum(){	
	KSCertRelayNXInterface.KS_SetFontSizeCnum([g_ICRP_FontSizeCnum]);
}
function SetServerSendCert_QR() {
	KSCertRelayNXInterface.KS_SetServerSendCert_QR([g_QRServerSendCertURL]);
}

function SetServerMyCert_QR() {
	KSCertRelayNXInterface.KS_SetServerMyCert_QR([g_QRServerMyCertURL]);
}

function SetQRTimer() {
	KSCertRelayNXInterface.KS_SetQRTimer([g_QR_TimerSecond, g_QR_TimerFlag]);
	KSCertRelayNXInterface.KS_SetServerAuthQuery_QR([g_QRServerAuthqueryURL]);
}

function SetHttpVer_QR() {
	KSCertRelayNXInterface.KS_SetHttpVer_QR([g_QR_HttpVer]);
}

function LoadMainQR() {
	if(SupportCheck())
	{
		SetBannerImg();
		SetServerSendCert_QR();
		SetServerMyCert_QR();
		SetQRTimer();
		SetDisplayOID();
		SetExplainStr_QR();
		//SetLanguage();
		//SetHttpVer_QR();
		//SetKeypro();
		nxCR_SetTranskey();
		//SetPKCS12();
		//SetCodeSignVerify();
		//SetCertDelete();
		KSCertRelayNXInterface.KS_LoadMainQR(["NONE" , "NONE"]);
	}
	else
	{
		//안내페이지 이동시 사용
		//location.href = keysharpnxInfo.ksInstallpage;
	}
}
function SupportCheck()
{
	try{
		if(TOUCHENEX_UTIL.isWin()){
			if(TOUCHENEX_UTIL.isIE() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.MSIE)) return true;
			else if(TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.CHROME)) return true;
			else if(TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.FIREFOX)) return true;
			else if(TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.OPERA)) return true;
			else if(TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.SAFARI_WIN)) return true;
			else if(TOUCHENEX_UTIL.isEdge()) return true;
			else
			{
				alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
				return false;
			}
		}
		else if(TOUCHENEX_UTIL.isMac()){
			if(TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.CHROME)) return true;
			else if(TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.FIREFOX)) return true;
			else if(TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.OPERA)) return true;
			else if(TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.SAFARI_MAC)) return true;
			else
			{
				alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
				return false;
			}
		}
		else {
			alert(" 현재 미지원 운영체제에서 사용중입니다. Windows 환경에서 이용부탁드립니다.");
			return false;
		}
	}catch(e){
	alert ("미지원환경입니다.")
	return false;
	}
}

// [2017.07.27][백선철] 호스트에 따라서 ip 변경
function getServerIP() {
    var host = location.host;
    if (host == "www.finnq.com") {
        return "https://www.finnq.com";
    } else if (host == "swww.finnq.com") {
        return "https://swww.finnq.com";
    } else {
        return "https://dwww.finnq.com";
    }
}