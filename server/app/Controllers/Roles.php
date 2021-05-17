<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Role_model as RoleModel;
use App\Models\Common_model as CommonModel;
use App\Models\Roles_Permissions_model as RolesPermissionsModel;
use App\Models\ModuleDashboard_model as ModuleDashboardModel;
class Roles extends ResourceController
{
        // protected $request;
        //use ResponseTrait;
        protected $format    = 'json';
        public $threshold = 5;

        public function getUserManagementDashboardDetails(){
            try{
                $moduleDashboardModel            =  new ModuleDashboardModel();
                $jsnUserManagement                   = $this->request->getJSON();
                $pagedata['id_institute']        = $jsnUserManagement->id_institute;
                $pagedata['id_board']            = $jsnUserManagement->id_board;
                $pagedata['id_academicyear']    = $jsnUserManagement->id_academicyear;
                $userManagementData                  = $moduleDashboardModel->getUserManagementDashboardDetails($pagedata); 
                log_message('info', 'Fetching Assignments Details details');
                  if($userManagementData)
                  {
                          return $this->respond(json_encode($userManagementData,true),200);
                  }
                  else
                  {
                          $errors                =    "Data Not Found";
                          return $this->respondNoContent($errors); 
                  }
              }
              catch (\Exception $e)
              {
                  log_message('error', $e->getMessage());
                  return $this->respond($e->getMessage(),500);
              }
            }

        public function getData(){
            try{
                $commonModel           = new CommonModel();
                $jsnRole               = $this->request->getJSON();
                $roleData                           = $commonModel->getRoleData();
               // $roleData               = $roleModel->where('id_institute',$id_institute)->where('id_board',$id_board)->where('id_academicyear',$id_academicyear)->where('status',1)->findAll();
                log_message('info', 'Fetching Roles details');
                if($roleData)
                {
                    return $this->respond($roleData,200);
                }
                else
                {
                    $errors             =    "Data Not Found";
                    return $this->respondNoContent($errors); 
                }
             }
            catch (\Exception $e)
            {
                log_message('error', $e->getMessage());
                 return $this->respond($e->getMessage(),500);
            }
        }

        public function getPermission(){ 
            try{
                $commonModel        = new CommonModel();
                $jsnRole            = $this->request->getJSON();
                $action             =  $jsnRole->actiondata;
                $id                 =  $jsnRole->id;
                log_message('info', 'Fetching Permission details');
                if($action == 'create'){
                    $permissionData = $commonModel->permission_data();
                }else{
                    $permissionData = $commonModel->permission_dataWithData($id);
                }
                if($permissionData)
                    {
                        return $this->respond($permissionData,200);
                    }
                    else
                    {
                        $errors     =    "Data Not Found";
                        return $this->respondNoContent($errors); 
                    }
                }
            catch (\Exception $e)
            {
                log_message('error', $e->getMessage());
                return $this->respond($e->getMessage(),500);
            }
        }

        public function getPermissionData(){ 
            try{
                $commonModel        = new CommonModel();
                $jsnRole            = $this->request->getJSON();
                $action             =  $jsnRole->actiondata;
                $id                 =  $jsnRole->id;
                log_message('info', 'Fetching Permission details');
                if($action == 'create'){
                    $permissionData = $commonModel->permissionData();
                }else{
                    $permissionData = $commonModel->permissionDataWithData($id);
                }
                if($permissionData)
                    {
                        return $this->respond($permissionData,200);
                    }
                    else
                    {
                        $errors     =    "Data Not Found";
                        return $this->respondNoContent($errors); 
                    }
                }
            catch (\Exception $e)
            {
                log_message('error', $e->getMessage());
                return $this->respond($e->getMessage(),500);
            }
        }

