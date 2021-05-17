<?php namespace App\Models;

use CodeIgniter\Model;

class Contact_Person_Model extends Model
{
        protected $table      = 'lead_institute_contact_person';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [ 'id', 'lead_id', 'type', 'type_id', 'person_name', 'designation', 'approver', 'decision_maker', 'influencer', 'evaluator_recommender', 'gatekeeper_blocker', 'users', 'champion', 'mentor', 'contact_number_one', 'contact_number_two', 'mail_id', 'status', 'created_date', 'modified_date' ];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}