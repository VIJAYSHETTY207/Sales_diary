<?php namespace App\Models;

use CodeIgniter\Model;

class Pricing_Module_Model extends Model
{
        protected $table      = 'pricing_per_module';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [ 'id', 'pricing_id', 'module_id', 'main_module', 'sub_module', 'minamount', 'maxamount', 'module_type', 'default_module_count', 'optional_module_count', 'status', 'created_on', 'updated_on'];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}