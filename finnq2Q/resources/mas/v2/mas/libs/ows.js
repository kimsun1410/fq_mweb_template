if(typeof jQuery !== 'undefined'){
	$(document).ready(function(){

		//Device Class Add
		deviceInfo = ui.android_version();
		if(deviceInfo) $('body').attr('data-device', deviceInfo).addClass(deviceInfo);

		$body = $("body");
		//Contents Size Cal;
		var docH, docW;
		docW = $(window).width();
		docH = $(window).height();


		//모달팝업
		/* modal popup */
		$("button.open_modal,a.open_modal").on("click", function(){
			var $mpop = $(this);

			var $mpopType = $mpop.data("mtype");
			var $mpopID = "#"+$mpop.data("triger");
			var $mpopClose = $mpop.data("bgclose");
			var conH = $($mpopID).find(".modal_content").outerHeight();

			//popup contents height < window height
			if(conH >= docH || ($mpopType=="fullpop")) {
				$($mpopID +"> .modal_content").css({
					height: docH
				});
			}else {
				$($mpopID).addClass("normal");
			}
			if($mpopClose) 	$($mpopID).data("bgclose", true);

			switch($mpopType) {
				case "fullpop":
					$($mpopID).toggleClass("visible");
					break;
				case "doublepop":
					$($mpopID).addClass("double").toggleClass("visible");
					break;
				default:
					$($mpopID).toggleClass("visible");
			}
			return false;
		});
		$(".modal_wrap").on("click","button.close_modal", function(){
			$(this).closest('.modal_wrap').toggleClass("visible");
			return false;
		});
		$(".modal_wrap").on("click", function(e){
			var status = $(this).data("bgclose");
			if(!$(".modal_content").has(e.target).length && status ) {
				if($(this).data("bgclose")) $(this).toggleClass("visible");
			}
		});
	});
}



	