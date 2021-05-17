<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Institution_Model as Institution_Model;
use App\Models\Contact_Person_Model as Contact_Person_Model;
class InstituteDetails extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData() 
    { 
        try
        {
            $institution_model  = new Institution_Model();
            $institution_data         = $institution_model->where('status',1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($institution_data)
            {
                return $this->respond(json_encode($institution_data,true),200);
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
    
    public function GetInstituteDataById()
    { 
        try
        {
            $institution_model  = new Institution_Model();
            $jsnSSRForm         = $this->request->getJSON();
            $id                 = $jsnSSRForm->id;
            $institution_data   = $institution_model->where('id',$id)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($institution_data)
            {
                return $this->respond(json_encode($institution_data,true),200);
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
    
    public function GetDataByStatus()
    { 
        try
        {
            $institution_model  = new Institution_Model();
            $jsnSSRForm         = $this->request->getJSON();
            $institute_status    = $jsnSSRForm->institute_status;
            $institution_data   = $institution_model->where('institute_status',$institute_status)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($institution_data)
            {
                return $this->respond(json_encode($institution_data,true),200);
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
    
    public function GetInstituteDataByTrustId()
    { 
        try
        {
            $institution_model  = new Institution_Model();
            $jsnSSRForm         = $this->request->getJSON();
            $client_trust_id    = $jsnSSRForm->lead_id;
            $institution_data   = $institution_model->where('client_trust_id',$client_trust_id)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($institution_data)
            {
                return $this->respond(json_encode($institution_data,true),200);
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

    public function InsertUpdateData()
    {
        try
        {
            $institution_model                                       = new Institution_Model();
            //$contact_person_model                                    = new Contact_Person_Model();
            $validation                                              = \Config\Services::validation();
            $jsnSSRForm                                              = $this->request->getJSON();
            $id                                                      = $this->request->getVar('id');                 
            $ins_data['client_trust_id']                             = $this->request->getVar('client_trust_id');   
            $ins_data['trust_name']                                  = $this->request->getVar('trust_name');   
            $ins_data['institute_same_trust']                        = $this->request->getVar('institute_same_trust');   
            $ins_data['institute_name']                              = $this->request->getVar('institute_name');   
            $ins_data['institute_type']                              = $this->request->getVar('institute_type');   
            $ins_data['institute_pincode']                           = $this->request->getVar('institute_pincode');   
            $ins_data['institute_address_line_1']                    = $this->request->getVar('institute_address_line_1');   
            $ins_data['institute_address_line_2']                    = $this->request->getVar('institute_address_line_2');   
            $ins_data['institute_post_office']                       = $this->request->getVar('institute_post_office');   
            $ins_data['institute_taluk']                             = $this->request->getVar('institute_taluk');   
            $ins_data['institute_district']                          = $this->request->getVar('institute_district');   
            $ins_data['institute_state']                             = $this->request->getVar('institute_state');   
            $ins_data['institute_contact_number_one']                = $this->request->getVar('institute_contact_number_one');   
            $ins_data['institute_contact_number_two']                = $this->request->getVar('institute_contact_number_two');    
            $ins_data['institute_mail_id']                           = $this->request->getVar('institute_mail_id');             
            $ins_data['institute_average_fees']                      = $this->request->getVar('institute_average_fees');  
            $ins_data['institute_teaching_staff_count']              = $this->request->getVar('institute_teaching_staff_count');   
            $ins_data['institute_non_teaching_staff_count']          = $this->request->getVar('institute_non_teaching_staff_count'); 
            $ins_data['institute_guest_lecture_count']               = $this->request->getVar('institute_guest_lecture_count');
            $ins_data['institute_student_count']                     = $this->request->getVar('institute_student_count');
            $ins_data['institute_buses_owned_count']                 = $this->request->getVar('institute_buses_owned_count');
            $ins_data['institute_classrooms_count']                  = $this->request->getVar('institute_classrooms_count');
            $ins_data['institute_digital_classrooms_count']          = $this->request->getVar('institute_digital_classrooms_count');
            $ins_data['institute_website']                           = $this->request->getVar('institute_website');
            $ins_data['institute_website_type']                      = $this->request->getVar('institute_website_type');
            $ins_data['institute_website_company_name']              = $this->request->getVar('institute_website_company_name');
            $ins_data['institute_website_company_url']             	 = $this->request->getVar('institute_website_company_url');
            $ins_data['institute_website_contact_number']            = $this->request->getVar('institute_website_contact_number');
            $ins_data['institute_parent_app']                        = $this->request->getVar('institute_parent_app');
            $ins_data['institute_parent_app_name']                   = $this->request->getVar('institute_parent_app_name');
            $ins_data['institute_managementsystem']                  = $this->request->getVar('institute_managementsystem');
            $ins_data['institute_managementsystem_name']             = $this->request->getVar('institute_managementsystem_name');
            $ins_data['institute_managementsystem_place']            = $this->request->getVar('institute_managementsystem_place');
            $ins_data['institute_managementsystem_type']             = $this->request->getVar('institute_managementsystem_type');
            $ins_data['institute_managementsystem_price']            = $this->request->getVar('institute_managementsystem_price');
            $ins_data['institute_managementsystem_price_yearly']     = $this->request->getVar('institute_managementsystem_price_yearly');
            $ins_data['institute_proposed_rates']                    = $this->request->getVar('institute_proposed_rates');
            $ins_data['institute_negotiable_rates']                  = $this->request->getVar('institute_negotiable_rates');
            $ins_data['institute_proposed_cost']                     = $this->request->getVar('institute_proposed_cost');
            $ins_data['institute_negotiable_cost']                   = $this->request->getVar('institute_negotiable_cost');
            $ins_data['institute_advance_expected']                  = $this->request->getVar('institute_advance_expected');
            $ins_data['institute_month_closure']                     = $this->request->getVar('institute_month_closure');
            $ins_data['institute_comment']                           = $this->request->getVar('institute_comment');        
            $ins_data['parameters_1']                                = $this->request->getVar('parameters_1');            
            $ins_data['parameters_2']                                = $this->request->getVar('parameters_2');            
            $ins_data['parameters_3']                                = $this->request->getVar('parameters_3');            
            $ins_data['parameters_4']                                = $this->request->getVar('parameters_4');            
            $ins_data['parameters_5']                                = $this->request->getVar('parameters_5');            
            $ins_data['parameters_6']                                = $this->request->getVar('parameters_6');            
            $ins_data['parameters_7']                                = $this->request->getVar('parameters_7');            
            $ins_data['parameters_8']                                = $this->request->getVar('parameters_8');            
            $ins_data['parameters_9']                                = $this->request->getVar('parameters_9');            
            $ins_data['parameters_10']                               = $this->request->getVar('parameters_10');            
            $ins_data['parameters_11']                               = $this->request->getVar('parameters_11');            
            $ins_data['parameters_12']                               = $this->request->getVar('parameters_12');            
            $ins_data['parameters_score']                            = $this->request->getVar('parameters_score');             
            $ins_data['created_by_id']                               = $this->request->getVar('created_by_id');             
            $ins_data['created_by']                                  = $this->request->getVar('created_by');             
            $Institute_contact_person_details                        = json_decode($this->request->getVar('Institute_contact_person'),TRUE); 

            if($Institute_contact_person_details)
            {
                foreach ($Institute_contact_person_details as $inskey => $institutecpvalue) 
                {
                 $insdata[] = array( 
                        'person_id'             => $inskey,
                        'person_name'           => $institutecpvalue['person_name'],
                        'designation'           => $institutecpvalue['designation'],
                        'approver'              => $institutecpvalue['approver'],
                        'decision_maker'        => $institutecpvalue['decision_maker'],
                        'influencer'            => $institutecpvalue['influencer'],
                        'evaluator_recommender' => $institutecpvalue['evaluator_recommender'],  
                        'gatekeeper_blocker'    => $institutecpvalue['gatekeeper_blocker'],  
                        'users'                 => $institutecpvalue['users'],  
                        'champion'              => $institutecpvalue['champion'],  
                        'users'                 => $institutecpvalue['users'],  
                        'mentor'                => $institutecpvalue['mentor'],  
                        'contact_number_one'    => $institutecpvalue['contact_number_one'],  
                        'contact_number_two'    => $institutecpvalue['contact_number_two'],  
                        'mail_id'               => $institutecpvalue['mail_id'],  
                    );
                }

                $ins_data['institute_contact_details'] = json_encode($insdata);
            }
             
            $ins_details = $institution_model->where('id',$id)->where('status',1)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($ins_details)
            {
                $institution_model->update($id, $ins_data); 
                /* if($Institute_contact_person_details)
                {
                    foreach ($Institute_contact_person_details as $Institute_contact_person_details_key => $institutecpvalue)
                    {
                        $Institute_person_id                                      = $institutecpvalue['id'];
                        $Institute_contact_person_data['type_id']                 = $id;
                        $Institute_contact_person_data['type']                    = 'Institute';
                        $Institute_contact_person_data['person_name']             = $institutecpvalue['person_name'];
                        $Institute_contact_person_data['designation']             = $institutecpvalue['designation'];
                        $Institute_contact_person_data['approver']                = $institutecpvalue['approver'];
                        $Institute_contact_person_data['decision_maker']          = $institutecpvalue['decision_maker'];
                        $Institute_contact_person_data['influencer']              = $institutecpvalue['influencer'];
                        $Institute_contact_person_data['evaluator_recommender']   = $institutecpvalue['evaluator_recommender'];  
                        $Institute_contact_person_data['gatekeeper_blocker']      = $institutecpvalue['gatekeeper_blocker'];  
                        $Institute_contact_person_data['users']                   = $institutecpvalue['users'];  
                        $Institute_contact_person_data['champion']                = $institutecpvalue['champion'];  
                        $Institute_contact_person_data['users']                   = $institutecpvalue['users'];  
                        $Institute_contact_person_data['mentor']                  = $institutecpvalue['mentor'];  
                        $Institute_contact_person_data['contact_number_one']      = $institutecpvalue['contact_number_one'];  
                        $Institute_contact_person_data['contact_number_two']      = $institutecpvalue['contact_number_two'];  
                        $Institute_contact_person_data['mail_id']                 = $institutecpvalue['mail_id'];
                        if($Institute_person_id){
                            $contact_person_model->update($Institute_person_id, $Institute_contact_person_data);
                        }else{
                            $contact_person_model->insert($Institute_contact_person_data);
                        }
                    }
                } */
                return $this->respond($ins_data,200); 
            }
            else
            {
                $institution_model->insert($ins_data); 
                /* if($Institute_contact_person_details)
                {
                    foreach ($Institute_contact_person_details as $Institute_contact_person_details_key => $institutecpvalue)
                    {
                        $Institute_person_id                                      = $institutecpvalue['id'];
                        $Institute_contact_person_data['type_id']                 = $id;
                        $Institute_contact_person_data['type']                    = 'Institute';
                        $Institute_contact_person_data['person_name']             = $institutecpvalue['person_name'];
                        $Institute_contact_person_data['designation']             = $institutecpvalue['designation'];
                        $Institute_contact_person_data['approver']                = $institutecpvalue['approver'];
                        $Institute_contact_person_data['decision_maker']          = $institutecpvalue['decision_maker'];
                        $Institute_contact_person_data['influencer']              = $institutecpvalue['influencer'];
                        $Institute_contact_person_data['evaluator_recommender']   = $institutecpvalue['evaluator_recommender'];  
                        $Institute_contact_person_data['gatekeeper_blocker']      = $institutecpvalue['gatekeeper_blocker'];  
                        $Institute_contact_person_data['users']                   = $institutecpvalue['users'];  
                        $Institute_contact_person_data['champion']                = $institutecpvalue['champion'];  
                        $Institute_contact_person_data['users']                   = $institutecpvalue['users'];  
                        $Institute_contact_person_data['mentor']                  = $institutecpvalue['mentor'];  
                        $Institute_contact_person_data['contact_number_one']      = $institutecpvalue['contact_number_one'];  
                        $Institute_contact_person_data['contact_number_two']      = $institutecpvalue['contact_number_two'];  
                        $Institute_contact_person_data['mail_id']                 = $institutecpvalue['mail_id'];
                        if($Institute_person_id){
                            $contact_person_model->update($Institute_person_id, $Institute_contact_person_data);
                        }else{
                            $contact_person_model->insert($Institute_contact_person_data);
                        }
                    }
                } */
                return $this->respond($ins_data,200); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }           

    public function AddInstituteContact()
    {
        try
        {
            $institution_model                      = new Institution_Model();            
            $id                                     = $this->request->getVar('institute_id');
            $Institute_contact_person_details       = json_decode($this->request->getVar('institute_contact_person'),TRUE); 
            if($Institute_contact_person_details)
            {
                foreach ($Institute_contact_person_details as $inskey => $institutecpvalue)
                {
                 $insdata[] = array( 
                        'person_id'             => $inskey,
                        'person_name'           => $institutecpvalue['person_name'],
                        'designation'           => $institutecpvalue['designation'],
                        'approver'              => $institutecpvalue['approver'],
                        'decision_maker'        => $institutecpvalue['decision_maker'],
                        'influencer'            => $institutecpvalue['influencer'],
                        'evaluator_recommender' => $institutecpvalue['evaluator_recommender'],  
                        'gatekeeper_blocker'    => $institutecpvalue['gatekeeper_blocker'],  
                        'users'                 => $institutecpvalue['users'],  
                        'champion'              => $institutecpvalue['champion'],  
                        'users'                 => $institutecpvalue['users'],  
                        'mentor'                => $institutecpvalue['mentor'],  
                        'contact_number_one'    => $institutecpvalue['contact_number_one'],  
                        'contact_number_two'    => $institutecpvalue['contact_number_two'],  
                        'mail_id'               => $institutecpvalue['mail_id'],  
                    );
                }

                $data['institute_contact_details'] = json_encode($insdata);
            }


            $institution_model->update($id, $data);
            return $this->respond($data,200); 
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    } 
    
    public function UpdateLeadStatus()
    {
        try
        {
            $leads_model          = new Leads_Model();
            $validation           = \Config\Services::validation();
            $jsnIIQAForm          = $this->request->getJSON();
            $id                   = $this->request->getVar('id');               
            $data['lead_status']  = $this->request->getVar('lead_status');
            if($validation->check($id, 'required')){ 
                $leads_model->update($id, $data);
                return $this->respond(200);
            }else{
                return $this->respond("ID required.!");
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }  
    
    public function DeleteData()
    {
        try
        {
            $leads_model     = new Leads_Model();
            $validation      = \Config\Services::validation();
            $jsnIIQAForm     = $this->request->getJSON();
            $id['client_id'] = $jsnIIQAForm->client_id;
            if($validation->check($id, 'required')){ 
                $data = ['status'      => '0'];
                $leads_model->update($id, $data);
                return $this->respond(200);
            }else{
                return $this->respond("ID required.!");
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }
        
}