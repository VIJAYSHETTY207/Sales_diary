<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Calender_Model as Calender_Model;
class Calender extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;
    public function get_calender_data()
    {
        try{
            $calender_model                 = new Calender_Model();
            $jsnDashboard                   = $this->request->getJSON();
            $calender_data                  = $calender_model->getDashboardData();
            log_message('info', 'Fetching Dashboard details');
            if($calender_data)
            {
                return $this->respond(json_encode($calender_data,true),200);
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