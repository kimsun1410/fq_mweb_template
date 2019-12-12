<link rel="stylesheet" href="md.css" />
[이전페이지](/)

---
# 2018-07-30
#### 2551 P2P투자 서비스 개인정보 처리방침 약관 내 업체명 삭제
* __[HTML]__
    * [홈페이지 개인정보 처리방침] https://dwww.finnq.com/policy/privacy.html 
    * > 주석  : `<!-- 내용 수정 2018-07-26 --> 2곳`
    * [2.0앱내 개인정보 처리방침] /resources/terms/html/FD/000078_20170503.html 
    * > 주석  : `<!-- 내용 수정 2018-07-26 -->`

# 2018-07-30
#### 2559 [해외송금] 서비스 소개 내용 추가 및 문구 변경, '취소' 결함 수정
###### - 소개페이지 관련 -
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/orsremt/MASP01Z00.html
    * > 주석  : `<!-- 안내 문구 추가 2018-07-30 -->`
    * > 주석  : `<!-- KRW 삭제 2018-07-30 -->`
    * > 주석  : `<!-- 문구 수정 2018-07-30 -->`
* __[CSS]__
    * > 주석  : `/* 숫자 letter-spacing */`
    * WebContent/resources/v2/pubs/css/ui_finnqmarket.css
    * > 주석  : `/* 공통 스타일 추가 2018-07-30 */`
    * WebContent/resources/v2/pubs/css/ui.css
    * > 설명 : 버전 컨트롤 - 날짜 변경해서 배포 `
    * views/v2/jsp/include/version_control.jsp

# 2018-07-13
#### 2521 [1:1문의] 내용 입력 오류 수정
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/p2p/MASV07Z07.html
    * https://dapp.finnq.com/resources/v2/pubs/html/menu/MASA07Z05.html
    * > 주석 : `<!-- data-length 속성 추가 2018-07-12 ock -->`
    * > 주석 : `<!-- maxlength 삭제하지말고 빈값으로 두거나 아무값 넣으면 됨 2018-07-12 ock -->`
* __[JS]__
    * libs/ui.js
    * > 주석 : `//data-length 가 있는 경우는 data-length 로 체크, maxlength 엔터 이슈 2018-07-12 ock`

# 2018-07-12
#### 2510 P2P투자 서비스이용약관 추가의 건
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/menu/MASA04Z02.html
    * > 주석 : `<!-- 2510 P2P투자 서비스이용약관 추가의 건 2018-07-10 ock -->`

# 2018-07-10
#### P2P투자 출금 대기중 추가 : 스파크로 개발전달 완료
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/p2p/MASV07Z03.html
    * > 주석 : `<!-- 출금 대기중 추가 2018-07-10 ock -->`
* __[CSS]__
    * https://dapp.finnq.com/resources/v2/pubs/css/ui_finnqmarket.css
    * > 주석 : `/* 출금 대기중 */`
    
# 2018-07-10
#### 제휴/마케팅 약관 동의, 약관 동의 철회 신규 : 개발전달 완료
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/menu/MASF04Z06.html (약관 동의)
    * https://dapp.finnq.com/resources/v2/pubs/html/menu/MASF04Z07.html (약관 동의 철회)
    
# 2018-07-09
#### P2P투자 반영 개인정보처리방침 수정건 : 개발전달 완료
* __[HTML]__
    * https://dwww.finnq.com/policy/privacy.html (홈페이지)
    * https://dapp.finnq.com/resources/v2/pubs/html/provision/000078_20170503.html (모바일 앱)
    * > 주석 : `2018-07-09`
    

# 2018-06-28
#### 인수인계 : P2P, 해외송금
* __[P2P]__
  * 개발전달사항
      * 파일목록에 전달시 css, js 수정여부 코멘트 필수
      * 파일목록(압축파일 및 수정파일내용), Finnq P2P 투자 플랫폼-디자인-GUI변경관리 작성
  * 약관공통
      * 제휴사에 적용하는 이슈로, iframe으로 진행
      * 여백은 iframe 내부에서 처리 body class="agree_iframe"
  * 투자하기 MASV02Z01 (수정사항 대기)
      * 2018-06-25 data-minVal="만" maxlength="5"
      * 2018-06-25 만단위입력 변경으로 삭제
      * (개발팀에서 수정을 나중에 해야한다고 하심 - 최진수 차장)

