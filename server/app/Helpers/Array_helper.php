<?php

/**
 * This is a helper file that helps with arrays
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
if ( ! function_exists('trim_array') ) {
    /**
     * Recursively trim an array
     *
     * @param mixed $input The array to trim
     *
     * @return array|string
     */
    function trim_array($input)
    {
        return ! is_array($input) ? trim($input) : array_map('trim_array', $input);
    }
}
