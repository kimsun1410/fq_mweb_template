/************************************************
    decrition by : kim tae yang
    date : 2020-01-20
    캐시백 이벤트
************************************************/

function init() {
    $(function() {
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
        var counter_cash = (function() {
            var clock;
            var next_check;
            var check_count;
            check_count = 0;
            next_check = random_test(1, 1);
            clock = $('.check').FlipClock(123456,{
                clockFace: 'Counter',
                minimumDigits: 6,
                autoStart: false,
                countdown :false,
            });
            conter_plus = setInterval(function(){
                check_count += 1;
                if(check_count == next_check) {
                    clock.increment();
                    next_check = random_test(1, 1) + check_count;
                }
            }, 2000);
            $('.reload').on('click', function(e) {
                $(this).find('svg').toggleClass("active");    
                clock.stop();
                clearInterval(conter_plus);
            }); 
            function random_test(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }());

        var scroll_counter = (function() {
            var secBool01 = true;
            var secBool02 = true;
            function num_cc(){
               $('#counter_num').each(function() {
                  var $this = $(this),
                    countTo = $this.attr('data-count');
                  $({countNum: $this.text()}).animate({countNum: countTo},
                    {
                      duration: 1000,
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
            $(window).on("scroll", function() {
                function rolling_load(){ 
                    $('.rank_box li').addClass('load_section');
                    setTimeout(function(){
                        $('.rank_box li').removeClass('load_section');
                        $('.rank_box').addClass('vertical');
                    }, 1500);
                };
                function rolling_rank(){
                    setTimeout(function(){
                        $('.rank_box').animate( {marginTop: '43px'}, 600, function(){
                            $('.rank_box li:last-child').prependTo('ul.rank_box');
                            $('.rank_box li:first').removeAttr('style');
                            $('.rank_box').removeAttr('style');
                        });
                        $('.rank_box li').eq(-2).css('opacity','0.1');
                        rolling_rank();
                    }, 3000);
                };
                winSc = $(window).scrollTop();
                winH = $(window).height();
                docH = $(document).height();
                TopH = $(".cash_tooltip").outerHeight() - 20;
                TopH < winSc ? $(".cash_tooltip").removeClass("on") : $(".cash_tooltip").addClass("on");
                secH02 = $('.sec_event_rank').offset().top;
                if(winSc > secH02 - $('.sec_event_rank').height() - 230){
                    if(secBool02){
                        num_cc();
                        rolling_load();
                        rolling_rank();
                        secBool02 = false;
                    }
                }
            });
        }());

        var toggle_list = (function() {
            function listexpend() {
                $('body').on('click','.list_expend .subject',function(e){
                    var $this = $(this);
                    var detail= $this.next();
                    var hh= detail.find(".con").outerHeight();
                    if ($this.hasClass('on')) {
                        $this.removeClass('on');
                        detail.animate({height:0,overflow:"hidden"},300);
                    } else {
                        $this.addClass('on');
                        detail.animate({height:hh,overflow:"visible"},300);
                    }
                });
            }listexpend();
        }());
    })
}
