<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Leads_Model as Leads_Model;
use App\Models\Institution_Model as Institution_Model;
use App\Models\Contact_Person_Model as Contact_Person_Model;
class Leads extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $leads_model      = new Leads_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $client_id        = $jsnSSRForm->client_id;
            $leads_data       = $leads_model->where('status',1)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($leads_data)
            {
                return $this->respond(json_encode($leads_data,true),200);
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
            $leads_model      = new Leads_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $lead_status      = $jsnSSRForm->lead_status;
            $leads_data       = $leads_model->where('lead_status',$lead_status)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($leads_data)
            {
                return $this->respond(json_encode($leads_data,true),200);
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
    
    public function GetLeadsDataById()
    { 
        try
        {
            $leads_model      = new Leads_Model();
            $jsnSSRForm       = $this->request->getJSON();
            $id               = $jsnSSRForm->id;
            $leads_data       = $leads_model->where('id',$id)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($leads_data)
            {
                return $this->respond(json_encode($leads_data,true),200);
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
            $leads_model                      = new Leads_Model();
            $institution_model                = new Institution_Model();
            //$contact_person_model             = new Contact_Person_Model();
            $validation                       = \Config\Services::validation();
            $jsnSSRForm                       = $this->request->getJSON();
            $id                               = $this->request->getVar('id');               
            $trust_id                         = $this->request->getVar('id');
            $trust_name                       = $this->request->getVar('trust_name');
            $data['trust_name']               = $this->request->getVar('trust_name');
            $data['address_line_1']           = $this->request->getVar('address_line_1');
            $data['address_line_2']           = $this->request->getVar('address_line_2');
            $data['post_office']              = $this->request->getVar('post_office');
            $data['taluk']                    = $this->request->getVar('taluk');
            $data['district']                 = $this->request->getVar('district');
            $data['state']                    = $this->request->getVar('state');              
            $data['pincode']                  = $this->request->getVar('pincode');
            $data['lead_contact_number_one']  = $this->request->getVar('lead_contact_number_one');
            $data['lead_contact_number_two']  = $this->request->getVar('lead_contact_number_two');
            $data['lead_mail_id']             = $this->request->getVar('lead_mail_id');
            $data['created_by']               = $this->request->getVar('created_by');
            $data['created_by_id']               = $this->request->getVar('created_by_id');
            $lead_contact_person_details      = json_decode($this->request->getVar('lead_contact_person'),TRUE);    
              
            $ins_data['trust_name']                    = $this->request->getVar('trust_name');   
            $ins_data['institute_same_trust']          = $this->request->getVar('institute_same_trust');   
            $ins_data['institute_name']                = $this->request->getVar('institute_name');   
            $ins_data['institute_type']                = $this->request->getVar('institute_type');   
            $ins_data['institute_pincode']             = $this->request->getVar('institute_pincode');   
            $ins_data['institute_address_line_1']      = $this->request->getVar('institute_address_line_1');   
            $ins_data['institute_address_line_2']      = $this->request->getVar('institute_address_line_2');   
            $ins_data['institute_post_office']         = $this->request->getVar('institute_post_office');   
            $ins_data['institute_taluk']               = $this->request->getVar('institute_taluk');   
            $ins_data['institute_district']            = $this->request->getVar('institute_district');   
            $ins_data['institute_state']               = $this->request->getVar('institute_state');   
            $ins_data['institute_contact_number_one']  = $this->request->getVar('institute_contact_number_one');   
            $ins_data['institute_contact_number_two']  = $this->request->getVar('institute_contact_number_two');    
            $ins_data['institute_mail_id']             = $this->request->getVar('institute_mail_id');             
            $ins_data['institute_average_fees']                      = $this->request->getVar('institute_average_fees');  
            $ins_data['institute_teaching_staff_count']              = $this->request->getVar('institute_teaching_staff_count');   
            $ins_data['institute_non_teaching_staff_count']          = $this->request->getVar('institute_non_teaching_staff_count'); 
            $ins_data['institute_guest_lecture_count']               = $this->request->getVar('institute_guest_lecture_count');
            $ins_data['institute_student_count']                     = $this->request->getVar('institute_student_count');
            $ins_data['institute_buses_owned_count']                 = $this->request->getVar('institute_buses_owned_count');
            $ins_data['institute_classrooms_count']                  = $this->request->getVar('institute_classrooms_count');
            $ins_data['institute_digital_classrooms_count']          = $this->request->getVar('institute_digital_classrooms_count');
            $ins_data['institute_card_status']                       = $this->request->getVar('institute_card_status');
            $ins_data['institute_website']                           = $this->request->getVar('institute_website');
            $ins_data['institute_website_type']                      = $this->request->getVar('institute_website_type');
            $ins_data['institute_website_company_name']              = $this->request->getVar('institute_website_company_name');
            // $ins_data['institute_website_company_place']             = $this->request->getVar('institute_website_company_place');
            $ins_data['institute_website_company_url']             = $this->request->getVar('institute_website_company_url'); 
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
            $ins_data['created_by']                                  = $this->request->getVar('created_by');            
            $ins_data['created_by_id']                               = $this->request->getVar('created_by_id');            
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
            
            if($lead_contact_person_details)
            {            
                foreach ($lead_contact_person_details as $inskey => $institutecpvalue)
                {
                    $leaddata[] = array(                
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
               
                $jsondata = json_encode($leaddata);
                $data['lead_contact_details'] = $jsondata;
            }

            $leads_data = $leads_model->where('id',$id)->where('status',1)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($leads_data)
            {
                $leads_model->update($id, $data); 
                $institution_model->where('client_trust_id',$trust_id)->set(['trust_name' => $trust_name])->update();
                /* if($lead_contact_person_details)
                {
                    foreach ($lead_contact_person_details as $lead_contact_person_key => $leadcpvalue)
                    {
                        $lead_person_id                                      = $leadcpvalue['id'];
                        $lead_contact_person_data['type_id']                 = $id;
                        $lead_contact_person_data['type']                    = 'Lead';
                        $lead_contact_person_data['person_name']             = $leadcpvalue['person_name'];
                        $lead_contact_person_data['designation']             = $leadcpvalue['designation'];
                        $lead_contact_person_data['approver']                = $leadcpvalue['approver'];
                        $lead_contact_person_data['decision_maker']          = $leadcpvalue['decision_maker'];
                        $lead_contact_person_data['influencer']              = $leadcpvalue['influencer'];
                        $lead_contact_person_data['evaluator_recommender']   = $leadcpvalue['evaluator_recommender'];  
                        $lead_contact_person_data['gatekeeper_blocker']      = $leadcpvalue['gatekeeper_blocker'];  
                        $lead_contact_person_data['users']                   = $leadcpvalue['users'];  
                        $lead_contact_person_data['champion']                = $leadcpvalue['champion'];  
                        $lead_contact_person_data['users']                   = $leadcpvalue['users'];  
                        $lead_contact_person_data['mentor']                  = $leadcpvalue['mentor'];  
                        $lead_contact_person_data['contact_number_one']      = $leadcpvalue['contact_number_one'];  
                        $lead_contact_person_data['contact_number_two']      = $leadcpvalue['contact_number_two'];  
                        $lead_contact_person_data['mail_id']                 = $leadcpvalue['mail_id']; 
                        if($lead_person_id){
                            $contact_person_model->update($lead_person_id, $lead_contact_person_data);
                        }else{
                            $contact_person_model->insert($lead_contact_person_data);
                        }
                    }
                } */
                return $this->respond($data,200); 
            }
            else
            {
                $leads_model->insert($data);                
                $last_id['id'] = $leads_model->insertID();               
                if($last_id['id'])
                {                        
                    /* if($lead_contact_person_details)
                    {
                        foreach ($lead_contact_person_details as $lead_contact_person_key => $leadcpvalue)
                        {
                            $lead_contact_person_data['lead_id']                 = $last_id['id'];
                            $lead_contact_person_data['type_id']                 = $last_id['id'];
                            $lead_contact_person_data['type']                    = 'Lead';
                            $lead_contact_person_data['person_name']             = $leadcpvalue['person_name'];
                            $lead_contact_person_data['designation']             = $leadcpvalue['designation'];
                            $lead_contact_person_data['approver']                = $leadcpvalue['approver'];
                            $lead_contact_person_data['decision_maker']          = $leadcpvalue['decision_maker'];
                            $lead_contact_person_data['influencer']              = $leadcpvalue['influencer'];
                            $lead_contact_person_data['evaluator_recommender']   = $leadcpvalue['evaluator_recommender'];  
                            $lead_contact_person_data['gatekeeper_blocker']      = $leadcpvalue['gatekeeper_blocker'];  
                            $lead_contact_person_data['users']                   = $leadcpvalue['users'];  
                            $lead_contact_person_data['champion']                = $leadcpvalue['champion'];  
                            $lead_contact_person_data['users']                   = $leadcpvalue['users'];  
                            $lead_contact_person_data['mentor']                  = $leadcpvalue['mentor'];  
                            $lead_contact_person_data['contact_number_one']      = $leadcpvalue['contact_number_one'];  
                            $lead_contact_person_data['contact_number_two']      = $leadcpvalue['contact_number_two'];  
                            $lead_contact_person_data['mail_id']                 = $leadcpvalue['mail_id'];  
                            $contact_person_model->insert($lead_contact_person_data);
                        }
                    } */

                    $ins_data['client_trust_id']         = $last_id['id'];
                    if($ins_data)
                    {
                        $institution_model->insert($ins_data); 
                        $ins_data['id'] = $institution_model->insertID();  

                        /* if($Institute_contact_person_details)
                        {
                            foreach ($Institute_contact_person_details as $Institute_contact_person_details_key => $institutecpvalue)
                            {
                                $Institute_contact_person_data['lead_id']                 = $last_id['id'];
                                $Institute_contact_person_data['type_id']                 = $ins_data['id'];
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
                                $contact_person_model->insert($Institute_contact_person_data);
                            }
                        } */
                    }
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