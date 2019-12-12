/* 해더 / 풋터 공통 처리 */
/* 로컬에서만 주석처리. 개발/테스트에만 적용. */
/*
$(function() {
	var _header;
	_header =
	'<div class="inner">' +
		'<h1 class="blind">Finnq 홈페이지에 오신것을 환영합니다.</h1>' +
		'<a href="/index.html" class="header-logo">Finnq</a>' +
		'<nav class="nav">' +
			'<ul class="nav-list">' +
				'<li class="finnqmarket">' +
					'<a href="/product/finnqmarket-card.html?tabNum=0&tabItem=0">핀크마켓</a>' +
					'<div class="sub-menu">' +
						'<ul>' +
							'<li><a href="/product/finnqmarket-card.html?tabNum=0&tabItem=0">카드</a></li>' +
							'<li><a href="/product/finnqmarket-saving.html?tabNum=0&tabItem=0">예적금</a></li>' +
							'<li><a href="/product/finnqmarket-loan.html?tabNum=0&tabItem=0">대출</a></li>' +
							'<li><a href="/product/finnqmarket-investment.html?tabNum=0&tabItem=0">투자</a></li>' +
							'<li><a href="/product/finnqmarket-insurance.html?tabNum=0&tabItem=0">보험 맞춤 추천</a></li>' +
							'<li><a href="/product/finnqmarket-remittance.html?tabNum=0&tabItem=0">해외송금</a></li>' +
						'</ul>' +
					'</div>' +
				'</li>' +
				'<li class="cerfi"><a href="/cert/cert.html">공인인증센터</a></li>' +
			'</ul>' +
		'</nav>' +
		'<nav class="m-nav">' +
			'<button type="button" class="btn-nav"><img src="/image/v2/btn_m_nav.png" alt="메뉴"></button>' +
		'</nav>' +
		'<div class="m-gnb">' +
			'<a href="index.html" class="m-gnb-logo"><img src="/image/v2/logo_finnq_gnb.png" alt="Finnq"></a>' +
			'<div class="m-gnb-inner">' +
				'<ul>' +
					'<li>' +
						'<a href="/product/finnqmarket-card.html?tabNum=0&tabItem=0">핀크마켓</a>' +
						'<ul class="m-sub-menu">' +
							'<li><a href="/product/finnqmarket-card.html?tabNum=0&tabItem=0">카드</a></li>' +
							'<li><a href="/product/finnqmarket-saving.html?tabNum=0&tabItem=0">예적금</a></li>' +
							'<li><a href="/product/finnqmarket-loan.html?tabNum=0&tabItem=0">대출</a></li>' +
							'<li><a href="/product/finnqmarket-investment.html?tabNum=0&tabItem=0">투자</a></li>' +
							'<li><a href="/product/finnqmarket-insurance.html?tabNum=0&tabItem=0">보험 맞춤 추천</a></li>' +
							'<li><a href="/product/finnqmarket-remittance.html?tabNum=0&tabItem=0">해외송금</a></li>' +
						'</ul>' +
					'</li>' +
				'</ul>' +
			'</div>' +
			'<div class="m-sns">' +
				'<ul>' +
					'<li>' +
						'<a href="https://www.facebook.com/Finnq.official/" class="btn-gnb-fb" target="_blank" title="새창 열림">페이스북 공유하기</a>' +
					'</li>' +
					'<li>' +
						'<a href="https://www.instagram.com/finnq_official/" class="btn-gnb-insta" target="_blank" title="새창 열림">인스타그램 공유하기</a>' +
					'</li>' +
					'<li>' +
						'<a href="https://post.naver.com/finnq" class="btn-gnb-blog" target="_blank" title="새창 열림">네이버블로그 공유하기</a>' +
					'</li>' +
				'</ul>' +
			'</div>' +
			'<button type="button" class="m-gnb-close"><img src="/image/v2/btn_close_gnb.png" alt="닫기"></button>' +
		'</div>' +
		'<div class="m-gnb-deem"></div>' +
		'<div class="popup_ios">' +
			'<div class="inner">' +
				'<a href="#none" class="btn_close"><img src="/image/v2/btn_close.png" alt="닫기"></a>' +
				'<p>아이폰 유저는<br />조금만 기다려주세요!</p>' +
				'<p>핀크가 곧 찾아갑니다 <span>:)</span></p>' +
			'</div>' +
		'</div>' +
	'</div>';

	$('#header').append( _header );

	var _footer;
	_footer =
	'<div class="inner">' +
		'<ul class="footer-menu">' +
			'<li><a href="/policy/service.html">서비스이용약관</a></li>' +
			'<li><a href="/policy/privacy.html">개인정보처리방침</a></li>' +
			'<li><a href="/policy/customer_information.html">고객정보취급방침</a></li>' +
			'<li><a href="/hfg/vision_group.html">하나금융그룹</a></li>' +
		'</ul>' +
		'<div class="info">' +
			'<em class="company">주식회사 핀크</em>' +
			'<ul>' +
				'<li><address>서울 중구 을지로 100, 20층 (을지로2가, 파인에비뉴빌딩)</address></li>' +
				'<li>대표이사 : 권영탁</li>' +
				'<li>사업자 등록번호 : 299-81-00502</li>' +
				'<li>통신판매업 신고번호 : 제 2017-서울중구-1146호</li>' +
				'<li><a href="http://ftc.go.kr/bizCommPop.do?wrkr_no=2998100502" target="_blank" title="새창 열림">사업자정보확인</a></li>' +
				'<li><a href="/files/finnq2017.pdf" target="_blank" title="새창 열기">재무제표공고(2017)</a></li>' +
				'<li><a href="/files/finnq2018.pdf" target="_blank" title="새창 열기">재무제표공고(2018)</a></li>' +
				'<li>호스팅서비스 사업자 : 주식회사 핀크</li>' +
				'<li>고객센터 : 1566-4949</li>' +
				'<li>E-mail : <a href="mailto:cs@finnq.co.kr">cs@finnq.co.kr</a></li>' +
				'<li>제휴문의 : <a href="mailto:partner@finnq.co.kr">partner@finnq.co.kr</a></li>' +
			'</ul>' +
			'<p class="copyright">Copyright © Finnq Inc.</p>' +
		'</div>' +
		'<div class="family">' +
			'<a href="#">계열사</a>' +
			'<ul>' +
				'<li><a href="http://www.hanafn.com" target="_blank" title="새창 열림">하나금융그룹</a></li>' +
				'<li><a href="http://www.kebhana.com" target="_blank" title="새창 열림">KEB하나은행</a></li>' +
				'<li><a href="http://www.hanaw.com" target="_blank" title="새창 열림">하나금융투자</a></li>' +
				'<li><a href="http://www.hanacard.co.kr" target="_blank" title="새창 열림">하나카드</a></li>' +
				'<li><a href="http://www.hanacapital.co.kr" target="_blank" title="새창 열림">하나캐피탈</a></li>' +
				'<li><a href="http://www.hanalife.co.kr" target="_blank" title="새창 열림">하나생명</a></li>' +
				'<li><a href="http://www.hanasavings.com" target="_blank" title="새창 열림">하나저축은행</a></li>' +
				'<li><a href="http://www.hanatrust.com" target="_blank" title="새창 열림">하나자산신탁</a></li>' +
				'<li><a href="http://www.hana-assetmanagement.com" target="_blank" title="새창 열림">하나대체투자자산운용</a></li>' +
				'<li><a href="http://www.hanais.co.kr" target="_blank" title="새창 열림">하나펀드서비스</a></li>' +
				'<li><a href="http://www.hanati.co.kr" target="_blank" title="새창 열림">하나금융티아이</a></li>' +
				'<li><a href="http://www.hana-nanum.com" target="_blank" title="새창 열림">하나금융나눔재단</a></li>' +
				'<li><a href="http://www.hanafoundation.or.kr" target="_blank" title="새창 열림">하나금융공익재단</a></li>' +
				'<li><a href="http://www.hanacarecenter.or.kr" target="_blank" title="새창 열림">하나케어센터</a></li>' +
				'<li><a href="http://www.hanamiso.org" target="_blank" title="새창 열림">하나미소금융재단</a></li>' +
				'<li><a href="http://www.hana.hs.kr" target="_blank" title="새창 열림">하나고등학교</a></li>' +
			'</ul>' +
		'</div>' +
		'<div class="sns-wrap">' +
			'<ul>' +
				'<li>' +
					'<a href="https://www.facebook.com/Finnq.official/" class="btn-fb" target="_blank" title="새창 열림">페이스북 공유하기</a>' +
				'</li>' +
				'<li>' +
					'<a href="https://www.instagram.com/finnq_official/" class="btn-insta" target="_blank" title="새창 열림">인스타그램 공유하기</a>' +
				'</li>' +
				'<li>' +
					'<a href="https://post.naver.com/finnq" class="btn-blog" target="_blank" title="새창 열림">네이버블로그 공유하기</a>' +
				'</li>' +
			'</ul>' +
		'</div>' +
	'</div>';

	$('#footer').append( _footer );
});
*/


