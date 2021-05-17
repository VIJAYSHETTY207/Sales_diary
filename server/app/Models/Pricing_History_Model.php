<?php namespace App\Models;

use CodeIgniter\Model;

class Pricing_History_Model extends Model
{
        protected $table      = 'pricing_history';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [ 'id', 'pricing_date', 'minmum_student', 'maximum_student', 'min_signup_value', 'status', 'created_on'];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}