/**
 * lodop-print
 * Copyright (c) 2018-2025 lanbery Lambor.Inc. All rights Reserved.
 * Statement ：
 * The lamp-table (lambor-print-table) control follows the GPL v3 open source contract
 * And can be developed by any company or individual based on the source extension,
 * But the original author information needs to be retained.
 * As for commercial use, components based on this component extension also need open source.
 * dual licence : LICENSE
 */
/**
 * demo.plugin
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-02-06
 */
(function () {
    
    var LampDesigner = function () {
        var defaults = {

        },
        _tplContentSpan = '<span></span>';

        return {
            init : function (opt) {
                opt = $.extend({},defaults,opt||{});

                return this;
            }
        }
    }();

    $.fn.extend({
        LampDesigner : LampDesigner.init
    });
})(jQuery);