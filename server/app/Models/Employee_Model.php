<?php namespace App\Models;
use CodeIgniter\Model;
class Employee_Model extends Model
{
        protected $table      = 'employees';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [  'id', 'user_id', 'first_name', 'middle_name', 'last_name', 'name', 'phone', 'alternative_phone', 'mail_id', 'alternative_mail_id', 'password', 'status', 'created_date', 'modified_date'];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}