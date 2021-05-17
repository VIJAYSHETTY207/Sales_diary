<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserMenu_Model as UserMenu_Model;
class UserMenu extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $usermenu_model   = new UserMenu_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $client_id        = $jsnSSRForm->client_id;
            $usermenu_data    = $usermenu_model->where('status',1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($usermenu_data)
            {
                return $this->respond(json_encode($usermenu_data,true),200);
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
    
    public function GetAllParentData()
    { 
        try
        {
            $usermenu_model   = new UserMenu_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $client_id        = $jsnSSRForm->client_id;
            $usermenu_data    = $usermenu_model->where('id_parent_menu',0)->groupBy('main_module')->orderBy('id')->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($usermenu_data)
            {
                return $this->respond(json_encode($usermenu_data,true),200);
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
            $usermenu_model   = new UserMenu_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $id_parent_menu   = $jsnSSRForm->id_parent_menu;
            $usermenu_data    = $usermenu_model->where('status',1)->where('id_parent_menu !=',0)->findAll(); 
            log_message('info', 'Fetching IIQA Details');
            if($usermenu_data)
            {
                return $this->respond(json_encode($usermenu_data,true),200);
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
    
    public function GetAllDataByModuleType()
    { 
        try
        {
            $usermenu_model   = new UserMenu_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $module_type      = $jsnSSRForm->module_type;
            $usermenu_data    = $usermenu_model->where('module_type',$module_type)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($usermenu_data)
            {
                return $this->respond(json_encode($usermenu_data,true),200);
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
    
    public function EditMenu()
    { 
        try
        {
            $usermenu_model            = new UserMenu_Model();                 
            $module_pricing            = json_decode($this->request->getVar('userchildmenudata'),TRUE);

            if($module_pricing)
            {
                foreach ($module_pricing as $inskey => $modulepricingvalue)
                {
                    $id                            = $modulepricingvalue['id'];
                    $id_parent_menu                = $modulepricingvalue['id_parent_menu'];
                    $data['module_type']           = $modulepricingvalue['module_type'];
                    $data['default_module_count']  = $modulepricingvalue['default_module_count'];
                    $data['optional_module_count'] = $modulepricingvalue['optional_module_count'];
					$parentdata['default_module_count']  = $modulepricingvalue['default_module_count'];
                    $parentdata['optional_module_count'] = $modulepricingvalue['optional_module_count'];

                    $usermenu_model->set($data)->where('id',$id)->set($data)->update();    
                    $usermenu_model->set($parentdata)->where('id',$id_parent_menu)->set($parentdata)->update();    
                }
                return $this->respond($module_pricing,200);   
            }                        
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }     
    
    public function AddSubMenu()
    { 
        try
        {
            $usermenu_model                 = new UserMenu_Model();  		
			$jsnSSRForm       = $this->request->getJSON();

			$main_module                    = $jsnSSRForm->module_name;
            $data['main_module']            = $jsnSSRForm->module_name;     
            $data['sub_module']             = $jsnSSRForm->sub_module_name;    
            $data['module_type']            = $jsnSSRForm->newmodule_type;    
            $data['name']                   = $jsnSSRForm->module_name;      
            $data['id_parent_menu']         = $jsnSSRForm->module_id;      
            $data['default_module_count'] = $update['default_module_count']  = $jsnSSRForm->default_mod_count;     
            $data['optional_module_count'] = $update['optional_module_count']  = $jsnSSRForm->opt_module_count; 
			
			$main_module = $data['main_module'];
			$sub_module = $data['sub_module'];
			$where = "main_module='$main_module' AND sub_module='$sub_module'"; 
			$count = $usermenu_model->where($where)->countAllResults(); 
			if($count == 0) 
			{
				$usermenu_model->set($update)->where('main_module',$data['main_module'])->update(); 
				$usermenu_model->insert($data);            
				return $this->respond(200);     
			}
			else
			{
				return $this->respond(1);
			}
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }  
	public function AddMainMenu()
    { 
        try
        {
            $usermenu_model                 = new UserMenu_Model();  		
			$jsnSSRForm       = $this->request->getJSON();

            $data['main_module']            = $jsnSSRForm->module_name;     
            $data['sub_module']             = $jsnSSRForm->module_name;    
            $data['module_type']            = '';    
            $data['name']                   = $jsnSSRForm->module_name;      
            $data['id_parent_menu']         = 0;       
            $data['default_module_count']   = 0;  
			$count = $usermenu_model->where('main_module',$data['main_module'])->countAllResults();    

			if($count == 0)
			{  
				$usermenu_model->insert($data);             
				return $this->respond(200);            
			}	
			else
			{
				return $this->respond(1); 
			}
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    } 
}