* __[해외송금]__
  * 해외송금 상세내역 신규 Case (개발팀 전달)
      * MASP05Z05 : 오류 Case
      * MASP05Z06 : 환불 Case

# 2018-06-22
#### 인수인계 : P2P, 해외송금
* __[P2P]__
  * 웹 주소 : [개발] https://dpib.finnq.com/ [테스트] https://spib.finnq.com/
  * ios-x : 하단여백 34px 적용(예외처리)
	* MASV01Z06.html
	* MASV05Z02.html
	* MASV06Z01.html
	* MASV07Z12.html
  * .benefit_cal.flexible : 100% 아닐때 보더라운드 해제, 100% 일때 보더라운드 적용
  * guide_calendar.html : specialDates 형식으로 수정
  * guide.html : btn_type_i:disabled 예외처리 타입 추가 (배경이 #eee 일 때 예외처리 : .sec_MASV07Z07 .btn_type_i:disabled 참고)
  * MASV07Z01.html : 만족도 후기목록 bg_list 적용
  * MASV08Z01_error.html : Button disabled 비활성 유지

* __[해외송금]__
  * 수수료 면제
    * 면제일때만 일시적으로 표시하고 있음. 언제까지인지는 모름.
    * <!-- 2018-06-04 수수료면제(일시적용) --> 주석으로 검색 (면제),  class="strike"
    * 개발팀에서 처리 후 배포 (퍼블리싱은 업무적으로 HTML 최신화 작업 필요)
  
# 2018-06-20
#### 2443 [공통] 오픈소스 라이선스 v2 반영 작업
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/menu/MASA04Z10.html (안드로이드)
    * https://dapp.finnq.com/resources/v2/pubs/html/menu/MASA04Z10_ios.html (IOS)
    * > 주석 : `<!-- 오픈소스 라이선스 2.0 2018-06-20 --> <!-- //오픈소스 라이선스 2.0 2018-06-20 -->`
* __[CSS]__
    * <span>2401 해외송금, P2P 퍼블리싱 수정사항 배포 파일과 겹침 : ~~2018-06-21 배포 예정~~</span>
    * https://dapp.finnq.com/resources/v2/pubs/css/ui_aifingo.css
    * > 주석 : `/* 오픈소스 라이선스 2.0 2018-06-20 */`

#### 2440 [AI핀고] 소비내역 상세 화면 개선 3건
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/aifingo/CBSJ69Z02.html (해시태그)
    * https://dapp.finnq.com/resources/v2/pubs/html/aifingo/CBSJ69Z03.html (해시태그)
    * https://dapp.finnq.com/resources/v2/pubs/html/aifingo/CBSJ69Z13.html (소비평가/해시태그)
    * https://dapp.finnq.com/resources/v2/pubs/html/aifingo/CBSL69Z07.html (해시태그)
    * > 주석 : `<!-- 2440 [AI핀고] 소비내역 상세 화면 개선 3건 2018-06-18 ock -->`
    * <u>html 하단에 퍼블리싱 UI구현을 위한 스크립트 추가 되어있으니 보시고 필요한 부분만 사용해주세요.</u>
* __[CSS]__
    * https://dapp.finnq.com/resources/v2/pubs/css/ui_aifingo.css
    * > 주석 : `/* 2440 [AI핀고] 소비내역 상세 화면 개선 3건 */`

# 2018-06-18
#### 2426 기프티콘 오퍼링 서비스
* __[HTML]__
    * https://dapp.finnq.com/resources/v2/pubs/html/finnqmarket/MASG03Z02_birthday.html (신규)
    * https://dapp.finnq.com/resources/v2/pubs/html/finnqmarket/MASG01Z01.html 
    * > 주석 : `<!-- 기프티콘몰 메인 생일 카테고리 추가 2018-06-14 ock -->`
    * https://dapp.finnq.com/resources/v2/pubs/html/menu/MASA03Z01.html 
    * > 주석 : `<!-- 생일 푸쉬 알림 추가 2018-06-14 ock -->`
* __[IMG]__
    * https://dapp.finnq.com/resources/v2/pubs/images/banner/img_banner_birthday_360x217.png
    * https://dapp.finnq.com/resources/v2/pubs/images/finnqmarket/ico_category.png
    * https://dapp.finnq.com/resources/v2/pubs/images/menu/ir-icon-notice.png
    * <span>2401 해외송금, P2P 퍼블리싱 수정사항 배포 파일과 겹침 : ~~2018-06-21 선배포 예정~~</span>
    * https://dapp.finnq.com/resources/v2/pubs/images/common/ir-icon-set.png
* __[CSS]__
    * <span>2401 해외송금, P2P 퍼블리싱 수정사항 배포 파일과 겹침 : ~~2018-06-21 배포 예정~~</span>
    * https://dapp.finnq.com/resources/v2/pubs/css/ui_finnqmarket.css  
    * https://dapp.finnq.com/resources/v2/pubs/css/ui.css

# 2018-01-30
  * 보안 usb 인수인계 / 정상작동 확인 완료
  * 수행사 와이파이 ux팀 사용 품위서올리기 요청 완료

# 2018-01-29
  * 숫자인풋 입력시 오류 및 재입력시 (콤마, 원) 삭제가 맞는지 개발문의
  * 해결방법은 숫자는 오른쪽, 한글이 왼쪽표시가 가장 좋다고 퍼블리싱 의견
  * 권매니저 부재로 화요일 논의

# 2018-01-26
  * GUI수정이슈 중 [CSS 수정 필요] 어떤 수정인지 표기되어있지 않은 건 - 디자인팀 확인하기로
    * 그중에 상하 중앙정렬, 간격 수정 1 ~ 2px 건들은 스킵 - 추후에 수정 하기로 협의 완료
  * 비상금대출 (1) - 최대 10본 / 기프티콘몰 (2)
    * 기획 / 디자인 - 3차에 대한 일정 
    * 디자인 : 다음주 월요일 - 확인 용도로만. 작업은 X
  * 일정
    * 02월 09일까지 : 3차를 제외한 디자인 변경건 + 1차 누락 수정건 + 개발대응 
    * 02월 12일부터 : 2차 수정건 + 3차 + 개발대응

# 2018-01-23
  * UI, GUI수정이슈 반영
  * #88 IA오류로 Native -> Web으로 변경, 2차 작업분

# 2018-01-22
  * 개발 1차 산출물 전달
  * 디자인, 기획 최종확인 및 수정이슈 정리중

# 2018-01-21
  * market-detail.scss -- @include font(XXpx); 폰트함수로 적용
  * 

# 2018-01-20
  * 친구추가 프로모션 웹이미지 및 추가 컨텐츠 퍼블리싱 산출물 전달(박배식 매니저)
  * "진행중" Alert팝업은 완료 처리

# 2018-01-18
  * 제플린 - common - 00_04정보 페이지는 웹이라함 - 네이티브 개발자 김진욱D
  * /resources/mas/html/finnqmarket/MASM02Z01.html
혜택 계산기 네모난 탭 - btn_sellist
on 활성화 되는 script 속도가 너무 느리다는 얘기가 있어서
css 수정 없이 js 만 수정 함, 나중에 오셔서 냅두라고 하셔서... 개발자가 따로 조치 했을 수도 있습니다. - 종수K 옆자리 담당 개발자!
  * MASM02Z02 : 화면 삭제가 아니라고 함, 자세한 내용은.. 확인 필요..  - 종수K 옆자리 담당 개발자!
  * 소스 경로가 또 바뀐다고... 종수K
  * 2018-01-17 ver 커밋이 안되있어서 2018-01-18 ver 시스템망에 커밋 완료 - 종수K 요청
  * SR No.2058 약관변경 요청 - 종수K 배포 진행
  * SR No.2063 내나이어때서 이벤트 연장 : 개발 전달 완료 - 종수K 배포 진행


# 2018-01-17
  * CSS파일 분리 요청(종수 과장님)
    * ui.css, fingo.css, myfinnq, finnqmarket 4개로 분리
	* 추후 openweb, maintenance 분리할 가능성 있음

# 2018-01-16
  * 1차 산출물 선전달
    * 레이아웃 템플릿 협의(종수 과장님)

# 2018-01-12
  * 엑셀 진척도 표에 완료날짜 기입
  * IA 3.0으로 Index재작업, 엑셀복사용 버튼 추가(html복사 -> 에디터 -> 엑셀)
  * radio / checkbox 이미지 및 class 변경 > 작업 페이지 체크 요청.
    * radio : class 없거나 yellow 관련 class 사용 시 라디오 버튼 디자인으로 나옴.
    * radio : class purple 사용시 체크박스 purple 디자인으로 나옴.
    * checkbox : class purple 사용하거나 없을 시 체크박스 purple 디자인으로 나옴.
    * checkbox : class gray 사용시 체크박스 gray 디자인으로 나옴.
	* switch_basic_btn : background-image none 처리함.

# 2018-01-09
  * FED요청으로 index.html 업데이트 중단
    * 엑셀에 통합하여 전체 진척도 파악

# 2018-01-05
  * 화면정의서 ID값 추가 진행중
    * 개발망 PC셋팅
	* 퍼블리싱 진척도 50%이상 진행시 개발망 공유
	* sec_step와 함께 있는 sec_head에서 sec_title로 변경

# 2018-01-04
  * 1.0 약관 변경작업 진행완료
  * 개발중요 전달사항
    * 배경리스트의 경우 wrap.bg_list가 붙는 문제 클래스 추가 이외, 통합처리는 불가
    * 이외에 #contents에 class를 추가하는 방법
	* js로 outerHeight, padding을 주는 방법도 가능.
	* 퍼블리싱에서는 wrap에 class추가하는 방법으로 적용

# 2017-12-30
  * index.html web카운트중에서 "none"인 경우 제외, (done, ing, wait) 상태값만 카운트
  * SVN cleanUp시 폴더 백업후 진행할것. 작업내용 반영 안되는 경우 있음.
  * 핀고 제플린 업로드분 작업 완료

# 2017-12-23
  * 이미지 3배수 사용
  * 80px사이즈이면 240px이미지 사용 300ppi이상 대응
  * 스케치에서 리사이즈시에 제플린 아웃풋이 다름 
  * drawable-xhdpi, drawable-xxhdpi 두 폴더를 반드시 비교

# 2017-12-22
  * 핑고, 마켓 분리 작업
  * 마켓쪽 디자인파트 가이드화면 제공
  * 마이핀크 가이드 2~3페이지 제공완료
  * 마이핀크 디자인 색상가이드 하단에 폰트 관련 상세 정보
  * 중요: 한글은 letter-spacing:-1px; 숫자는 없음, 숫자에 있는 경우 삭제

# 2017-12-21
  * IA, 화면정의서 매칭 문제
    * 화면정의서 파란 타이틀 참조
	* 매칭코드는 없음
	* 1.0 버전에서 화면분류 코드가 있다고 함(feat.김상웅 과장님)
  * line-height값과 object높이 매칭이 어려운 부분 토의
    * 폰트에 따른 line-height값, 그리고 일부 화면에 대한 가이드 제공요청(feat.권민영)

# 2017-12-15
  * reset.css *셀렉터 삭제, 문제시 원상복구
  * @import, @extend까지만 사용
  * 색상값은 제플린 HEX코드를 따라갑니다.
    * black-three의 경우 eee, e0e0e0가 있는데.. 이런 경우
	* black-three-zero
	* black-three-two 이렇게 변경해주세요.
  * 폰트문제는 디자이너와 협의
  * 스크롤시 fixed 충돌문제

# 2018-02-07
  * 모든 타이틑은 네이티브에서 가져감. 퍼블의 풀팝업 타이틀 일괄 삭제.

# 2018-02-08
  * 퍼블 상단 여백은 28px 또는 10px 공통



```javascript
header {
    height: 60px;
    background-color: @mainColor;
    color: #ffffff;
    padding: 10px;
    text-align: center;
    position: fixed;
    width: 100%;
    z-index: 1;
    transform: translateZ(0);
    -moz-transform: translatez(0);
    -ms-transform: translatez(0);
    -o-transform: translatez(0);
    -webkit-transform: translateZ(0);
    -webkit-font-smoothing: antialiased;
}
```
  * 참고
    * http://ayogo.com/blog/ios11-viewport/
    * https://forums.developer.apple.com/thread/90472
    * How to fix the iOS 11 input element in fixed modals bug
    * https://github.com/PierBover/ios-iframe-fix
    * https://stanko.github.io/ios-safari-scoll-position-fixed/

  * 폰트경량
    * http://coderifleman.tumblr.com/post/111825720099/한글-웹-폰트-경량화해-사용하기
    * https://eond.com/font/361651
 
# 1.0 주요화면
  * http://localhost:4001/resources/mas/html/MASB01M04.html
