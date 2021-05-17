<?php

/**
 * This is the primary helper file for the RESTful module
 *
 * @link     https://codeigniter4.github.io/CodeIgniter4/general/helpers.html
 * @link     https://opensource.org/licenses/MIT
 * @license  MIT License
 *
 * @package  RESTful\Helpers
 * @author   Jason Napolitano <jnapolitanoit@gmail.com>
 * @updated  Jan 16th, 2020
 *
 */

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('ci_version') ) {
    /**
     * Equivalent to the CI_VERSION constant in CodeIgniter 3. Used to return the
     * current framework version.
     *
     * @return string
     */
    function ci_version(): string
    {
        return (new \CodeIgniter\CodeIgniter(null))::CI_VERSION;
    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('is_ie') ) {
    /**
     * Check if on Internet Explorer/IE Edge
     *
     * @return bool
     */
    function is_ie(): bool
    {
        return preg_match(
                   '~MSIE|Internet Explorer~i',
                   $_SERVER['HTTP_USER_AGENT']) || (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false
               );
    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('is_iis') ) {
    /**
     * Check if on a Windows IIS Server
     *
     * @return bool
     */
    function is_iis(): bool
    {
        $software = strtolower($_SERVER['SERVER_SOFTWARE']);
        return strpos($software, 'microsoft-iis') !== false;
    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('is_countable') ) {

    /**
     * A polyfill for PHP 7.3's is_countable() function
     *
     * @link   http://php.net/manual/en/function.is-countable.php
     *
     * @param mixed $var The item to check if countable
     *
     * @return bool
     */
    function is_countable($var): bool
    {
        return (is_array($var) || $var instanceof Countable);
    }
}
