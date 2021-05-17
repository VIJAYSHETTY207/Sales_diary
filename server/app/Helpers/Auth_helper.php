<?php

/**
 * This is a helper file for the Authentication service
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
use Config\RESTful as UserConfig;
use RESTful\Config\RESTful as DefaultConfig;

if ( ! function_exists('auth') ) {

    /**
     * Initiate the auth service
     *
     * @see \RESTful\Config\Services::auth()
     *
     * @param string $type      'none'|'basic'|'jwt'|null
     * @param bool   $getShared Retrieve a shared instance?
     *
     * @return mixed
     *
     */
    function auth(string $type = null, bool $getShared = false)
    {
        // Select which config file to use
        class_exists(UserConfig::class)
            ? $configClass = UserConfig::class
            : $configClass = DefaultConfig::class; // Default Module Config

        $config = config($configClass, false);
        return service('auth', $type ?? $config->authType, $getShared);
    }
}
