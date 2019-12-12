/**
 * @dependency :
 		jquery
 *
 **/

/*
 * jQuery Easing v1.4.1 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(['jquery'], function ($) {
			return factory($);
		});
	} else if (typeof module === "object" && typeof module.exports === "object") {
		exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
})(function($){

// Preserve the original jQuery "swing" easing as "jswing"
if (typeof $.easing !== 'undefined') {
	$.easing['jswing'] = $.easing['swing'];
}

var pow = Math.pow,
	sqrt = Math.sqrt,
	sin = Math.sin,
	cos = Math.cos,
	PI = Math.PI,
	c1 = 1.70158,
	c2 = c1 * 1.525,
	c3 = c1 + 1,
	c4 = ( 2 * PI ) / 3,
	c5 = ( 2 * PI ) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
	var n1 = 7.5625,
		d1 = 2.75;
	if ( x < 1/d1 ) {
		return n1*x*x;
	} else if ( x < 2/d1 ) {
		return n1*(x-=(1.5/d1))*x + .75;
	} else if ( x < 2.5/d1 ) {
		return n1*(x-=(2.25/d1))*x + .9375;
	} else {
		return n1*(x-=(2.625/d1))*x + .984375;
	}
}

$.extend( $.easing,
	{
		def: 'easeOutQuad',
		swing: function (x) {
			return $.easing[$.easing.def](x);
		},
		easeInQuad: function (x) {
			return x * x;
		},
		easeOutQuad: function (x) {
			return 1 - ( 1 - x ) * ( 1 - x );
		},
		easeInOutQuad: function (x) {
			return x < 0.5 ?
				2 * x * x :
				1 - pow( -2 * x + 2, 2 ) / 2;
		},
		easeInCubic: function (x) {
			return x * x * x;
		},
		easeOutCubic: function (x) {
			return 1 - pow( 1 - x, 3 );
		},
		easeInOutCubic: function (x) {
			return x < 0.5 ?
				4 * x * x * x :
				1 - pow( -2 * x + 2, 3 ) / 2;
		},
		easeInQuart: function (x) {
			return x * x * x * x;
		},
		easeOutQuart: function (x) {
			return 1 - pow( 1 - x, 4 );
		},
		easeInOutQuart: function (x) {
			return x < 0.5 ?
				8 * x * x * x * x :
				1 - pow( -2 * x + 2, 4 ) / 2;
		},
		easeInQuint: function (x) {
			return x * x * x * x * x;
		},
		easeOutQuint: function (x) {
			return 1 - pow( 1 - x, 5 );
		},
		easeInOutQuint: function (x) {
			return x < 0.5 ?
				16 * x * x * x * x * x :
				1 - pow( -2 * x + 2, 5 ) / 2;
		},
		easeInSine: function (x) {
			return 1 - cos( x * PI/2 );
		},
		easeOutSine: function (x) {
			return sin( x * PI/2 );
		},
		easeInOutSine: function (x) {
			return -( cos( PI * x ) - 1 ) / 2;
		},
		easeInExpo: function (x) {
			return x === 0 ? 0 : pow( 2, 10 * x - 10 );
		},
		easeOutExpo: function (x) {
			return x === 1 ? 1 : 1 - pow( 2, -10 * x );
		},
		easeInOutExpo: function (x) {
			return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
				pow( 2, 20 * x - 10 ) / 2 :
				( 2 - pow( 2, -20 * x + 10 ) ) / 2;
		},
		easeInCirc: function (x) {
			return 1 - sqrt( 1 - pow( x, 2 ) );
		},
		easeOutCirc: function (x) {
			return sqrt( 1 - pow( x - 1, 2 ) );
		},
		easeInOutCirc: function (x) {
			return x < 0.5 ?
				( 1 - sqrt( 1 - pow( 2 * x, 2 ) ) ) / 2 :
				( sqrt( 1 - pow( -2 * x + 2, 2 ) ) + 1 ) / 2;
		},
		easeInElastic: function (x) {
			return x === 0 ? 0 : x === 1 ? 1 :
				-pow( 2, 10 * x - 10 ) * sin( ( x * 10 - 10.75 ) * c4 );
		},
		easeOutElastic: function (x) {
			return x === 0 ? 0 : x === 1 ? 1 :
				pow( 2, -10 * x ) * sin( ( x * 10 - 0.75 ) * c4 ) + 1;
		},
		easeInOutElastic: function (x) {
			return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
				-( pow( 2, 20 * x - 10 ) * sin( ( 20 * x - 11.125 ) * c5 )) / 2 :
				pow( 2, -20 * x + 10 ) * sin( ( 20 * x - 11.125 ) * c5 ) / 2 + 1;
		},
		easeInBack: function (x) {
			return c3 * x * x * x - c1 * x * x;
		},
		easeOutBack: function (x) {
			return 1 + c3 * pow( x - 1, 3 ) + c1 * pow( x - 1, 2 );
		},
		easeInOutBack: function (x) {
			return x < 0.5 ?
				( pow( 2 * x, 2 ) * ( ( c2 + 1 ) * 2 * x - c2 ) ) / 2 :
				( pow( 2 * x - 2, 2 ) *( ( c2 + 1 ) * ( x * 2 - 2 ) + c2 ) + 2 ) / 2;
		},
		easeInBounce: function (x) {
			return 1 - bounceOut( 1 - x );
		},
		easeOutBounce: bounceOut,
		easeInOutBounce: function (x) {
			return x < 0.5 ?
				( 1 - bounceOut( 1 - 2 * x ) ) / 2 :
				( 1 + bounceOut( 2 * x - 1 ) ) / 2;
		}
	});

});

/**
* @desc 브라우저의 종류 및 IE의 경우 버전까지 체크해주는 함수.
*
* @method browserCheck
* @param {Boolean} compatibilityView, 호환성보기 사용 여부
* @param {Boolean} returnText, 현재 브라우저 명을 반환할 것인지 여부
* @return {String} return_text 변수를 반환하며 returnText 매개변수의 여부에 따라 출력하지 않을 수 있다.

*/

