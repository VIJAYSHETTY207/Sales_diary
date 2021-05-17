<?php namespace App\Filters {

    // IMPORTS ----------------------------------------------------------------
    use CodeIgniter\Filters\FilterInterface;
    use CodeIgniter\HTTP\ResponseInterface;
    use CodeIgniter\HTTP\RequestInterface;
    use Config\Services;

    /**
     * Class CorsFilter
     *
     * A Filter class to handle CORS requests
     *
     * @package RESTful\Filters
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    class CorsFilter extends BaseFilter implements FilterInterface
    {
        /**
         * Before
         *
         * @param RequestInterface $request
         *
         * @return mixed|void
         */
        public function before(RequestInterface $request)
        {
            // Domains within the config
            $domains = $this->config->corsDomains;
            // Shared response service
            $response = Services::response();

            // Configuring the 'Access-Control-Allow-Origin' header
            if ( ! $this->config->enableCors ) {

                // Set the Access-Control-Allow-Origin header to all (*)
                $response->setHeader('Access-Control-Allow-Origin', '*');

                // Allow all hosts in Access-Control-Allow-Origin
                $allow_all = true;

                // ELSE, do NOT allow all domains in Access-Control-Allow-Origin
            } else {
                $allow_all = false;
            }

            // Handle the allowance of hosts when CORS is enabled
            if ( ! $allow_all ) {

                // Set the Access-Control-Allow-Origin header for each domain in our config
                foreach ( $domains as $domain ) {
                    $response->setHeader('Access-Control-Allow-Origin', $domain);
                }

                // Get the 'Access-Control-Allow-Origin' value as an explicit string
                $domains = (string)$response->getHeader('Access-Control-Allow-Origin')->getValue();

                // Get the $_SERVER['HTTP_HOST']
                $http_host = 'http://' . $request->getServer('HTTP_HOST');

                // If the $_SERVER['HTTP_HOST'] is found within the config, return true and false otherwise
                $is_allowed = strpos($domains, $http_host) !== false;

                // If we are not allowed
                /*
                if ( ! $is_allowed ) {
                    // Send the response and exit
                    $response
                        ->setJSON([
                                      'message' => 'Requests from this host are not allowed',
                                      'status'  => 401,
                                  ])
                        ->setStatusCode(401)
                        ->send();
                    exit();
                }
                */
            }

        }

        //--------------------------------------------------------------------

        /**
         * After
         *
         * @param RequestInterface  $request
         * @param ResponseInterface $response
         *
         * @return mixed|void
         */
        public function after(RequestInterface $request, ResponseInterface $response)
        {
            // Do something here
        }
    }
}
