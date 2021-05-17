<?php namespace App\Filters {

    // IMPORTS ----------------------------------------------------------------
    use CodeIgniter\Filters\FilterInterface;
    use CodeIgniter\HTTP\ResponseInterface;
    use CodeIgniter\HTTP\RequestInterface;

    /**
     * Class AuthFilter
     *
     * A Filter class to handle API authentication
     *
     * @package RESTful\Filters
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    class AuthFilter extends BaseFilter implements FilterInterface
    {
        /**
         * Before
         *
         * @param  RequestInterface $request
         *
         * @return mixed|void
         */
        public function before(RequestInterface $request)
        {
            // Do something here
        }

        //--------------------------------------------------------------------

        /**
         * After
         *
         * @param RequestInterface $request
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
