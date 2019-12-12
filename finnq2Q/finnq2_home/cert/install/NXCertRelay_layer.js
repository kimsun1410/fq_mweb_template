var Keysharp_installpage = "";//설치페이지 확인을 위해 전역으로 변수 설정
var useKeysharp = true;
var ExtensionLayer = "ExtensionLayer";

document.write("<script type='text/javascript' charset='utf-8' src='/nxCR/js/NXCertRelay.js'></script>");
/*
var KeySharpNxInstall = setInterval(function(){
	checkBrowserExtensionInstalledForRaonSecure();
 },1000);
*/
function KS_extensionInstall() {
	if(TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || TOUCHENEX_UTIL.isOpera()){
		KS_extensiondownload();
	}
}
/**
 * RaonSecure Browser Extension 설치여부 확인
 */
 function checkBrowserExtensionInstalledForRaonSecure() {
    if (useKeysharp) { //nxCR 사용여부
        if(TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || TOUCHENEX_UTIL.isOpera()) {
            TOUCHENEX_CHECK.check([keysharpnxInfo], function(callbackData) {
                currStatus = callbackData;
                KS_notInstall(currStatus);
                
                if (currStatus.info[0].extension) {
                	// 익스텐션 설치가 정상적으로 되어있을 때 로직 추가
                	LayerClose();
                } else {
                	//alert("익스텐션 미 설치가 설치 안내 팝업 띄우기");
                	// 익스텐션 설치가 되어 있지 않을 때 설치 가이드 안내 추가
                	//extension_modal_open($('#modal_ExtensionInstall'), this);		  
                	OpenLayerDialog();
                }
            }); // end of callback
        } else {
            //Extenstion 설치가 없는 브라우저로 Extenstion 설치를 보여줄 필요 없음.
        	//extension_modal_open($('#modal_ExtensionInstall'), this);		  
        }
    }
}
/*RaonSecure Extension Layer*/
function OpenLayerDialog() {

	if(document.getElementById(ExtensionLayer)!=null)
		return;

    var div1 = document.createElement("DIV");
    div1.id = ExtensionLayer;
    div1.style.position = "fixed";
    div1.style.height = "100%";
    div1.style.width = "100%";
    div1.style.top = "0";
    div1.style.left = "0";
    div1.style.background = "#000000";
    div1.style.opacity = "0.4";
    div1.style.filter = "alpha(opacity=40)";

    var div2 = document.createElement("DIV");
    div2.style.cssText="width: 200px;z-index: 1001;border: 3px solid orange;border-radius: 11px;background: gray;";
    div2.innerHTML="<span style='color:orange;font-weight: bold;'>nxCR</span><br><span id='ExtensionLayerText1'>인증서복사 확장프로그램을 설치합니다. 아래 버튼을 눌러 설치하여 주시기 바랍니다.</span><span id='ExtensionLayerText2' style='display:none;'></span>"
    	+"<div><span id='ncCR_Check'><button style='margin: 10px;width: 80px;' onclick='javascript:KS_extensionInstall();'>설치하기</button></span>";

    var div3 = document.createElement("DIV");
    div3.id = ExtensionLayer + "_popup";
    div3.style.cssText="position: absolute;  display: table-cell;text-align: center; vertical-align: middle; color: white;z-index: 1000;";
    div3.appendChild(div2);

    document.body.appendChild(div1);
    document.body.appendChild(div3);


    LayerResize();

    window.onresize = function(event) {LayerResize();};

}

function LayerResize() {
	var div1 = document.getElementById(ExtensionLayer);
    var div2 = document.getElementById(ExtensionLayer + "_popup");
    if (div2) {
    	div2.style.top = (div1.clientHeight/2)-100+"px";
    	div2.style.left = (div1.clientWidth/2)-100+"px";
    }
}

function LayerClose(){

	var close = true;
    if (close) {
        var div1 = document.getElementById(ExtensionLayer);
        var div2 = document.getElementById(ExtensionLayer + "_popup");

        if (div1) {
            document.body.removeChild(div1);
        }
        if (div2) {
            document.body.removeChild(div2);
        }

        window.onresize = null;
    }
}