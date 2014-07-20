<?php
/*
 * Test the wp js gettext
 * First, enable it and then enqueue your script with the gettext calls
 */
function test_wp_js_gettext() {
    wp_js_gettext_enable('default');
    wp_enqueue_script('wp-js-gettext-test', plugins_url('test.js', __FILE__), array('wp-js-i18n','jquery'), '0.1');
}
add_action('init','test_wp_js_gettext');