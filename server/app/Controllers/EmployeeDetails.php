<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Employee_Model as Employee_Model;
class EmployeeDetails extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $employee_model             = new Employee_Model();
            $jsnSSRForm                 = $this->request->getJSON();
            $employee_data              = $employee_model->where('status','1')->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($employee_data)
            {
                return $this->respond(json_encode($employee_data,true),200);
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
    
    public function GetConatactDataById()
    { 
        try
        {
            $contact_person_model       = new Contact_Person_Model();
            $jsnSSRForm                 = $this->request->getJSON();
            $type_id                    = $jsnSSRForm->id;
            $type                       = $jsnSSRForm->type;
            $contact_person_data        = $contact_person_model->where('type_id',$type_id)->where('type',$type)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($contact_person_data)
            {
                return $this->respond(json_encode($contact_person_data,true),200);
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
    public function GetConatactDataOnlyById()
    { 
        try
        {
            $contact_person_model       = new Contact_Person_Model();
            $jsnSSRForm                 = $this->request->getJSON();
            $type_id                    = $jsnSSRForm->id;
            $contact_person_data        = $contact_person_model->where('type_id',$type_id)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($contact_person_data)
            {
                return $this->respond(json_encode($contact_person_data,true),200);
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