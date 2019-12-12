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
        /* 카운터 */
        var counter_cash = (function() {
            var clock;
            var next_check;
            var check_count;

            check_count = 0; //
            next_check = random_test(1, 1);
            //console.log('next_value: ' + next_check);
            
            clock = $('.check').FlipClock(123456,{
                clockFace: 'Counter', // 카운터 플립
                minimumDigits: 6, // 카운터 갯수
                autoStart: false,
                countdown :false, // 카운터 auto
                /*callbacks: {
                  stop: function() {
                    setTimeout(function(){
                        clock.reset();
                        clock.setTime(0);
                        clock.start();
                    },1000)
                  }
                }*/
            });
            conter_plus = setInterval(function(){
                check_count += 1;
                if(check_count == next_check) {
                    clock.increment();
                    next_check = random_test(1, 1) + check_count;
                    //console.log('next_value: ' + next_check);
                }
            }, 1000);

            $('.reload').on('click', function(e) {
                $(this).find('svg').toggleClass("active");    
                clock.stop();
                clearInterval(conter_plus);
                //clock.setTime();
                //clock.reset();
            }); 
            function random_test(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }());
        /* 카운터 리스트 */
        var counter_list = (function() {
            var rolling_rank = function() {
                setTimeout(function(){
                    $('.rank_box').animate( {marginTop: '34px'}, 600, function(){
                        $('.rank_box li:last-child').prependTo('ul.rank_box');
                        $('.rank_box li:first').removeAttr('style');
                        $('.rank_box').removeAttr('style');
                    });
                    $('.rank_box li').eq(-2).css('opacity','0.1');
                    

                    /*var first = false;
                    var $element = $('.notice-list');
                    var move = $element.children().outerHeight();
                    $(".rank_box").each(function(idx){
                        if(!first){
                            $(".rank_box").eq(idx).animate({'top': '0px'},'normal',function(){
                                lastChild = $(this).children().eq(-1).clone(true);
                                lastChild.prependTo($(".rank_box").eq(idx));
                                $(this).children().eq(-1).remove();
                                $(this).css('top','-'+move+'px');
                            });
                            first = true;
                            return false;
                        }
            
                        $(".rank_box").eq(idx).animate({'top': '0px'},'normal',function(){
                            lastChild = $(this).children().filter(':last-child').clone(true);
                            lastChild.prependTo($(".rank_box").eq(idx));
                            $(this).children().filter(':last-child').remove();
                            $(this).css('top','-'+move+'px');
                        });
                    });*/
                    
                    /*var firstElement = $(".rank_box li:first").detach();

                    $('.rank_box').animate( {top: '34px'}, 500, function(){
                        $(".rank_box li:first").before(firstElement);
                        $('.rank_box').removeAttr('style');
                        //$(this).children().filter(':last-child').remove();
                    });*/

                    rolling_rank();
                }, 3000);
            };
            rolling_rank();
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
