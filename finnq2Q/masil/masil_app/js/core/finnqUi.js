// jquery를 상속 받은 라이브러리 생성
// 가장 기본적으로 필요로 하는 기능들을 모아둔다.

// finnqUi 라이브러리를 생성하여 작업을 진행한다.
// finnq에서 사용하는 생성된 기능들은 finnqUi+ 기능명을 따른다.-> .finnqUiPopup()
//모든 페이지에서 이 위젯을 사용한다


"use strict";

$.ajaxSetup({
  headers: { 'x-app-name': 'masilClub' }
});
var filter = "win16|win32|win64|mac|macintel";

if ( filter.indexOf( navigator.platform.toLowerCase() ) > 0 ) {
  /*var AppCommon = {
    getMemberNo:function(){
      return 8;
    }
  }*/
}
(function($){
  var getParameters = function (url, paramName) {
    // 리턴값을 위한 변수 선언
    var returnValue = '';

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
    return returnValue;
  };

  var finnqUiObj = {
    screenWidth: Number(window.innerWidth),
    screenHeight: Number(window.innerHeight),
    fontList : [
      {fontSize: '16px', lineHeight: '24px', className :'font_r'},
      {fontSize: '18px', lineHeight: '27px', className :'font_l'},
      {fontSize: '21px', lineHeight: '31px', className :'font_xl'},
      {fontSize: '24px', lineHeight: '36px', className :'font_xxl'}
    ],
    displaySet :{
      'true': 'block',
      'false': 'none'
    },
    tabPage:0,
    smallPopupOpen : false,
    scrollRootDom: $('body #app'),
    touchScrollSet:{
      scrollPosition: '',
      scrollStartX: 0,
      scrollStartY: 0,
      scrollEndX:0,
      scrollEndY: 0,
      moveX:0,
      moveY:0,
      topSet : true,
      movingSet : {
        'up':function(){
          $('.main-fixed-title').addClass('off');
        },
        'down':function(){
          $('.main-fixed-title').removeClass('off');
        }
      }
    },
    scrollTop:0,
    allPopupObj : {
      open: false,
      dom:null
    },
    inputFocus :false,
    bottomBox : 0
  };
  var topTitleDom = $('.top_nav');
  if($('.topStyleSet').length>0){
    finnqUiObj.scrollRootDom.scroll(function(e){
      var scrollTop = $('.scrolling-line').offset() ? $('.scrolling-line').offset().top : null;
      if(scrollTop && scrollTop < 60 ){
        topTitleDom.addClass('moveTitle');
      }else{
        topTitleDom.removeClass('moveTitle');
      }
    });
  }
  var summernoteMade = $('.summernote-set');
  if(summernoteMade.length>0){
    summernoteMade.children().each(function(){
      var thisDom = $(this);
      var imgDom,imgDomSrc,imgDomSrcSet,fontSet;
      fontSet = summernoteMade.attr('data-font');
      if(fontSet == 'set'){
        thisDom.addClass('summernote-children');
      }
      imgDom = thisDom.find('img:not(".image_view_box")');
      if(imgDom.length > 0){
        imgDomSrc =imgDom.attr('src');
        imgDomSrcSet = summernoteMade.attr('data-imgset') === 'set' ? 'data-url='+ imgDomSrc : 'src='+imgDomSrc ;
        thisDom.before('<div class="image_view_box"><img '+imgDomSrcSet+' alt="" class="tokPhoto"></div>')
        thisDom.remove();
      }
    });
  }
  if($('.main-fixed-title').length > 0){
    finnqUiObj.scrollRootDom.scroll(function(e){
      var scrollTop = $(this).scrollTop();
      if(scrollTop < 80 ){
        finnqUiObj.touchScrollSet.movingSet['down']();
      }
    });
    var moveSetFun = function(touchScrollObj,moveY , moveX){
      if( Math.abs(moveY) > 50 && Math.abs(moveY)-Math.abs(moveX) > 0){
        if(touchScrollObj.topSet){
          touchScrollObj.movingSet[touchScrollObj.scrollPosition]();
          touchScrollObj.topSet = false;
        }
      }
    };
    $(document).on('touchstart',function(e){
      finnqUiObj.touchScrollSet = {
        scrollPosition: '',
        scrollStartX: e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
        scrollStartY: e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY,
        scrollEndX:0,
        scrollEndY: 0,
        moveX:0,
        moveY:0,
        topSet : true,
        movingSet : {
          'up':function(){
            $('.main-fixed-title').addClass('off');
          },
          'down':function(){
            $('.main-fixed-title').removeClass('off');
          }
        }
      };
    });
    $(document).on('touchmove',function(e){
      var touchScrollObj = finnqUiObj.touchScrollSet;
      touchScrollObj.scrollEndX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
      touchScrollObj.scrollEndY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
      touchScrollObj.moveX = Math.abs(touchScrollObj.scrollStartX) - Math.abs(touchScrollObj.scrollEndX);
      touchScrollObj.moveY = Math.abs(touchScrollObj.scrollStartY) - Math.abs(touchScrollObj.scrollEndY);
      touchScrollObj.scrollPosition = touchScrollObj.moveY > 0 ? 'up':'down';
      if(finnqUiObj.scrollRootDom.scrollTop()<77){
        return;
      }
      moveSetFun(touchScrollObj,touchScrollObj.moveY , touchScrollObj.moveX);

    });
    $(document).on('touchend',function(e){
      var touchScrollObj = finnqUiObj.touchScrollSet;
      moveSetFun(touchScrollObj,touchScrollObj.moveY , touchScrollObj.moveX);
      finnqUiObj.touchScrollSet.topSet = true;
      if(finnqUiObj.scrollRootDom.scrollTop()<77){
        finnqUiObj.touchScrollSet.movingSet['down']();
      }
    });

  }


  // 공통으로 사용할 함수를 정의한다.
  $.fn.extend({
    finnqUiCore : function(options){
      //공통적으로 필요한 core 관리를 한다.
      // this는 jquery fn에 있는 메소드들이 있다.
      console.log('finnqUiCore');
      $('body').on('click',function(e){
        $('.small-popup').remove();
        $('.select:not(".bg-item")').removeClass('select');
        finnqUiObj.smallPopupOpen = false;
      });
      // 스크롤 가장 상단으로 올리는 이벤트
    },
    finnqUiExample: function(options){
      //예시 나중에 삭제 예정

      var defaults = {
        //기본 값 option
        Name : 'finnqUiExample',
        domId: 'id',// dom에 접근 가능한 id 값 필요함
        callback:function(){
          // 메소드 호출 후에 callback 함수
          console.log('popup 호출');
        }

      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);
      this.each(function() {

        options.callback();
      });

      return this;//메소드들을 추가적으로 사용가능하도록 호출
    },
    timeChange: function(options){
      // 시간을 받아서
      // options으로 받은 시간으로 현재 시간과 비교하여 얼마나 지났는지 체크
      //시간, 일, 월, 년으로 계산하여 반환
      var defaults = {
        //기본 값 option
        nowTime : new Date(),
        checkTime: new Date(),// dom에 접근 가능한 id 값 필요함
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);
      this.each(function() {

        options.callback();
      });

      return data;
    },
    fonnqUiBgChange: function(options){
      //예시 나중에 삭제 예정
      //talk_write_area 이곳에 이벤트 걸면 됨
      var root = $(this);
      var domList='';
      var defaults = {
        //기본 값 option
        dataList : [],
        selectBg: {},
        noneList:'',
        listDomName: '.talk_write_pattern',
        madeCallback:function(){
          // 메소드 호출 후에 callback 함수
          console.log('리스트 만들어짐');
        },
        clickCallBack : function(value){

        }
      };
      /* option 값 재정의 */
      var options = $.extend(defaults, options);
      var listDomName = options.listDomName;
      var listLength = options.dataList.length;

      if(listLength){
        for(var i = 0;i< listLength;i++ ){
          var imageUrl = options.dataList[i];
          domList += '<li data-class="list'+i+'" class="bg-item" style="background-image:url('+imageUrl+')"></li>';
        }
        $(listDomName).append('<ul>'+domList+'</ul>');
      }else{
        $(listDomName).append(options.noneList);
      }


      options.madeCallback = function(){
        var optionBackground = options.selectBg;
        for(var i = 0;i< listLength;i++ ){
          var imageUrl = options.dataList[i];
          domList += '<li data-class="list'+i+'" style="background-image:url('+imageUrl+')"></li>';
          if(optionBackground === imageUrl){
            $(listDomName).find('ul li').eq(i).addClass('select');
          }
          root.attr('style','background-image:url('+optionBackground+')');
        }
      };

      $(listDomName).find('li').off('click').on('click',function(){
        var clickDom = $(this);
        var thisNum = clickDom.index();

        var thisValue = options.dataList[thisNum];
        clickDom.addClass('select');
        clickDom.siblings('li').removeClass('select');
        root.attr('style','background-image:url('+options.dataList[thisNum]+')');
        options.clickCallBack(thisValue);
      });

      options.madeCallback();

      return this;//메소드들을 추가적으로 사용가능하도록 호출
    },
    finnqUiSlideImg: function(options){
      var defaults = {
        //기본 값 option
        domId:'imgSlide',
        imgList:[],
        pagingStyle: false,
        button:false,
        paging: 'bottom',
        pageButton:false,
        slideClick:function(event){

        }
      };
      var pageDom = '';


      var options = $.extend(defaults, options);
      var pageSet ={
        'pagingNav' :function(e){
          var len = Math.ceil(this._len / this._view);
          imgSlideDom.append('<div class="num-nav '+options.paging+'"><div><span class="now-num">0</span> / <span class="end-num">'+len+'</span></div></div>');
        },
        'circle' :function(e){
          var _this = this;
          var $this = $(this);
          imgSlideDom.append('<div class="paging"></div>');
          var paging = imgSlideDom.find(".paging");
          var len = Math.ceil(this._len / this._view);

          paging.html("");
          for(var i = 1; i <= len; i++) {
            paging.append('<button type="button" class="btn_page">page' + i + '</button>');
          }

          paging.find(".btn_page").on("click", function (e) {
            _this.go_page($(this).index());
          });
        }
      };

      var pageStyle = options.pagingStyle ? pageSet[options.pagingStyle] : function(){};
      var slideImg = options.imgList, SlideImgListLength = options.imgList.length;
      var slideBox='';
      var slideText = '';
      var imgClass = '';
      var imgaddDom = '';
      for(var i = 0; i < SlideImgListLength; i++){
        imgClass = slideImg[i].imgClass ?slideImg[i].imgClass : '';
        imgaddDom = slideImg[i].imgaddDom ?slideImg[i].imgaddDom : '';
        if(slideImg[i].imgDom){
          slideText = '<div class="img_title_box">'+slideImg[i].imgDom+'</div></div>'
        }else{
          slideText ='';
        }
        slideBox += '<li data-url="'+slideImg[i].linkUrl+'" data-type="'+slideImg[i].openType+'" >' +
            '<div class="slide-inner">' +
            '<div class="img_box '+imgClass+'">'+imgaddDom+'<img src="'+slideImg[i].imgUrl+'" alt="" class=""></div>' +slideText+
            '</li>';
      }
      this.html('<div class="slide-box" id="'+options.domId+'"><ul class="moim_slide_cont">'+slideBox+'</ul></div>');

      var imgSlideDom = this;
      var rollSet = false, autoplaySet ={ enable : false, pauseHover : true, addHoverTarget : "", interval : 3500 };
      var root = this;
      // 이미지 슬라이드 1개 이상일 때만 호출
      if(SlideImgListLength > 1){
        if(root.hasClass('slide-ty1')){
          root.find('.slide-box').css({'margin': ('0 '+(this.width()-235)+'px 0 0') })
        }
        if(root.hasClass('slide-ty2') || root.hasClass('slide-ty3')){
          root.find('.slide-box').css({'margin': ('0 '+(root.width()-310)+'px 0 0') })
        }
        if(root.hasClass('slide-ty4')){
          rollSet = true;
          autoplaySet ={
            enable : true,
            pauseHover : true,
            addHoverTarget : "",
            interval : 3500
          }
        }
        imgSlideDom.find('.slide-box').touchSlider({
          roll : rollSet,
          autoplay : autoplaySet,
          speed: 300,
          initComplete:pageStyle,
          slideType:'lastStyle',
          counter : function (e) {
            imgSlideDom.find(".btn_page").removeClass("on").eq(e.current-1).addClass("on");
            imgSlideDom.find(".now-num").text(e.current);
            if(!imgSlideDom.hasClass('slide-ty4') && e.current ==SlideImgListLength){
              var slideBox = imgSlideDom.find('li').eq(e.current-1);
              var slideInnerBoxWidth = Number(slideBox.width());
              var slideBoxWidth = Number(imgSlideDom.width());
              //var slideBoxLeft = root.position().left;
              var moveValue = slideBoxWidth - (slideInnerBoxWidth+10);
              this.moveValue = moveValue;
              var slidePosObj = this._pos,
                  slideStartObj = this._start,
                  slideStartXObj = this._startX,
                  slideObjLength =slidePosObj.length,
                  leftValue =  this._left;
              setTimeout(function(){
                imgSlideDom.find('li').each(function(){
                  var thisDom = $(this);
                  var thisDomLeft = Number(thisDom.css('left').replace('px',''));
                  thisDom.css({'transition':'left 300ms','left':thisDomLeft+moveValue});
                });
                for(var i = 0 ; i < slideObjLength ; i++){
                  slidePosObj[i] = slidePosObj[i] + moveValue;
                }
              },50);
            }else{
                this.moveValue = 0;
            }
          }
        });

      }else{
        this.attr('data-style','imgSlideNone');
      }
      imgSlideDom.on('click','li',function(){
        var thisIndex = $(this).index();
        var event = {
          index:thisIndex,
          slideId : $(this).closest('.slide-box').attr('id'),
          dataUrl: $(this).data('url') ? $(this).data('url') : '',
          newOpen : $(this).data('type') === 'newOpen' ? true : false
        };

        options.slideClick(event);
      });
    },
    finnqUiTabScroll: function(options){
      var defaults = {
        tab : $('[data-action="tab-head"]'),
        header:$('.top_nav'),
        fixTab : 'ul'
      };
      /* option 값 재정의 */
      var options = $.extend(defaults, options);
      var hederHeight = options.header.outerHeight(true);
      finnqUiObj.scrollRootDom.scroll(function(e){
        var scrollTop = finnqUiObj.scrollRootDom.scrollTop();
        var tabPosition = options.tab.offset().top;
        if(tabPosition < 0){
          options.tab.find(options.fixTab).css({'position':'fixed'});
        }else if(tabPosition > 0 ){
          options.tab.find(options.fixTab).css({'position':'absolute'});
        }
        if(tabPosition < hederHeight ){
          options.header.css({'top':(tabPosition-hederHeight)+'px'});
        }else{
          options.header.css({'top':'0px'});
        }
      });

    },
    finnqUiTab: function(options){
      // 슬라이드 기능을 가진 tab
      var defaults = {
        //기본 값 option
        firstView: 0,
        tabList :[
          {
            title : 'tab01',
            id : 'tab01'
          },
          {
            title : 'tab02',
            id : 'tab02'
          }
        ],
        tabClickEvent: function(event){

        },
        madeCallback:function(){
          // 메소드 호출 후에 callback 함수
          console.log('tab 만들어짐');
        }
      };
      /* option 값 재정의 */
      var options = $.extend(defaults, options);

      var tabSlideBox = $('[data-action="tab-box"]');
      var tabSlideHead, tabSlideBody,tabHead, tabBody, tabHeadList, tabHeadListLength, nowPage;

      tabSlideBox.each(function() {
        var rootTab = $(this);
        tabSlideHead = tabSlideBox.find('[data-action="tab-head"]');
        tabSlideBody = tabSlideBox.find('[data-action="tab-body"]');
        tabSlideHead.attr('class','masil_tab_wrap2');
        //tab 헤더 리스트 넣어주는 구문
        tabHeadList = options.tabList;
        tabHeadListLength= tabHeadList.length;
        var tabHeadTemplate = '';
        for(var i = 0 ;i< tabHeadListLength; i++){
          tabHeadTemplate += '<li><button class="tab-link" id="'+tabHeadList[i].id+'">'+tabHeadList[i].title+'</button></li>';
        }
        tabSlideHead.append('<ul>'+tabHeadTemplate+'</ul>');

        // tab header 영역에 Dom 생성 후 tab 지정
        tabHead = tabSlideHead.find('ul li');
        tabBody = tabSlideBody.find('.tab');
        tabBody.css({'display':'block'})
        var nowIndex;
        var tabMoveAction = function(index, speed){
          var speedValue = (speed === 0 || speed) ? speed : false;
          tabSlideBody[0].go_page(index, speed);
          // tabBody.eq(index).siblings('li').css({'display':'none'});
        };

        tabSlideBody.touchSlider({
          speed: 300,
          counter : function (e) {
            // 터치슬라이드 후 이벤트
            nowPage = e.current-1;
            var speed = e.obj._speed;
            var tabBodyDom = tabBody.eq(nowPage);
            tabHead.find('.menu_active').removeClass('menu_active');
            tabHead.eq(nowPage).find('button').addClass('menu_active');
            
            options.tabClickEvent({index:nowPage, id:tabHeadList[nowPage].id});

            var pageScrollTop,
                screenHeight,
                scroolHeight,
                tabSlideBodyOffset,
                tabHeaderPosition,
                bodyHeight,
                tabBodyHeight;
            tabSlideBody.tabPage = finnqUiObj.tabPage = nowPage;
            setTimeout(function () {
              pageScrollTop = finnqUiObj.scrollRootDom.scrollTop();
              scroolHeight = $('.body_frame').outerHeight(true);
              tabHeaderPosition = tabSlideHead.find('ul').offset().top;
              tabSlideBodyOffset = Math.abs(tabSlideBody.offset().top-51);

              nowIndex = nowPage;
              bodyHeight = $(window).height()-121;
              tabBodyHeight = tabBody.eq(nowPage).outerHeight(true);
              if(tabHeaderPosition < 60 && bodyHeight < tabBodyHeight ){
                finnqUiObj.scrollRootDom.scrollTop(pageScrollTop-tabSlideBodyOffset);
              }
              if(bodyHeight < scroolHeight){
                tabSlideBody.css({'height':tabBodyHeight});
              }else{
                tabSlideBody.css({'height':bodyHeight});
              }
            }, speed+100);
          }
        });

        // tab header 이벤트 바인딩 및 콜백함수 호출
        tabSlideHead.find('li .tab-link').each(function(){
          $(this).on('click',function(){
            var tabIndex = $(this).closest('li').index();
            tabMoveAction(tabIndex);
            tabBody.eq(nowPage).css({'display':'block'});
          });
        });
        nowPage = options.firstView;
        tabMoveAction(options.firstView,0);

      });

      // 스크롤시 tab을 가장 상단에 고정 헤더는 숨김
      if(tabSlideBox.length> 0) {// tab이 있을 경우에만 스크롤 이벤트 발생
        $.fn.finnqUiTabScroll();
      }

      return tabSlideBody;//메소드들을 추가적으로 사용가능하도록 호출
    },
    finnqUiPopup: function(options) {
      // 전체 팝업
      // 기본 옵션 값 정의
      var root = this; // 이벤트가 걸린 dom 정의
      var defaults = {
        //기본 값 option
        popupName : 'normal',
        popupTitle : '전체 팝업',
        bottomBtn : [
          /* { 기본적으로는 없다.
               name: '확인',
               id:'popupBtn01',
               closeOption:true,
               event:function(){
                   console.log('btn event'); button click 이벤트
               }
           }*/
        ],
        bg: '#fff',
        closeButton: 'close',// 팝업은 기본적으로 closeButton이며 backButton 선택 가능
        topButton : {
          name: '완료',
          id:'popupBtn01',
          closeOption:true,
          event:function(){
            console.log('btn event');
            // 버튼 click 시 이벤트
          }
        },
        popupContent:'popupContent',// 팝업에 들어가는 컨텐츠
        domId:'allPopup',
        popupTemplate :'',
        madeCallback:function(){
          // popup dom 생성 후에 호출되는 함수
          // popup 안에 이벤트를 넣어야하는 경우에 이곳에 작성
          console.log('popup 호출');
        },
        openCallBack:function(){
          // popup 열리고 나서 발생하는 이벤트
          // popup 열린 후에 사용할 이벤트를 넣어야하는 경우에 이곳에 작성
          console.log('popup open');
        },
        closeCallBack:function(){
          // popup 닫히는 시점에 나타는 이벤트
          console.log('popup close');
        },
        closeEvent : function(options){

        },
        closeValue:true,
        nowOpen : false
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);
      //템플릿 정의

      // 사용자가 선택한 options 내용으로 팝업 구성

      // 버튼 정의 -  기본 정의는 close 있는 버튼

      // popup Dom 설정
      var rootPopup;// 열린 팝업


      // 팝업 닫힐 때
      var popupCloseAction = function(){
        rootPopup.remove();
        finnqUiObj.allPopupObj.open = false;
      };
      // 팝업 열릴 때
      var popupOpenAction = function(){
        options.closValue = true;
        var topBtn = options.topButton ? options.topButton :false;
        var topBtnName = topBtn ? topBtn.name : '';
        // 팝업에 들어가는  템플릿 정의
        var popupTemplate = '<div class="full-popup" style="position: fixed; top: 0;left: 0;width: 100%;height: 100%;background: '+options.bg+'; z-index:999999;" id="'+options.domId+'" data-url="/">'+
            '<div class="top_nav float_nav bg1"><button class="'+options.closeButton+' popupClose"></button>'+
            '<div class="nav_title">'+options.popupTitle+'</div><button class="popupTopBtn txt_btn" id="'+topBtn.id+'">'+topBtnName+'</button>'+
            '</div>'+
            '<div class="page">'+
            '<div class="body_frame top_pad_type1" id="'+options.popupContent+'"></div>'+
            '</div>'+
            '</div>';

        $('body').append(popupTemplate);
        $('#'+options.popupContent).html(options.popupTemplate);
        $('#'+options.popupContent).css({'height':finnqUiObj.screenHeight,'overflow-y':'scroll'});

        rootPopup = $('#'+options.domId);
        // 팝업 닫기 이벤트
        rootPopup.on('click','.popupClose',function(){
          options.closeEvent(options);
          if(options.closeValue){
            popupCloseAction();
            options.closeCallBack();
          }else{
            options.closValue = true;
          }
        });

        //팝업 상단 title 이벤트 바인딩
        $('#'+topBtn.id).on('click',function(){
            topBtn.event();
            if(topBtn.closeOption){
              popupCloseAction();
            }
        });

        options.openCallBack(); // 팝업 열리고 나서 callback
        rootPopup.fadeIn();
        finnqUiObj.allPopupObj.dom = rootPopup;
        finnqUiObj.allPopupObj.open = true;
      };

      //함수 정의
      var openPopup = function(){

        if(options.nowOpen){
          // 이벤트 없이 바로 팝업 열림
          popupOpenAction();
        }else{
          // 선택된 dom 클릭시 popup open
          root.each(function() {
            var rootList = $(this);
            $(this).on('click',function(){
              popupOpenAction(rootList);
            });
          });
        }
        if($('.app_foot_btn_wrap').length>0){
          $('#'+options.popupContent).css({'padding-bottom':'80px'})
        }
      };
      openPopup();

      var action = {
        close: function () {
          popupCloseAction();
        },
        open: function (data) {
          var title = data.title, content = data.content;
          var openCallBack= data.openCallBack,closeCallBack = data.closeCallBack;
          if (typeof closeCallBack == "function") {
            options.closeCallBack = data.closeCallBack;
          }
          if (typeof openCallBack == "function") {
            options.openCallBack = data.openCallBack;
          }
          if (title == 'none') {
            options.popupTitle = '';
          } else if (!title) {
            options.popupTitle = options.popupTitle;
          } else {
            options.popupTitle = title;
          }
          if (content == 'none') {
            options.popupTemplate = '';
          } else if (!content) {
            options.popupTemplate = options.popupTemplate;
          } else {
            options.popupTemplate = content;
          }
          popupOpenAction();
        }
      };
      return action;
    },
    finnqUiImgSlidePopup :function(options){

      var defaults = {
        //기본 값 option
        Name : '',
        domId: 'id',// dom에 접근 가능한 id 값 필요함
        zoom : true,
        imgUrl :[],
        viewIndex:0,
        callback:function(){
          // 메소드 호출 후에 callback 함수
          console.log('popup 호출');
        }
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);


      var lmgList = options.imgUrl,imgListLength = lmgList.length;
      var imgListTemplate = '';
      for(var i = 0 ;i< imgListLength; i++){
        imgListTemplate+='<li><div class="img-zoom"><img src="'+lmgList[i]+'" alt=""></div></li>';
      }
      var closeButton = 'close2',
          popupTitle = '<span class="nowPage">1</span>/<span class="allPage">1</span>',
          topButton = false,
          slideBtn = '<div class="btn_area">'+
              '<button type="button" class="btn_prev photo_prev">prev</button>'+
              '<button type="button" class="btn_next photo_next">next</button>'+
              '</div>';
      if(imgListLength < 2){
        closeButton = 'close2';
        popupTitle = '';
        topButton = false;
        slideBtn = '';
      }
      // 라이브러리 사용
      this.finnqUiPopup({
        popupName : 'normal',
        popupTitle : popupTitle,
        closeButton: closeButton,
        bg:'#000',
        popupContent:'slidePopupContent',// 팝업에 들어가는 컨텐츠 박스 id
        domId:'slidePopup',
        topButton : topButton,
        madeCallback:function(){
          // popup dom 생성 후에 호출되는 함수
          // popup 안에 이벤트를 넣어야하는 경우에 이곳에 작성
          console.log('popup 호출');
        },
        openCallBack:function(){
          //popup 안에 넣을 Template 정의
          var allPopupRoot = $('#slidePopup');
          var popupRoot = $('#slidePopupContent');
          var message = '<div class="image_view_warn">원본 이미지입니다.<br>두 손가락을 이용해 사진을 확대 또는<br>축소하실 수 있습니다.</div>';
          var popupContent = '<div class="" data-action="imgSlide">'+
              '<ul class="imgSlideBox">'+imgListTemplate+'</ul>'+
              '</div>' + slideBtn + message;

          popupRoot.append(popupContent);
          // slide 구현

          //이미지 리스트가 하나일 경우에는 slide 구현을 하지 않은다.
          var slideDom = $('[data-action="imgSlide"]');
          if(imgListLength > 1) {
            slideDom.touchSlider({
              speed: 300,
              counter: function (e) {
                allPopupRoot.find('.nowPage').text(e.current);
                var speed = e.obj._speed;
                var slideRoot = allPopupRoot.find('[data-action="imgSlide"]');
                setTimeout(function () {
                  slideRoot.css({'height':slideRoot.find('.imgSlideBox li').outerHeight()});
                }, speed+100);
              },
              btn_prev: popupRoot.find(".btn_prev"),
              btn_next: popupRoot.find(".btn_next")
            });
            // 원하는 페이지로 보여주기
            slideDom[0].go_page(options.viewIndex, 0);
            $('.full-popup .nav_title').css({'text-align':'center','padding':'0'});
            allPopupRoot.find('.nowPage').text(options.viewIndex + 1);
            allPopupRoot.find('.allPage').text(imgListLength);
            //slideDom.css({'height': finnqUiObj.screenHeight - 60});
          }else{
            slideDom.find('.imgSlideBox').css({'width':'100%'});
          };

          //pinch zoom 선언
          if(options.zoom){
            slideDom.find('ul li .img-zoom').each(function () {
              var thisDom =$(this);
              var thisImg = thisDom.find('img');

              thisDom.css({'height':finnqUiObj.screenHeight-61});
              var topValue = (finnqUiObj.screenHeight-122-thisImg.height())/2;
              thisImg.css({'top':topValue});
              new RTP.PinchZoom($(this), {});
            });
            //화면이 뜨면 설명글 숨김
            $('.image_view_warn').fadeOut(4000);
          };

        },
        closeCallBack:function(){
          // popup 닫히는 시점에 나타는 이벤트
          console.log('popup close');
        },
        nowOpen : false
      });
      return this;//메소드들을 추가적으로 사용가능하도록 호출
    },
    finnqUiCheckOption: function(options){
      var defaults = {
        allCheckName :'all-check',
        oneCheckName :'one-check',
        checkCallback:function(data){
          console.log(data);
          //현재 체크된 리스트 갯수 callabck
        },
        allCheckCallback:function(data){
          //전체체크 true false 확인
          console.log(data);
        },
        nowCheckCallback:function(data){

        }
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);

      var allCheckbox = $('[data-check="'+options.allCheckName+'"]');
      var oneCheckbox = $('[data-check="'+options.oneCheckName+'"]');
      // 전체 checkbox 클릭시
      var checkboxObj = {
        allChecked : false,
        checkLength : 0
      };
      allCheckbox.on('change',function(){
        var target = $(this);
        if(target.prop('checked')){
          oneCheckbox.prop('checked',true);
          options.allCheckCallback(true);
          checkboxObj.allChecked = true;
          checkboxObj.checkLength = oneCheckbox.length;
        }else{
          oneCheckbox.prop('checked',false);
          options.allCheckCallback(false);
          checkboxObj.allChecked = false;
          checkboxObj.checkLength = 0;
        }
        options.nowCheckCallback(checkboxObj);
      });
      //checkbox 리스트 클릭시
      oneCheckbox.on('change',function(){
        var target = $(this);
        var bodyDom = target.parents('body');
        var oneCheckboxLength =oneCheckbox.length;
        var oneCheckboxCheckedLength = bodyDom.find('[data-check="'+options.oneCheckName+'"]:checked').length;
        if(oneCheckboxLength == oneCheckboxCheckedLength){
          allCheckbox.prop('checked',true);
          checkboxObj.allChecked = true;
        }else{
          allCheckbox.prop('checked',false);
          checkboxObj.allChecked = false;
        }
        options.checkCallback(oneCheckboxCheckedLength);
        options.nowCheckCallback(checkboxObj);
      });
    },
    finnqUiSimplePopup:function(options){
      //메시지 팝업, 글자 크기 팝업 등 화면에 들어가는 팝업 생성
      //메시지내용 등은 finnqUiSimplePopup을 사용하여 팝업 호출한다.( 이벤트 생성 등 )

      var defaults = {
        title: false,
        id:'simplePopup',
        btn : [
          {
            name: '확인',
            id:'popupBtn01',
            closeOption:true,
            event:function(){
              console.log('btn event');
            }
          }
        ],
        popupTemplate :'',
        documentClick:true,
        madeCallback : function(){},
        openCallBack : function(){},
        popupDom:'',
        nowOpen:true,
        addClass:'',
        closeButton:{
         view:false,
         clickEvent:function(){

         }
        }
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);



      //popup에 들어갈 dom
      var popupDomMade = function(){
        var popupBtn='';
        var btnList = options.btn;
        var btnListLength = options.btn.length;
        var titleText='';
        var closeButtonDom='';
        if(options.closeButton && options.closeButton.view){
          closeButtonDom = '<button type="button" class="popup-top-close"></button>';
        }
        if(options.title){
          titleText = '<div class="finnq_pop_cont"><div class="finnq_pop_title">'+options.title+'</div>'+closeButtonDom+'</div>';
        }
        if(options.btn){
          for(var i= 0 ; i < btnListLength; i++){
            popupBtn += '<li><button class="popup-close">'+btnList[i].name+'</button></li>';
          }
        }else{
          options.btn = '';
        }
        options.popupDom = '<div class="simplePopup" id="'+options.id+'"><div class="popup-dim"></div>'+
            '<div class="popup-inner">'+
            '<div class="font_pop_wrap">'+titleText+
            '<div class="popupPaddingBox '+options.addClass+'">'+options.popupTemplate+'</div>'+
            '<ul class="finnq_pop_btn">'+popupBtn+'</ul>'+
            '</div></div></div>';

      };
      popupDomMade();

      //click 했을 때 popup open
      var closeAction = function(){
        $('#'+options.id).fadeOut(function() {
          $('#'+options.id).remove();
        });
      };
      // popup open 함수 ( 하단 버튼 이벤트 바인딩, 팝업 닫기 이벤트 )
      var popupOpenEvent = function(){
        $('body').append(options.popupDom);

        //popup 위치 고정
        var targetPopup = $('#'+options.id+' .popup-inner');

        var popupHeight = targetPopup.outerHeight();// 현재는 dom 넣어서 만들어져 있음
        var popupWidth = targetPopup.outerWidth();
        targetPopup.css({'top':(finnqUiObj.screenHeight-popupHeight)/2+'px','left':(finnqUiObj.screenWidth-popupWidth)/2+'px' ,'margin':'0px'});

        /* popup 닫기 이벤트  */
        $('#'+options.id).off('click').on('click','.popup-backdrop',function(){
          var target = $(this);
          closeAction();
        });
        $('#'+options.id).off('click').on('click','.popup-top-close',function(){
          closeAction();
        });

        // 버튼 클릭 이벤트 바인딩
        $('#'+options.id+' .finnq_pop_btn li').each(function(){
          var thisIndex = $(this).index();
          var thisBtn = options.btn[thisIndex];
          // 버튼 클릭이벤트
          $(this).off('click').on('click',function(){
            if(thisBtn.closeOption){
              closeAction();
            };
            if(typeof(thisBtn.event)=="function"){
              thisBtn.event();
            };
          });
        });
        options.openCallBack();
      };
      if(options.documentClick){
        // 클릭시에 팝업 안에 이벤트 바인딩함
        this.each(function() {
          /* popup open 이벤트 */
          $(this).off('click').on('click',function(){
            popupOpenEvent();

          });
          // 라이브러리 호출 후에 callback 함수 호출
          options.madeCallback();
        });
      }else if(options.nowOpen){
        popupOpenEvent();
      }
      var obj = {
        open : function(data){
          var title=false,content=false,btnList=false;
          if(data){
            title = data.title;
            content = data.content;
            btnList = data.btnList;
          }

          if(title == 'none'){
            options.title = false;
          }else if(!title){
            options.title = options.title;
          }else{
            options.title = title;
          }

          if(btnList == 'none'){
            options.btn = false;
          }else if(!btnList){
            options.btn = options.btn;
          }else{
            options.btn = btnList;
          }
          options.popupTemplate = content? content :options.popupTemplate;
          popupDomMade();
          popupOpenEvent();
        },
        close: function(){
          closeAction();
        }
      };

      return obj;

    },
    finnqUiFontSet: function(number){
      var nowFontSize=1;
      try {
        nowFontSize = AppCommon.getFontSize();
      }
      catch(err) {
        console.log(err)
      }
      var listNumber = number == 0 || number ? number: nowFontSize;
      var sizeObj = finnqUiObj.fontList[listNumber];

      $('html').css({'font-size' : sizeObj.fontSize,'line-height': sizeObj.lineHeight});
      try {
        AppCommon.setFontSize(listNumber);
      }
      catch(err) {
        console.log(err)
      }
      var tabDom = $('[data-action="tab-box"]');
      if(tabDom.length > 0){
        var tabBody = tabDom.find('[data-action="tab-body"]');
        setTimeout(function(){
          tabBody.css({'height':tabBody.find('.tab').eq(finnqUiObj.tabPage).outerHeight(true)});
        },400);
      }
      return false;
    },
    finnqUiFontControl:function(options){
      //메시지 팝업, 글자 크기 팝업 등 화면에 들어가는 팝업 생성
      //메시지내용 등은 finnqUiSimplePopup을 사용하여 팝업 호출한다.( 이벤트 생성 등 )

      var defaults = {
        type : 'simplePopup', // popup전체 팝업
        title :'글자 크기 설정',
        madeCallback:function(){
          // 메소드 호출 후에 callback 함수
        },
        openCallback:function(){

        },
        addClass: 'font_list_wrap'

      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);
      // 보여줄 리스트 Dom 만들기
      var fontSizeChangeform =  '';
      for(var i = 0 ;i< finnqUiObj.fontList.length; i++){
        fontSizeChangeform +='<li><label class="ms_comp ms_radio">'+
            '<input type="radio" class="ms_icon" name="radio1" value=""/>'+
            '<div class="ms_comp_cont" style="font-size:'+finnqUiObj.fontList[i].fontSize+'; line-height:22px;">가나다라마바사</div>'+
            '</label></li>';
      };

      //simplePopup 이용해서 팝업 띄우기
      this.finnqUiSimplePopup({
        title : options.title,
        btn : [
          {
            name: '확인',
            id:'popupBtn01',
            closeOption:true,// 버튼 클릭시 close 옵션
            event:function(){
              var sizeObj, listNumber;
              // 선택된 input 확인
              $('.simplePopup').find('[data-action="font-select"] li').each(function(){
                var inputBool = $(this).find('.ms_icon').prop('checked');
                if(inputBool){
                  listNumber =  $(this).index();
                }
              });
              $.fn.finnqUiFontSet(listNumber);

            }
          }
        ],
        popupTemplate :'<ul class="font_list_wrap" data-action="font-select">'+fontSizeChangeform+'</ul>',//팝업 안에 들어갈 컨텐츠
        madeCallback : function(){

        },// 팝업 선언 후 callback
        openCallBack : function(){
          var nowFontSize=1;
          try {
            nowFontSize = AppCommon.getFontSize();
          }
          catch(err) {
            console.log(err)
          }
          $('.simplePopup').find('[data-action="font-select"] li').eq(nowFontSize).find('input').prop('checked',true);
        },
        closeButton:{
          view:true,
          clickEvent:function(){

          }
        }// 팝업 열린 후 callback
      });
    },
    finnqUiSmallPopup : function(options){
      var root = this;
      ////////////////////////////////////////////////////////
      var defaults = {
        //기본 값 option
        btn : [
          {
            name: '신고',
            className:'Declaration',
            closeOption:true,
            event:function(target){
              // 버튼 클릭 이벤트
              console.log('btn event');
            }
          }
        ],
        popupTemplate :'',
        openBoolean:true,
        simplePopupBoolean:false,
        openBeforeFun:function(){

        },
        openCallback:function(){
          // 메소드 호출 후에 callback 함수

          console.log('popup 호출');
        },
        alertPopup :{
          btn: [
            {
              name: '예',
              id: 'popupBtn01',
              closeOption: true,// 버튼 클릭시 close 옵션
              event: function () {

              }
            }
          ],
          popupTemplate:'',
        }
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);

      var btnList = options.btn;
      var btnListLength = options.btn.length;
      for(var i= 0 ; i < btnListLength; i++){
        options.popupTemplate += '<li><button class="'+btnList[i].className+'">'+btnList[i].name+'</button></li>';
      }

      var popupPositionSet = function(target){
        var btnTarget = target;
        var targetOffsetTop = btnTarget.offset().top;
        var targetOffsetLeft = btnTarget.offset().left;
        var targetHeight = btnTarget.outerHeight();
        var targetWidth = btnTarget.outerWidth();
        var smallPopupWidth = $('.small-popup').outerWidth();
        var allPositionTop = targetOffsetTop + targetHeight+6;
        var allPositionLeft = (targetOffsetLeft + targetWidth)-smallPopupWidth;
        $('.small-popup').css({'top':allPositionTop, 'left':allPositionLeft})
      };

      var closePopup = function(){
        $('.small-popup').remove();
        $('.select').removeClass('select');
        finnqUiObj.smallPopupOpen = false;
      };
      // 열기 popup
      var openPopup = function(root){
        if($('.small-popup').length > 0){
          closePopup();
        }
        $('body').append('<ul class="small-popup">'+options.popupTemplate+'</ul>');

        $('.small-popup li').each(function(){
          var thisIndex = $(this).index();
          var thisBtn = options.btn[thisIndex];
          // 버튼 클릭이벤트
          $(this).off('click').on('click',function(e){
            e.stopPropagation();
            if(thisBtn.closeOption){
              closePopup();
            };
            thisBtn.event(root);
          });
        });

        options.openCallback();
      };
      // alert
      var alertPopup = $('body').finnqUiSimplePopup({
        btn: options.alertPopup.btn,
        documentClick: false,
        popupTemplate: options.alertPopup.popupTemplate,
        madeCallback: function () {
        },// 팝업 선언 후 callback
        openCallBack: function () {
        },// 팝업 열린 후 callback
        nowOpen: false //
      });

      //스크롤 올리면 팝업 숨김
      //현재 스크롤이 걸리는 곳 수정되면 수정이 필요함
      finnqUiObj.scrollRootDom.scroll(function(){
        closePopup();
        //var targetEvent = $._data($("body")[0], 'events');
        $('.select').removeClass('select');
      });

      this.each(function() {
        $(this).off('click').on('click',function(e){
          e.preventDefault();
          e.stopPropagation();
          var thisTarget = $(this);
          options.openBeforeFun($(this));
          if(!options.openBoolean){
            if(options.simplePopupBoolean){
              alertPopup.open({
                content:options.alertPopup.popupTemplate,
                btnList:  options.alertPopup.btn
              });
            }
            closePopup();
            return;
          }
          if(thisTarget.hasClass('select')){
            closePopup();
            return;
          }
          openPopup(thisTarget);
          popupPositionSet(thisTarget);
          options.openBoolean = true;
          $('.select').removeClass('select');
          thisTarget.addClass('select');

        });
      });
      var objSet = {


      }

      return options;//메소드들을 추가적으로 사용가능하도록 호출
    },
    finnqUiBottomBox : function(options){
      // 하단에 home 버튼, 상단이동 버튼
      var root = this;
      var defaults = {
        callback:function(){
          // 메소드 호출 후에 callback 함수
          console.log('popup 호출');
        },
        bottomFixBtn : {
          view: true,
          domId : 'bottomFixBtn',
          template: '',
          clickEvent: function(event){
            // event는 기본적으로 눌러진 index 반환
          }
        },
        gnbMenu : {
          view: true,
          select:0,
          domId : 'gnbMenu',
          clickEvent: function(event){
            // event는 기본적으로 눌러진 index 반환
          }
        },
        scrollTopBtn:{
          view: true,
          domId : 'scrollTopBtn',
          scrollHide: true,//스크롤을 올리면 보여진다.
          clickEvent: function(event){
            //버튼 클릭시 이벤트
          }
        },
        homeMoveBtn :{
          view: true,
          domId : 'homeMoveBtn',
          scrollHide: true,
          clickEvent: function(event){
            //버튼 클릭시 이벤트
          }
        }
      };

      /*
      차후 로그인에 따라 url 변경됨
      모임 메인 : https://dev.masil.club/view/meeting/meetMain
      모임장 상세 : https://dev.masil.club/view/meeting/1/meetLeader
      더보기 로그인 전 : https://dev.masil.club/view/more
      더보기 로그인 후 : https://dev.masil.club/view/more?ci=test123456
      */

      options.scrollTopBtn = options.scrollTopBtn? options.scrollTopBtn : false;
      options.homeMoveBtn = options.homeMoveBtn? options.homeMoveBtn : false;
      options.gnbMenu = options.gnbMenu? options.gnbMenu : false;
      options.bottomFixBtn = options.bottomFixBtn? options.bottomFixBtn : false;
      /* option 값 재정의 */
      var options = $.extend(defaults, options);

      // 버튼 객체 정의
      var scrollTopBtnObj = options.scrollTopBtn,//scrollTop btn 객체
          homeMoveBtnObj = options.homeMoveBtn, //homeMove btn 객체
          gnbMenuObj = options.gnbMenu, // 하단 gnb
          bottomFixBtnObj = options.bottomFixBtn;
      // dom에 들어갈 Template
      var homeMoveTemplate = homeMoveBtnObj ? '<button id="'+homeMoveBtnObj.domId+'" class="homeMoveBtn finnq_type4">홈으로</button>': '',
          scrollTopTemplate = scrollTopBtnObj ? '<button id="'+scrollTopBtnObj.domId+'" class="scrollTopBtn finnq_type4">맨위로</button>': '',
          bottomFixBtnTemplate = bottomFixBtnObj ? '<div class="bottomFixBox" id="'+bottomFixBtnObj.domId+'">'+bottomFixBtnObj.template+'</div>' : '';

      var gnbMenuTemplate = '';
      if(gnbMenuObj){
        gnbMenuTemplate = '<div id="'+gnbMenuObj.domId+'" class="gnbMenu">'+
            '<div class="">'+
            '<a href="/curation/activity" id="" class="gnb_menu ty1">오모</a>'+
            '<a href="/meeting" id="" class="gnb_menu ty2">모임</a>'+
            '<a href="/toktok" id="" class="gnb_menu ty3">톡톡</a>'+
            '<a href="/view/more" id="" class="gnb_menu ty4">더보기</a>'+
            '</div>'+
            '</div>';
      }
      root.append(homeMoveTemplate + scrollTopTemplate +gnbMenuTemplate +bottomFixBtnTemplate);

      // 버튼 dom 정의( append 후에 설정 )
      var scrollTopBtnDom = $('#'+scrollTopBtnObj.domId),//scrollTop dom id
          homeMoveBtnDom = $('#'+homeMoveBtnObj.domId),//homeMove dom id
          gnbMenuDom = $('#'+gnbMenuObj.domId),
          bottomFixBtnDom = $('#'+bottomFixBtnObj.domId);
      if(scrollTopBtnObj){
        scrollTopBtnDom.css({'display':'none'});
        finnqUiObj.scrollRootDom.scroll(function(e){
          var scrollTop = finnqUiObj.scrollRootDom.scrollTop();
          if(scrollTop > 150){
            scrollTopBtnDom.css({'display':'block'});
          }else{
            scrollTopBtnDom.css({'display':'none'});
          }
        });
      }
      if(gnbMenuObj || bottomFixBtnObj){
        gnbMenuDom.find('.gnb_menu').eq(gnbMenuObj.select).addClass('menu_active');
        scrollTopBtnDom.addClass('position-ty2');
        homeMoveBtnDom.addClass('position-ty2');
        if(scrollTopBtnObj || homeMoveBtnObj){
          $('body').find('.page').css({'padding-bottom':'140px'});
          finnqUiObj.bottomBox = 140;
        }else{
          $('body').find('.page').css({'padding-bottom':'70px'});
          finnqUiObj.bottomBox = 70;
        }
      }else{
        $('body').find('.page').css({'padding-bottom':'70px'});
        finnqUiObj.bottomBox = 70;
      }

      // gnb 메뉴 클릭
      gnbMenuDom.on('click',function(){
        gnbMenuObj.clickEvent();
      });
      // 버튼 클릭시 상단으로 스크롤 하는 이벤트
      scrollTopBtnDom.on('click',function(){
        var scrollRoot = finnqUiObj.scrollRootDom;
        /* var scrollDomSize = scrollRoot.children().outerHeight(true);
         var scrollspeed = Math.floor(scrollDomSize/4);*/
        console.log('클릭')
        scrollRoot.animate({scrollTop:0}, 400,function(){
          scrollTopBtnObj.clickEvent();
        });
      });
      bottomFixBtnDom.on('click',function(){
        bottomFixBtnObj.clickEvent();
      });
      // home move 버튼 클릭 이벤트
      homeMoveBtnDom.on('click',function(){
        window.location.href='/curation/activity/';
        homeMoveBtnObj.clickEvent();
      });
      var buttonBtnFun = function(value){
        var obj = value;
        scrollTopBtnDom.css({'display':finnqUiObj.displaySet[obj.scrollTop]});
        homeMoveBtnDom.css({'display':finnqUiObj.displaySet[obj.homeMove]});
        bottomFixBtnDom.css({'display':finnqUiObj.displaySet[obj.bottomFix]});
        gnbMenuDom.css({'display':finnqUiObj.displaySet[obj.gnbMenu]});
        scrollTopBtnDom.removeClass('position-ty2');
        homeMoveBtnDom.removeClass('position-ty2');
        if(obj.gnbMenu || obj.bottomFix){
          scrollTopBtnDom.addClass('position-ty2');
          homeMoveBtnDom.addClass('position-ty2');
          if(obj.scrollTop || obj.homeMove){
            $('body').find('.page').css({'padding-bottom':'140px'});
            finnqUiObj.bottomBox = 140;
          }else{
            $('body').find('.page').css({'padding-bottom':'70px'});
            finnqUiObj.bottomBox = 70;
          }
        }else{
          $('body').find('.page').css({'padding-bottom':'70px'});
          finnqUiObj.bottomBox = 70;
        }
      };
      return {
        bottomShowBtn: function(value){
          buttonBtnFun(value);
        }

      };//메소드들을 추가적으로 사용가능하도록 호출
    },
    finnqUiKeypad: function(value, domName){
      var inputList;
      if(value){
        inputList = domName.find('[data-action="keypad"]');
      }else{
        inputList = $('[data-action="keypad"]');
      }
      var bodyScrollTop = finnqUiObj.scrollRootDom.scrollTop();

      if(inputList.length > 0){
        inputList.each(function(){
          var targetDom = $(this);
          targetDom.on('focus',function(){
            var popupDom = finnqUiObj.allPopupObj.dom ? finnqUiObj.allPopupObj.dom.find('.body_frame') : null;
            var nowScrollTop = finnqUiObj.allPopupObj.open ? popupDom.scrollTop(): finnqUiObj.scrollRootDom.scrollTop();
            var targetOffset = targetDom.offset().top;
            if(finnqUiObj.allPopupObj.open){
              popupDom.children().last().css({'padding-bottom':'360px'});
              popupDom.scrollTop(nowScrollTop+(targetOffset-70));
            }else{
              $('body').find('.view').css({'padding-bottom':'360px'});
              finnqUiObj.scrollRootDom.scrollTop(nowScrollTop+(targetOffset-70));
            }

          });
          targetDom.on('focusout',function(){
            var popupDom = finnqUiObj.allPopupObj.dom ? finnqUiObj.allPopupObj.dom.find('.body_frame') : null;
            setTimeout(function(){
              if($('[data-action="keypad"]:focus').length < 1){
                if(finnqUiObj.allPopupObj.open){
                  popupDom.children().last().css({'padding-bottom':'0px'});
                }else{
                  $('body').find('.view').css({'padding-bottom':'0px'});
                }
              }
            },50);

          });
        });
      }
    },
    finnqUiCommentBox:function(options) {
      var defaults = {
        madeCallback:function(){
          // 메소드 호출 후에 callback 함수
        },
        messageCallback:function(value){

        },
        submitCallback:function(value){

        },
        openCallback:function(){

        },
        keyupEvent : function(value){

        },
        maxLength:200,
        returnValue : {value:'', length:''},
        returnEvent : {},
        textView : '댓글을 남겨보세요'
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);

      var CommentBoxForm =  '<div class="reply-textarea-box">'+
          '<textarea id="reply_input" name="" data-action="keypad" class="textarea" maxlength="'+options.maxLength+'" placeholder="'+options.textView+'"></textarea>'+
          '<div class="reply-btn-box">'+
          '<div class="reply-msg"><button type="button" id="reply_close_button" class="close-btn">취소</button><span class="text">'+options.textView+'</span><span class="count"><em>0</em>/'+options.maxLength+'</span></div>'+
          '<button type="button" id="reply_submit_button" class="submitButton" disabled="disabled">등록</button>'+
          '</div>'+
          '</div>';

      var closeEvent = function(){
        $('#reply_submit_button').attr('disabled',true);
        $('.reply-textarea-box').find('.count em').text('0');
        replyTextarea.removeClass('on');
        $('#reply_input').val('');
      };
      var openEvent = function(){
        replyTextarea.addClass('on');
        replyTextarea.find('.textarea').focus();
      };
      this.append(CommentBoxForm);
      var replyTextarea;
      this.find('.reply-btn-box').on('click',function(){
        replyTextarea = $(this).closest('.reply-textarea-box');
        if(replyTextarea.hasClass('on')){
          closeEvent();
        }else{
          var openOption = options.openCallback();
          if(openOption){
            openEvent();
          }
        }
      });
      this.find('.reply-textarea-box textarea').on('keydown keyup change',function(){
        var thisValue = $(this).val();
        var thisValueLength = thisValue.length;
        var thisTrimValueLnegth = thisValue.trim().length;
        var countNum = $(this).closest('.reply-textarea-box').find('.count em');
        countNum.text(thisValueLength);
        //공백일 경우, disable 처리
        if(thisTrimValueLnegth > 0){
          $('.submitButton').attr('disabled',false);
        }else{
          $('.submitButton').attr('disabled',true);
        }
        if(thisValueLength > options.maxLength){
          $(this).val(thisValue.substr(0, options.maxLength));
          countNum.text(options.maxLength);
        }
        options.returnValue.value = thisValue;
        options.returnValue.length = thisValueLength;
        options.keyupEvent(options.returnValue);
      });
      //댓글 달기
      this.find('#reply_submit_button').on('click',function(){
        options.submitCallback(options.returnValue);
        $('#reply_input').val('');
        $('.reply-btn-box').removeClass('on');
      });

      // return 용 이벤트
      options.returnEvent = {
        closeEvent : function(){
          closeEvent(true);
        },
        openEvent : function(){
          openEvent(true);
        }
      };
      $.fn.finnqUiKeypad(true,this);
      options.madeCallback();
      return options.returnEvent;//메소드들을 추가적으로 사용가능하도록 호출
    },

    finnqUiScrollList:function (options){
      var defaults = {
        dataGet:function(list){

        },
        dataGetBool : true
      };

      /* option 값 재정의 */
      var options = $.extend(defaults, options);
      var root = this;
      var parentDom = root.parent();
      var scrollDom;
      var tabLength = $('[data-action="tab-box"]').length;
      if(parentDom.find('.scrollLastLine').length < 1){
        parentDom.append('<div class="scrollLastLine"></div>');
        scrollDom = parentDom.find('.scrollLastLine');
        finnqUiObj.scrollRootDom.scroll(function(){
          if(options.dataGetBool){
            if( finnqUiObj.screenHeight == Math.floor(scrollDom.offset().top+finnqUiObj.bottomBox)){
              var list={};
              list['length'] = root.children().length;
              list['tabNum'] = tabLength > 0 ? $('.tab-link.menu_active').closest('li').index() : false;
              if(tabLength <= 1 || parentDom.closest('.tab').index() === finnqUiObj.tabPage){
                options.dataGet(list);
              }
            }
          }
        });
      }

      var dataBoolChange = function(bool){
        options.dataGetBool = bool;
      };
      return dataBoolChange;
    },
    finnqUiAccordion:function (options){
      // 클릭시 리스트 순서 반환
      var returnObj;
      var defaults = {
        openOption: false,
        openType: false,
        listClick:function(listLength){

        }
      };
      var options = $.extend(defaults, options);

      var accordionRoot =  $('[data-action="accordion"]');
      var accordionItem, accordionHeader, accordionBody;
      if(accordionRoot.length > 0){
        accordionItem = accordionRoot.children();
        accordionItem.attr('data-action','listItem');
        accordionHeader = accordionRoot.find('[data-action="accordion-head"]');
        accordionBody = accordionRoot.find('[data-action="accordion-body"]');
        if(!options.openType){
        	accordionBody.css({'display':'none'});

            if(options.openOption === 0 || options.openOption){
              accordionBody.eq(options.openOption).css({'display':'Block'});
              accordionBody.eq(options.openOption).parents('[data-action="listItem"]').addClass('on');
            }	
        }
        
        accordionHeader.off('click').on('click',function(){
          var CkickDom = $(this);
          var listDom = CkickDom.parents('[data-action="listItem"]');
          if(listDom.hasClass('on')){
            listDom.find('[data-action="accordion-body"]').stop().slideUp(300);
            listDom.removeClass('on');
          }else{
            listDom.find('[data-action="accordion-body"]').stop().slideDown(300);
            listDom.addClass('on');
          }
          listDom.siblings('[data-action="listItem"]').find('[data-action="accordion-body"]').stop().slideUp(300);
          listDom.siblings('[data-action="listItem"]').removeClass('on');
          options.listClick(listDom.index());
          var tabDom = $('[data-action="tab-box"]');
          if(tabDom.length > 0){
            var tabBody = tabDom.find('[data-action="tab-body"]');
            setTimeout(function(){
              tabBody.css({'height':tabBody.find('.tab').eq(finnqUiObj.tabPage).outerHeight(true)});
            },400);
          }

        });

      }
      returnObj = {
        open : function(index){
          var openIndex = index ? index : 0;
          accordionBody.eq(openIndex).slideDown();
          var tabDom = $('[data-action="tab-box"]');
          var tabBody = tabDom.find('[data-action="tab-body"]');
          accordionBody.eq(openIndex).parent('[data-action="listItem"]').siblings('[data-action="listItem"]').find('[data-action="accordion-body"]').slideUp();
          setTimeout(function(){
            tabBody.css({'height':tabBody.find('.tab').eq(finnqUiObj.tabPage).outerHeight(true)});
          },400);
        },
        close: function(){
          accordionBody.slideUp();
        }
      };
      return returnObj;
    },
    finnqUiMap:function (options){
      var root = this;
      var defaults = {
        location : false,
        address : false,
        imageMap : false,
        size:false,
        mapClick:function(event){

        },
        locationError:function(event){

        },
        addressError:function(event){

        }
      };
      //
      var options = $.extend(defaults, options);
      if(options.size){
        root.css({'width':options.size,'height':options.size});
      }

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new daum.maps.services.Geocoder(),
          mapOption;
      function searchDetailAddrFromCoords(coords, callback) {
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      if(options.location){
        var locationSet = new daum.maps.LatLng(options.location[0], options.location[1]);
        searchDetailAddrFromCoords(locationSet, function(result, status) {
          if (status === daum.maps.services.Status.OK) {
            // 주소
            var detailAddr = !!result[0].road_address ? options.address = [result[0].road_address.address_name,result[0].address.address_name] : '';
            mapSetFun();
          }else{
            options.locationError();
          }
        });
      }else if(options.address){
        geocoder.addressSearch(options.address, function(result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {
            var coords = new daum.maps.LatLng(result[0].y, result[0].x);
            options.location = [result[0].y,result[0].x];
            mapSetFun();
          }else{
            options.addressError();
          }
        });
      }else{

      }
      // 이미지 지도에서 마커가 표시될 위치입니다
      var mapSetFun = function () {
        mapOption = {
          center: new daum.maps.LatLng(options.location[0],options.location[1]),
          level: 3
        };

        var markerPosition  = new daum.maps.LatLng(options.location[0],options.location[1]);
        if(options.imageMap){// 이미지 지도
          mapOption.marker = {
            position: markerPosition
          };
          var staticMap = new daum.maps.StaticMap(root[0], mapOption);
        }else{// 일반 지도
          var map = new daum.maps.Map(root[0], mapOption);
          var markerPosition  = new daum.maps.LatLng(options.location[0],options.location[1]);
          var marker = new daum.maps.Marker({
            position: markerPosition
          });
          marker.setMap(map);
        }
      }


      /*daum.maps.event.addListener(map, 'click', function(mouseEvent) {
        var latlng = mouseEvent.latLng;// 클릭한 위치
        options.mapClick([latlng.getLat(), latlng.getLng()]);
      });*/
      return options;
    },
    finnqImageSet:function (){
      var cloudText = localStorage.getItem('finnqDataUrl');
      console.log(cloudText)
      this.find('img:not(".set-img")').each(function(){
        var imgSet = $(this),
            imgUrl,
            imgParent={width:0,height:0},
            imgUrlSet;

        imgUrl = imgSet.data('url') ? imgSet.data('url') : '';
        var imgSmart = getParameters(imgUrl, 'smart');
        if(imgSet.attr('src') === undefined && imgSet.data('url')){
          imgParent.width = Math.ceil(imgSet.parent().width()/50)*50;
          imgParent.height = Math.ceil(imgSet.parent().height()/50)*50;
          if(imgUrl.indexOf('amazonaws') > 0 && imgUrl.indexOf('.gif') < 0){
            if( imgSmart == 'true'){
              imgUrlSet = cloudText + '/unsafe/smart/' + imgUrl;
            }else {
              imgUrlSet = cloudText + '/unsafe/' + imgParent.width + 'x'
                  + imgParent.height + '/' + imgUrl;
            }
          }else{
            imgUrlSet = imgUrl;
          }
          imgSet.attr('src',imgUrlSet);
          imgSet.addClass('set-img');
        }
      });
    },

    finnqKakaoLink:function (options){
      var root = this;
      var defaults = {
        siteName : '마실',
        pageUrl : '',
        pageDetail : '',
        imageUrl : '',
        buttonClick:function(event){

        },
        buttonClickEnd:function(event){

        }
      };

      var options = $.extend(defaults, options);

      if( options.pageDetail.length > 20 ){
        options.pageDetail = options.pageDetail.substring(0, 20) + "...";
      }else{
        options.pageDetail = options.pageDetail;
      }
      var KakaoLink = function() {
        var domainMasil = localStorage.getItem('domainMasil');

        Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: options.siteName,
            description: options.pageDetail,
            imageUrl: options.imageUrl,
            link: {
              mobileWebUrl: domainMasil+options.pageUrl,
              webUrl: domainMasil+options.pageUrl
            }
          },
          buttons: [{
            title: '모바일 웹으로 보기',
            link: {
              mobileWebUrl: domainMasil+options.pageUrl,
              webUrl: domainMasil+options.pageUrl
            }
          }]
        });
      };

      root.on('click',function(){
        options.buttonClick();
        KakaoLink();
        options.buttonClickEnd();
      });
      return options;
    }
  });

  //라이브러리 선언 후에 바로 호출 필요한 기능들을 호출한다.(슬라이드, tab)
  $.fn.finnqUiCore();
  $('body').finnqImageSet();
  $.fn.finnqUiFontSet();// 로컬스토리지에 있는 폰트 크기 가져와서 폰트 설정
  //keypad 올라올 때 포커스 된 input 위치로 스크롤
  $.fn.finnqUiKeypad();

})(jQuery);
