<?php namespace App\Filters {

    // IMPORTS ----------------------------------------------------------------
    use CodeIgniter\Filters\FilterInterface;
    use CodeIgniter\HTTP\ResponseInterface;
    use CodeIgniter\HTTP\RequestInterface;

    /**
     * Class AjaxFilter
     *
     * A Filter class to handle AJAX requests
     *
     * @package RESTful\Filters
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    class AjaxFilter extends BaseFilter implements FilterInterface
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
            // If we only allow AJAX requests
            if ( $this->config->ajaxOnly === true ) {
                // Shared response service
                $response = \Config\Services::response();
                // Is the request valid AJAX?
                if ( ! $request->isAJAX() ) {
                    // If not, generate the response
                    $response
                        ->setStatusCode(400)
                        ->setJSON([
                                      'message' => 'Only valid AJAX requests are allowed',
                                      'status'  => 400,
                                  ])
                        ->send();
                    exit();
                }
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

        //--------------------------------------------------------------------
    }
}
