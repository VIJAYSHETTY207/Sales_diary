<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Users_model as UserModel;
use App\Models\Student_model as StudentModel;
use App\Models\Staff_model as StaffModel;
use App\Models\Common_model as CommonModel;
use Config\Services;
use Firebase\JWT\JWT;
class Users extends ResourceController
{
        // protected $request;
        //use ResponseTrait;
        protected $format    = 'json';
        public $threshold = 5;


        public function get_data(){
             try
            { 
               
                $userModel      = new UserModel();
                $validation     =  \Config\Services::validation();
                $jsnUser        = $this->request->getJSON();
                $loginflag      = $jsnUser->loginflag;
                $column         = ($loginflag == 1) ?'email':(($loginflag == 2)?'phone':'UID');
                $usertype       = 'type';
                $value          =  $test[$column]       = $jsnUser->email;
               if($validation->run($test, "$column"))
               {
                    $array      = array('status' => 1, $column => $value);
                    $users      = $userModel->where($column, $value)->where('status',1)->findColumn($column);
                     log_message('info', 'Fetching Users details');
                    if($users)
                    {
                        return $this->respond(json_encode($users,true),200);
                    }
                    else
                    {
                        $errors  =    "User Doesn't Exist..!";
                         return $this->respond($errors,500); 
                    }
               }    
               else
               { 
                      $errors    =    $validation->getError($column);
                      return $this->respond($errors,500); 
               }
           }
            catch (\Exception $e)
            {
                log_message('error', $e->getMessage());
                return $this->respond($e->getMessage(),500);
            }
        }

        public function get_password(){
           try
            {
                
                header("Access-Control-Allow-Origin: *");

                header("Access-Control-Allow-Headers: Content-Type, origin");
    
                $userModel      = new UserModel();
                $validation     =  \Config\Services::validation();
                $jsnUser        = $this->request->getJSON();
                $loginflag      = $jsnUser->loginflag;
                $column         = ($loginflag == 1) ?'mail_id':(($loginflag == 2)?'phone':'user_id');
                $value          = $jsnUser->email;
                $password       = $test["password"] = $jsnUser->password;
                $usertype       = 'type';
                $array          = array('status' => 1, $column => $value);
               
                if($validation->run($test, 'password'))
                   {
                     $users                 = $userModel->where($column,$value)->where('password',md5($password))->where('status','1')->findAll();
                   //  print_r($users);exit;
                   if($users)
                   {
                       $users[0]['token'] = "123";
                       return $this->respond(json_encode($users[0],true),200);
                   }
                        else
                        {
                            $errors        =    "You have enetered wrong UserID/password.!";
                            return $this->respond($errors);
                        }
                   }else{
                            $errors        =    $validation->getError('password');
                            return $this->respond($errors,500);
                   }    
                }
                catch (\Exception $e)
                {
                    log_message('error', $e->getMessage());
                    return $this->respond($e->getMessage(),500);
                }
        }
    /* auto search by student and phone*/
        public function get_data_username()
        {
            $jsnUser        = $this->request->getJSON();
            $name          = $jsnUser->name;
            $phone         = $jsnUser->phone;
            $CommonModel   = new CommonModel();
            $data = $CommonModel->get_user_details_search($name,$phone);


        }
        public function getUsersData(){         
      try{
        $commonModel              =  new CommonModel();
        $jsnUser                  = $this->request->getJSON();
          $data['id_institute']   = $jsnUser->id_institute;
          $userData               = $commonModel->getUserDetails($data); 
          log_message('info', 'Fetching All User details');
            if($userData)
            {
                return $this->respond(json_encode($userData,true),200);
            }
            else
            {
                $errors           =    "Data Not Found";
                return $this->respondNoContent($errors); 
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }

    public function getHierarchy(){         
        try{
          $jsnUser                  = $this->request->getJSON();
          $reporting_id   = $jsnUser->reporting_id;
          $commonModel              =  new CommonModel();
            $userData               = $commonModel->recursion($reporting_id); 
              if($userData)
              {
                  return $this->respond(json_encode($userData,true),200);
              }
              else
              {
                  $errors           =    "Data Not Found";
                  return $this->respondNoContent($errors); 
              }
          }
          catch (\Exception $e)
          {
              log_message('error', $e->getMessage());
              return $this->respond($e->getMessage(),500);
          }
      }

    public function getUserDetails(){
        try{
             $commonModel              =  new CommonModel();
             $jsnUser                  = $this->request->getJSON();
             $pagedata['UID']          = $jsnUser->UID;
             $userData                 = $commonModel->getUserDetailsWithType($pagedata); 
             log_message('info', 'Fetching All User details');
                if($userData)
                {
                    return $this->respond(json_encode($userData,true),200);
                }
                else
                {
                    $errors           =    "Data Not Found";
                    return $this->respondNoContent($errors); 
                }
             }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }

    public function getNavMenu(){
        try{
             $commonModel              =  new CommonModel();
             $jsnUser                  = $this->request->getJSON();
             $role_id          = $jsnUser->role_id;
             $userData                 = $commonModel->getNavMenu($role_id); 
             log_message('info', 'Fetching All User details');
                if($userData)
                {
                    return $this->respond(json_encode($userData,true),200);
                }
                else
                {
                    $errors           =    "Data Not Found";
                    return $this->respondNoContent($errors); 
                }
             }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }
    /* auto search by student and phone*/    
}