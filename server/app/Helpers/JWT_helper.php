<?php

/**
 * This is a helper file the JWT library
 *
 * @link     https://codeigniter4.github.io/CodeIgniter4/general/helpers.html
 * @link     https://opensource.org/licenses/MIT
 * @license  MIT License
 *
 * @package  RESTful\Helpers
 * @author   Jason Napolitano <jnapolitanoit@gmail.com>
 * @updated  12.27.2019
 *
 */

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('jwt') ) {

    /**
     * A utility function used to access the jwt service
     * instance
     *
     * USAGE:
     *  - jwt()::encode($data, $key);
     *  - jwt()::decode($jwt, $key);
     *
     * @param bool $getShared
     *
     * @return mixed
     */
    function jwt(bool $getShared = true)
    {
        return \Config\Services::jwt($getShared);
    }
}
