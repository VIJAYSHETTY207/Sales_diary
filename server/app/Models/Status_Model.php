<?php namespace App\Models;

use CodeIgniter\Model;

class Status_Model extends Model
{
        protected $table      = 'lead_status';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [ 'id', 'lead_status', 'status', 'created_date', 'modified_date' ];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}