<?php namespace RESTful\Services\Auth {

    /**
     * A basic blueprint for the RESTful libraries auth
     * system classes
     *
     * @package RESTful\Services\Auth
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    interface AuthInterface
    {
        /**
         * Authenticate a user
         *
         * @param string $username
         * @param string $password
         *
         * @return void
         */
        public function authenticate(string $username = null, string $password = null): void;

        /**
         * Destroy a current session
         *
         * @return void
         */
        public function destroy(): void;

        /**
         * Was a user successfully authenticated?
         *
         * @return bool
         * @var string $username
         *
         */
        public function isAuthenticated(string $username): bool;

        /**
         * Check if a user exists
         *
         * @param string $username
         *
         * @return bool
         */
        public function alreadyExists(string $username): bool;

        /**
         * Verify a username/password
         *
         * @param string $username
         * @param string $password
         *
         * @return bool
         */
        public function verifyCredentials(string $username, string $password): bool;
    }
}
