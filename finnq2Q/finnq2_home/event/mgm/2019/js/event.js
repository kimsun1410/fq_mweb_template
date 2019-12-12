(function($) {
    $(function(){
       function paramiter(paramName){
            // 리턴값을 위한 변수 선언
            var returnValue;

            // 현재 URL 가져오기
            var url = location.href;
            // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
            var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
            for (var i = 0; i < parameters.length; i++) {
                var varName = parameters[i].split('=')[0];
                if (varName.toUpperCase() == paramName.toUpperCase()) {
                    returnValue = parameters[i].split('=')[1];
                    return decodeURIComponent(returnValue);
                }
            }
        };

        // DeviceModel
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


        // 버튼 클릭시 ajax 실행
        // https://www.finnq.com/event/mgm/2019?media=마케팅영역
        // https://www.finnq.com/event/mgm/2019?media=facebook
        var _parms = paramiter('media');
        var appUrl;
        function appUrlSet() {
            if (_parms != undefined || _parms != null) {
                appUrl = "https://finnq.onelink.me/YERF?pid="+_parms+"&c=bokmoney";
            } else {
                appUrl = "https://finnq.onelink.me/YERF?pid=finnq&c=bokmoney";
            }

            $('.btn_app').attr({'href': appUrl});
        }
        appUrlSet();
    });
})(jQuery);
