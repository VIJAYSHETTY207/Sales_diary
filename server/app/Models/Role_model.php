<?php namespace App\Models;

use CodeIgniter\Model;

class Role_model extends Model
{
        protected $table      = 'roles';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = ['id','id_institute','id_board','id_academicyear','name', 'created_by','status','modified_by'];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}