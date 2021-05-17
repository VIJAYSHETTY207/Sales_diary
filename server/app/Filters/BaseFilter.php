<?php namespace App\Filters {

    use Config\RESTful as UserConfig;
    use RESTful\Config\RESTful as DefaultConfig;

    /**
     * Class BaseFilter
     *
     * A base filter class to extend that gives access to a config
     * object to all child-filter classes that extend this class.
     *
     * @package RESTful\Filters
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    class BaseFilter
    {
        /**
         * Configuration object
         *
         * @var UserConfig|DefaultConfig $config
         */
        protected $config;

        //--------------------------------------------------------------------

        /**
         * The BaseFilter constructor loads a shared instance of the RESTful
         * modules configuration class.
         */
        public function __construct()
        {
            // Select which config file to use
            class_exists(UserConfig::class)
                ? $configClass = UserConfig::class     // Users Config
                : $configClass = DefaultConfig::class; // Default config

            // Load the correct shared config class
            $this->config = config($configClass, true);
        }
    }
}
