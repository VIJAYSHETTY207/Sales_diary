<?php namespace App\Models;

use CodeIgniter\Model;

class Leads_Model extends Model
{
        protected $table      = 'lead_clients';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = ['id', 'trust_name', 'address_line_1', 'address_line_2', 'post_office', 'taluk', 'district', 'state', 'pincode', 'lead_contact_number_one', 'lead_contact_number_two', 'lead_mail_id', 'created_by_id', 'created_by', 'lead_status',  'lead_contact_details', 'status', 'created_date', 'modified_date'];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}