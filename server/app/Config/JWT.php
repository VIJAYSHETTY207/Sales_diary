<?php namespace RESTful\Config {

    use CodeIgniter\Config\BaseConfig;

    /**
     * JWT Library configuration class. These config values are
     * used library-wide.
     *
     * @package RESTful\Config
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    class JWT extends BaseConfig
    {
        /**
         * Library-wide secret key. This is used for encoding
         * all JWT's (unless explicitly different) and will be
         * required to decode the JWT as well
         *
         * @var string $secretKey
         */
        public string $secretKey = 'super-secret-key';

        /**
         * Library-wide hashing algorithm. This is the default
         * hashing algorithm. There is no real need to change this
         * value unless absolutely required.
         *
         * OPTIONS:
         *  - HS256 => sha256
         *  - HS384 => sha384
         *  - HS512 => sha512
         *
         * @var string $algorithm
         */
        public string $algorithm = 'HS256';
    }
}