window.browserCheck = function (compatibilityView, returnText) {
	'use strict';
	var _ua, trident, rv, css_class, return_text;
	_ua = navigator.userAgent.toLowerCase();
	trident = _ua.match(/trident\/(\d.\d)/i) || _ua.match(/rv:(\d.\d)/i);
	rv = -1;
	css_class = '';
	return_text = '';

	if ( compatibilityView === undefined || trident === null ) compatibilityView = false;

	if ( compatibilityView && trident != null ) {
			//IE 11,10,9,8
    	switch (trident[1]) {
    		case '7.0': css_class = "ie11 msie";
    		break;
    		case '6.0': css_class = "ie10 msie";
    		break;
    		case '5.0': css_class = "ie9 msie";
    		break;
    		case '4.0': css_class = "ie8 msie";
    		break;
    		default: css_class = "ie7 msie";
    	}
	}
	else
	{
		if ( _ua.indexOf('msie 7') != -1 ) css_class = 'ie7 msie';
		else if ( _ua.indexOf('msie 8') != -1 ) css_class = 'ie8 msie';
		else if ( _ua.indexOf('msie 9') != -1 ) css_class = 'ie9 msie';
		else if ( _ua.indexOf('msie 10') != -1 ) css_class = 'ie10 msie';
		else if (_ua.indexOf('msie') == -1 && trident && trident[1] == '7.0' ) css_class = 'ie11 msie';
	}

    //other
    if (_ua.indexOf("safari") != -1 && _ua.indexOf('version') != -1) css_class = 'safari';
    else if (_ua.indexOf("chrome") != -1 && _ua.indexOf("opr") == -1) css_class = 'chrome';
    else if (_ua.indexOf("opera") != -1 || _ua.indexOf("opr") != -1 || _ua.indexOf("opera") != -1) css_class = 'opera';
    else if (_ua.indexOf("firefox") != -1) css_class = 'firefox';


    if ( document.body.className.length >= 1 ) {
    	document.body.className += ' '+css_class;
    } else {
    	document.body.className += css_class;	}


};

//$('body.ie*').addClass('msIE');

$(window).load(function(){
	browserCheck();
});


$(function(){
	//Table Summary // caption
	/* table에 data-th-collect="false" 속성을 적용하면 th에 있는 텍스트를 수집하지 않음 : th의 수집정보로 summary의 내용을 자동으로 구성하지 않도록 하고 싶을때 적용 */
	var c = addTableCaption('table');

	function addTableCaption ( table ) {

		var thStr = '',
			htmlDoctype = doctypeCheck();

		function doctypeCheck () {
			var doctype = document.doctype,
				htmlVersion = '';

			if ( doctype ) {
				var v = doctype.publicId;

				if ( !v ) htmlVersion = '5';
				else if ( v.indexOf('HTML 4.01') > -1) htmlVersion = '4.01';
				else if ( v.indexOf('XHTML 1.0') > -1 ) htmlVersion = 'XHTML 1.0';
				else if ( v.indexOf('XHTML 1.1') > -1 ) htmlVersion = 'XHTML 1.1';
			} else {
				htmlVersion = 'Quirks mode';
			}
			return htmlVersion;
		}

		$(table).each(function( idx, value ){

			if ( $(value).data('th-collect') !== false ) {
				thStr = '';
				for( var i=0; i<$(value).find('th').length; i+=1 ) {
					if ( $(value).find(' > * > * > th').eq(i).text() !== '' ) {
						thStr += $(value).find(' > * > * > th').eq(i).text() + ', ';
					}
				}
				thStr = thStr.slice(0, thStr.length-2);
				if ( htmlDoctype !== '5' ) {
					$(value).attr('summary', thStr + '로 구성된 표 입니다.' );
				} else if ( htmlDoctype === '5' ) {
					$(value).find(' > caption > p').text( thStr + '에 대한 표 입니다.' );
				}
			}

		});

	}
});