var winW, docH, scrT, headH, footH = [],
	platform = "",
	check_android_version = function() {
		var a = /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());
		platform = navigator.platform;
		a ? (a = navigator.userAgent.toLowerCase(), a = -1 < a.search("android") ? "android" : -1 < a.search("iphone") || -1 < a.search("ipod") || -1 < a.search("ipad") ? "ios" : "else") : a = "no_device";
		$(":root").addClass(a);
		return a;
	};
$(function() {
	init();
	check_android_version();
	$(".key-visual .app-down a").on("click", function(b) {
		switch ($(this).index()) {
			case 0:
				window.open("https://play.google.com/store/apps/details?id=com.finnq.f1", "_blank")
				break;
			case 1:
				window.open("https://itunes.apple.com/app/id1260871482", "_blank");
		}
	});
	$(".app-download .btns .g-btn").on("click", function(b) {
		switch ($(this).index()) {
			case 0:
				window.open("https://itunes.apple.com/app/id1260871482", "_blank");
				break;
			case 1:
				window.open("https://play.google.com/store/apps/details?id=com.finnq.f1",
					"_blank")
		}
	});
	$(".finnq_5savings .app-down a").on("click", function(b) {
		switch ($(this).index()) {
			case 0:
				window.open("https://play.google.com/store/apps/details?id=com.finnq.f1", "_blank")
				break;
			case 1:
				window.open("https://itunes.apple.com/app/id1260871482", "_blank");
		}
	});
	$(".finnq_5kdbsavings .app-down a").on("click", function(b) {
		switch ($(this).index()) {
			case 0:
				window.open("https://play.google.com/store/apps/details?id=com.finnq.f1", "_blank")
				break;
			case 1:
				window.open("https://itunes.apple.com/app/id1260871482", "_blank");
		}
	});
	$(".market_loan_dgbfq .app-down a").on("click", function(b) {
		switch ($(this).index()) {
			case 0:
				window.open("https://play.google.com/store/apps/details?id=com.finnq.f1", "_blank")
				break;
			case 1:
				window.open("https://itunes.apple.com/app/id1260871482", "_blank");
		}
	});
	$(".market_loan_tscore .app-down a").on("click", function(b) {
		switch ($(this).index()) {
			case 0:
				window.open("https://play.google.com/store/apps/details?id=com.finnq.f1", "_blank")
				break;
			case 1:
				window.open("https://itunes.apple.com/app/id1260871482", "_blank");
		}
	});

	$("button").on("click", function(b) {
		b.preventDefault()
	});
	var a = {
		Hide_family: function() {
			$("#footer .family").removeClass("open");
			$("#footer .family").find("ul").slideUp()
		},
		Hide_select: function() {
			$(".select").removeClass("tab-open")
		}
	};
	$(".select").on("click", "a", function(b) {
		var a = $(b.delegateTarget),
			d = $(this).parent();
		0 == $(this).attr("href").indexOf("#") && b.preventDefault();
		d.siblings().removeClass("active");
		d.addClass("active");
		a.hasClass("tab-open") ? a.removeClass("tab-open") : d.hasClass("active") && a.addClass("tab-open")
	});
	$(".select").on("mouseleave", function(b) {
		a.Hide_select()
	});

	$(document).on("click", "#footer .family > a",function(a) {
		a.preventDefault();
		$(this).next().slideToggle();
		$(a.delegateTarget).toggleClass("open");
	});

	$(document).on("click", "#footer .family > ul a", function(){
		$(this).parent().parent().slideToggle();
	});

	$("#wrap").click(function(b) {
		var c = $("#footer .family");
		c.is(b.target) || 0 !== c.has(b.target).length || a.Hide_family();
		c = $(".search-box .select");
		c.is(b.target) || 0 !== c.has(b.target).length || a.Hide_select();
		c = $(".select-group");
		c.is(b.target) || 0 !== c.has(b.target).length || c.removeClass("select-open");
		//c = $("#header");
		//$(":root").hasClass("mobile") && (c.is(b.target) || 0 !== c.has(b.target).length || a.Hide_nav())
	});
});
var initSize = function() {
	winW = $(window).outerWidth();
	docH = $(document).height();
	headH = $("header").height();
	footH = $("footer").outerHeight();

	navX = $(".nav-list .finnqmarket a").offset();
	navW = $(".nav-list .finnqmarket").outerWidth();
	subW = $(".sub-menu ul").outerWidth();

	subP = (subW - navW)/2;
	// $(".sub-menu ul").css( {'margin-left':-subP, 'left':navX.left} );
	/* 18.10.08  메뉴 추가로 인한 left 값 수정 HDK */
	//$(".sub-menu ul").css( {'margin-left':-subP, 'left':navX.left - 130} );

	// 2019.05.13 //
	$(".sub-menu ul").css( {'margin-left':-subP, 'left':navX.left + 5 } );

};
refreshPg = function() {
	//$("html, body").stop().animate({
		//scrollTop: 0
	//}, 25)
};
$(window).on("load", function() {
	refreshPg();
	initSize();
	init();
	//scroll_chk();
}).on("resize", function() {
	refreshPg();
	initSize();
	init();
	//scroll_chk();
}).on("scroll", function() {
	scrT = $(this).scrollTop();
	scrolling = !0;
	headH < scrT ? $(".no_device #header").addClass("fixed") : $(".no_device #header").removeClass("fixed");
	//$(":root").hasClass("sub-open") && ($(":root").removeClass("sub-open"))
});

