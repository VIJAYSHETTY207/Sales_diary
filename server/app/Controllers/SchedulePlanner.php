<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Institution_Model as Institution_Model;
use App\Models\SchedulePlanner_Model as SchedulePlanner_Model;
class SchedulePlanner extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetAllData()
    { 
        try
        {
            $scheduleplanner_model  = new SchedulePlanner_Model();
            $scheduleplanner_data   = $scheduleplanner_model->where('status',1)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($scheduleplanner_data) {
                return $this->respond(json_encode($scheduleplanner_data,true),200);
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
            $scheduleplanner_model  = new SchedulePlanner_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $institute_id           = $jsnSSRForm->institute_id;
            $scheduleplanner_data   = $scheduleplanner_model->where('institute_id',$institute_id)->where('meeting_status =','Open')->orderBy('id','desc')->limit(1)->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($scheduleplanner_data){
                return $this->respond(json_encode($scheduleplanner_data,true),200);
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
    
    public function GetDataByInstituteIDAll()
    { 
        try
        {
            $scheduleplanner_model  = new SchedulePlanner_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $institute_id           = $jsnSSRForm->institute_id;
            $scheduleplanner_data   = $scheduleplanner_model->where('institute_id',$institute_id)->orderBy('id','desc')->findAll();
            log_message('info', 'Fetching IIQA Details');
            if($scheduleplanner_data){
                return $this->respond(json_encode($scheduleplanner_data,true),200);
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
    
    public function GetDataByScheduleID()
    { 
        try
        {
            $scheduleplanner_model  = new SchedulePlanner_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $id                     = $jsnSSRForm->id;               
            $scheduleplanner_data   = $scheduleplanner_model->where('id',$id)->orderBy('id','desc')->limit(1)->findAll();
            if($scheduleplanner_data){
                log_message('info', 'Fetching IIQA Details');
                return $this->respond(json_encode($scheduleplanner_data,true),200);
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
    
    public function GetScheduleDataByStatus()
    { 
        try
        {
            $scheduleplanner_model  = new SchedulePlanner_Model();
            $jsnSSRForm             = $this->request->getJSON();
            $status                 = $jsnSSRForm->status;
            $curr_date              = date('Y-m-d');
            if($status == 'Todays'){
                $scheduleplanner_data = $scheduleplanner_model->where('DATE(meeting_date)',$curr_date)->where('meeting_status =','Open')->findAll();
            }else  if($status == 'Future Schedules'){
                $scheduleplanner_data = $scheduleplanner_model->where('DATE(meeting_date) >',$curr_date)->where('meeting_status =','Open')->findAll();
            }else  if($status == 'Past Schedules'){
                $scheduleplanner_data = $scheduleplanner_model->where('DATE(meeting_date) <',$curr_date)->where('meeting_status =','Open')->findAll();
            }else{
                $scheduleplanner_data = $scheduleplanner_model->where('status',1)->where('meeting_status =','Open')->findAll();
            }
            log_message('info', 'Fetching IIQA Details');
            if($scheduleplanner_data)
            {
                return $this->respond(json_encode($scheduleplanner_data,true),200);
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
            $scheduleplanner_model            = new SchedulePlanner_Model();
            $validation                       = \Config\Services::validation();
            $jsnSSRForm                       = $this->request->getJSON();
            $id                               = $this->request->getVar('id');                
            $data['meeting_description']      = $this->request->getVar('meeting_description');
            $data['institute_id']             = $this->request->getVar('institute_id');
            $data['institute_name']           = $this->request->getVar('institute_name');
            $data['meeting_type']             = $this->request->getVar('meeting_type');
            $data['meeting_date']             = $this->request->getVar('meetingDate');
            $data['meeting_time']             = $this->request->getVar('meetingTime');
            $data['meeting_time_formated']    = $this->request->getVar('meeting_time_formated');
            $data['created_by_id']            = $this->request->getVar('created_by_id');
            $data['created_by']               = $this->request->getVar('created_by');
            $institute_contact_person_details      = json_decode($this->request->getVar('institute_contact_person'),TRUE);   
            $egenius_contact_person_details   = json_decode($this->request->getVar('egenius_contact_person'),TRUE);   
            
            if($institute_contact_person_details)
            {
                foreach ($institute_contact_person_details as $inskey => $institutecpvalue)
                {
                    $insdata[] = array( 
                        'person_id'             => $inskey,
                        'color'                 => $institutecpvalue['color'],
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

                $data['institute_contact_person'] = json_encode($insdata);
            }  
            
            if($egenius_contact_person_details)
            {
                foreach ($egenius_contact_person_details as $inskey => $institutecpvalue1)
                {
                 $insdata1[] = array( 
                        'person_id'             => $inskey,
                        'color'                 => $institutecpvalue1['color'],
                        'person_name'           => $institutecpvalue1['name'],
                        'designation'           => $institutecpvalue1['designation'], 
                        'contact_number_one'    => $institutecpvalue1['phone'],  
                        'contact_number_two'    => $institutecpvalue1['alternative_phone'],  
                        'mail_id'               => $institutecpvalue1['mail_id'],  
                    );
                }

                $data['egenius_contact_person'] = json_encode($insdata1);
            } 

            $scheduleplanner_data = $scheduleplanner_model->where('id',$id)->where('status',1)->findAll($this->pageSize,$this->pageNumber);
            log_message('info', 'Fetching IIQA Details');
            if($scheduleplanner_data)
            {
                $scheduleplanner_model->update($id, $data); 
                return $this->respond($data,200); 
            }
            else
            {
                $scheduleplanner_model->insert($data);                 
                return $this->respond($data,200); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }           

    public function MeetingUpdate()
    {
        try
        {
            $scheduleplanner_model                    = new SchedulePlanner_Model();
            $Institution_Model                        = new Institution_Model();
            $validation                               = \Config\Services::validation();
            $id                                       = $this->request->getVar('id');                
            $institute_id                             = $this->request->getVar('institute_id');                
            $data['attended_meeting_type']            = $this->request->getVar('attended_meeting_type');
            $data['attended_meeting_date']            = $this->request->getVar('attended_meeting_date');
            $data['attended_meeting_time']            = $this->request->getVar('attended_meeting_time');
            $data['attended_meeting_time_formated']   = $this->request->getVar('attended_meeting_time_formated');
            $data['attended_minutes_meeting']         = $this->request->getVar('attended_minutes_meeting');
            $data['meeting_status']                   = $this->request->getVar('meeting_status');
            $institute_status['institute_status']     = $this->request->getVar('edit_status');
            $institute_contact_person_details         = json_decode($this->request->getVar('attended_institute_contact_person'),TRUE);   
            $egenius_contact_person_details           = json_decode($this->request->getVar('attended_egenius_contact_person'),TRUE);   
            
            if($institute_contact_person_details)
            {
                foreach ($institute_contact_person_details as $inskey => $institutecpvalue)
                {
                    $insdata[] = array( 
                        'person_id'             => $inskey,
                        'color'                 => $institutecpvalue['color'],
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

                $data['attended_institute_contact_person'] = json_encode($insdata);
            }  
            
            if($egenius_contact_person_details)
            {
                foreach ($egenius_contact_person_details as $inskey => $institutecpvalue1)
                {
                 $insdata1[] = array( 
                        'person_id'             => $inskey,
                        'color'                 => $institutecpvalue1['color'],
                        'person_name'           => $institutecpvalue1['name'],
                        'designation'           => $institutecpvalue1['designation'], 
                        'contact_number_one'    => $institutecpvalue1['phone'],  
                        'contact_number_two'    => $institutecpvalue1['alternative_phone'],  
                        'mail_id'               => $institutecpvalue1['mail_id'],  
                    );
                }

                $data['attended_egenius_contact_person'] = json_encode($insdata1);
            } 

            $scheduleplanner_model->update($id, $data); 
            if($scheduleplanner_model)
            {
                $ndata['meeting_description']      = $this->request->getVar('meeting_description');
                $ndata['institute_id']             = $this->request->getVar('institute_id');
                $ndata['institute_name']           = $this->request->getVar('institute_name');
                $ndata['meeting_type']             = $this->request->getVar('meeting_type');
                $ndata['meeting_date']             = $this->request->getVar('meetingDate');
                $ndata['meeting_time']             = $this->request->getVar('meetingTime');
                $ndata['meeting_time_formated']    = $this->request->getVar('meeting_time_formated');
                $ndata['created_by_id']            = $this->request->getVar('created_by_id');
                $ndata['created_by']               = $this->request->getVar('created_by');
                $institute_contact_person_details      = json_decode($this->request->getVar('institute_contact_person'),TRUE);   
                $egenius_contact_person_details   = json_decode($this->request->getVar('egenius_contact_person'),TRUE);   
                
                if($institute_contact_person_details)
                {
                    foreach ($institute_contact_person_details as $inskey => $institutecpvalue)
                    {
                        $ninsdata[] = array( 
                            'person_id'             => $inskey,
                            'color'                 => $institutecpvalue['color'],
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
    
                    $ndata['institute_contact_person'] = json_encode($ninsdata);
                }  
            
                if($egenius_contact_person_details)
                {
                    foreach ($egenius_contact_person_details as $inskey => $institutecpvalue1)
                    {
                    $ninsdata1[] = array( 
                            'person_id'             => $inskey,
                            'color'                 => $institutecpvalue1['color'],
                            'person_name'           => $institutecpvalue1['name'],
                            'designation'           => $institutecpvalue1['designation'], 
                            'contact_number_one'    => $institutecpvalue1['phone'],  
                            'contact_number_two'    => $institutecpvalue1['alternative_phone'],  
                            'mail_id'               => $institutecpvalue1['mail_id'],  
                        );
                    }
    
                    $ndata['egenius_contact_person'] = json_encode($ninsdata1);
                } 
    
                $scheduleplanner_model->insert($ndata);  
                $Institution_Model->update($institute_id, $institute_status); 
            }
        
            return $this->respond($data,200); 
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }    
    
    public function MeetingReschedule()
    {
        try
        {
            $scheduleplanner_model                    = new SchedulePlanner_Model();
            $validation                               = \Config\Services::validation();
            $id                                       = $this->request->getVar('id');                
            $institute_id                             = $this->request->getVar('institute_id');            
            $data['institute_id']                     = $this->request->getVar('institute_id');
            $data['institute_name']                   = $this->request->getVar('institute_name');
            $data['meeting_type']                     = $this->request->getVar('meeting_type');
            $data['meeting_date']                     = $this->request->getVar('meetingDate');
            $data['meeting_time']                     = $this->request->getVar('meetingTime');
            $data['meeting_time_formated']            = $this->request->getVar('meeting_time_formated');
            $data['meeting_description']              = $this->request->getVar('meeting_description');
            $data['created_by_id']                    = $this->request->getVar('created_by_id');
            $data['created_by']                       = $this->request->getVar('created_by');
            $institute_contact_person_details         = json_decode($this->request->getVar('institute_contact_person'),TRUE);   
            $egenius_contact_person_details           = json_decode($this->request->getVar('egenius_contact_person'),TRUE);  
            
            $update['schedule_type']                    = 'Rescheduled';
            $update['reschedule_reason']                = $this->request->getVar('reschedule_reason');
            $update['meeting_status']                   = $this->request->getVar('meeting_status'); 
            
            if($institute_contact_person_details)
            {
                foreach ($institute_contact_person_details as $inskey => $institutecpvalue)
                {
                    $insdata[] = array( 
                        'person_id'             => $inskey,
                        'color'                 => $institutecpvalue['color'],
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

                $data['institute_contact_person'] = json_encode($insdata);
            }  
            
            if($egenius_contact_person_details)
            {
                foreach ($egenius_contact_person_details as $inskey => $institutecpvalue1)
                {
                 $insdata1[] = array( 
                        'person_id'             => $inskey,
                        'color'                 => $institutecpvalue1['color'],
                        'person_name'           => $institutecpvalue1['name'],
                        'designation'           => $institutecpvalue1['designation'], 
                        'contact_number_one'    => $institutecpvalue1['phone'],  
                        'contact_number_two'    => $institutecpvalue1['alternative_phone'],  
                        'mail_id'               => $institutecpvalue1['mail_id'],  
                    );
                }

                $data['egenius_contact_person'] = json_encode($insdata1);
            } 

            $scheduleplanner_model->update($id, $update); 
            if($scheduleplanner_model)
            {
                $scheduleplanner_model->insert($data); 
            }
        
            return $this->respond($data,200); 
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