         public function insertRole(){ 
            try{
                 $insert_data       = array();
                 $insert_childdata  = array();
                 $insertdetails     = array();
                $roleModel          = new RoleModel();
                $commonModel        = new CommonModel();
                $RolesPermissionsModel        = new RolesPermissionsModel();
                $validation         =  \Config\Services::validation();
                $jsnRole            = $this->request->getJSON();
                
                $name               =  $jsnRole->name;
                $role['created_by'] =  $jsnRole->id_user; 
                $permissions        =     $jsnRole->permissionData;
                $permissions          =     json_decode(json_encode($permissions),true);
                $role['name']         =   $name;
             // if($validation->run($val, 'role'))
            //   {
                 $role['id']        =    $roleModel->insert($role);
                 $message           =    "Invalid request data.";
                 if($permissions)
                {
                    foreach ($permissions as $key => $value) {   
                            $insert_data['id_role']         = $role['id'];
                            $insert_data['id_permission']   = $value['id'];
                            $insert_data['can_view']        = $value['can_view'];
                            $insert_data['can_view_own']    = $value['can_view_own'];
                            $insert_data['can_create']      = $value['can_create'];
                            $insert_data['can_edit']        = $value['can_edit'];
                            $insert_data['can_delete']      = $value['can_delete'];
                            $insert_data['can_export']      = $value['can_export'];
                            $insert_data['can_expand']      = $value['can_expand'];
                            // if($value['child']){
                            //     foreach ($value['child'] as $childkey => $childvalue) {
                            //         $insert_childdata['id_role']         = $role['id'];
                            //         $insert_childdata['id_permission']   = $childvalue['id'];
                            //         $insert_childdata['can_view']        = $childvalue['can_view'];
                            //         $insert_childdata['can_view_own']    = $childvalue['can_view_own'];
                            //         $insert_childdata['can_create']      = $childvalue['can_create'];
                            //         $insert_childdata['can_edit']        = $childvalue['can_edit'];
                            //         $insert_childdata['can_delete']      = $childvalue['can_delete'];
                            //         $insert_childdata['can_export']      = $childvalue['can_export'];
                            //         $insert_childdata['can_expand']      = $childvalue['can_expand'];
                            //         $child_data[]                       = $insert_childdata; 
                            //     }
                            // }
                            $data[]                         = $insert_data;  
                           
                           // $RolesPermissionsModel->insert($insert_data);
                    }
                   $insertdetails = $data;
                  // print_r($insertdetails);exit;
                    $commonModel->insert_roles_permissions($insertdetails);
                         $message = "Inserted!";
                         log_message('info', 'Inserting Role details',$insert_data);
                         
                         return $this->respond($message,200);
                }
                else
                {
                     return $this->respondNoContent($message); 
                }

            //   }else{
            //      $errors        =    $validation->getErrors('role');
            //       return $this->respond($errors,500);
            //   }
           
            }
            catch (\Exception $e)
            {
                log_message('error', $e->getMessage());
                return $this->respond($e->getMessage(),500);
            } 
         }