/*function scroll_chk(){
	var body_m = $('html, body');
	var windowWidth = $(window).width();
	if(!body_m.hasClass('main')){
		body_m.css('overflow','unset');
		if($('.layer-pop-wrap').css('display') == 'none'){
			body_m.css('overflow','unset');
		}
	}else{
		if($('.layer-pop-wrap').css('display') == 'block'){
			if(windowWidth < 943) {
				body_m.css('overflow','hidden');
			}else{
				body_m.css('overflow','unset');
			}
		}
	}
}*/

function init() {
	headH = $("header").outerHeight();
	footH = $("footer").outerHeight();

	initSize();
	var a = $(window).height() - $("footer").outerHeight();
	$("#container").css({
		"min-height": a
	});
	$(document).height() > $(window).height() && -1 == platform.indexOf("Mac") && (winW += 17);
	docW = $(document).outerWidth();
	960 >= winW ? $(":root").addClass("mobile") : $(":root").removeClass("mobile");

};


var check_android_version = function() {
	var currentOS, isChrome;
	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
	platform = navigator.platform;

	if (mobile) {
		// 유저에이전트를 불러와서 OS를 구분합니다.
		var userAgent = navigator.userAgent.toLowerCase();

		if (userAgent.search("android") > -1)
			currentOS = "android";
		else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1))
			currentOS = "ios";
		else
			currentOS = "else";
	} else {
		// 모바일이 아닐 때
		currentOS = "no_device";
	}
	$(':root').addClass(currentOS);
	return currentOS;
};

