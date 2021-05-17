<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Status_Model as Status_Model;
class Status extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $status_model     = new Status_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $client_id        = $jsnSSRForm->client_id;
            $status_data      = $status_model->where('status',1)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($status_data)
            {
                return $this->respond(json_encode($status_data,true),200);
            }
            else
            {
                $errors  =  "Data Not Found";
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