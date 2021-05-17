<?php namespace App\Models;

use CodeIgniter\Model;

class ModuleDashboard_model extends Model
{
	public function getAssignmentDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$dashboard_details  = array();
		$id_institute		= $data['id_institute'];
		$id_board		    = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$today				= date('Y-m-d');
		$yesterday 			= date("Y-m-d", strtotime("yesterday"));
		$presentweek        = date("Y-m-d",strtotime("this week"));
		$nextweek           = date("Y-m-d",strtotime("+1 week monday 00:00:00"));
		$builder_total = $db->table('assignment a')->selectCount('a.id')->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.id_board',$id_board)->where('a.status',1)->get();
		if($builder_total->getResultArray()){
			foreach ($builder_total->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_today = $db->table('assignment a')->selectCount('a.id')->where('a.end_date',$today)->where('a.id_institute',$id_institute)->where('a.id_board',$id_board)->where('id_academicyear',$id_academicyear)->where('a.status',1)->get();
		if($builder_today->getResultArray()){
			foreach ($builder_today->getResultArray() as $key => $value) {
				$dashboard_details['today'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentweek = $db->table('assignment a')->selectCount('a.id')->where('a.end_date <',$nextweek)->where('a.end_date >=',$today)->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.id_board',$id_board)->where('a.status',1)->get();
		if($builder_presentweek->getResultArray()){
			foreach ($builder_presentweek->getResultArray() as $key => $value) {
					$dashboard_details['presentweek'] = $value['id']?$value['id']:0;
			}
		}
		$builder_nextweek = $db->table('assignment a')->selectCount('a.id')->where('a.end_date >',$nextweek)->where('a.id_institute',$id_institute)->where('a.id_board',$id_board)->where('id_academicyear',$id_academicyear)->where('a.status',1)->get();
		if($builder_nextweek->getResultArray()){
			foreach ($builder_nextweek->getResultArray() as $key => $value) {
				$dashboard_details['nextweek'] = $value['id']?$value['id']:0;
			}
		}
		
		 return $dashboard_details;
	}

	public function getProjectDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$dashboard_details  = array();
		$id_institute		= $data['id_institute'];
		$id_board		    = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$today				= date('Y-m-d');
		$yesterday 			= date("Y-m-d", strtotime("yesterday"));
		$presentweek        = date("Y-m-d",strtotime("this week"));
		$nextweek           = date("Y-m-d",strtotime("+1 week monday 00:00:00"));
		$builder_total = $db->table('project p')->selectCount('p.id')->where('p.id_institute',$id_institute)->where('p.id_board',$id_board)->where('p.id_academicyear',$id_academicyear)->where('p.status',1)->get();
		if($builder_total->getResultArray()){
			foreach ($builder_total->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_today = $db->table('project p')->selectCount('p.id')->where('p.end_date',$today)->where('p.id_institute',$id_institute)->where('p.id_board',$id_board)->where('p.id_academicyear',$id_academicyear)->where('p.status',1)->get();
		if($builder_today->getResultArray()){
			foreach ($builder_today->getResultArray() as $key => $value) {
				$dashboard_details['today'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentweek = $db->table('project p')->selectCount('p.id')->where('p.end_date <',$nextweek)->where('p.end_date >=',$today)->where('p.id_institute',$id_institute)->where('p.id_board',$id_board)->where('p.id_academicyear',$id_academicyear)->where('p.status',1)->get();
		if($builder_presentweek->getResultArray()){
			foreach ($builder_presentweek->getResultArray() as $key => $value) {
					$dashboard_details['presentweek'] = $value['id']?$value['id']:0;
			}
		}
		$builder_nextweek = $db->table('project p')->selectCount('p.id')->where('p.end_date >',$nextweek)->where('p.id_institute',$id_institute)->where('p.id_board',$id_board)->where('p.id_academicyear',$id_academicyear)->where('p.status',1)->get();
		if($builder_nextweek->getResultArray()){
			foreach ($builder_nextweek->getResultArray() as $key => $value) {
				$dashboard_details['nextweek'] = $value['id']?$value['id']:0;
			}
		}
		 return $dashboard_details;
	}

	public function getHolidaysDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$dashboard_details  = array();
		$id_institute		= $data['id_institute'];
		$id_board		    = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$today				= date('Y-m-d');
		$yesterday 			= date("Y-m-d", strtotime("yesterday"));
		$presentweek        = date("Y-m-d",strtotime("this week"));
		$presentmonth       = date("Y-m-d",strtotime("this month"));
		$nextmonth          = date("Y-m-01",strtotime("next month"));
		$nextweek           = date("Y-m-d",strtotime("+1 week monday 00:00:00"));
		$builder_total = $db->table('holidays e')->selectCount('e.id')->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_total->where('e.id_board',$id_board);
		}
		$builder_total->where('e.status',1);
		$query_total = $builder_total->get();
		if($query_total->getResultArray()){
			foreach ($query_total->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentweek = $db->table('holidays e')->selectCount('e.id')->where('e.end_date <',$nextweek)->where('e.end_date >=',$today)->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_presentweek->where('e.id_board',$id_board);
		}
		$builder_presentweek->where('e.status',1);
		$query_presentweek = $builder_presentweek->get();
		if($query_presentweek->getResultArray()){
			foreach ($query_presentweek->getResultArray() as $key => $value) {
					$dashboard_details['presentweek'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentmonth = $db->table('holidays e')->selectCount('e.id')->where('e.end_date >=',$today)->where('e.end_date <=',$nextmonth)->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_presentmonth->where('e.id_board',$id_board);
		}
		$builder_presentmonth->where('e.status',1);
		$query_presentmonth = $builder_presentmonth->get();
		if($query_presentmonth->getResultArray()){
			foreach ($query_presentmonth->getResultArray() as $key => $value) {
				$dashboard_details['presentmonth'] = $value['id']?$value['id']:0;
			}
		}
		$builder_expired = $db->table('holidays e')->selectCount('e.id')->where('e.end_date <',$today)->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_expired->where('e.id_board',$id_board);
		}
		$builder_expired->where('e.status',1);
		$query_expired = $builder_expired->get();
		if($query_expired->getResultArray()){
			foreach ($query_expired->getResultArray() as $key => $value) {
				$dashboard_details['expired'] = $value['id']?$value['id']:0;
			}
		}
		 return $dashboard_details;
	}
	public function getEventsDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$dashboard_details  = array();
		$id_institute		= $data['id_institute'];
		$id_board		    = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$today				= date('Y-m-d');
		$yesterday 			= date("Y-m-d", strtotime("yesterday"));
		$presentweek        = date("Y-m-d",strtotime("this week"));
		$presentmonth       = date("Y-m-d",strtotime("this month"));
		$nextmonth          = date("Y-m-01",strtotime("next month"));
		$nextweek           = date("Y-m-d",strtotime("+1 week monday 00:00:00"));
		$builder_total = $db->table('events e')->selectCount('e.id')->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_total->where('e.id_board',$id_board);
		}
		$builder_total->where('e.status',1);
		$query_total = $builder_total->get();
		if($query_total->getResultArray()){
			foreach ($query_total->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentweek = $db->table('events e')->selectCount('e.id')->where('e.end_date <',$nextweek)->where('e.end_date >=',$today)->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_presentweek->where('e.id_board',$id_board);
		}
		$builder_presentweek->where('e.status',1);
		$query_presentweek = $builder_presentweek->get();
		if($query_presentweek->getResultArray()){
			foreach ($query_presentweek->getResultArray() as $key => $value) {
					$dashboard_details['presentweek'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentmonth = $db->table('events e')->selectCount('e.id')->where('e.end_date >=',$today)->where('e.end_date <=',$nextmonth)->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_presentmonth->where('e.id_board',$id_board);
		}
		$builder_presentmonth->where('e.status',1);
		$query_presentmonth = $builder_presentmonth->get();
		if($query_presentmonth->getResultArray()){
			foreach ($query_presentmonth->getResultArray() as $key => $value) {
				$dashboard_details['presentmonth'] = $value['id']?$value['id']:0;
			}
		}
		$builder_expired = $db->table('events e')->selectCount('e.id')->where('e.end_date <',$today)->where('e.id_institute',$id_institute)->where('id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder_expired->where('e.id_board',$id_board);
		}
		$builder_expired->where('e.status',1);
		$query_expired = $builder_expired->get();
		if($query_expired->getResultArray()){
			foreach ($query_expired->getResultArray() as $key => $value) {
				$dashboard_details['expired'] = $value['id']?$value['id']:0;
			}
		}
		 return $dashboard_details;
	}

	public function getFeedbackDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_academicyear	= $data['id_academicyear'];
		$dashboard_details  = array();
		$builder_teachnicalopen = $db->table('feedback f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','Technical')->where('f.status',1)->get();
		if($builder_teachnicalopen->getResultArray()){
			foreach ($builder_teachnicalopen->getResultArray() as $key => $value) {
				$dashboard_details['technicalopen'] = $value['id']?$value['id']:0;
			}
		}
		$builder_teachnicalclosed = $db->table('feedback f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','Technical')->where('f.status',0)->get();
		if($builder_teachnicalclosed->getResultArray()){
			foreach ($builder_teachnicalclosed->getResultArray() as $key => $value) {
				$dashboard_details['technicalclosed'] = $value['id']?$value['id']:0;
			}
		}
		$builder_generalopen = $db->table('feedback f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','General')->where('f.status',1)->get();
		if($builder_generalopen->getResultArray()){
			foreach ($builder_generalopen->getResultArray() as $key => $value) {
				$dashboard_details['generalopen'] = $value['id']?$value['id']:0;
			}
		}
		$builder_generalclosed = $db->table('feedback f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','General')->where('f.status',0)->get();
		if($builder_generalclosed->getResultArray()){
			foreach ($builder_generalclosed->getResultArray() as $key => $value) {
				$dashboard_details['generalclosed'] = $value['id']?$value['id']:0;
			}
		}
		return $dashboard_details;
	}
	public function getTicketSystemDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_academicyear	= $data['id_academicyear'];
		$dashboard_details  = array();
		$builder_teachnicalopen = $db->table('ticketsystem f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','Technical')->where('f.status',1)->get();
		if($builder_teachnicalopen->getResultArray()){
			foreach ($builder_teachnicalopen->getResultArray() as $key => $value) {
				$dashboard_details['technicalopen'] = $value['id']?$value['id']:0;
			}
		}
		$builder_teachnicalclosed = $db->table('ticketsystem f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','Technical')->where('f.status',0)->get();
		if($builder_teachnicalclosed->getResultArray()){
			foreach ($builder_teachnicalclosed->getResultArray() as $key => $value) {
				$dashboard_details['technicalclosed'] = $value['id']?$value['id']:0;
			}
		}
		$builder_generalopen = $db->table('ticketsystem f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','General')->where('f.status',1)->get();
		if($builder_generalopen->getResultArray()){
			foreach ($builder_generalopen->getResultArray() as $key => $value) {
				$dashboard_details['generalopen'] = $value['id']?$value['id']:0;
			}
		}
		$builder_generalclosed = $db->table('ticketsystem f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('f.id_academicyear',$id_academicyear)->where('f.type','General')->where('f.status',0)->get();
		if($builder_generalclosed->getResultArray()){
			foreach ($builder_generalclosed->getResultArray() as $key => $value) {
				$dashboard_details['generalclosed'] = $value['id']?$value['id']:0;
			}
		}
		return $dashboard_details;
	}

	public function getCircularDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$dashboard_details  = array();
		$builder_common = $db->table('circular f')->selectCount('f.id')->where('f.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('f.status',1);
		if($id_board!='all'){
			$builder_common->where('f.id_board',$id_board);
		}
		$qry = $builder_common->get();
		if($qry->getResultArray()){
			foreach ($qry->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$dashboard_details['student'] = 0;
		$dashboard_details['staff'] = 0;
		$dashboard_details['common'] = 0;
		
		return $dashboard_details;
	}

	public function getCSTRDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$dashboard_details  = array();
		$builder            = $db->table('class_master cm')->selectCount('cm.id')->where('cm.id_institute',$id_institute)->where('cm.id_academicyear',$id_academicyear)->where('cm.id_board',$id_board)->where('cm.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$dashboard_details['classmaster'] = $value['id']?$value['id']:0;
			}
		}
		$builder_subject            = $db->table('subject_master sm')->selectCount('sm.id')->where('sm.id_institute',$id_institute)->where('sm.id_academicyear',$id_academicyear)->where('sm.id_board',$id_board)->where('sm.status',1)->get();
		if($builder_subject->getResultArray()){
			foreach ($builder_subject->getResultArray() as $key => $value) {
				$dashboard_details['subjectmaster'] = $value['id']?$value['id']:0;
			}
		}
		$builder_room            = $db->table('room_master rm')->selectCount('rm.id')->where('rm.id_institute',$id_institute)->where('rm.id_academicyear',$id_academicyear)->where('rm.id_board',$id_board)->where('rm.status',1)->get();
		if($builder_room->getResultArray()){
			foreach ($builder_room->getResultArray() as $key => $value) {
				$dashboard_details['roommaster'] = $value['id']?$value['id']:0;
			}
		}
		return $dashboard_details;
	}

	public function getUserManagementDashboardDetails($pagedata){
		$db      			= \Config\Database::connect();
		$id_institute		= $pagedata['id_institute'];
		$id_board           = $pagedata['id_board'];
		$id_academicyear    = $pagedata['id_academicyear'];
		$dashboard_details  = array();
		$builder_roles           = $db->table('roles rm')->selectCount('rm.id')->where('rm.status',1)->get();
		if($builder_roles->getResultArray()){
			foreach ($builder_roles->getResultArray() as $key => $value) {
				$dashboard_details['roles'] = $value['id']?$value['id']:0;
			}
		}
		$builder_modules           = $db->table('nav_menu rm')->selectCount('rm.id')->where('rm.status',1)->where('rm.id_parent_menu',0)->get();
		if($builder_modules->getResultArray()){
			foreach ($builder_modules->getResultArray() as $key => $value) {
				$dashboard_details['modules'] = $value['id']?$value['id']:0;
			}
		}

		$builder_employees           = $db->table('employees e')->selectCount('e.id')->where('e.status',1)->get();
		if($builder_employees->getResultArray()){
			foreach ($builder_employees->getResultArray() as $key => $value) {
				$dashboard_details['employees'] = $value['id']?$value['id']:0;
			}
		}
		
		$dashboard_details['mapped'] = 0;
		return $dashboard_details;
	}

	public function getGalleryDashboardDetails($pagedata){
		$db      			= \Config\Database::connect();
		$id_institute		= $pagedata['id_institute'];
		$id_board           = $pagedata['id_board'];
		$id_academicyear    = $pagedata['id_academicyear'];
		$dashboard_details  = array();
		$builder_roles           = $db->table('gallery rm')->selectCount('rm.id')->where('rm.id_institute',$id_institute)->where('rm.id_academicyear',$id_academicyear)->where('rm.id_board',$id_board)->where('rm.status',1)->get();
		if($builder_roles->getResultArray()){
			foreach ($builder_roles->getResultArray() as $key => $value) {
				$dashboard_details['albums'] = $value['id']?$value['id']:0;
			}
		}
		$builder_modules           = $db->table('gallery_images rmi')->selectCount('rmi.id')->join('gallery rm','rm.id = rmi.id_album')->where('rm.id_institute',$id_institute)->where('rm.id_academicyear',$id_academicyear)->where('rm.id_board',$id_board)->where('rm.status',1)->where('rmi.status',1)->get();
		if($builder_modules->getResultArray()){
			foreach ($builder_modules->getResultArray() as $key => $value) {
				$dashboard_details['photographs'] = $value['id']?$value['id']:0;
			}
		}
		return $dashboard_details;
	}
		public function getDairyDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$dashboard_details  = array();
		$id_institute		= $data['id_institute'];
		$id_board		    = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$today				= date('Y-m-d');
		$yesterday 			= date("Y-m-d", strtotime("yesterday"));
		$presentweek        = date("Y-m-d",strtotime("this week"));
		$nextweek           = date("Y-m-d",strtotime("+1 week monday 00:00:00"));
		$builder_total = $db->table('dailydairy a')->selectCount('a.id')->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.status',1);
		if($id_board!='all'){
			$builder_total->where('a.id_board',$id_board);
		}
		$querytotal = $builder_total->get();
		if($querytotal->getResultArray()){
			foreach ($querytotal->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_today = $db->table('dailydairy a')->selectCount('a.id')->where('a.end_date',$today)->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.status',1);
		if($id_board!='all'){
			$builder_today->where('a.id_board',$id_board);
		}
		$querytoday = $builder_today->get();
		
		if($querytoday->getResultArray()){
			foreach ($querytoday->getResultArray() as $key => $value) {
				$dashboard_details['today'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentweek = $db->table('dailydairy a')->selectCount('a.id')->where('a.end_date <',$nextweek)->where('a.end_date >=',$today)->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.status',1);
		if($id_board!='all'){
			$builder_presentweek->where('a.id_board',$id_board);
		}
		$querypresentweek = $builder_presentweek->get();
		if($querypresentweek->getResultArray()){
			foreach ($querypresentweek->getResultArray() as $key => $value) {
					$dashboard_details['presentweek'] = $value['id']?$value['id']:0;
			}
		}
		$builder_nextweek = $db->table('dailydairy a')->selectCount('a.id')->where('a.end_date >',$nextweek)->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.status',1);
		if($id_board!='all'){
			$builder_nextweek->where('a.id_board',$id_board);
		}
		$querynextweek = $builder_nextweek->get();
		if($querynextweek->getResultArray()){
			foreach ($querynextweek->getResultArray() as $key => $value) {
				$dashboard_details['nextweek'] = $value['id']?$value['id']:0;
			}
		}
		
		 return $dashboard_details;
	}
		public function getExamDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$type               = $data['type'];
		$userrole           = $data['userrole'];
		$id_user            = $data['id_user'];
		$dashboard_details  = array();
		$builder_common = $db->table('exams t1')->selectCount('t1.id')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.status',1);
		if($id_board!='all'){
			$builder_common->where('t1.id_board',$id_board);
		}
		if($type && $type=='online'){
			$builder_common->where('t1.type','Online');
		}else if($type && $type=='offline'){
			$builder_common->where('t1.type','Offline');
		}

		if($userrole && $userrole=='staff'){
			$builder_common->where('t1.created_by',$id_user);
		}
		$qry = $builder_common->get();
		if($qry->getResultArray()){
			foreach ($qry->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		
		return $dashboard_details;
	}

	public function getOfflineExamDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$dashboard_details['resultsdeclared']   =0;
		$dashboard_details  = array();
		$builder_common = $db->table('exams t1')->selectCount('t1.id')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.id_board',$id_board)->where('t1.status',1)->get();
		if($builder_common->getResultArray()){
			foreach ($builder_common->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_assessed                = $db->table('exam_assessment_offline t1')->select('t1.id_section,t1.id_exam')->where('t1.status',1)->groupBy('t1.id_section')->get();
		if($builder_assessed->getResultArray()){
			foreach ($builder_assessed->getResultArray() as $mainkey => $mainvalue) {
				$dashboard_details['assessed']   +=1;

			}
		}
		if($dashboard_details['total']>0 && ($dashboard_details['total']-$dashboard_details['assessed']) >0){
			$dashboard_details['notassessed'] 		= $dashboard_details['total']-$dashboard_details['assessed'];
		}else{
			$dashboard_details['notassessed'] 		= 0;
		}
		
		$builder_results                = $db->table('exams_timetable t1')->select('t1.id_exam')->where('t1.status',1)->where('published',1)->get();
		if($builder_results->getResultArray()){
			foreach ($builder_results->getResultArray() as $mainkey => $mainvalue) {
				$dashboard_details['resultsdeclared']   +=1;
			}
		}
		$builder                  = $db->table('preadmission_settings rm')->select('rm.*')->where('rm.id_institute',$id_institute)->where('rm.id_board',$id_board)->where('rm.id_academicyear',$id_academicyear)->orderBy('start_date DESC,end_date DESC')->get();
		$query                    = $builder->getResultArray();
		if($query){
	    	foreach ($query as $pkey => $pvalue) {
                if(strtotime(date('Y-m-d'))<strtotime($pvalue['start_date']) && (strtotime(date('Y-m-d'))<strtotime($pvalue['end_date']))){
                  $dashboard_details['future']['status']   = 'Future';
                  $dashboard_details['future']['titles']   +=1;
                  $dashboard_details['future']['accepted']  = 0;
                  $dashboard_details['future']['rejected']   = 0;
                }else if(strtotime(date('Y-m-d'))>strtotime($pvalue['start_date']) && strtotime(date('Y-m-d'))>strtotime($pvalue['end_date'])){
                  $dashboard_details['expired']['status']   = 'Expired';
                  $dashboard_details['expired']['titles']   +=1;
                  $dashboard_details['expired']['accepted']  = 0;
                  $dashboard_details['expired']['rejected']   = 0;
                }else{
                   $dashboard_details['live']['status']   = 'Live';
                  $dashboard_details['live']['titles']   +=1;
                  $dashboard_details['live']['accepted']  = 0;
                  $dashboard_details['live']['rejected']   = 0;
                }
              }
              
	    }
		return $dashboard_details;
	}

	public function getOnlineExamDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$id_section         = $data['id_section'];
		$id_user            = $data['id_user'];
		$userrole           = $data['userrole'];
		$onlineExamData     = $this->getOnlineExamDetails($pagedata);
		$dashboard_details  = array();
		$mainData           = array();
		$resultData         = array();
		$examDateData       = array();
		$mainData['future_exams'] = 0;
		$mainData['expired_exams'] = 0;
		$builder_common = $db->table('exams t1')->select('*')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('type','Online')->where('t1.status',1);
		if($userrole && $userrole=='staff'){
			$builder_common->where('t1.created_by',$id_user);
		}
		$querydata = $builder_common->get();
		if($querydata->getResultArray()){
			foreach ($querydata->getResultArray() as $key => $value) {
				$sections = explode(',',$value['selected_standards']);
					if($id_section){
							if(in_array($id_section, $sections)){
								if($value['id']){
	                   				$mainData['total_exams'] +=1;
								}else{
									$mainData['total_exams'] = 0;
								}
								foreach ($onlineExamData as $key => $value) {
								if(strtotime($value)>strtotime(date('Y-m-d'))){
									$mainData['future_exams'] +=1;
								}
								if(strtotime($value)<strtotime(date('Y-m-d'))){
									$mainData['expired_exams'] +=1;
								}

							}	
							$mainData['assigned_students'] = 0;	
							foreach ($onlineExamData as $key => $value) {
								if(strtotime($value)>strtotime(date('Y-m-d'))){
									$examDateData[$key] = $value;
								}
							}
							if($examDateData && (min($examDateData)>date('Y-m-d'))){
								$today       = time(); 
			                    $exam_date   = strtotime(min($examDateData));
			                    $mainData['next']['days']      = ceil(abs($exam_date - $today) / 86400);
			                    $hours                         = round(($exam_date-$today) / 3600,2);
			                    $mainData['next']['hours']     = date('H', ($exam_date - $today));
			                    $mainData['next']['minutes']   = date('i', ($exam_date - $today));
							}
						}		
					}else{
						if($value['id']){
	                   		$mainData['total_exams'] +=1;
					    }else{
					    	$mainData['total_exams'] =0;
					    }
					    foreach ($onlineExamData as $key => $value) {
							if(strtotime($value)>strtotime(date('Y-m-d'))){
								$mainData['future_exams']+=1;
							}

							if(strtotime($value)<strtotime(date('Y-m-d'))){
								$mainData['expired_exams'] +=1;
							}
						}
						$mainData['assigned_students'] = 0;
						foreach ($onlineExamData as $key => $value) {
							if($value>date('Y-m-d')){
								$examDateData[$key] = $value;
							}
						}
						if($examDateData && (min($examDateData)>=date('Y-m-d'))){
							$today       = time(); 
		                    $exam_date   = strtotime(min($examDateData));
		                    $mainData['next']['days']      = ceil(abs($exam_date - $today) / 86400);
		                    $hours                         = round(($exam_date-$today) / 3600,2);
		                    $mainData['next']['hours']     = date('H', ($exam_date - $today));
		                    $mainData['next']['minutes']   = date('i', ($exam_date - $today));
						}
					}
			   }	
		   }
		/*$dashboard_details['future_exams'] 				             = 0;
		$dashboard_details['expired_exams'] 	    		         = 0;
		$dashboard_details['assigned_students'] 	                 = 0;
		$dashboard_details['next']['days']                           = 0;
		$dashboard_details['next']['hours']                          = 0;
		$dashboard_details['next']['minutes']                        = 0;*/
		return $mainData;
	}

	public function getOnlineExamDetails($pagedata){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$id_section         = $data['id_section'];
		$mainData           = array();
		$builder            = $db->table('exams_timetable t1')->select('t1.id,t1.id_exam,t3.start_date,t1.id_sections')->join('exams_timetable_subjects t2','t1.id = t2.id_timetable')->join('exams_timetable_subject_schedule t3','t2.id = t3.id_timetable_subject')->where('t1.id = t3.id_timetable')->where('t1.status',1)->where('t2.status',1)->where('t3.status',1)->get();
		if($builder->getResultArray()){
          foreach ($builder->getResultArray() as $key => $value) {
          	$sections = explode(',', $value['id_sections']);
          	if(in_array($id_section, $sections)){
          		$mainData[$key] = $value['start_date'];
          	}else{
          		$mainData[$key] = $value['start_date'];
          	} 
          }
		}
		return $mainData;
	}

	public function getDocumentationDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$dashboard_details  = array();
		$builder_common = $db->table('document_management t1')->selectCount('t1.id')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.status',1)->get();
		if($builder_common->getResultArray()){
			foreach ($builder_common->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_custody = $db->table('document_management t1')->selectCount('t1.id')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.status',1)->where('t1.document_status','incustody')->get();
		if($builder_custody->getResultArray()){
			foreach ($builder_custody->getResultArray() as $key => $value) {
				$dashboard_details['incustody'] = $value['id']?$value['id']:0;
			}
		}
		$builder_returned = $db->table('document_management t1')->selectCount('t1.id')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.status',1)->where('t1.document_status','returned')->get();
		if($builder_returned->getResultArray()){
			foreach ($builder_returned->getResultArray() as $key => $value) {
				$dashboard_details['returned'] = $value['id']?$value['id']:0;
			}
		}
		$builder_expired = $db->table('document_management t1')->selectCount('t1.id')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.status',1)->where('t1.document_status','expired')->get();
		if($builder_expired->getResultArray()){
			foreach ($builder_expired->getResultArray() as $key => $value) {
				$dashboard_details['expired'] = $value['id']?$value['id']:0;
			}
		}
		return $dashboard_details;
	}
	public function getQuestionbankDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$id_institute		= $data['id_institute'];
		$id_board           = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$type               = $data['type'];
		$id_user            = $data['id_user'];
		$userrole           = $data['userrole'];
		$dashboard_details['total_questionpapers'] = 0;
		$dashboard_details  = array();
		if($type && $type=='ams'){
			if($userrole && $userrole=='staff'){
				$builder_all = $db->table('subject s')->select('count(*) as subjectcount , s.subject_standard')->join('takencoursebyteacher t','t.subject_code = s.subject_id ')->get();
			}else{
				$builder_all = $db->table('subject s')->select('count(*) as subjectcount , s.subject_standard')->get();
			}
			
		foreach ($builder_all->getResult() as $row)
			{
			        $dashboard_details['total_subjects'] = $row->subjectcount;
			}
		}else{
			$builder_all = $db->table('standard_subject_mapping s')->select(' count(*) as subjectcount , s.standard')->where('s.id_institute',$id_institute)->where('s.id_board',$id_board)->where('s.id_academicyear',$id_academicyear)->groupBy('s.standard')->get();
		foreach ($builder_all->getResult() as $row)
			{
			        $dashboard_details['total_subjects'] = $row->subjectcount;
			}
		}
		
			$builder_returned = $db->table('question_bank_capters t1')->selectCount('t1.id')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('id_board',$id_board)->where('t1.status',1);
			if($userrole && $userrole=='staff'){
				$builder_returned->where('t1.created_by',$id_user);
			}
			$querydata = $builder_returned->get();
		if($querydata->getResultArray()){
			foreach ($querydata->getResultArray() as $key => $value) {
				$dashboard_details['total_chapters'] = $value['id']?$value['id']:0;
			}
		}
		$builder_returned = $db->table('question_bank_questions t1')->selectCount('t1.id')->join('question_bank_capters t2','t2.id = t1.id_chapter')->where('t2.id_institute',$id_institute)->where('t2.id_academicyear',$id_academicyear)->where('id_board',$id_board)->where('t2.status',1)->where('t2.status',1);
		if($userrole && $userrole=='staff'){
				$builder_returned->where('t1.created_by',$id_user)->where('t2.created_by',$id_user);
			}
			$querydata = $builder_returned->get();
		if($querydata->getResultArray()){
			foreach ($querydata->getResultArray() as $key => $value) {
				$dashboard_details['total_questions'] = $value['id']?$value['id']:0;
			}
		}
		$builder_returned = $db->table('online_set_questions')->select('id')->where('status',1)->groupBy('id_examtimetable')->get();
		if($builder_returned->getResultArray()){
			foreach ($builder_returned->getResultArray() as $key => $value) {
				$dashboard_details['total_questionpapers'] +=1;
				
			}
		}
		return $dashboard_details;
	}
	public function getHostelsDashboardDetails($pagedata){
		$db      			= \Config\Database::connect();
		$id_institute		= $pagedata['id_institute'];
		$id_board           = $pagedata['id_board'];
		$id_academicyear    = $pagedata['id_academicyear'];
		$dashboard_details  = array();
		$builder_blocks     = $db->table('hostel_blocks')->where('id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('id_board',$id_board)->where('status',1)->get();
		if($builder_blocks->getResultArray()){
			foreach ($builder_blocks->getResultArray() as $key => $value) {
				if(isset($value['id'])){
					$dashboard_details['blocks'] +=1;
				}else{
					$dashboard_details['blocks'] =1;
				}
				if(isset($value['no_of_floors'])){
					$dashboard_details['floors'] += $value['no_of_floors'];
				}else{
					$dashboard_details['floors'] =  $value['no_of_floors'];
				}
			}
		}
		$builder_rooms      = $db->table('hostel_rooms t1')->select('t1.*')->join('hostel_blocks t2','t2.id = t1.id_block')->where('t2.id_institute',$id_institute)->where('t2.id_academicyear',$id_academicyear)->where('t2.id_board',$id_board)->where('t1.status',1)->where('t2.status',1)->get();
		if($builder_rooms->getResultArray()){
			foreach ($builder_rooms->getResultArray() as $key => $value) {
				if(isset($value['id'])){
					$dashboard_details['rooms'] +=1;
				}else{
					$dashboard_details['rooms'] =1;
				}
				if(isset($value['no_of_beds'])){
					$dashboard_details['beds'] += $value['no_of_beds'];
				}else{
					$dashboard_details['beds'] =  $value['no_of_beds'];
				}
			}
		}
		$builder_allotted = $db->table('hostel_entry t1')->select('t1.*')->join('hostel_rooms t2','t1.id_room = t2.id')->join('hostel_blocks t3','t3.id = t1.id_block')->where('t3.id_institute',$id_institute)->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1)->get();
		if($builder_allotted->getResultArray()){
			foreach ($builder_allotted->getResultArray() as $key => $value) {
				if(isset($value['id'])){
					$dashboard_details['allotted'] += 1;
				}else{
					$dashboard_details['allotted'] = 1;
				}
			}
		}
		$builder_staffs   = $db->table('hostel_staff_mapping')->select('*')->where('status',1)->get();
		if($builder_staffs->getResultArray()){
			foreach ($builder_staffs->getResultArray() as $key => $value) {
				if(isset($value['UID'])){
					$dashboard_details['allotted_staffs'] += 1;
				}else{
					$dashboard_details['allotted_staffs'] = 1;
				}
			}
		}
		return $dashboard_details;
	}
	public function getTransportationDashboardDetails($pagedata){
		$db      			= \Config\Database::connect();
		$id_institute		= $pagedata['id_institute'];
		$id_board           = $pagedata['id_board'];
		$id_academicyear    = $pagedata['id_academicyear'];
		$dashboard_details  = array();
		$builder_vehicle   = $db->table('transportation_vehicle_master')->select('*')->where('id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('id_board',$id_board)->where('status',1)->get();
		if($builder_vehicle->getResultArray()){
			foreach ($builder_vehicle->getResultArray() as $key => $value) {
				if(isset($value['id'])){
					$dashboard_details['vehicle_count'] += 1;
					$dashboard_details['no_of_seats']   += $value['seating_capacity'];
				}else{
					$dashboard_details['vehicle_count'] = 1;
					$dashboard_details['no_of_seats']   = $value['seating_capacity'];
				}
			}
		}
		$builder_route   = $db->table('transportation_route_master')->select('*')->where('id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('id_board',$id_board)->where('status',1)->get();
		if($builder_route->getResultArray()){
			foreach ($builder_route->getResultArray() as $key => $value) {
				if(isset($value['id'])){
					$dashboard_details['route_count'] += 1;
				}else{
					$dashboard_details['route_count'] = 1;
				}
			}
		}
		$builder_student   = $db->table('transportation_student_route_mapping')->select('*')->where('status',1)->get();
		if($builder_student->getResultArray()){
			foreach ($builder_student->getResultArray() as $key => $value) {
				if(isset($value['id'])){
					$dashboard_details['student_count'] += 1;
				}else{
					$dashboard_details['student_count'] = 1;
				}
			}
		}
		$builder_staff   = $db->table('transportation_staff_mapping')->select('*')->where('status',1)->get();
		if($builder_staff->getResultArray()){
			foreach ($builder_staff->getResultArray() as $key => $value) {
				if(isset($value['UID'])){
					$dashboard_details['staff_count'] += 1;
				}else{
					$dashboard_details['staff_count'] = 1;
				}
			}
		}
		$builder_stops   = $db->table('transportation_route_stops')->select('*')->where('status',1)->get();
		if($builder_stops->getResultArray()){
			foreach ($builder_stops->getResultArray() as $key => $value) {
				if(isset($value['id'])){
					$dashboard_details['stops_count'] += 1;
				}else{
					$dashboard_details['stops_count'] = 1;
				}
			}
		}
        return $dashboard_details;
	}

	public function getExpensesDashboardDetails($data){
		$db      			= \Config\Database::connect();
		$dashboard_details  = array();
		$id_institute		= $data['id_institute'];
		$id_board		    = $data['id_board'];
		$id_academicyear    = $data['id_academicyear'];
		$today				= date('Y-m-d');
		$yesterday 			= date("Y-m-d", strtotime("yesterday"));
		$presentweek        = date("Y-m-d",strtotime("this week"));
		$nextweek           = date("Y-m-d",strtotime("+1 week monday 00:00:00"));
		$dashboard_details['today']        = 0;
		$dashboard_details['yesterday']    = 0;
		$dashboard_details['presentweek']  = 0;
		$dashboard_details['lastweek']     = 0;
		$dashboard_details['presentmonth'] = 0;
		$dashboard_details['lastmonth']    = 0;
		$dashboard_details['presentyear']    = 0;
		$dashboard_details['lastyear']    = 0;
		/*$builder_total = $db->table('assignment a')->selectCount('a.id')->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.id_board',$id_board)->where('a.status',1)->get();
		if($builder_total->getResultArray()){
			foreach ($builder_total->getResultArray() as $key => $value) {
				$dashboard_details['total'] = $value['id']?$value['id']:0;
			}
		}
		$builder_today = $db->table('assignment a')->selectCount('a.id')->where('a.end_date',$today)->where('a.id_institute',$id_institute)->where('a.id_board',$id_board)->where('id_academicyear',$id_academicyear)->where('a.status',1)->get();
		if($builder_today->getResultArray()){
			foreach ($builder_today->getResultArray() as $key => $value) {
				$dashboard_details['today'] = $value['id']?$value['id']:0;
			}
		}
		$builder_presentweek = $db->table('assignment a')->selectCount('a.id')->where('a.end_date <',$nextweek)->where('a.end_date >=',$today)->where('a.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('a.id_board',$id_board)->where('a.status',1)->get();
		if($builder_presentweek->getResultArray()){
			foreach ($builder_presentweek->getResultArray() as $key => $value) {
					$dashboard_details['presentweek'] = $value['id']?$value['id']:0;
			}
		}
		$builder_nextweek = $db->table('assignment a')->selectCount('a.id')->where('a.end_date >',$nextweek)->where('a.id_institute',$id_institute)->where('a.id_board',$id_board)->where('id_academicyear',$id_academicyear)->where('a.status',1)->get();
		if($builder_nextweek->getResultArray()){
			foreach ($builder_nextweek->getResultArray() as $key => $value) {
				$dashboard_details['nextweek'] = $value['id']?$value['id']:0;
			}
		}*/
		
		 return $dashboard_details;
	}
}