<?php namespace App\Models;

use CodeIgniter\Model;

class Users_model extends Model
{
        protected $table      = 'employees';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = ['user_id','name', 'department', 'designation', 'mail_id', 'phone','role_id','reporting_id','status'];

        protected $useTimestamps = false;

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}