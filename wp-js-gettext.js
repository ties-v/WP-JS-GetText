/**
 * WP JS Gettext
 *
 * This file defines all the js gettext functions
 *
 * @licence GPLv3
 *
 * @author TV productions
 */

/*
 * NOTE: we also need a string formatter for the php strings with %s or %d or %1$s and so on
 * Maybe something like this: https://github.com/kvz/phpjs/blob/master/functions/strings/sprintf.js
 */
(function ($) {
    window.wp = window.wp || {};
    window.wp.i18n = $.extend(window.wp.i18n, {
             /**
             * Retrieve the translation of message. If there is no translation,
             * or the text domain isn't loaded, the original message is returned
             *
             * @param message
             * @param domain
             * @returns {String}
             */
            gettext: function (message, domain) {
                if (window.wp.i18n.localeMessages[domain] && window.wp.i18n.localeMessages[domain][message]) {
                    return window.wp.i18n.localeMessages[domain][message].translations[0];
                }
                return message;
            },
            /**
             * Retrieve translated string with gettext context.
             *
             * @param message
             * @param context
             * @param domain
             * @returns {String}
             */
            gettextx: function (message, context, domain) {
                var key = context + String.fromCharCode(4) + message;
                if (window.wp.i18n.localeMessages[domain] && window.wp.i18n.localeMessages[domain][key]) {
                    return window.wp.i18n.localeMessages[domain][key].translations[0];
                }
                return message;
            },
            /**
             * Retrieve the plural or single form based on the supplied amount.
             *
             * @param single
             * @param plural
             * @param count
             * @param domain
             * @returns {String}
             */
            gettextn: function (single, plural, count, domain) {
                if (window.wp.i18n.localeMessages[domain] && window.wp.i18n.localeMessages[domain][single] && window.wp.i18n.localeMessages[domain][single].plural == plural) {
                    var index = window.wp.i18n.getPluralIndex(window.wp.i18n.localeMessages[domain]['__plural_expression__'], count);
                    if (window.wp.i18n.localeMessages[domain][single].translations[index]) {
                        return window.wp.i18n.localeMessages[domain][single].translations[index];
                    }
                }
                // The standard n!=1 plural expression
                if (count == 1) {
                    return single;
                } else {
                    return plural;
                }
            },
            /**
             * Retrieve the plural or single form based on the supplied amount with gettext context.
             *
             * @param single
             * @param plural
             * @param count
             * @param context
             * @param domain
             * @returns {String}
             */
            gettextnx: function (single, plural, count, context, domain) {
                var key = context + String.fromCharCode(4) + single;
                if (window.wp.i18n.localeMessages[domain] && window.wp.i18n.localeMessages[domain][key] && window.wp.i18n.localeMessages[domain][key].plural == plural) {
                    var index = window.wp.i18n.getPluralIndex(window.wp.i18n.localeMessages[domain]['__plural_expression__'], count);
                    if (window.wp.i18n.localeMessages[domain][key].translations[index]) {
                        return window.wp.i18n.localeMessages[domain][key].translations[index];
                    }
                }
                // The standard n!=1
                if (count == 1) {
                    return single;
                } else {
                    return plural;
                }
            },
            /**
             *  Convert integer number to format based on the locale.
             *
             * Original code by John Blackbourn
             * @link https://github.com/johnbillion/query-monitor/blob/e952ee976007eb03d69ea10ef2ae742af05f659a/assets/query-monitor.js#L17-L52
             *
             * @param number
             * @param decimals
             * @returns {string}
             */
            numberFormat: function (number, decimals) {
                if (isNaN(number))
                    return;

                if (!decimals)
                    decimals = 0;

                number = parseFloat(number);

                var num_float = number.toFixed(decimals),
                    num_int = Math.floor(number),
                    num_str = num_int.toString(),
                    fraction = num_float.substring(num_float.indexOf('.') + 1, num_float.length),
                    o = '';

                if (num_str.length > 3) {
                    for (var i = num_str.length; i > 3; i -= 3)
                        o = window.thousandsSeparator + num_str.slice(i - 3, i) + o;
                    o = num_str.slice(0, i) + o;
                } else {
                    o = num_str;
                }

                if (decimals)
                    o = o + window.decimalPoint + fraction;

                return o;
            },
            /**
             * Returns the plural index depending on count.
             *
             * @access private
             * @param plural_expression
             * @param count
             * @returns {number}
             */
            getPluralIndex: function (plural_expression, count) {
                // Filter out all not allowed symbols
                plural_expression = plural_expression[1].replace(/[^\s\d()=?:&|;%!<>n]/g, '');
                var n = new Function('var n = parseInt("' + String(count).replace(/"/g, '\\"') + '"); return ' + plural_expression)();
                if (typeof n === 'boolean') {
                    return n === true ? 1 : 0;
                }
                else {
                    return parseInt(n);
                }
            }
        }
    );
    // Aliases, now are they the same as the PHP functions
    window.__ = window.wp.i18n.gettext;
    window._x = window.wp.i18n.gettextx;
    window._n = window.wp.i18n.gettextn;
    window._nx = window.wp.i18n.gettextnx;

})(jQuery);
