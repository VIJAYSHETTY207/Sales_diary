<?php namespace RESTful\Libraries\JWT {

    use Config\JWT as UserConfig;
    use RESTful\Config\JWT as DefaultConfig;
    use UnexpectedValueException;
    use DomainException;

    /**
     * Library for a JSON Web Token implementation based on the JWT Spec
     *
     * @link     https://tools.ietf.org/html/rfc7519
     * @link     https://github.com/luciferous/jwt
     *
     * @author   Luciferous
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     *
     * @license  MIT
     *
     * Read about the JWT Specification Here
     * @category RESTful\Libraries\JWT
     */
    class JWT
    {
        /**
         * @var DefaultConfig|UserConfig
         */
        private static $config;

        /**
         * JWT constructor.
         */
        public function __construct()
        {
            // Select which config file to use
            class_exists(UserConfig::class)
                ? $configClass = UserConfig::class
                : $configClass = DefaultConfig::class; // Default Module Config

            // Load the correct shared config class
            self::$config = config($configClass, true);
        }

        // --------------------------------------------------------------------

        /**
         * Returns the JWT's payload as a php object
         *
         * @param string      $jwt    The JWT
         * @param string|null $key    The secret key
         * @param bool        $verify Don't skip verification process
         *
         * @return object
         */
        public static function decode($jwt, $key = null, $verify = false)
        {
            $tks = explode('.', $jwt);
            if ( count($tks) !== 3 ) {
                throw new UnexpectedValueException(lang('JWT.wrongNumberOfSegments'));
            }
            [$headb64, $payloadb64, $cryptob64] = $tks;
            if ( null === ($header = self::jsonDecode(self::urlSafeB64Decode($headb64)))
            ) {
                throw new UnexpectedValueException(lang('JWT.invalidSegmentEncoding'));
            }
            if ( null === $payload = self::jsonDecode(self::urlSafeB64Decode($payloadb64))
            ) {
                throw new UnexpectedValueException(lang('JWT.invalidSegmentEncoding'));
            }
            $sig = self::urlSafeB64Decode($cryptob64);
            if ( $verify ) {
                if ( empty($header->alg) ) {
                    throw new DomainException(lang('JWT.emptyAlgorithm'));
                }
                if ( $sig !== self::sign("$headb64.$payloadb64", $key, $header->alg) ) {
                    throw new UnexpectedValueException(lang('JWT.signatureVerificationFailed'));
                }
            }

            return $payload;
        }

        // --------------------------------------------------------------------

        /**
         * Returns a JWT
         *
         * @param object|array $payload   PHP object or array
         * @param string       $key       The secret key
         * @param string       $algorithm The signing algorithm
         *
         * @return string
         */
        public static function encode($payload, $key, $algorithm = null): string
        {
            $algo = $algorithm ?? self::$config->algorithm ?? 'HS256';
            $header = ['typ' => 'JWT', 'alg' => $algo];
            $segments = [];
            $segments[] = self::urlSafeB64Encode(self::jsonEncode($header));
            $segments[] = self::urlSafeB64Encode(self::jsonEncode($payload));
            $signing_input = implode('.', $segments);
            $signature = self::sign($signing_input, $key, $algo);
            $segments[] = self::urlSafeB64Encode($signature);

            return implode('.', $segments);
        }

        // --------------------------------------------------------------------

        /**
         * Returns an encrypted message
         *
         * @param string $msg    The message to sign
         * @param string $key    The secret key
         * @param string $method The signing algorithm
         *
         * @return string
         */
        public static function sign($msg, $key, $method = null): string
        {
            $methods = [
                'HS256' => 'sha256',
                'HS384' => 'sha384',
                'HS512' => 'sha512',
            ];

            $algo = $method ?? self::$config->algorithm ?? 'HS256';
            if ( empty($methods[$algo]) ) {
                throw new DomainException(lang('JWT.algorithmNotSupported'));
            }

            return hash_hmac($methods[$algo], $msg, $key, true);
        }

        // --------------------------------------------------------------------

        /**
         * Returns an object representation of JSON string
         *
         * @param string $input JSON string
         *
         * @return object
         */
        public static function jsonDecode($input)
        {
            $obj = json_decode($input, true, 512, JSON_THROW_ON_ERROR);
            if ( function_exists('json_last_error') && $errno = json_last_error() ) {
                self::handleJsonError($errno);
            } else if ( $obj === null && $input !== 'null' ) {
                throw new DomainException(lang('JWT.nullResultWithNonNullInput'));
            }

            return $obj;
        }

        // --------------------------------------------------------------------

        /**
         * Returns a JSON representation of a PHP object or array
         *
         * @param object|array $input A PHP object or array
         *
         * @return string
         */
        public static function jsonEncode($input): string
        {
            $json = json_encode($input, JSON_THROW_ON_ERROR, 512);
            if ( function_exists('json_last_error') && $errno = json_last_error() ) {
                self::handleJsonError($errno);
            } else if ( $json === 'null' && $input !== null ) {
                throw new DomainException(lang('JWT.nullResultWithNonNullInput'));
            }

            return $json;
        }

        // --------------------------------------------------------------------

        /**
         * Returns a decoded string
         *
         * @param string $input A base64 encoded string
         *
         * @return string
         */
        public static function urlSafeB64Decode($input): string
        {
            $remainder = strlen($input) % 4;
            if ( $remainder ) {
                $padlen = 4 - $remainder;
                $input .= str_repeat('=', $padlen);
            }

            return base64_decode(strtr($input, '-_', '+/'));
        }

        // --------------------------------------------------------------------

        /**
         * Returns a Base 64 encoded string
         *
         * @param string $input Anything really
         *
         * @return string
         */
        public static function urlSafeB64Encode($input): string
        {
            return str_replace('=', '', strtr(base64_encode($input), '+/', '-_'));
        }

        // --------------------------------------------------------------------

        /**
         * Handle JSON errors
         *
         * @param int $errno An error number from json_last_error()
         *
         * @return void
         */
        private static function handleJsonError($errno): void
        {
            $messages = [
                JSON_ERROR_DEPTH     => lang('JWT.maximumStackDepthExceeded'),
                JSON_ERROR_CTRL_CHAR => lang('JWT.unexpectedControlCharacterFound'),
                JSON_ERROR_SYNTAX    => lang('JWT.syntaxErrorMalformedJson'),
            ];
            throw new DomainException($messages[$errno] ?? lang('JWT.unknownJsonError') . $errno
            );
        }
    }
}
