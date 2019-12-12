var fncSetToDate = function() {
        return !1
    },
    fncSetFromDate = function() {
        return !1
    };
$.datepicker.setDefaults({
    autoOpen: !1,
    dateFormat: "yy.mm.dd",
    prevText: "이전 달",
    nextText: "다음 달",
    dayNames: ["S", "M", "T", "W", "T", "F", "S"],
    dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
    dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    showMonthAfterYear: !0,
    yearSuffix: ".",
    showButtonPanel: !0,
    closeText: "닫기",
    showOtherMonths: !0,
    selectOtherMonths: !0,
    autoSize: !0,
    inline: !0,
    autoclose: !0,
    maxDate: "0",
    beforeShow: function() {
        $(document).height();
        var t = $(window).width();
        $("body").append('<div class="popup_wrapper"></div>');
        try {
            ComUtil.procNativeDim() && ComUtil.procNativeDim()
        } catch (t) {
            console.log(t)
        }
        $(".ui-datepicker").css({
            width: t
        }), $(".popup_wrapper").show("fast"), $(".popup_wrapper").on("click", function(t) {
            t.preventDefault(), $(this).hide("fast").remove();
            try {
                ComUtil.procNativeDim() && ComUtil.procNativeDim()
            } catch (t) {
                console.log(t)
            }
        })
    },
    onSelect: function(t, e) {
        $(".popup_wrapper").hide("fast").remove();
        try {
            ComUtil.procNativeDim() && ComUtil.procNativeDim()
        } catch (t) {
            console.log(t)
        }
        var o = t.replace(/\./g, "-");
        console.log(o);
        var a, i = new Date(o),
            c = $(this).data("datepicker"),
            r = ($.datepicker.parseDate(c.settings.dateFormat || $.datepicker._defaults.dateFormat, t, c.settings), i.getDate()),
            n = $("a.ui-state-highlight").text(),
            p = $(this).attr("id");
        a = $(this).val(), r == n && $(this).val(a + " (오늘)"), console.log("#######" + a), "fromDate" == p ? ($("#fromDateDev").val($(this).val()), $("#fromDateDev").attr("data-value", a), fncSetFromDate(a)) : ($("#toDateDev").val($(this).val()), $("#toDateDev").attr("data-value", a), fncSetToDate(a))
    }
}), 
	
$(function() {
    $("#toDate, #fromDate").datepicker(),
    $("#toDate").on("click", function() {
        $("#toDate").focus()
    }), $("#fromDate").on("click", function() {
        $("#fromDate").focus()
    }), $("#toDate").focus(function() {
        $(".ui-datepicker-close").click(function(t) {
            $(".popup_wrapper").hide("fast").remove();
            try {
                ComUtil.procNativeDim() && ComUtil.procNativeDim()
            } catch (t) {
                console.log(t)
            }
        })
    }), $("#fromDate").focus(function() {
        $(".ui-datepicker-close").click(function(t) {
            $(".popup_wrapper").hide("fast").remove();
            try {
                ComUtil.procNativeDim() && ComUtil.procNativeDim()
            } catch (t) {
                console.log(t)
            }
        })
    })
});