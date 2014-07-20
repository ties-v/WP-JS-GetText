/**
 * This file contains a test case for WP JS GetText.
 * It will produce a translated output on every page with javascript.
 */
jQuery(function ($) {
        var text = '<p>These strings are translated with javascript (<code>wp.i18n</code>) from core. Please set <code>WP_LANG</code> to something else than english. To format the <code>%s</code>, <code>%d</code>, <code>%1$s</code>, etc. we have to build a format function. A good place to start may be <a href="https://github.com/kvz/phpjs/blob/master/functions/strings/sprintf.js">sprintf for js</a>.</p><hr/>' +
            '<p>' + __("<strong>Send Trackbacks<\/strong> - Trackbacks are a way to notify legacy blog systems that you&#8217;ve linked to them. Enter the URL(s) you want to send trackbacks. If you link to other WordPress sites they&#8217;ll be notified automatically using pingbacks, and this field is unnecessary.", 'default') + '</p>' +
            '<p>' + _x("Add New", 'file', 'default') + '</p>' +
            '<p>' + _n('%d Plugin Update', '%d Plugin Updates', 1, 'default') + '<br/>' + _n('%d Plugin Update', '%d Plugin Updates', 2, 'default') + '</p>' +
            '<p>' + _nx("Unattached <span class=\"count\">(%s)<\/span>", "Unattached <span class=\"count\">(%s)<\/span>",  1,"detached files", 'default') + '<br/>' + _nx("Unattached <span class=\"count\">(%s)<\/span>", "Unattached <span class=\"count\">(%s)<\/span>", 1, "detached files", 'default') + '</p>';

        $('#wpbody-content .wrap').prepend('<div class="updated">'+text+'</div>')
});