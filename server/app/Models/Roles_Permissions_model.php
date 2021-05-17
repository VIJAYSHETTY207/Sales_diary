<?php namespace App\Models;

use CodeIgniter\Model;

class Roles_Permissions_model extends Model
{
        protected $table      = 'roles_permissions';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = ['id', 'id_role','id_permission','can_view','can_view_own','can_edit','can_create','can_delete','can_export','status','created_by','status','modified_by'];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}