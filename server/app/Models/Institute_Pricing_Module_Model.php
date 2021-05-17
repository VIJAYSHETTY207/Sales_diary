<?php namespace App\Models;

use CodeIgniter\Model;

class Institute_Pricing_Module_Model extends Model
{
        protected $table      = 'institute_pricing_per_module';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [  'id', 'institute_pricing_id', 'institute_id', 'egenius_pricing_id', 'module_id', 'module_type', 'main_module', 'sub_module', 'studentcount', 'moduleprice', 'default_menu', 'optional_menu', 'status', 'created_on', 'updated_on'];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}