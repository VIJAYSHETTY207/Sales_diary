<?php namespace App\Models;

use CodeIgniter\Model;

class Institution_Model extends Model
{
        protected $table      = 'lead_institutions';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [ 'id', 'client_trust_id', 'institute_same_trust', 'trust_name', 'institute_status', 'institute_name', 'institute_type', 'institute_pincode', 'institute_address_line_1', 'institute_address_line_2', 'institute_post_office', 'institute_taluk', 'institute_district', 'institute_state', 'institute_contact_number_one', 'institute_contact_number_two', 'institute_mail_id', 'institute_average_fees', 'institute_teaching_staff_count', 'institute_non_teaching_staff_count', 'institute_guest_lecture_count', 'institute_student_count', 'institute_buses_owned_count', 'institute_classrooms_count', 'institute_digital_classrooms_count', 'institute_card_status', 'institute_website', 'institute_website_type', 'institute_website_company_name', 'institute_website_company_place', 'institute_website_company_url', 'institute_website_contact_number', 'institute_parent_app', 'institute_parent_app_name', 'institute_managementsystem', 'institute_managementsystem_name', 'institute_managementsystem_place', 'institute_managementsystem_type', 'institute_managementsystem_price', 'institute_managementsystem_price_yearly', 'institute_proposed_rates', 'institute_negotiable_rates', 'institute_proposed_cost', 'institute_negotiable_cost', 'institute_advance_expected', 'institute_month_closure', 'institute_comment', 'parameters_1', 'parameters_2', 'parameters_3', 'parameters_4', 'parameters_5', 'parameters_6', 'parameters_7', 'parameters_8', 'parameters_9', 'parameters_10', 'parameters_11', 'parameters_12', 'parameters_score', 'status', 'created_by_id', 'created_by', 'institute_contact_details', 'institute_last_visit', 'created_date', 'modified_date'];

        protected $useTimestamps = false; 
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';

        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}