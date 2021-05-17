<?php namespace RESTful\Services\Auth\Handlers {

    use RESTful\Services\Auth\AuthInterface;

    /**
     * The main library class for 'basic' authentication
     *
     * @package RESTful\Services\Auth\Handlers
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    class BasicHandler implements AuthInterface
    {
        /**
         * Authenticate a user
         *
         * @param string $username
         * @param string $password
         *
         * @return void
         */
        public function authenticate(string $username = null, string $password = null): void
        {
            // TODO: Implement authenticate() method.
        }

        /**
         * Destroy a current session
         *
         * @return void
         */
        public function destroy(): void
        {
            // TODO: Implement destroy() method.
        }

        /**
         * Is a user successfully authenticated?
         *
         * @return bool
         * @var string $username
         *
         */
        public function isAuthenticated(string $username = null): bool
        {
            return false;
        }

        /**
         * Check if a user exists
         *
         * @param string $username
         *
         * @return bool
         */
        public function alreadyExists(string $username): bool
        {
            // TODO: Implement alreadyExists() method.
        }

        /**
         * Verify a username/password
         *
         * @param string $username
         * @param string $password
         *
         * @return bool
         */
        public function verifyCredentials(string $username, string $password): bool
        {
            // TODO: Implement verifyCredentials() method.
        }
    }
}
