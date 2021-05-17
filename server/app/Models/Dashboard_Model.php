<?php namespace App\Models;

use CodeIgniter\Model;

class Dashboard_model extends Model
{
	public function getDashboardData()
	{
		$db      						= \Config\Database::connect();
		$data_count 					= array();

		// $date = new DateTime("now");
 		$curr_date = date('Y-m-d ');
		// Leads Counts
	 	$total_leads = $db->table('lead_institutions')->selectCount('id')->get()->getResult();
		$data_count['total_leads'] = $total_leads[0]->id;
	 	$active = $db->table('lead_institutions')->selectCount('id')->where('status',1)->get()->getResult();
		$data_count['active_count'] = $active[0]->id;
	 	$deactive = $db->table('lead_institutions')->selectCount('id')->where('status',0)->get()->getResult();
		$data_count['deactive_count'] = $deactive[0]->id;
		$lead = $db->table('lead_institutions')->selectCount('id')->where('institute_status','Lead')->get()->getResult();
		$data_count['lead_count'] = $lead[0]->id;	
		$prospect = $db->table('lead_institutions')->selectCount('id')->where('institute_status','Prospectus')->get()->getResult();
		$data_count['prospect_count'] = $prospect[0]->id;
		$qualified = $db->table('lead_institutions')->selectCount('id')->where('institute_status','Qualified')->get()->getResult();
		$data_count['qualified_count'] = $qualified[0]->id;
		$unqualified = $db->table('lead_institutions')->selectCount('id')->where('institute_status','Unqualified')->get()->getResult();
		$data_count['unqualified_count'] = $unqualified[0]->id;
		$commited = $db->table('lead_institutions')->selectCount('id')->where('institute_status','Commited')->get()->getResult();
		$data_count['commited_count'] = $commited[0]->id;
		$converted = $db->table('lead_institutions')->selectCount('id')->where('institute_status','Converted')->get()->getResult();
		$data_count['converted_count'] = $converted[0]->id;	
		$todaysschedule = $db->table('scheduleplanner')->selectCount('id')->where('DATE(meeting_date)',$curr_date)->get()->getResult();
		$data_count['todays_schedule_count'] = $todaysschedule[0]->id;
		$upcomingsschedule = $db->table('scheduleplanner')->selectCount('id')->where('meeting_date between NOW() AND DATE_ADD(NOW(), INTERVAL 1 WEEK)')->get()->getResult();
		$data_count['upcoming_schedule_count'] = $upcomingsschedule[0]->id;
			
		return $data_count;	
	}	
}