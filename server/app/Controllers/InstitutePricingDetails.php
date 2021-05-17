<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Institute_Pricing_History_Model as Institute_Pricing_History_Model;
use App\Models\Institute_Pricing_Module_Model as Institute_Pricing_Module_Model;
class InstitutePricingDetails extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $institute_pricing_module_model = new Institute_Pricing_Module_Model();
            $pricing_module_data            = $institute_pricing_module_model->where('status',1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($pricing_history_data)
            {
                return $this->respond(json_encode($pricing_history_data,true),200);
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

    public function GetDataByInstitutePricingID()
    { 
        try
        {
            $institute_pricing_module_model = new Institute_Pricing_Module_Model();
            $jsnSSRForm                     = $this->request->getJSON();
            $pricing_id                     = $jsnSSRForm->institute_pricing_id;
            $institute_pricing_module_data  = $institute_pricing_module_model->where('institute_pricing_id', $pricing_id)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($institute_pricing_module_data)
            {
                return $this->respond(json_encode($institute_pricing_module_data,true),200);
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
     
    public function GetAllChildData()
    { 
        try
        {
            $pricing_module_model   = new Pricing_Module_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $pricing_id             = $jsnSSRForm->pricing_id;
            $pricing_module_data    = $pricing_module_model->where('pricing_id', $pricing_id)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($pricing_module_data)
            {
                return $this->respond(json_encode($pricing_module_data,true),200);
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

    public function GetAllDataByID()
    { 
        try
        {
            $pricing_module_model   = new Pricing_Module_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $pricing_id             = $jsnSSRForm->pricing_id;
            $pricing_module_data    = $pricing_module_model->where('pricing_id', $pricing_id)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($pricing_module_data)
            {
                return $this->respond(json_encode($pricing_module_data,true),200);
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
    
    public function CreatePricing()
    { 
        try
        {
            $pricing_history_model            = new Pricing_History_Model();    
            $pricing_module_model             = new Pricing_Module_Model();    
            $data['pricing_date']             = $this->request->getVar('formdate');            
            $data['minmum_student']           = $this->request->getVar('minmum_student');
            $data['maximum_student']          = $this->request->getVar('maximum_student');
            $module_pricing                   = json_decode($this->request->getVar('userchildmenudata'),TRUE); 

            $pricing_history_model->insert($data);                
            $last_id = $pricing_history_model->insertID(); 
            if($module_pricing)
            {
                foreach ($module_pricing as $inskey => $modulepricingvalue)
                {
                    $modulepricingdata['pricing_id']              = $last_id;
                    $modulepricingdata['main_module']             = $modulepricingvalue['main_module'];
                    $modulepricingdata['sub_module']              = $modulepricingvalue['sub_module'];
                    $modulepricingdata['minamount']               = $modulepricingvalue['minamount'];
                    $modulepricingdata['minamount']               = $modulepricingvalue['maxamount'];
                    $modulepricingdata['module_type']             = $modulepricingvalue['module_type'];
                    $modulepricingdata['default_module_count']    = $modulepricingvalue['default_module_count'];
                    $modulepricingdata['optional_module_count']   = $modulepricingvalue['optional_module_count'];
                    $pricing_module_model->insert($modulepricingdata);
                }
            }               
            return $this->respond(200);           
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }     
    
    
    public function EditPricing()
    { 
        try
        {
            $pricing_history_model            = new Pricing_History_Model();    
            $pricing_module_model             = new Pricing_Module_Model();    
            $data['selected_id']              = $this->request->getVar('selected_id');      
            $last_id                          = $this->request->getVar('selected_id');      
            $module_pricing                   = json_decode($this->request->getVar('userchildmenudata'),TRUE); 
 
            if($module_pricing)
            {
                foreach ($module_pricing as $inskey => $modulepricingvalue)
                {
                    $id                                           = $modulepricingvalue['id'];
                    $modulepricingdata['main_module']             = $modulepricingvalue['main_module'];
                    $modulepricingdata['sub_module']              = $modulepricingvalue['sub_module'];
                    $modulepricingdata['minamount']               = $modulepricingvalue['minamount'];
                    $modulepricingdata['maxamount']               = $modulepricingvalue['maxamount'];
                    $modulepricingdata['module_type']             = $modulepricingvalue['module_type'];
                    $modulepricingdata['default_module_count']    = $modulepricingvalue['default_module_count'];
                    $modulepricingdata['optional_module_count']   = $modulepricingvalue['optional_module_count'];
                    $pricing_module_model->where('pricing_id',$last_id)->where('id',$id)->set($modulepricingdata)->update();;
                }
            }               
            return $this->respond(200);           
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }              
}