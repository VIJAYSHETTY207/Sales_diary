<?php namespace RESTful\Config {

    // IMPORTS ----------------------------------------------------------------
    use CodeIgniter\Config\BaseConfig;

    /**
     * Class RESTful
     *
     * @package RESTful\Config
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    class RESTful extends BaseConfig
    {
        /**
         * Allow only requests sent with the X-REQUESTED-WITH
         * header?
         *
         * @var bool $ajaxOnly
         */
        public $ajaxOnly = false;

        /**
         * Enable CORS?
         *
         * @var bool $enableCors
         */
        public $enableCors = true;

        /**
         * An array of domains allowed to make requests when $enableCors
         * is set to TRUE
         *
         * @var array $corsDomains
         */
        public $corsDomains = [
            '*'
        ];

        /**
         * Allowed methods
         *
         * @var array $allowedMethods
         */
        public $allowedMethods = [
            'GET',
            'POST',
            'OPTIONS',
            'PUT',
            'DELETE',
        ];

        /**
         * Authentication options are:
         * 'none'  -> Disabled
         * 'basic' -> Basic
         * 'jwt'   -> JWT
         *
         * @var string|null $authType
         */
        public $authType = 'none';

        /**
         * A 'username' => 'password' array to be used with 'basic'
         * authentication
         *
         * @var array
         */
        public $users = [
            'admin' => '12345678',
            'user'  => 'password',
        ];

        /**
         * Database tables for the RESTful module
         *
         * @var array $tables
         */
        public $tables = [
            'sessions' => 'api_sessions',
            'users'    => 'api_users',
            'keys'     => 'api_keys',
            'logs'     => 'api_logs',
        ];

    }
}
