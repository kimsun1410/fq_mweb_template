/*
****************************************************
	NXCertRelay_Install.js 수정내역 
****************************************************
| Version		 작성자		  수정일		 변경사항 
 ---------		-------		---------	----------	
| v2.1.0.3       강남준		2017.01.31 
| v2.1.0.2		 강남준		2016.12.21	
| v2.1.0.1		 강남준		2016.10.06	

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
*/

/**
 * fileDownload sample script
 */
var KEYSHARPEX_INSTALL = {

	installWindow : null,
	
	download : function( moduleName, type ) {
		
		var pluginInfo = {};
		for(var i = 0; i < TOUCHENEX_CONST.pluginInfo.length; i++){
			if(TOUCHENEX_CONST.pluginInfo[i].exModuleName == moduleName){
				pluginInfo = TOUCHENEX_CONST.pluginInfo[i];
				//exlog("_INSTALL.download", pluginInfo);
				break;
			}
		}
		var dummyParam = "dummy="+Math.floor(Math.random() * 10000) + 1;
		

		
		
		// Extension
		if(type == "extension"){
			
			if(TOUCHENEX_UTIL.isChrome()){
				
				if(!this.installWindow || this.installWindow.closed){
					//this.installWindow = window.open(pluginInfo.exExtensionInfo.exChromeExtDownURL);
					this.installWindow = window.open(keysharpnxInfo.exExtensionInfo.exChromeExtDownURL);
					if(this.installWindow == null) alert("팝업차단을 확인해주세요.");
				}
				
			} else if(TOUCHENEX_UTIL.isFirefox()) {
				
				var params = {};
				dummyParam = "ver=" + keysharpnxInfo.exExtensionInfo.exFirefoxExtVer;
				
				params[keysharpnxInfo.exProtocolName + "_firefox"] = {
					URL: keysharpnxInfo.exExtensionInfo.exFirefoxExtDownURL + "?" + dummyParam,
					IconURL: keysharpnxInfo.exExtensionInfo.exFirefoxExtIcon
				};
				InstallTrigger.install(params);
				
			} else if(TOUCHENEX_UTIL.isOpera()) {
				
				dummyParam = "ver=" + keysharpnxInfo.exExtensionInfo.exOperaExtVer;
				window.open(keysharpnxInfo.exExtensionInfo.exOperaExtDownURL + "?" + dummyParam, "_self");
			} else {
				alert("현재 브라우저는 extension 설치를 지원하지 않습니다.");
			}
			return;
		}
		
		// EX
		if(type == "EX"){
			var downURL = "";
			
			if(TOUCHENEX_UTIL.isWin()){
				if(TOUCHENEX_UTIL.getBrowserBit() == "64"){
					downURL = keysharpnxInfo.exProtocolInfo.exWin64ProtocolDownURL;
				} else {
					downURL = keysharpnxInfo.exProtocolInfo.exWinProtocolDownURL;
				}
			} else if(TOUCHENEX_UTIL.isMac()){
				downURL = pluginInfo.exProtocolInfo.exMacProtocolDownURL;
			} else if(TOUCHENEX_UTIL.isLinux()){
				// TODO
			}
						
			if(!TOUCHENEX_UTIL.isIE()){
				dummyParam = "ver=" + keysharpnxInfo.exProtocolInfo.exWinProtocolVer;
				window.open(downURL + "?" + dummyParam, "_self");
			} else {
				window.open(downURL, "_self");
			}
			return;
		}
		
		// Client
		if(type == "client"){
			var downURL = "";
			
			if(TOUCHENEX_UTIL.isWin()){
				if(TOUCHENEX_UTIL.getBrowserBit() == "64"){
					downURL = keysharpnxInfo.moduleInfo.exWin64Client;
				} else {
					downURL = keysharpnxInfo.moduleInfo.exWinClient;
				}
			} else if(TOUCHENEX_UTIL.isMac()){
				downURL = keysharpnxInfo.moduleInfo.exMacClient;
			} else if(TOUCHENEX_UTIL.isLinux()){
				// TODO
			}
			if(!TOUCHENEX_UTIL.isIE()){
				dummyParam = "ver=" + keysharpnxInfo.moduleInfo.exWinVer;
				window.open(downURL + "?" + dummyParam, "_self");
			} else {
				window.open(downURL, "_self");
			}
			return;
		}
        
        //[2015.11]로컬웹서버 방식.
        // Daemon
		if(type == "daemon"){
			var downURL = "";
			var bSupportBrowser = false;

			if (TOUCHENEX_UTIL.isIE() || (TOUCHENEX_UTIL.isSafari() && !TOUCHENEX_UTIL.isChrome()))
			{				
				if(TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserBit() == "64"){
					downURL = keysharpnxInfo.moduleInfo.exWin64Client;
				} else {
					downURL = keysharpnxInfo.moduleInfo.exWinClient;
				}
			}
			else {
				var daemonInfo = keysharpnxInfo.exEdgeInfo;
				var browserType = TOUCHENEX_UTIL.getBrowserInfo().browser;
				
				if(daemonInfo && daemonInfo.supportBrowser instanceof Array && daemonInfo.supportBrowser.length > 0)
				{
					for(var i = 0; i < daemonInfo.supportBrowser.length; i++)
					{
						var reqBrowser = daemonInfo.supportBrowser[i];
						if(browserType.toUpperCase() == reqBrowser.toUpperCase())
						{
							if(TOUCHEN_RUNTYPE == "mainextension" && TOUCHENEX_UTIL.isFirefox() && TOUCHENEX_UTIL.getBrowserBit() == "64" && typeof touchenex_nativecall != "undefined")
							{
								downURL = keysharpnxInfo.moduleInfo.exWin64Client;
							}
							else
							{
								downURL = daemonInfo.daemonDownURL;					    
							}
						
							bSupportBrowser = true;
						}
					}
				}
			
				if(bSupportBrowser == false) 
				{
					alert("현재 브라우저는 daemon 설치를 지원하지 않습니다.");
					return;
				}
			}				
			
			location.href = downURL;
			return;
		}
	}
};