<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Pricing_History_Model as Pricing_History_Model;
use App\Models\Pricing_Module_Model as Pricing_Module_Model;
class PricingHistory extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $pricing_history_model  = new Pricing_History_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $client_id              = $jsnSSRForm->client_id;
            $pricing_history_data   = $pricing_history_model->where('status',1)->orderBy('id','desc')->findAll();
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
    
    public function getPriceHistoryID()
    { 
        try
        {
            $curr_date = date('Y-m-d ');
            $pricing_history_model  = new Pricing_History_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $pricing_history_data   = $pricing_history_model->where('pricing_date <=',$curr_date)->orderBy('id','DESC')->limit(1)->findAll();
            
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
     
    
    public function CreatePricing()
    { 
        try
        {
            $pricing_history_model            = new Pricing_History_Model();    
            $pricing_module_model             = new Pricing_Module_Model();    
            $data['pricing_date']             = $this->request->getVar('formdate');            
            $data['minmum_student']           = $this->request->getVar('minmum_student');
            $data['maximum_student']          = $this->request->getVar('maximum_student');
            $data['min_signup_value']         = $this->request->getVar('min_signup_value');
            $module_pricing                   = json_decode($this->request->getVar('userchildmenudata'),TRUE); 

            $pricing_history_model->insert($data);                
            $last_id = $pricing_history_model->insertID(); 
            if($module_pricing)
            {
                foreach ($module_pricing as $inskey => $modulepricingvalue)
                {
                    $modulepricingdata['pricing_id']              = $last_id;
                    $modulepricingdata['module_id']               = $modulepricingvalue['id'];
                    $modulepricingdata['main_module']             = $modulepricingvalue['main_module'];
                    $modulepricingdata['sub_module']              = $modulepricingvalue['sub_module'];
                    $modulepricingdata['minamount']               = $modulepricingvalue['minamount'];
                    $modulepricingdata['maxamount']               = $modulepricingvalue['maxamount'];
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
            $module_pricing                   = json_decode($this->request->getVar('userchildmenudata'),TRUE);  
            if($module_pricing)
            {
                foreach ($module_pricing as $inskey => $modulepricingvalue)
                {
                    $pricing_id             = $modulepricingvalue['pricing_id'];
                    $id                     = $modulepricingvalue['id'];
                    $data['minamount']      = $modulepricingvalue['minamount'];
                    $data['maxamount']      = $modulepricingvalue['maxamount'];
                    $pricing_module_model->set($data)->where('pricing_id',$pricing_id)->where('id',$id)->update();
                }
                return $this->respond(200);  
            }                        
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }        
}