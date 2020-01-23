
$( document ).ready(function() {
	$(window).load(function(){
		$('.cashmy_inner').each(function () {
		    if ($(this).hasClass("end")) {
			      setTimeout(function () {
		              $('.slide_money').removeClass('shake');
		          }, 2500);
	        } else {
	        	function scrollOff(){
				   $('body').addClass('scrolloff').on('scroll touchmove mousewheel', function(e){
				      e.preventDefault();
				   });
				}scrollOff();
	            var tID;
				var tID2;
				setTimeout(function () {
			       animateScript();
			    }, 1800);
				setTimeout(function () {
					$('#image').one('click', function () {
						stopAnimate();
						return false;
					});
				},3000);
				function stopAnimate() { 
					$('.animation_box').addClass('active');
					clearInterval(tID);
			   		slide.each(function (i) {
				        if (i < 1) {
				            setTimeout(function () {
				                slide.eq(i).fadeOut();
				            });
				        }
				    });
				    animateSlideB();
				    animateScript2();
				    setTimeout(function () {
			       		num_cc();
			       		$('.close_box').addClass('is-visible');
			    	},100);
			    	setTimeout(function () {
			       		$('.share_box').addClass('open');
			    	},1000);
			           
				}
				function animateScript() {
					var    position = 280; 
					const  interval = 45; 
					const  diff = 280;    
					tID = setInterval ( () => {
						document.getElementById("image").style.backgroundPosition = 
						`-${position}px 0px`; 
						if (position < 3640){ 
							position = position + diff;
						}
						else{ 
							position = 280;
							clearInterval(tID);
						}
					}, interval );
				}
				function stopAnimate2() {
					clearInterval(tID2);
				}
				function animateScript2() {
					var    position2 = 320; 
					const  interval2 = 16; 
					const  diff2 = 320;    
					tID2 = setInterval ( () => {
						document.getElementById("image2").style.backgroundPosition = 
						`-${position2}px 0px`; 
						if (position2 < 8640){ 
							position2 = position2 + diff2;
						}
						else{ 
							position2 = 320;
							stopAnimate2(); 
						}
					}, interval2 );
				}
				var slide  = $('.slide'),
			        slideAelements = $('.slide-a-child'),
			        slideBelements = $('.slide-b-child'),
			        slideCelements = $('.slide-c-child');

			    function animateSlideA() {
			      slideAelements.each(function (i) {
			          setTimeout(function () {
			              $('.slide_money').addClass('is-visible');
			          }, 1000 * (i + 1));
			          setTimeout(function () {
			              $('.slide_money').addClass('shake');
			              slideAelements.eq(i).addClass('is-visible');
			          }, 2500);
			      });
			    }animateSlideA();
				function changeUp() {
				  var i = Math.floor((Math.random() * 10 ));
				   $('.slide-b').eq(i).addClass('win');
				}

			    function animateSlideB() {
			      slideBelements.each(function (i) {
			          setTimeout(function () {
			              slideBelements.eq(i).addClass('is-visible');
			              changeUp();
			          }, 120 * (i + 1));
			      });
			    }
			    function num_cc(){
			       $('.cash_num').each(function() {
			          var $this = $(this),
			            countTo = $this.attr('data-count');
			          $({countNum: $this.text()}).animate({countNum: countTo},
			            {
			              duration: 500, // 카운터 타임
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
	        }
	    });
	});  		
});