$(function() {
	check_android_version();
	pcNav();
	mNav();
	mSns();
	if ($('.js-tab').length) {
		jsTab();
	}
});

$(document).on('click', '.sub-menu a', function(e){
	//finnqmarket.html 페이지
	if ($(this).is('[href*=finnqmarket.html]')){
		e.preventDefault();
		var idx = $(this).parent().index();
		// 2019.05.13 //
		//jsTabAction(0, idx);
	}
	$(this).parents('li').addClass('is-on').siblings('li').removeClass('is-on');
})

$(document).on('click', '.m-sub-menu a', function(e){
	if ($(this).is('[href*=finnqmarket.html]')){
		e.preventDefault();
		var idx = $(this).parent().index();
		// 2019.05.13 //
		//jsTabAction(0, idx);

		$('html,body').css({'overflow-y':'unset'});
		$('.m-gnb').stop().animate({'left':'-100%'},500);
		$('.m-gnb-deem').css({'display':'none'});
		$(this).parent('li').addClass('is-on').siblings('li').removeClass('is-on');
	}
})



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

function jsTab() {
	//tabmenu 2018-04-26 lhs
	$('.js-tab').each(function(k) {
		var $this = $(this)
			, $trigger = $this.children('ul').find('a');

		$trigger.each(function() {
			var $self = $(this),
			idx = $self.parent('li').index(),
			$tabCont = $this.find('.tab-cont');
			var tabCod = $self.parent().data("cod");

			$self.on({
				click: function(e) {
					jsTabAction(k, $(this).parent().index(), tabCod);
					e.preventDefault();
				}
			});
		});

		//파라미터가 있는경우
		var tabNum = paramiter('tabNum');
		var tabItem = paramiter('tabItem');
		var tabCod = paramiter('tabCod');
		if (tabNum != null || tabItem != null || tabCod != null){
			jsTabAction (tabNum, tabItem, tabCod);
		}
	});

}