         public function updateRole(){
              try{
                $insert_data       = array();
                $insert_childdata  = array();
                $insertdetails     = array();
                $updatedata        = array();
                $main_data         = array();
                $cond              = array();
                $roleModel          = new RoleModel();
                $commonModel        = new CommonModel();
                $validation         =  \Config\Services::validation();
                $jsnRole            = $this->request->getJSON();
                $id                 = $jsnRole->id;
                $name               = $val['name'] = $jsnRole->name;
                $modified_by        = $jsnRole->id_user;
                $permissions        = $val['permissions'] =   $jsnRole->permissionData;
                $permissions        = $val['permissions'] =   json_decode(json_encode($permissions),true);
                // if($validation->run($val, 'role')  && $validation->check($id, 'required'))
                //   {
                    $message        =    "Invalid request data.";
                    $data = [
                            'name'        => $name,
                            'modified_by' =>$modified_by
                    ];
                    $roleModel->update($id, $data);
                     if($permissions)
                    {
                        foreach ($permissions as $key => $value) {   
                            $insert_data['id_role']         = $id;
                            $insert_data['id_permission']   = $value['id'];
                            $insert_data['can_view']        = $value['can_view'];
                            $insert_data['can_view_own']    = $value['can_view_own'];
                            $insert_data['can_create']      = $value['can_create'];
                            $insert_data['can_edit']        = $value['can_edit'];
                            $insert_data['can_delete']      = $value['can_delete'];
                            $insert_data['can_export']      = $value['can_export'];
                            $insert_data['can_expand']      = $value['can_expand'];
                            $insert_data['modified_by']     = $modified_by;
                            // if($value['child']){
                            //     foreach ($value['child'] as $childkey => $childvalue) {
                            //         $insert_childdata['id_role']         = $id;
                            //         $insert_childdata['id_permission']   = $childvalue['id'];
                            //         $insert_childdata['can_view']        = $childvalue['can_view'];
                            //         $insert_childdata['can_view_own']    = $childvalue['can_view_own'];
                            //         $insert_childdata['can_create']      = $childvalue['can_create'];
                            //         $insert_childdata['can_edit']        = $childvalue['can_edit'];
                            //         $insert_childdata['can_delete']      = $childvalue['can_delete'];
                            //         $insert_childdata['can_export']      = $childvalue['can_export'];
                            //         $insert_childdata['can_expand']      = $childvalue['can_expand'];
                            //         $insert_childdata['modified_by']     = $modified_by;
                            //         $child_data[]                       = $insert_childdata; 
                            //     }
                            // }
                            $updatedata[]                         = $insert_data;  
                            
                    } 
                            $insertdetails = $updatedata;
                            if($insertdetails){
                                foreach ($insertdetails as $key => $value) {
                                    $main_data['id_role']         = $id;
                                    $main_data['id_permission']   = $value['id_permission'];
                                    $main_data['can_view']        = $value['can_view'];
                                    $main_data['can_view_own']    = $value['can_view_own'];
                                    $main_data['can_create']      = $value['can_create'];
                                    $main_data['can_edit']        = $value['can_edit'];
                                    $main_data['can_delete']      = $value['can_delete'];
                                    $main_data['can_export']      = $value['can_export'];
                                    $main_data['can_expand']      = $value['can_expand'];
                                    $main_data['modified_by']      = $value['modified_by'];
                                    $cond['id_role']             = $id;
                                    $cond['id_permission']       = $value['id_permission'];
                                    $commonModel->update_roles_permissions($main_data,$cond);
                                }
                            }
                        $message                     = "Updated!";  
                        log_message('info', 'Updating Role details',$data);
                        return $this->respond($message,200);
                    }
                    else
                    {
                     return $this->respondNoContent($message); 
                    }
                //   }else{
                //     $errors        =    $validation->getErrors('role');
                //       return $this->respond($errors,500);
                //   }
                    
                }
            catch (\Exception $e)
            {
                log_message('error', $e->getMessage());
                return $this->respond($e->getMessage(),500);
            }
         }

         public function deleteRole(){
              try{
                $roleModel              = new RoleModel();
                $commonModel            = new CommonModel();
                $validation             =  \Config\Services::validation();
                $jsnRole                = $this->request->getJSON();
                $id                     = $jsnRole->id;
                $data['modified_by']    = $jsnRole->id_user;
                if($validation->check($id, 'required')){
                    $data['status']     = 0;
                    $cond['id_role']    = $id;
                    $roleModel->update($id, $data);
                    $commonModel->update_deleterole($data,$cond);
                    log_message('info', 'Deleting Role details',$data);    
                    return $this->respond(200);
                }else{
                    return $this->respond('ID required.!');
                }  
             }
            catch (\Exception $e)
            {
                log_message('error', $e->getMessage());
                return $this->respond($e->getMessage(),500);
            }
         }
        
}