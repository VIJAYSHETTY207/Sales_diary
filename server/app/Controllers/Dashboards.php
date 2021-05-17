<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Dashboard_Model as Dashboard_Model;
class Dashboards extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;
    public function get_dashboard_data()
    {
        try{
            $dashboardModel                 = new Dashboard_Model();
            $jsnDashboard                   = $this->request->getJSON();
            $dashboardData                  = $dashboardModel->getDashboardData();
            log_message('info', 'Fetching Dashboard details');
            if($dashboardData)
            {
                return $this->respond(json_encode($dashboardData,true),200);
            }
            else
            {
                $errors         =    "Data Not Found";
                return $this->respond($errors,500); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }       
}