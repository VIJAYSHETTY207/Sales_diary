<?php

/**
 * This is a helper file that helps with strings
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
if ( ! function_exists('strstr_after') ) {
    /**
     * A customized PHP strstr() function that checks after the $haystack
     *
     * @link   http://php.net/manual/en/function.strstr.php
     *
     * @param mixed $haystack         The haystack to search in
     * @param mixed $needle           The needle in the $haystack
     * @param bool  $case_insensitive Explicit case sensitivity?
     *
     * @return bool|string
     */
    function strstr_after($haystack, $needle, bool $case_insensitive = false)
    {
        $strpos = $case_insensitive ? 'stripos' : 'strpos';
        $pos = $strpos($haystack, $needle);

        return is_int($pos) ? substr($haystack, $pos + strlen($needle)) : $pos;
    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('contains_substr') ) {
    /**
     * Check if a string contains a substr()
     *
     * @link   https://secure.php.net/manual/en/function.substr-compare.php
     *
     * @param string $mainStr The string to search in
     * @param string $subStr  The string to search for
     * @param bool   $loc
     *
     * @return bool
     */
    function contains_substr(string $mainStr, string $subStr, bool $loc = false): bool
    {
        if ( $loc === false ) {
            return (strpos($mainStr, $subStr) !== false);
        }
        if ( strlen($mainStr) < strlen($subStr) ) {
            return false;
        }
        if ( ($loc + strlen($subStr)) > strlen($mainStr) ) {
            return false;
        }

        return (strcmp(substr($mainStr, $loc, strlen($subStr)), $subStr) === 0);
    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('str_random') ) {
    /**
     * Generates a pseudo-random v4 UUID string
     *
     * @return string
     *
     * @throws Exception
     */
    function str_random(): string
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',

            // 32 bits for "time_low"
                       random_int(0, 0xffff),
                       random_int(0, 0xffff),

            // 16 bits for "time_mid"
                       random_int(0, 0xffff),

            // 16 bits for "time_hi_and_version", four most significant bits
            // holds version number 4
                       random_int(0, 0x0fff) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res", 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
                       random_int(0, 0x3fff) | 0x8000,

            // 48 bits for "node"
                       random_int(0, 0xffff),
                       random_int(0, 0xffff),
                       random_int(0, 0xffff)
        );
    }
}
