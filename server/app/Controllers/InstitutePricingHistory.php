<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Institute_Pricing_History_Model as Institute_Pricing_History_Model;
use App\Models\Institute_Pricing_Module_Model as Institute_Pricing_Module_Model;
class InstitutePricingHistory extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $institute_pricing_history_model = new Institute_Pricing_History_Model();
            $jsnSSRForm                      = $this->request->getJSON();
            $pricing_history_data            = $institute_pricing_history_model->where('status',1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($pricing_history_data){
                return $this->respond(json_encode($pricing_history_data,true),200);
            }else{
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
    
    public function GetDataByInstituteID()
    { 
        try
        {
            $institute_pricing_history_model = new Institute_Pricing_History_Model();
            $jsnSSRForm                      = $this->request->getJSON();
            $institute_id                    = $jsnSSRForm->institute_id;
            $pricing_history_data            = $institute_pricing_history_model->where('institute_id',$institute_id)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($pricing_history_data) {
                return $this->respond(json_encode($pricing_history_data,true),200);
            }else{
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
    
    public function GetDataByInstituteIDLatest()
    { 
        try
        {
            $institute_pricing_history_model = new Institute_Pricing_History_Model();
            $jsnSSRForm                      = $this->request->getJSON();
            $institute_id                    = $jsnSSRForm->institute_id;
            $pricing_history_data            = $institute_pricing_history_model->where('institute_id',$institute_id)->orderBy('id','DESC')->limit(1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($pricing_history_data) {
                return $this->respond(json_encode($pricing_history_data,true),200);
            }else{
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
    
    public function getDataID()
    { 
        try
        {
            $curr_date = date('Y-m-d ');
            $institute_pricing_history_model  = new Institute_Pricing_History_Model();
            $jsnSSRForm                       = $this->request->getJSON();
            $id                               = $jsnSSRForm->id;
            $pricing_history_data             = $institute_pricing_history_model->where('id',$id)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($pricing_history_data){
                return $this->respond(json_encode($pricing_history_data,true),200);
            }else{
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
            $institute_pricing_history_model  = new Institute_Pricing_History_Model();    
            $institute_pricing_module_model   = new Institute_Pricing_Module_Model();  
            $data['pricing_date']             = $this->request->getVar('pricing_date');            
            $data['pricing_id']               = $this->request->getVar('pricing_id');
            $data['institute_id']             = $this->request->getVar('institute_id');
            $data['institute_name']           = $this->request->getVar('institute_name');
            $data['date']                     = $this->request->getVar('date');
            $data['open_till']                = $this->request->getVar('open_till');
            $data['discount']                 = $this->request->getVar('discount');
            $data['discount_type']            = $this->request->getVar('discount_type');
            $data['student_count']            = $this->request->getVar('client_no_student');
            $data['default_module_count']     = $this->request->getVar('default_module_count');
            $data['optional_module_count']    = $this->request->getVar('optional_module_count');
            $data['institute_pricing']        = $this->request->getVar('institute_pricing');
            $data['discount_amount']          = $this->request->getVar('discount_amount');
            $data['payable_amount']           = $this->request->getVar('payable_amount');
            $module_pricing                   = json_decode($this->request->getVar('moduledata'),TRUE); 

            $institute_pricing_history_model->insert($data);                
            $last_id = $institute_pricing_history_model->insertID(); 
            if($last_id){
                $datanew['proposal_id']              = 'PRO-'. str_pad($last_id, 5, 0, STR_PAD_LEFT); 
                $institute_pricing_history_model->update($last_id,$datanew);   
            }
            if($module_pricing)
            {
                foreach ($module_pricing as $inskey => $modulepricingvalue)
                {
                    $modulepricingdata['institute_pricing_id']    = $last_id;
                    $modulepricingdata['institute_id']            = $this->request->getVar('institute_id');
                    $modulepricingdata['egenius_pricing_id']      = $this->request->getVar('pricing_id');
                    $modulepricingdata['module_id']               = $modulepricingvalue['module_id'];
                    $modulepricingdata['module_type']             = $modulepricingvalue['module_type'];
                    $modulepricingdata['main_module']             = $modulepricingvalue['main_module'];
                    $modulepricingdata['sub_module']              = $modulepricingvalue['sub_module'];
                    $modulepricingdata['studentcount']            = $modulepricingvalue['studentcount'];
                    $modulepricingdata['moduleprice']             = $modulepricingvalue['moduleprice'];
                    $modulepricingdata['default_menu']            = $modulepricingvalue['DefaultMenu'];
                    $modulepricingdata['optional_menu']           = $modulepricingvalue['OptionalMenu'];
                    $institute_pricing_module_model->insert($modulepricingdata);
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
            $institute_pricing_history_model = new Institute_Pricing_History_Model();    
            $institute_pricing_module_model  = new Institute_Pricing_Module_Model();             
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