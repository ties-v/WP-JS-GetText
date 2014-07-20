<?php
/**
 * Plugin name: WP JS GetText
 * Version: 0.1
 * Licence: GPLv3
 *
 * @author TV productions
 */

/**
 * Enables js gettext.
 *
 * @param string|array $domains The textdomains that should be available for the js.
 */
function wp_js_gettext_enable($domains = 'default') {
    // TODO: check if this domain is already loaded (with multiple calls from (for example) multiple plugins.).
    if (!is_array($domains)) {
        $domains = array($domains);
    }
    $jso_id = 'wp-js-i18n-' . implode('-', $domains);
    wp_enqueue_script($jso_id, add_query_arg('wp-js-gettext', implode(',', $domains), admin_url('index.php')), array(), $jso_id);
    wp_enqueue_script('wp-js-i18n', plugins_url('wp-js-gettext.js', __FILE__), array($jso_id, 'jquery'), '0.1');
    //wp_localize_script('wp-js-i18n', 'i18n', array('href' => add_query_arg('wp-js-gettext', implode(',', $domains), admin_url('index.php'))));
}

/**
 * Generates the translations for the js.
 */
function wp_js_gettext_generate_translations() {
    if (is_admin() && isset($_GET['wp-js-gettext'])) {
        header('Content-Type: application/json');
        $domains = explode(',', $_GET['wp-js-gettext']);

        $result = array();
        foreach ($domains as $domain) {
            $result[$domain] = array();
            $translations = get_translations_for_domain($domain);
            $result[$domain]['__plural_expression__'] = $translations->nplurals_and_expression_from_header($translations->get_header('Plural-Forms'));
            /** @var $entry Translation_Entry */
            foreach ($translations->entries as $index => $entry) {
                $result[$domain][$index] = array(
                    'context' => $entry->context,
                    'plural' => $entry->plural,
                    'translations' => $entry->translations
                );
            }
        }
        echo 'window.wp=window.wp||{};window.wp.i18n=window.wp.i18n||{};window.wp.i18n.localeMessages='.json_encode($result);
        die();
    }
}
add_action('init', 'wp_js_gettext_generate_translations');

// Test it
require_once 'test.php';