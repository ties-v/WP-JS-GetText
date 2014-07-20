WP-JS-GetText
=============

A tryout for javascript gettext functions for WordPress. Feel free to improve!

Discussion: [WordPress Ticket #20491](https://core.trac.wordpress.org/ticket/20491)
-----------------------------------------------------------------------------------

###How it works:
* It uses the Po/Mo files that are parsed in PHP to generate a structure that the javascript functions will use.
* When enqueueing a script that needs some of the js gettext functions, you have to call `wp_js_gettext_enable` with the textdomains you want. 

###Objectives:
* All translations (for PHP and JS) in one Po/Mo file for each textdomain.
* As much as possible consistency between PHP and JS.

###Possible drawbacks:
* All the translated strings are always loaded: for the current core translations (textdomain 'default') is that about a 600KB script.
* There has to be a JS function like sprintf to parse `%s`, `%d`, `%1$s`, etc. Possible starting point: [sprintf for js](https://github.com/kvz/phpjs/blob/master/functions/strings/sprintf.js)
* It uses the standard plural expression from gettext (for example `n!=1`), but this code is executed in js and maybe a security issue. the plural expression is currently filtered by a regular expression that removes all charters that shouldn't be in a plural expression, but it still is a bit tricky. 

This are my thoughts about it: I appreciate it when you share yours. If you have any solutions for the drawbacks or just have some fancy idea: share it and/or create a pull request!