function jsTabAction (num1, num2, num3){
	var $this = $('.js-tab').eq(num1).find('.tab-type1 a').eq(num2);
	var $tabCont = $('.js-tab').eq(num1).find('.tab-cont');
	var $navList = $('.nav-list .finnqmarket li');
	var $navListM = $('.m-sub-menu li');

	$this.parent('li').siblings().removeClass('is-active');
	$this.parent('li').addClass('is-active');
	$tabCont.removeClass('is-active').eq(num2).addClass('is-active');
	// console.log(num1+','+num2+','+num3);

	/*if ($('.container').hasClass('cont-finnqmarket')){
		$navList.removeClass('is-on').eq(num2).addClass('is-on');
		$navListM.removeClass('is-on').eq(num2).addClass('is-on');
	} else{
		$navList.removeClass('is-on');
		$navListM.removeClass('is-on');
	}*/

}
function pcNav() {
	// $(".nav-list .finnqmarket > a").mouseenter(function() {
	$(document).on('mouseenter focusin', '.nav-list .finnqmarket > a', function() {
		$(":root").addClass("sub-open");
		$(".sub-menu > ul").css({'display':'block'});
	});
	$("#header").mouseleave(function() {
		$(':root').removeClass("sub-open");
		$(".sub-menu > ul").css({'display':'none'});
	});
}
function mNav() {
	$('.m-nav').on("click", " button",function() {
		$('html,body').css({'overflow-y':'hidden'});
		$('.m-gnb').stop().animate({'left':'0'},500);
		$('.m-gnb-deem').css({'display':'block'});
	});
	$('.m-gnb').on("click", " .m-gnb-close",function() {
		$('html,body').css({'overflow-y':'unset'});
		$('.m-gnb').stop().animate({'left':'-100%'},500);
		$('.m-gnb-deem').css({'display':'none'});
	});
	$('.m-gnb-deem').click(function() {
		$('html,body').css({'overflow-y':'unset'});
		$('.m-gnb').stop().animate({'left':'-100%'},500);
		$(this).css({'display':'none'});
	});
}

function mSns() {
	$('.m-sns ul li').on("click", " a",function() {
		$('html,body').css({'overflow-y':'unset'});
		$('.m-gnb').stop().animate({'left':'-100%'},500);
		$('.m-gnb-deem').css({'display':'none'});
	});
}

/* 레이어 팝업 닫기 추가 */
$(function() {
	$('.layer-pop-wrap').on('click', '.pop_close',function() {
		$(this).parents('.layer-pop-wrap').hide();
	});
});





