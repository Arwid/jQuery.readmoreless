/*!
 * jQuery.readmoreless - Minimize long paragraphs and make expandable with 
 * "more" and "less" links. Either collapse to a length or a selector.
 *
 * Inspired by jquery.readmore 1.1 by Jake Trent  http://www.jtsnake.com/
 *
 * Copyright 2011 Arwid Bancewicz
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * @date 23 Feb 2011
 * @author Arwid Bancewicz http://arwid.ca
 * @version 0.1
 */
 (function($) {
    $.fn.readmoreless = function(settings) {

        var opts = $.extend({},
        $.fn.readmoreless.defaults, settings);

        this.each(function() {
            $(this).data("opts", opts);
            if (opts.substr) {
            // Minimize on a length
                if ($(this).html().length > opts.substr_len) {
                    split($(this));
                    createLinks($(this));
                }
            } else {
            // Minimize on a selector
                // append links
                $(this).append(opts.more_link).append(opts.less_link);
                // hide the rest
                $(this).children(":not(" + opts.less_selector + "):not(.more)").hide();
                // create click handlers
                $(this).children(".more").click(function() {
                    $(this).hide().siblings(":not(" + opts.less_selector + "):not(.more):not(.less)").animate({
                        'opacity': 'toggle'
                    },
                    1000)
                    .siblings(".less").show();
                });
                $(this).children(".less").click(function() {
                    $(this).hide().siblings(":not(:first)").hide()
                    .siblings(".more").show();
                });
            }
        });

        function createLinks(elem) {
        // create links
            elem.append('<div class="clear"></div>');
            elem.append(opts.more_link).append(opts.less_link);
            elem.children(".less").hide();
            createHandlers(elem);
        }

        function createHandlers(elem) {
        // create click handlers
            elem.children(".more").click(function() {
                $(this).hide().siblings(".ellipses").hide().siblings(":not(.first):not(.more):not(.less)").animate({
                    'opacity': 'toggle'
                },
                1000)
                .siblings(".less").show();
            });
            elem.children(".less").click(function() {
                $(this).hide().siblings(":not(:first)").hide().siblings(".ellipses,.clear").show()
                .siblings(".more").show();
            });
        }

        function split(elem) {
        // split the element with a substring
            var opts = elem.data("opts");
            var txt = elem.html();
            var len = opts.substr_len;
            var dots = "<span class='ellipses'>" + opts.ellipses + "</span>";
            var shown = txt.substring(0, len) + dots;
            var hidden = '<span class="hidden" style="display:none;">' + txt.substring(len, txt.length) + '</span>';
            elem.html(shown + hidden);
        }

        return this;
    };

    $.fn.readmoreless.defaults = {
        substr: true, 
		//substr: true to minimize on a length, false for on a selector
        substr_len: 500,
        less_selector: ":first",
        ellipses: '&#8230;',
        more_link: '<a class="more">Read&nbsp;More</a>',
        less_link: '<a class="less">Read&nbsp;Less</a>'
    };

})(jQuery);