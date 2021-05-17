<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Sra_Model as Sra_Model;
use App\Models\Title_Model as Title_Model;
use App\Models\Designation_Model as Designation_Model;
use App\Models\State_Model as State_Model;
use App\Models\Universitylanguage_Model as Universitylanguage_Model;
class CommonFetch extends ResourceController 
{     

    public function getSRAData()
    { 
        try
        {
            $sra_Model  = new Sra_Model();
            $jsnSRA  = $this->request->getJSON();
            $sraData    = $sra_Model->where('status',1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($sraData)
            {
                return $this->respond(json_encode($sraData,true),200);
            }
            else
            {
                $errors    =    "Data Not Found";
                return $this->respond($errors,500); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }   
    
    public function getStateData()
    { 
        try
        {
            $state_model  = new State_Model();
            $jsnState    = $this->request->getJSON();
            $stateData    = $state_model->where('status',1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($stateData)
            {
                return $this->respond(json_encode($stateData,true),200);
            }
            else
            {
                $errors    =    "Data Not Found";
                return $this->respond($errors,500); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    } 
    
    public function getTitleData()
    { 
        try
        {
            $title_Model  = new Title_Model();
            $jsnTitle  = $this->request->getJSON();
            $titleData    = $title_Model->where('status',1)->findAll();
            log_message('info', 'Fetching Title Details');
            if($titleData)
            {
                return $this->respond(json_encode($titleData,true),200);
            }
            else
            {
                $errors    =    "Data Not Found";
                return $this->respond($errors,500); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }   
    
    public function getUniversityLanguageData()
    { 
        try
        {
            $universitylanguage_model   = new Universitylanguage_Model();
            $jsnUniversitylanguagedata  = $this->request->getJSON();
            $universitylanguagedata     = $universitylanguage_model->where('status',1)->findAll();
            log_message('info', 'Fetching Uni-Language Details');
            if($universitylanguagedata)
            {
                return $this->respond(json_encode($universitylanguagedata,true),200);
            }
            else
            {
                $errors    =    "Data Not Found";
                return $this->respond($errors,500); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    } 
    
    public function getDesignationData()
    { 
        try
        {
            $designation_Model  = new Designation_Model();
            $jsnTitle  = $this->request->getJSON();
            $designationData    = $designation_Model->where('status',1)->findAll();
            log_message('info', 'Fetching Title Details');
            if($designationData)
            {
                return $this->respond(json_encode($designationData,true),200);
            }
            else
            {
                $errors    =    "Data Not Found";
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