<?php namespace App\Models;

use CodeIgniter\Model;

class Institute_Pricing_History_Model extends Model
{
        protected $table      = 'institute_pricing_history';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [  'id','proposal_id', 'pricing_id', 'pricing_date', 'institute_id', 'institute_name', 'date', 'open_till', 'discount_type', 'discount', 'student_count', 'institute_pricing', 'discount_amount', 'payable_amount', 'default_module_count', 'optional_module_count', 'status', 'created_on' ];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}