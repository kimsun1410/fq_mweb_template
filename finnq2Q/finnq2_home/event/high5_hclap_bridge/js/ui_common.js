/************************************************
    decrition by : kim tae yang
    date : 2019-06-07
    캐시백 이벤트
************************************************/

function init() {
    $(function() {
        /* 디바이스 구분 */
        var device = (function(){
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
        }());

        /* 스크롤 그래프, 숫자 카운터 업 */
        var scroll_graph = (function() {
            var runTime = 1.2; // 딜레이 시간
            var expo =   Expo.easeOut;
            var expo1 =   Elastic.easeOut.config(1, 0.3); // 트윈맥스 모션
            var expo2 = Bounce.easeOut;
            var secBool01 = true;
            var secBool02 = true;
            var graph = new TweenMax.fromTo($('.sec_event_counter .percent'),runTime,{width:0 + '%'},{width:98 +'%',delay:1,ease:expo2});
            graph.reverse();

            function num_cc(){
               $('#counter_num').each(function() {
                  var $this = $(this),
                    countTo = $this.attr('data-count');
                  $({countNum: $this.text()}).animate({countNum: countTo},
                    {
                      duration: 1000, // 카운터 타임
                      easing: 'swing',
                      step: function() {
                        $this.text(commaSeparateNumber(Math.floor(this.countNum)));
                      },
                      complete: function() {
                        $this.text(commaSeparateNumber(this.countNum));
                      }
                    }
                  );
                });

                function commaSeparateNumber(val) {
                  while (/(\d+)(\d{3})/.test(val.toString())) {
                    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                  }
                  return val;
                }
            }
            $(window).scroll(function(){
                winSc = $(window).scrollTop();
                winH = $(window).height();
                docH = $(document).height();
                secH01 = $('.sec_event_counter').offset().top;
                secH02 = $('.sec_event_share').offset().top;
                if(winSc > secH01-$('.sec_event_counter').height()-300){
                    if(secBool01){
                        graph.restart();
                        secBool01 = false;
                    }
                }else{
                    if(!secBool01){
                        graph.reverse();
                        secBool01 = true;
                    }
                }

                if(winSc > secH02-$('.sec_event_share').height()- 200){
                    if(secBool02){
                        num_cc();
                        secBool02 = false;
                    }
                }else{
                    if(!secBool02){
                        secBool02 = true;
                    }
                }

            });
        }());
    })
}
