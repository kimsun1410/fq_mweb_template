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
    check_android_version();
});        

