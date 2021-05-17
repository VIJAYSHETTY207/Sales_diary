<?php namespace App\Models;

use CodeIgniter\Model;

class SchedulePlanner_Model extends Model
{
        protected $table      = 'scheduleplanner';
        protected $primaryKey = 'id';

        protected $returnType = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [  'id', 'institute_id', 'institute_name', 'meeting_type', 'meeting_date', 'meeting_time', 'meeting_time_formated', 'meeting_description', 'person_count', 'institute_contact_person', 'egenius_contact_person', 'attended_meeting_type', 'attended_meeting_date', 'attended_meeting_time', 'attended_meeting_time_formated', 'attended_minutes_meeting', 'attended_institute_contact_person', 'attended_egenius_contact_person', 'created_by_id', 'created_by', 'meeting_status', 'schedule_type', 'reschedule_reason', 'status', 'created_date', 'modified_date' ];

        protected $useTimestamps = false;
        // protected $createdField  = 'created_at';
        // protected $updatedField  = 'updated_at';
        // protected $deletedField  = 'deleted_at';
 
        protected $validationRules    = [];
        protected $validationMessages = [];
        protected $skipValidation     = true;
}