<?php namespace App\Models;

use CodeIgniter\Model;

class UserMenu_Model extends Model
{
        protected $table      = 'user_menu';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [ 'id', 'id_institute', 'id_board', 'id_academicyear', 'main_module', 'sub_module', 'module_type', 'name', 'label', 'path', 'component', 'layout', 'visible', 'icon', 'id_parent_menu', 'order_menu', 'default_module_count', 'optional_module_count', 'status', 'created_by', 'created_on', 'latest_update' ];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}