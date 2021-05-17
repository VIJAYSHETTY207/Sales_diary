<?php namespace App\Models;

use CodeIgniter\Model;

class Calender_Model extends Model
{
	public function getDashboardData()
	{
		$db      						= \Config\Database::connect();
		$data_count 					= array();

		// $date = new DateTime("now");
 		$curr_date = date('Y-m-d ');
		// Leads Counts
	 	$total_leads = $db->table('scheduleplanner')->selectCount('*')->get()->getResult();
		$query = $db->query("select * from scheduleplanner");

		 foreach ($query->getResult() as $row)
		 {
			$data_count['schedule_event'] = [{'title:'=>$row['trust_name'],'start:'=>$row['meeting_date'],'end:'=>$row['meeting_date']}];
		 }
			
		return $data_count;	
	}	
}