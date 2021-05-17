<?php namespace App\Models;

use CodeIgniter\Model;

class Common_model extends Model
{
/*login  and password related*/
	public function get_user_details($UID,$type){
		$db      	= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$board_data 	= array();
		$menuData 		= array();
		$academicData 	= array();
		$maindata       = array();
		$subdata        = array();
		$childmapping   = array();
		$resultdata     = array();
		$builder_new1 	= $db->table('employees e')->select('e.*')->where('e.user_id',$UID)->where('e.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$data[] = $value;
		 }
		return $data;

	}
	/*alumni related*/
	public function getAlumniYearWiseCards(){
		$db      		  	= \Config\Database::connect();
		$mainData           = array();
		$builder          	= $db->table('alumni_profile ap')->select('ap.*')->where('ap.status',1)->where('ap.id',$id)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if($value['year_passout']){
					$mainData[$value['year_passout']]+=1;
				}else{
					$mainData[$value['year_passout']]=0;
				}
			}
		}
		 return $mainData;
	}
	
	public function getAlumniWithId($id){
		$db      		  	= \Config\Database::connect();
		$data 			  	= array();
		$builder          	= $db->table('alumni_profile ap')->select('ap.*')->where('ap.status',1)->where('ap.id',$id)->get();
		$data_profile     	= $builder->getRow();
		$builder_personal 	= $db->table('alumni_profile ap')->select('ap.*')->where('ap.status',1)->where('ap.id',$id)->get();
		$data_personal   	= $builder_personal->getResultArray();
		$builder_profession = $db->table('alumni_professional ap')->select('ap.*')->where('ap.id_alumni',$id)->where('ap.status',1)->get();
		$data_profession 	= $builder_profession->getResultArray();
		$builder_academics 	= $db->table('alumni_academics ap')->select('ap.*')->where('ap.id_alumni',$id)->where('ap.status',1)->get();
		$data_academics     = $builder_academics->getResultArray();
		$builder_attachment = $db->table('alumni_attachments ap')->select('ap.*')->where('ap.id_alumni',$id)->where('ap.status',1)->get();
		$data_attachment    = $builder_attachment->getResultArray();
		$data['profile']    = $data_profile;
		$data['personal']   = $data_personal;
		$data['profession'] = $data_profession;
		$data['academics'] 	= $data_academics;
		$data['attachment'] = $data_attachment; 
		return $data;
	}
	/*alumni related*/
	/*attendance related*/
	public function getAttendanceMessageDetails($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute           = $pagedata['id_institute'];
		$id_academicyear        = $pagedata['id_academicyear'];
		$id_board               = $pagedata['id_board'];
		$maindata               = array();
		$resultdata             = array();
		$selectedstandards      = array();
		$approvalstandards      = array();
		$standardData   		= $this->getStandardDetails($id_board,$id_institute);
		$builder                = $db->table('attendance_message_setting t1')->select('t1.*')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.id_board',$id_board)->where('t1.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $mainkey => $mainvalue) {
				$maindata[$mainvalue['id']] = $mainvalue;
				$selectedstandards[$mainvalue['id']] = explode(',', $mainvalue['realtime_selected_standard']);
				$approvalstandards[$mainvalue['id']] = explode(',', $mainvalue['approval_selected_standard']);
			}
			if($selectedstandards){
				foreach ($selectedstandards as $mainkey => $mainvalue) {
					foreach ($mainvalue as $key => $value) {
						$maindata[$mainkey]['selectedstandards'][$key] = $standardData[$value]?$standardData[$value]:'';
					}
				}
			}
			if($approvalstandards){
				foreach ($approvalstandards as $mainkey => $mainvalue) {
					foreach ($mainvalue as $key => $value) {
						$maindata[$mainkey]['approvedstandards'][$key] = $standardData[$value]?$standardData[$value]:'';
					}
				}
			}
			if($maindata){
				foreach ($maindata as $key => $value) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $value);
				}
			}
             return $resultdata;
		}
	}
	/*attendance related*/
	/*categories related*/
	public function getAllCategories($pagedata){
	 	$db      			= \Config\Database::connect();
	 	$data 				= array();
	 	$id_institute 		= $pagedata['id_institute'];
	 	$id_board     		= $pagedata['id_board'];
	 	$id_academicyear 	= $pagedata['id_academicyear'];
	 	$builder 	= $db->table('category c')->select('c.name')->where('id_institute',$id_institute)->where('id_board',$id_board)->where('id_academicyear',$id_academicyear)->get();
	 	if($builder->getResultArray()){
	 		foreach ($builder->getResultArray() as $key => $value) {
	 			$data[$key] = $value['name'];
	 		}
	 	}
	 	return $data;
	 }
	 /*categories related*/
	 /*common function*/
	 public function getStandardDetails($id_board,$id_institute){
	 	$db      		= \Config\Database::connect();
	 	$standardData   = array();
	 	$builder = $db->table('class_master cm')->select('cm.id,cm.standard,cm.section')->where('cm.id_institute',$id_institute);
	 	if($id_board!='all'){
	 		$builder->where('cm.id_board',$id_board);
	 	}
	 	$querydata = $builder->get();
	 	if($querydata->getResultArray()){
		 	foreach ($querydata->getResultArray() as $key => $value) {
                $standardData[$value['id']]['id']       = $value['id'];
                $standardData[$value['id']]['standard'] = $value['standard'].' '.$value['section'];
                 $standardData[$value['id']]['name']    = $value['standard'].' '.$value['section'];
		 	}
		 	return $standardData;
		 }
	 }
	 public function getStaffDetailsWithUID($id_institute,$id_board,$id_academicyear){
		$db      		= \Config\Database::connect();
		$maindata       = array();
		$builder        = $db->table('staffs_profile t1')->select('t1.first_name as name,t1.UID,t1.middle_name,t1.last_name')->join('user_organization_mapping  t2','t2.id_user = t1.UID')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_academicyear',$id_academicyear)->where('t1.status',1)->where('t2.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $userkey => $uservalue) {
				$maindata[$uservalue['UID']] = $uservalue['name'].' '.$uservalue['middle_name'].' '.$uservalue['last_name'];
			}
			return $maindata;
		}
	}

	public function getStudentCountDetails($id_institute,$id_board,$id_academicyear){
		$db      		= \Config\Database::connect();
		$maindata       = array();
		$builder        = $db->table('students_profile t1')->select('t1.standard')->join('user_organization_mapping  t2','t2.id_user = t1.UID')->join('class_master t3','t1.standard = t3.id')->where('t2.id_institute = t3.id_institute')->where('t2.id_academicyear = t3.id_academicyear')->where('t2.id_board = t3.id_board')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_academicyear',$id_academicyear)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $userkey => $uservalue) {
				if(!isset($maindata[$uservalue['standard']])){
					$maindata[$uservalue['standard']] = 1;
				}else{
					$maindata[$uservalue['standard']] += 1;
				}
				
			}
			return $maindata;
		}
	}

	public function getSubjectDetails($id_institute,$id_board,$id_academicyear){
		$db      		= \Config\Database::connect();
		$maindata       = array();
		$builder        = $db->table('standard_subject_mapping t1')->select('t1.standard,t2.name,t1.subject_id')->join('subject_master  t2','t2.id = t1.subject_id')->where('t1.id_institute',$id_institute)->where('t1.id_board',$id_board)->where('t1.id_academicyear',$id_academicyear)->where('t1.status',1)->where('t2.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $userkey => $uservalue) {
				$maindata[$uservalue['standard']][$uservalue['subject_id']] = $uservalue['name'];
			}
			return $maindata;
		}
	}
	 /*common function*/
	 /*CSTR related*/
	 public function getClassMasterDetails($data){
		$db      				= \Config\Database::connect();
		$resultdata 			= array();
		$maindata               = array();
		$id_institute   		= $data['id_institute'];
		$id_board       		= $data['id_board'];
		$id_academicyear 		= $data['id_academicyear'];
		$sectiondata          	= array();
		$streamdata             = array();
		$room_details           = array();
		$teacher_details        = array();
		$builder_room = $db->table('standard_subject_room_mapping sp')->select('sp.id,sp.id_section,sp.id_room')->where('sp.id_academicyear',$id_academicyear)->where('sp.id_institute',$id_institute)->where('sp.id_board',$id_board)->where('sp.status',1)->get();
		if($builder_room->getResultArray()){
			foreach ($builder_room->getResultArray() as $key => $value) {
				if(isset($value['id_section']) && isset($value['id_room'])){
					$room_details[$value['id_section']][$value['id_room']] += 1;
				}else{
					$room_details[$value['id_section']][$value['id_room']] = 1;
				}
			}
		}
		$builder_teacher = $db->table('standard_subject_staff_mapping sp')->select('sp.id,sp.id_section,sp.id_staff')->where('sp.id_academicyear',$id_academicyear)->where('sp.id_institute',$id_institute)->where('sp.id_board',$id_board)->where('sp.status',1)->get();
		if($builder_teacher->getResultArray()){
			foreach ($builder_teacher->getResultArray() as $key => $value) {
				if(isset($value['id_section']) && isset($value['id_staff'])){
					$teacher_details[$value['id_section']][$value['id_staff']] += 1;
				}else{
					$teacher_details[$value['id_section']][$value['id_staff']] = 1;
				}
			}
		}
		$builder         = $db->table('class_master cm')->select('cm.*')->where('cm.id_institute',$id_institute)->where('cm.id_academicyear',$id_academicyear)->where('cm.id_board',$id_board)->get();
		$query = $builder->getResultArray();
		foreach ($query as $key => $value) {
				$resultdata[$key]['id'] = $value['id'];
				$resultdata[$key]['standard'] = $value['standard'];
				$resultdata[$key]['section'] = $value['section'];
				$resultdata[$key]['streams'] = $value['streams'];
				$resultdata[$key]['stream_update'] = $value['stream_update'];
				$resultdata[$key]['selected_stream'] = $value['selected_stream'];
				$resultdata[$key]['id_academic'] = $value['id_academic'];
				$resultdata[$key]['room_count'] = $room_details[$value['id']]?count($room_details[$value['id']]):0;
				$resultdata[$key]['teacher_count'] = $teacher_details[$value['id']]?count($teacher_details[$value['id']]):0;
				$resultdata[$key]['status'] = $value['status'];
		}
		return $resultdata;
	}
	public function getClassMapDetails($data){
		$db      				= \Config\Database::connect();
		$resultdata 			= array();
		$maindata               = array();
		$id_institute   		= $data['id_institute'];
		$id_board       		= $data['id_board'];
		$id_academicyear 		= $data['id_academicyear'];
		$standard 		        = $data['standard'];
		$sectiondata          	= array();
		$streamdata             = array();
		$builder         = $db->table('class_master cm')->select('cm.*')->where('cm.status',1)->where('cm.id_institute',$id_institute)->where('cm.id_academicyear',$id_academicyear)->where('cm.id_board',$id_board)->where('cm.standard',$standard)->get();
		$query = $builder->getResultArray();
		foreach ($query as $key => $value) {
			$resultdata[$key]['id'] = $value['id'];
			$resultdata[$key]['standard'] = $value['standard'].''.$value['section'];
			if($value['streams']){
				$resultdata[$key]['stream'] = explode(",", $value['streams']);
			}
			if($value['selected_stream']){
				$resultdata[$key]['selectedstream'] = explode(",", $value['selected_stream']);
			}
		}
		return $resultdata;
	}
	/*CSTR related*/

	/*event related*/
	public function getEventData($data){
		$db      				= \Config\Database::connect();
		$resultdata 			= array();
		$resdata                =  array();
		$id_institute           = $data['id_institute'];
		$id_board               = $data['id_board'];
		$id_academicyear        = $data['id_academicyear'];
		$id_section             = $data['id_section'];
		$id_dept                = $data['id_dept'];
		$type                   = $data['type'];
		if($type=='student'){
			$builder         = $db->table('events h')->select('h.*')->where('h.id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder->where('h.id_board',$id_board);
		}
		$query = $builder->get();
			if($query->getResultArray()){
				foreach ($query->getResultArray() as $hkey => $hvalue) {
				  if(isset($id_section) && $id_section!=''){
				  	if(isset($hvalue['student_applicable']) &&  in_array($id_section, explode(',', $hvalue['student_applicable']))){
				  		$resultdata[] = $hvalue;
				  	}
				  }else{
				  	    $resultdata[$hkey]['id'] 					= $hvalue['id'];
				  		$resultdata[$hkey]['title'] 				= $hvalue['title'];
				  		$resultdata[$hkey]['start_date'] 			= $hvalue['start_date'];
				  		$resultdata[$hkey]['end_date'] 				= $hvalue['end_date'];
				  		$resultdata[$hkey]['day_difference'] 		= $hvalue['day_difference'];
				  		$resultdata[$hkey]['description'] 			= strip_tags($hvalue['description']);
				  		$resultdata[$hkey]['path'] 					= $hvalue['path'];
				  		$resultdata[$hkey]['student_applicable'] 	= $hvalue['student_applicable'];
				  		$resultdata[$hkey]['staff_applicable']      = $hvalue['staff_applicable'];
				  		$resultdata[$hkey]['status']			    = $hvalue['status'];
				  }
				}	
			}
		}else if($type=='staff'){
			$builder         = $db->table('events h')->select('h.*')->where('h.id_academicyear',$id_academicyear);
		if($id_board!='all'){
			$builder->where('h.id_board',$id_board);
		}
		$query = $builder->get();
			if($query->getResultArray()){
				foreach ($query->getResultArray() as $hkey => $hvalue) {
				  if(isset($id_dept) && $id_dept!=''){
				  	if(isset($hvalue['staff_applicable']) &&  in_array($id_dept, explode(',', $hvalue['staff_applicable']))){
				  		$resultdata[] = $hvalue;
				  	}
				  }else{
				  	    $resultdata[$hkey]['id'] 				= $hvalue['id'];
				  		$resultdata[$hkey]['title'] 			= $hvalue['title'];
				  		$resultdata[$hkey]['start_date'] 		= $hvalue['start_date'];
				  		$resultdata[$hkey]['end_date'] 			= $hvalue['end_date'];
				  		$resultdata[$hkey]['day_difference'] 	= $hvalue['day_difference'];
				  		$resultdata[$hkey]['description'] 		= strip_tags($hvalue['description']);
				  		$resultdata[$hkey]['path'] 				= $hvalue['path'];
				  		$resultdata[$hkey]['student_applicable'] = $hvalue['student_applicable'];
				  		$resultdata[$hkey]['staff_applicable'] 	= $hvalue['staff_applicable'];
				  		$resultdata[$hkey]['status'] 			= $hvalue['status'];
				  }
				}	
			}
		}
		
		return $resultdata;
	}
	/*event related*/
	/*exam related*/
	public function getExamDataDetails($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$mainData               = array();           
		$builder                = $db->table('exams_timetable t1')->select('t1.id,t3.start_date,t3.start_time,t2.id as id_timetable_subject')->join('exams_timetable_subjects t2','t1.id = t2.id_timetable')->join('exams_timetable_subject_schedule t3','t2.id_timetable = t3.id_timetable')->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$mainData[$value['id']]['start_date'][$key] = $value['start_date'];
				$mainData[$value['id']][$value['id_timetable_subject']]['start_date']= $value['start_date'];
				$mainData[$value['id']][$value['id_timetable_subject']]['start_time']= $value['start_time'];
			}
		}
		return $mainData;
	}
	public function getExamRoomCountDetails($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$maindata               = array();
		$resultdata             = array();
		$builder = $db->table('exam_timetable_room_allocation t1')->select('t1.*')->join('exams t2','t2.id = t1.id_exam')->where('t2.id_academicyear',$id_academicyear)->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if(isset($value['id_exam'])){
					$mainData[$value['id_exam']] +=1;
				}else{
					$mainData[$value['id_exam']] =1;
				}
			}
		}
		return $mainData;
	}
	/*done chnage this */
	public function getExamDetails($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$resultdata             = array();
		$standardetails         = array();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$type 		            = $pagedata['type'];
		$id                     = $pagedata['id'];
		$userrole               = $pagedata['userrole'];
		$id_user                = $pagedata['id_user'];
		$standardData   		= $this->getStandardDetails($id_board,$id_institute);
		$examData               = $this->getExamDataDetails($pagedata);
		$roomData               = $this->getExamRoomCountDetails($pagedata);
		$studentCount           = $this->getStudentCountDetails($id_institute,$id_board,$id_academicyear);
		$builder = $db->table('exams t1')->select('t1.*')->where('t1.id_academicyear',$id_academicyear)->where('t1.id_institute',$id_institute)->where('t1.id_board',$id_board)->orderBy('t1.status DESC');
		if($type && $type=='online'){
			$builder->where('t1.type','Online');
		}else if($type && $type=='offline'){
			$builder->where('t1.type','Offline');
		}
		if($id){
			$builder->where('t1.id',$id);
		}
		if($userrole && $userrole=='staff'){
			$builder->where('t1.created_by',$id_user);
		}
		$querydata = $builder->get();
		if($querydata->getResultArray()){
			foreach ($querydata->getResultArray() as $examkey => $examvalue) {
				 $maindata[$examvalue['id']]['id']                   = $examvalue['id'];
				// $maindata[$examvalue['id']]['id_timetable']         = $examvalue['id_timetable'];
                 $maindata[$examvalue['id']]['id_institute']         = $examvalue['id_institute'];
                 $maindata[$examvalue['id']]['id_academicyear']      = $examvalue['id_academicyear'];
                 $maindata[$examvalue['id']]['id_board']             = $examvalue['id_board'];
                 $maindata[$examvalue['id']]['name']                 = $examvalue['name'];
                 $maindata[$examvalue['id']]['type']                 = $examvalue['type'];
                 $maindata[$examvalue['id']]['selected_standards']   = $examvalue['selected_standards'];
                 $maindata[$examvalue['id']]['selected_batches']     = $examvalue['selected_batches'];
                 $maindata[$examvalue['id']]['status']               = $examvalue['status'];
               //  $maindata[$examvalue['id']]['start_date']           = $examData[$examvalue['id_timetable']]['start_date']?min($examData[$examvalue['id_timetable']]['start_date']):'';
               //  $maindata[$examvalue['id']]['end_date']             = $examData[$examvalue['id_timetable']]['start_date']?max($examData[$examvalue['id_timetable']]['start_date']):'';
                /* if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date']){
                 	$maindata[$examvalue['id']]['start_end_date']       = date('M d,Y',strtotime($maindata[$examvalue['id']]['start_date'])).' - '.date('M d,Y',strtotime($maindata[$examvalue['id']]['end_date']));
                 }else{
                 	$maindata[$examvalue['id']]['start_end_date']       = '';
                 }*/
                 
                /* if($maindata[$examvalue['id']]['start_date']>date('Y-m-d')){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Upcoming';
                 }else if($maindata[$examvalue['id']]['start_date']>date('Y-m-d') && $maindata[$examvalue['id']]['end_date']<date('Y-m-d')){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Ongoing';
                 }else if($maindata[$examvalue['id']]['start_date']!='' && $maindata[$examvalue['id']]['start_date']<date('Y-m-d') && $maindata[$examvalue['id']]['end_date']!='' && $maindata[$examvalue['id']]['end_date']<date('Y-m-d')){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Finished';
                 }else{
                 	$maindata[$examvalue['id']]['exam_status']             = '';
                 }*/
                 $maindata[$examvalue['id']]['room_count']                 = $roomData[$examvalue['id']]?$roomData[$examvalue['id']]:0;
                 if($examvalue['selected_standards']){
                   $maindata[$examvalue['id']]['standardcount']      = count(explode(',', $examvalue['selected_standards']));
                   $standardetails[$examvalue['id']]                 = explode(',', $examvalue['selected_standards']);
                 }
			}
			if($standardetails){
				foreach ($standardetails as $examkey => $examvalue) {
					foreach ($examvalue as $key => $value) {
						if($studentCount[$value]){
							$maindata[$examkey]['students_count'] += $studentCount[$value];
						}
						$maindata[$examkey]['appreared'] = 0;
						if($standardData[$value]['id']){
							$maindata[$examkey]['selectedstandard'][$key]['id'] = $standardData[$value]['id']?$standardData[$value]['id']:'';
						 $maindata[$examkey]['selectedstandard'][$key]['name'] = $standardData[$value]['standard']?$standardData[$value]['standard']:'';
						}else{
							$maindata[$examkey]['selectedstandard'][$key]['id'] = $value;
						    $maindata[$examkey]['selectedstandard'][$key]['name'] = '';
						}	 
					}

				}
			}
			if($maindata){
				foreach ($maindata as $mainkey => $mainvalue) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $mainvalue);
				}
			}
			return $resultdata;
		}
	}
	public function getExamDetails1($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$resultdata             = array();
		$standardetails         = array();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$type 		            = $pagedata['type'];
		$id                     = $pagedata['id'];
		$standardData   		= $this->getStandardDetails($id_board,$id_institute);
		$examData               = $this->getExamDataDetails($pagedata);
		$roomData               = $this->getExamRoomCountDetails($pagedata);
		$studentCount           = $this->getStudentCountDetails($id_institute,$id_board,$id_academicyear);
		$builder = $db->table('exams t1')->select('t1.*,t2.id as id_timetable')->join('exams_timetable t2','t1.id = t2.id_exam')->where('t1.id_academicyear',$id_academicyear)->where('t1.id_institute',$id_institute)->where('t1.id_board',$id_board)->orderBy('t1.status DESC');
		if($type && $type=='online'){
			$builder->where('t1.type','Online');
		}else if($type && $type=='offline'){
			$builder->where('t1.type','Offline');
		}
		if($id){
			$builder->where('t1.id',$id);
		}
		$querydata = $builder->get();
		if($querydata->getResultArray()){
			foreach ($querydata->getResultArray() as $examkey => $examvalue) {
				 $maindata[$examvalue['id']]['id']                   = $examvalue['id'];
				 $maindata[$examvalue['id']]['id_timetable']         = $examvalue['id_timetable'];
                 $maindata[$examvalue['id']]['id_institute']         = $examvalue['id_institute'];
                 $maindata[$examvalue['id']]['id_academicyear']      = $examvalue['id_academicyear'];
                 $maindata[$examvalue['id']]['id_board']             = $examvalue['id_board'];
                 $maindata[$examvalue['id']]['name']                 = $examvalue['name'];
                 $maindata[$examvalue['id']]['type']                 = $examvalue['type'];
                 $maindata[$examvalue['id']]['selected_standards']   = $examvalue['selected_standards'];
                 $maindata[$examvalue['id']]['selected_batches']     = $examvalue['selected_batches'];
                 $maindata[$examvalue['id']]['status']               = $examvalue['status'];
                 $maindata[$examvalue['id']]['start_date']           = $examData[$examvalue['id_timetable']]['start_date']?min($examData[$examvalue['id_timetable']]['start_date']):'';
                 $maindata[$examvalue['id']]['end_date']             = $examData[$examvalue['id_timetable']]['start_date']?max($examData[$examvalue['id_timetable']]['start_date']):'';
                 if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date']){
                 	$maindata[$examvalue['id']]['start_end_date']       = date('M d,Y',strtotime($maindata[$examvalue['id']]['start_date'])).' - '.date('M d,Y',strtotime($maindata[$examvalue['id']]['end_date']));
                 }else{
                 	$maindata[$examvalue['id']]['start_end_date']       = '';
                 }
                /* if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date'] && ($maindata[$examvalue['id']]['start_date'] > date('Y-m-d') && $maindata[$examvalue['id']]['end_date'] > date('Y-m-d'))){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Upcoming';
                 }else if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date'] && ($maindata[$examvalue['id']]['start_date'] >= date('Y-m-d') && $maindata[$examvalue['id']]['end_date'] <= date('Y-m-d'))){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Ongoing';
                 }else if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date'] && ($maindata[$examvalue['id']]['start_date'] < date('Y-m-d') && $maindata[$examvalue['id']]['end_date'] < date('Y-m-d'))){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Completed';
                 }else{
                 	$maindata[$examvalue['id']]['exam_status']             = '';
                 }*/

                 if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date'] && (strtotime($maindata[$examvalue['id']]['start_date']) > strtotime(date('Y-m-d')) && strtotime($maindata[$examvalue['id']]['end_date']) > strtotime(date('Y-m-d')))){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Upcoming';
                 }else if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date'] && (strtotime($maindata[$examvalue['id']]['start_date']) <= strtotime(date('Y-m-d')) && strtotime($maindata[$examvalue['id']]['end_date']) >= strtotime(date('Y-m-d')))){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Ongoing';
                 }else if($maindata[$examvalue['id']]['start_date'] && $maindata[$examvalue['id']]['end_date'] && (strtotime($maindata[$examvalue['id']]['start_date']) < strtotime(date('Y-m-d')) && strtotime($maindata[$examvalue['id']]['end_date']) < strtotime(date('Y-m-d')))){
                 	$maindata[$examvalue['id']]['exam_status']             = 'Completed';
                 }else{
                 	$maindata[$examvalue['id']]['exam_status']             = '';
                 }
                 $maindata[$examvalue['id']]['room_count']                 = $roomData[$examvalue['id']]?$roomData[$examvalue['id']]:0;
                 if($examvalue['selected_standards']){
                   $maindata[$examvalue['id']]['standardcount']      = count(explode(',', $examvalue['selected_standards']));
                   $standardetails[$examvalue['id']]                 = explode(',', $examvalue['selected_standards']);
                 }
			}
			if($standardetails){
				foreach ($standardetails as $examkey => $examvalue) {
					foreach ($examvalue as $key => $value) {
						if($studentCount[$value]){
							$maindata[$examkey]['students_count'] += $studentCount[$value];
						}
						$maindata[$examkey]['appreared'] = 0;
						if($standardData[$value]['id']){
							$maindata[$examkey]['selectedstandard'][$key]['id'] = $standardData[$value]['id']?$standardData[$value]['id']:'';
						 $maindata[$examkey]['selectedstandard'][$key]['name'] = $standardData[$value]['standard']?$standardData[$value]['standard']:'';
						}else{
							$maindata[$examkey]['selectedstandard'][$key]['id'] = $value;
						    $maindata[$examkey]['selectedstandard'][$key]['name'] = '';
						}	 
					}

				}
			}
			if($maindata){
				foreach ($maindata as $mainkey => $mainvalue) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $mainvalue);
				}
			}
			return $resultdata;
		}
	}
	/*done chnage this */

	public function getExamStandardWiseDetails($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$resultdata             = array();
		$standardetails         = array();
		$secondData             = array();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_section             = $pagedata['id_section'];
		$builder = $db->table('exams t1')->select('t1.*')->where('t1.id_academicyear',$id_academicyear)->where('t1.id_institute',$id_institute)->where('t1.id_board',$id_board)->orderBy('t1.status DESC')->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $examkey => $examvalue) {
				 $maindata[$examvalue['id']]['id']                   = $examvalue['id'];
                 $maindata[$examvalue['id']]['id_institute']         = $examvalue['id_institute'];
                 $maindata[$examvalue['id']]['id_academicyear']      = $examvalue['id_academicyear'];
                 $maindata[$examvalue['id']]['id_board']             = $examvalue['id_board'];
                 $maindata[$examvalue['id']]['name']                 = $examvalue['name'];
                 $maindata[$examvalue['id']]['type']                 = $examvalue['type'];
                 $maindata[$examvalue['id']]['selected_standards']   = $examvalue['selected_standards'];
                 $maindata[$examvalue['id']]['selected_batches']     = $examvalue['selected_batches'];
                 $maindata[$examvalue['id']]['status']               = $examvalue['status'];
                 if($examvalue['selected_standards']){
                   $maindata[$examvalue['id']]['standardcount']      = count(explode(',', $examvalue['selected_standards']));
                   $standardetails[$examvalue['id']]                 = explode(',', $examvalue['selected_standards']);
                 }
			}
			if($standardetails){
				foreach ($standardetails as $examkey => $examvalue) {
					foreach ($examvalue as $key => $value) {
						if($id_section && ($value==$id_section)){
							$secondData[$examkey][$value] = $maindata[$examkey]; 
						    $secondData[$examkey][$value]['id_section'] = $value;					 
						}else{
							$secondData[$examkey][$value] = $maindata[$examkey]; 
						    $secondData[$examkey][$value]['id_section'] = $value;					 
						}	
					}

				}
			}
			if($secondData){
				foreach ($secondData as $mainkey => $mainvalue) {
					foreach ($mainvalue as $seckey => $secvalue) {
						if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $secvalue);
					}	
				}
			}
			return $resultdata;
		}
	}

	public function getBatchStudentMappedDetails($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute 			= $pagedata['id_institute'];
		$id_board 	    		= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_batch 				= $pagedata['id_batch'];
		$type 				    = $pagedata['type'];
		if($type && $type=="ams"){
				$builder = $db->table('exam_batch_student t1')->select('t1.id,t1.id_user,t2.name as batchname')->join('exam_batches t2','t2.id = t1.id_batch')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_academicyear',$id_academicyear)->where('t2.id',$id_batch)->where('t1.status',1)->where('t2.status',1)->get();
			return $builder->getResultArray();
		}else{
			$builder = $db->table('exam_batch_student t1')->select('t1.id,t3.UID,t3.id as roll_no,t3.father_name,t3.	contact_number,t2.name as batchname,t3.name as student_name,t5.standard as standard ,t5.section as section')->join('exam_batches t2','t2.id = t1.id_batch')->join('students_profile t3','t3.UID = t1.id_user')->join('user_organization_mapping t4','t4.id_user = t3.UID')->join('class_master t5','t3.standard = t5.id')->where('t2.id_institute = t4.id_institute')->where('t2.id_academicyear = t4.id_academicyear')->where('t2.id_board = t4.id_board')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_academicyear',$id_academicyear)->where('t2.id',$id_batch)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1)->where('t4.status',1)->where('t5.status',1)->get();
			return $builder->getResultArray();
		}
		
	}
	/*exam related*/
	/*offline exam related*/
	public function getOfflineExamAssessment($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$resultdata             = array();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_section             = $pagedata['id_section'];
		$id_exam                = $pagedata['id_exam'];
		$standardData   		= $this->getStandardDetails($id_board,$id_institute);
		$assessmentSubjectsData = $this->getAssessmentSubjectsDetails($pagedata);
		$builder                = $db->table('students_profile t1')->select('t1.id,t1.UID,t1.name,t1.middle_name,t1.last_name,t1.standard')->join('user_organization_mapping t2','t1.UID = t2.id_user')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_board',$id_board)->where('t1.standard',$id_section)->where('t1.status',1)->where('t2.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $mainkey => $mainvalue) {
				$maindata[$mainvalue['UID']]['id'] = $mainvalue['id'];
				$maindata[$mainvalue['UID']]['UID'] = $mainvalue['UID'];
				$maindata[$mainvalue['UID']]['name'] = $mainvalue['name'].' '.$mainvalue['middle_name'].' '.$mainvalue['last_name'];
				$maindata[$mainvalue['UID']]['standard'] = $standardData[$mainvalue['standard']]['standard'];
				if($assessmentSubjectsData){
					if($assessmentSubjectsData['attendance_considered']==1){
						$maindata[$mainvalue['UID']]['total_attendance'] = '';
						$maindata[$mainvalue['UID']]['attendant']        = '';
						$maindata[$mainvalue['UID']]['comment']          = '';
					}
					if($assessmentSubjectsData[$mainvalue['standard']]){
						foreach ($assessmentSubjectsData[$mainvalue['standard']] as $key => $value) {
							$maindata[$mainvalue['UID']][$key] = $value;
						}
					}
					
				//	$maindata[$mainvalue['UID']]['subjects']  = $assessmentSubjectsData['sub'];
				}
			}
			if($maindata){
				foreach ($maindata as $key => $value) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $value);
				}
			}
			return $resultdata;
		}

	}
	
	public function getOfflineExamAssessedDetals(){
		$db      				= \Config\Database::connect();
		$resultdata             = array();
		$builder                = $db->table('exam_assessment_offline t1')->select('t1.id_exam,t1.id_section')->where('t1.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $mainkey => $mainvalue) {
				$resultdata[$mainvalue['id_exam']][$mainvalue['id_section']] = 'Yes';

			}
		}
		return $resultdata;
	}

	public function insertOfflineExamAssessment($data){
		 $db      = \Config\Database::connect();
		 $builder = $db->table('exam_assessment_offline')->insertBatch($data);
		 return;		  
	}
	/*offline exam related*/
	/*exam attendance related*/
	public function getExamAttendanceDetails($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$subjectDetails         = $this->getSubjectDetails($id_institute,$id_board,$id_academicyear);
		$standardData   		= $this->getStandardDetails($id_board,$id_institute);
		$maindata               = array();
		$resultdata             = array();
		$builder = $db->table('exam_attendance_mapping t1')->select('t1.id,t2.UID,t2.name,t2.middle_name,t2.last_name,t2.standard,t5.name as exam_name,t1.id_subject')->join('students_profile t2','t2.UID = t1.id_user')->join('user_organization_mapping t3','t2.UID = t3.id_user')->join('exams t5','t5.id = t1.id_exam')->where('t5.id_institute',$id_institute)->where('t5.id_academicyear',$id_academicyear)->where('t5.id_board',$id_board)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1)->where('t5.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $mainkey => $mainvalue) {
				if($subjectDetails && $subjectDetails[$mainvalue['standard']] && $standardData && $standardData[$mainvalue['standard']]){
					$maindata[$mainkey]['id']  				= $mainvalue['id'];
					$maindata[$mainkey]['UID']  		    = $mainvalue['UID'];
					$maindata[$mainkey]['exam_name']  		= $mainvalue['exam_name'];
					$maindata[$mainkey]['student'] 			= $mainvalue['name'].' '.$mainvalue['middle_name'].' '.$mainvalue['last_name'];
					$maindata[$mainkey]['standard']  		= $standardData[$mainvalue['standard']]['standard'];
					$maindata[$mainkey]['subject']  		= $subjectDetails[$mainvalue['standard']][$mainvalue['id_subject']];
				}
			}
			if($maindata){
				foreach ($maindata as $key => $value) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $value);
				}
			}
		}
		return $resultdata;
	}

	/*exam attendance related*/
	/*Exam timetable related*/
	public function getExamTimetableData($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$id_exam    			= $pagedata['id_exam'];
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_section    			= $pagedata['id_section'];
		$selectedData           = array();
		$resultdata             = array();
		$staffDetails           = $this->getStaffDetailsWithUID($id_institute,$id_board,$id_academicyear);
		$subjectDetails         = $this->getSubjectDetails($id_institute,$id_board,$id_academicyear);
		$standardData   		= $this->getStandardDetails($id_board,$id_institute);
		$builder = $db->table('exams_timetable_subjects t1')->select('t1.id,t1.id_timetable,t1.id_subject,t1.exam_date,t1.start_time,t1.end_time,t1.internal_max_marks,t1.	internal_min_marks,t1.exam_max_marks,t1.exam_min_marks,t1.invigilator,t1.status,t2.id_exam,t2.id_section,t1.room_no,t3.name as exam_name,t3.selected_standards')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->where('t3.id_institute',$id_institute)->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t3.id',$id_exam)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1);
		if($id_section){
			$builder->where('t2.id_section',$id_section);
		}

		$querydata  = $builder->get();
		if($querydata->getResultArray()){
			//date_default_timezone_set('Asia/Kolkata');
			foreach ($querydata->getResultArray() as $key => $value) {
				if($value['selected_standards']){
					$selectedData[$value['id']] = explode(',', $value['selected_standards']);
				}
				$maindata[$value['id']]['id'] 					= $value['id'];
				$maindata[$value['id']]['id_timetable'] 		= $value['id_timetable'];
				$maindata[$value['id']]['exam_name'] 		    = $value['exam_name'];
				$maindata[$value['id']]['selected_standards'] 	= $value['selected_standards'];
				$maindata[$value['id']]['id_subject'] 	        = $value['id_subject'];
				$maindata[$value['id']]['subject'] 		        = $subjectDetails[$value['id_section']][$value['id_subject']]?$subjectDetails[$value['id_section']][$value['id_subject']]:'';
				$maindata[$value['id']]['exam_date'] 			= $value['exam_date'];
				$maindata[$value['id']]['time'] 				= $value['start_time'].' to '.$value['end_time'];
				$maindata[$value['id']]['internal_max_marks'] 	= $value['internal_max_marks'];
				$maindata[$value['id']]['internal_min_marks'] 	= $value['internal_min_marks'];
				$maindata[$value['id']]['exam_max_marks'] 		= $value['exam_max_marks'];
				$maindata[$value['id']]['exam_min_marks'] 		= $value['exam_min_marks'];
				$maindata[$value['id']]['status'] 		        = $value['status'];
				$maindata[$value['id']]['id_exam'] 		        = $value['id_exam'];
				$maindata[$value['id']]['id_section'] 		    = $value['id_section'];
				$maindata[$value['id']]['examdate_time'] 		= date('j M',$value['exam_date']).', '.$value['start_time'];
				$maindata[$value['id']]['room_no'] 		        = $value['room_no'];
				$maindata[$value['id']]['invigilator'] 		    = $staffDetails[$value['invigilator']]?$staffDetails[$value['invigilator']]:'';

			}
			if($selectedData){
				foreach ($selectedData as $exam_key => $examvalue) {
					foreach ($examvalue as $key => $value) {
						$maindata[$exam_key]['selectedstandard'][$key]['id'] = $standardData[$value]['id']?$standardData[$value]['id']:'';
						$maindata[$exam_key]['selectedstandard'][$key]['name'] = $standardData[$value]['standard']?$standardData[$value]['standard']:'';
					}
					
				}
			}
			if($maindata){
				foreach ($maindata as $mainkey => $mainvalue) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $mainvalue);
				}
			}
			return $resultdata;

		}
	}

	public function getExamTimetableDetailsNew($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$standardData   = $this->getStandardDetails($id_board,$id_institute);
		$studentCount   = $this->getStudentCountDetails($id_institute,$id_board,$id_academicyear);
		$builder = $db->table('exams_timetable_subjects t1')->select('t1.id,t1.id_timetable,t1.id_subject_master,t1.invigilator,t1.status,t2.id_exam,t2.id_sections,t3.name as exam_name')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t3.id_institute',$id_institute)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1)->get();
		if($builder->getResultArray()){
			$today = date("Y-m-d");
			foreach ($builder->getResultArray() as $key => $value) {
				$maindata[$key]['id'] 			= $value['id'];
				$maindata[$key]['exam_name'] 	= $value['exam_name'];
				$maindata[$key]['standard'] 	= $standardData[$value['id_section']]['standard']?$standardData[$value['id_section']]['standard']:'';
				$maindata[$key]['studentcount'] 	= $studentCount[$value['id_section']]?$studentCount[$value['id_section']]:'';
				$maindata[$key]['generated'] 	= 0;
				$maindata[$key]['from_date'] 	= $value['from_date'];
				$maindata[$key]['to_date'] 		= $value['to_date'];
				$maindata[$key]['id_section']   = $value['id_section'];
				$maindata[$key]['status'] 		= $value['status'];
				if(strtotime($today)>strtotime($value['to_date'])){
					$maindata[$key]['exam_status'] 			= 'Finished';
				}else{
					$maindata[$key]['exam_status'] 			= 'Pending';
				}

			}
		}
		return $builder->getResultArray();
	}

	public function getClassWiseExamTimetableData($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_section 		    = $pagedata['id_section'];
		$mindate                = array();
		$maxdate                = array();
		$resultdata             = array();
		$standardData           = $this->getStandardDetails($id_board,$id_institute);
		$studentCount           = $this->getStudentCountDetails($id_institute,$id_board,$id_academicyear);
		$accessesDetails        = $this->getOfflineExamAssessedDetals();
		$builder = $db->table('exams_timetable_subjects t1')->select('t1.id,t1.id_timetable,t1.id_subject_master,t1.invigilator,t2.status,t2.id_exam,t1.id_section,t3.name as exam_name,t2.published as published')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t3.id_institute',$id_institute)->where('t1.status',1)->where('t3.status',1)->orderBy('t2.status DESC');
		if($id_section){
			$builder->where('t1.id_section',$id_section);
		}
		$querydata = $builder->get();
		if($querydata->getResultArray()){
			$today = date("Y-m-d");
			foreach ($querydata->getResultArray() as $key => $value) {
				$maindata[$value['id_timetable']]['id_timetable'] 	= $value['id_timetable'];
				$maindata[$value['id_timetable']]['id_exam'] 		= $value['id_exam'];
				$maindata[$value['id_timetable']]['id_section'] 	= $value['id_section'];
				$maindata[$value['id_timetable']]['exam_name'] 		= $value['exam_name'];
				$maindata[$value['id_timetable']]['standard'] 	    = $standardData[$value['id_section']]['standard']?$standardData[$value['id_section']]['standard']:'';
				$maindata[$value['id_timetable']]['studentcount'] 	= $studentCount[$value['id_section']]?$studentCount[$value['id_section']]:'';	
				$maindata[$value['id_timetable']]['status'] 		= $value['status'];
				$maindata[$value['id_timetable']]['assessed'] 	    = $accessesDetails[$value['id_exam']][$value['id_section']]?$accessesDetails[$value['id_exam']][$value['id_section']]:'No';
				$maindata[$value['id_timetable']]['published'] 		= $value['published'];
				$mindate[$value['id_timetable']][$key]              = $value['exam_date'];
			}
			if($mindate){
				foreach ($mindate as $idtimetable => $idvalue) {
					$maindata[$idtimetable]['from_date'] 	= min($idvalue);
					$maindata[$idtimetable]['to_date'] 	    = max($idvalue);
					if(strtotime($today)>strtotime($maindata[$idtimetable]['to_date'])){
						$maindata[$idtimetable]['exam_status'] 			= 'Finished';
					}else{
						$maindata[$idtimetable]['exam_status'] 			= 'Pending';
					}
				}
			}
			if($maindata){
				foreach ($maindata as $key => $value) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $value);
				}
			}
		}
		return $querydata->getResultArray();
	}
	/*Exam timetable related*/
	/*userdetails new*/
	public function getUserDetailsWithType($pagedata){
		$db      	    = \Config\Database::connect();
		$data 			= array();
		$pdata 			= array();
		$inst_data 		= array();
		$board_data 	= array();
		$pdata          = array();
		$sdata          = array();
		$academicData   = array();
		$subdata        = array();
		$childmapping   = array();
		$maindata       = array();
		$resultdata     = array();
		$UID            = $pagedata['UID'];
		$getType        = $db->table('users t1')->select('t2.type_name')->join('user_type t2','t2.id = t1.type')->where('t1.UID',$UID)->get();
		$type = $getType->getRow();
		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('u.UID',$UID)->where('uom.id_institute = i.id')->where('i.status',1)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->groupBy('s.id')->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id']   = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] = $value['name'];
		 	$board_data[$value['UID']][$value['organization_id']][$value['id']][$value['board_id']]['id_board'] = $value['board_id'];
		 	$board_data[$value['UID']][$value['organization_id']][$value['id']][$value['board_id']]['board_name'] = $value['board_name'];
		 }
		 if($board_data){
		 	foreach ($board_data as $studkey => $studvalue) {
		 		foreach ($studvalue as $orgkey => $orgvalue) {
		 			foreach ($orgvalue as $instkey => $instvalue) {
		 				foreach ($instvalue as $boardkey => $boardvalue) {
		 					if(!isset($inst_data[$studkey][$orgkey][$instkey]['boards'])){
		 						$inst_data[$studkey][$orgkey][$instkey]['boards'] = array();
		 					}
		 					array_push($inst_data[$studkey][$orgkey][$instkey]['boards'], $boardvalue);
		 				}
		 			}
		 		}
		 	}
		 }
		 $builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.UID',$UID)->where('i.status',1)->where('uom.id_institute = i.id')->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] = array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 }
		  $builder_academicyear = $db->table('academic_year ay')->select('ay.*')->where('ay.status',1)->orderBy('ay.id DESC')->get();

		if($type->type_name=='Student'){
			$builder = $db->table('student_profile sp')->select('*')->where('sp.UID',$UID)->where('sp.status',1)->get();
		}else{
			$builder = $db->table('staff_profile sp')->select('*')->where('sp.UID',$UID)->where('sp.status',1)->get();
		}
		$data = $builder->getRow();
		$data->organization = $sdata[$data->UID];
		if($builder_academicyear->getResultArray()){
			foreach ($builder_academicyear->getResultArray() as $key => $value) {
				$academicData[$key]['id'] 			= $value['id'];
				$academicData[$key]['label'] 		= $value['label'];
				$academicData[$key]['start_date'] 	= $value['start_date'];
				$academicData[$key]['end_date'] 	= $value['end_date'];

			}
			$data->academicyear = $academicData;
		}
		$builder_subdata         = $db->table('nav_menu um')->select('um.*')->where('um.status',1)->orderBy('um.id_parent_menu,um.order_menu')->get();
		$data_subdata = $builder_subdata->getResultArray();
		if($data_subdata){
			foreach ($data_subdata as $subkey => $subvalue) {
				if($subvalue['id_parent_menu']!=0){
					$subdata[$subvalue['id_parent_menu']][$subkey]['id']   		= $subvalue['id'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['name'] 		= $subvalue['name'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['path'] 		= $subvalue['path'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['icon'] 		= $subvalue['icon'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['component'] = $subvalue['component'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['visible'] 	= $subvalue['visible'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['layout'] 	= $subvalue['layout'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['id_parent_menu'] = $subvalue['id_parent_menu'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['order_menu'] = $subvalue['order_menu'];
				}
			}
		}
		if($subdata){
			foreach ($subdata as $skey => $svalue) {
				foreach ($svalue as $sskey => $ssvalue) {
					if(!isset($childmapping[$skey])){
						$childmapping[$skey] = array();
					}
					array_push($childmapping[$skey], $ssvalue);
				}
				
			}
		}
		$builder_maindata    = $db->table('nav_menu um')->select('um.*')->where('um.status',1)->where('um.id_parent_menu',0)->orderBy('um.id,um.order_menu')->get();
		$data_maindata       = $builder_maindata->getResultArray();
		if($data_maindata){
			foreach ($data_maindata as $mainkey => $mainvalue) {
					$maindata[$mainvalue['id']]['id'] 				= $mainvalue['id'];
					$maindata[$mainvalue['id']]['name'] 			= $mainvalue['name'];
					$maindata[$mainvalue['id']]['path'] 			= $mainvalue['path'];
					$maindata[$mainvalue['id']]['icon'] 			= $mainvalue['icon'];
					$maindata[$mainvalue['id']]['component'] 		= $mainvalue['component'];
					$maindata[$mainvalue['id']]['visible'] 			= $mainvalue['visible'];
					$maindata[$mainvalue['id']]['layout'] 			= $mainvalue['layout'];
					$maindata[$mainvalue['id']]['id_parent_menu'] 	= $mainvalue['id_parent_menu'];
					$maindata[$mainvalue['id']]['order_menu'] 		= $mainvalue['order_menu'];
					if($childmapping[$mainvalue['order_menu']])
						$maindata[$mainvalue['id']]['child'] 		= $childmapping[$mainvalue['order_menu']];
					
			}

		}
		if($maindata){
			foreach ($maindata as $key => $value) {
				if(!isset($resultdata)){
					$resultdata = array();
				}
				array_push($resultdata, $value);
			}
		}
		$data->usermenus = $resultdata;
		return $data;
	}

	public function get_organization(){
		 $db      = \Config\Database::connect();
		 $builder = $db->table('organization o')->select('i.id,i.name,o.name as org')->join('institution i ', 'i.organization_id = o.id')->where('i.status',1)->where('o.status',1)->get();
		  return $builder->getResultArray();

	}

	public function get_institution($pagedata){
		$id_institute = $pagedata['id_institute'];
		$pageSize 	  = $pagedata['pageSize'];
		$pageNumber   = $pagedata['pageNumber'];
		$mainData     = array();
		$db           = \Config\Database::connect();
		$builder      = $db->table('board s')->select('s.id,s.name,i.name as instname,i.id as instid')->join('institution i', 's.institute_id = i.id')->where('i.id',$id_institute)->where('i.status',1)->where('s.status',1)->get();
		//$pageSize,$pageNumber
		  return $builder->getResultArray();
	}
	/*login  and password related*/


	/*standard related*/
	public function get_standard($pagedata){
		$db      		= \Config\Database::connect();
		$id_institute 	= $pagedata['id_institute'];
		$pageSize 		= $pagedata['pageSize'];
		$pageNumber 	= $pagedata['pageNumber'];
		 $builder 		= $db->table('standard s')->select('s.id as standard_id ,s.name as standard_name,t.id as standard_type_id,t.name as standard_type_name,l.id as standard_level_id,l.name as standard_level_name,i.id as inst_id,i.name as inst_name,st.id as board_id ,st.name as board_name')
		 ->join('standard_type t', 's.type_id = t.id')
		 ->join('standard_level l', 's.level_id = l.id')
		 ->join('institution i', 's.inst_id = i.id')
		 ->join('board st', 's.id_board = st.id')
		 ->where('s.inst_id = i.id')
		 ->where('s.inst_id = st.institute_id')
		 ->where('s.inst_id',$id_institute)
		 ->where('s.status',1)
		 ->where('t.status',1)
		 ->where('l.status',1)
		 ->where('i.status',1)
		 ->orderBy('s.inst_id ASC, s.id ASC')
		 ->get();
		  return $builder->getResultArray();
		  // $pageSize,$pageNumber->where('i.id',$id_institute)
	}

	public function standardtype_data(){
		 $db      = \Config\Database::connect();
		 $builder = $db->table('standard_type')->select('id,name')->where('status',1)->get();
		  return $builder->getResultArray();

	}
	public function standardlevel_data(){
		 $db      = \Config\Database::connect();
		 $builder = $db->table('standard_level')->select('id,name')->where('status',1)->get();
		  return $builder->getResultArray();

	}
	/*standard related*/

	/*section related*/
	public function getStudentDetailsCount($id_institute){
		$db          = \Config\Database::connect();
		$data 		 = array();
		$standard_data = array();
		$builder_all = $db->table('student_profile sp')->select(' sp.status , sp.standard,s.id')->join('user_organization_mapping uom','uom.id_user = sp.uid')->where('uom.id_institute',$id_institute)->join('standard_section ss','sp.standard = ss.id')->join('standard s','ss.standard_id = s.id')->where('uom.id_institute = ss.inst_id')->where('ss.inst_id = s.inst_id')->get();
		foreach ($builder_all->getResultArray() as $key => $value) {
			 	if(isset($value['standard'])){
	              $data['section'][$value['standard']]['all_student_count']+=1;
			 	}else{
			 	  $data['section'][$value['standard']]['all_student_count']=1;
			 	}
			 	if(isset($value['id'])){
	              $data['standard'][$value['id']]['all_student_count']+=1;
			 	}else{
			 	  $data['standard'][$value['id']]['all_student_count']=1;
			 	}
			 }
			$builder_active = $db->table('student_profile sp')->select(' sp.status , sp.standard,s.id')->join('user_organization_mapping uom','uom.id_user = sp.uid')->where('uom.id_institute',$id_institute)->join('standard_section ss','sp.standard = ss.id')->join('standard s','ss.standard_id = s.id')->where('uom.id_institute = ss.inst_id')->where('ss.inst_id = s.inst_id')->where('uom.status',1)->where('sp.status',1)->where('ss.status',1)->where('s.status',1)->get();
			foreach ($builder_active->getResultArray() as $key => $value) {
			 	if(isset($value['standard'])){
	              $data['section'][$value['standard']]['active_student_count']+=1;
			 	}else{
			 		$data['section'][$value['standard']]['active_student_count']=1;
			 	}
			 	if(isset($value['id'])){
	              $data['standard'][$value['id']]['active_student_count']+=1;
			 	}else{
			 	  $data['standard'][$value['id']]['active_student_count']=1;
			 	}
			 }
			$builder = $db->table('student_profile sp')->select(' sp.status , sp.standard,s.id')->join('user_organization_mapping uom','uom.id_user = sp.uid')->where('uom.id_institute', $id_institute)->join('standard_section ss','sp.standard = ss.id')->join('standard s','ss.standard_id = s.id')->where('uom.id_institute = ss.inst_id')->where('ss.inst_id = s.inst_id')->where('uom.status',1)->where('sp.status',1)->where('ss.status',1)->where('s.status',1)->where('uom.status',1)->where('sp.status',0)->get();
		 foreach ($builder->getResultArray() as $key => $value) {
			 	if(isset($value['standard'])){
	              $data['section'][$value['standard']]['inactive_student_count']+=1;
			 	}else{
			 		$data['section'][$value['standard']]['inactive_student_count']=1;
			 	}
			 	if(isset($value['id'])){
	              $data['standard'][$value['id']]['inactive_student_count']+=1;
			 	}else{
			 	  $data['standard'][$value['id']]['inactive_student_count']=1;
			 	}
			 }
			 return $data;
	}

public function getNewStudentDetailsCount($id_institute,$id_academicyear){
		$db          = \Config\Database::connect();
		$data 		 = array();
		$standard_data = array();
		$builder_all = $db->table('students_profile sp')->select(' sp.status , sp.standard,s.id')->join('user_organization_mapping uom','uom.id_user = sp.uid')->where('uom.id_institute',$id_institute)->join('standard_section ss','sp.standard = ss.id')->join('standard s','ss.standard_id = s.id')->where('uom.id_institute = ss.inst_id')->where('ss.inst_id = s.inst_id')->where('uom.id_academicyear',$id_academicyear)->get();
		foreach ($builder_all->getResultArray() as $key => $value) {
			 	if(isset($value['standard'])){
	              $data['section'][$value['standard']]['all_student_count']+=1;
			 	}else{
			 	  $data['section'][$value['standard']]['all_student_count']=1;
			 	}
			 	if(isset($value['id'])){
	              $data['standard'][$value['id']]['all_student_count']+=1;
			 	}else{
			 	  $data['standard'][$value['id']]['all_student_count']=1;
			 	}
			 }
			$builder_active = $db->table('students_profile sp')->select(' sp.status , sp.standard,s.id')->join('user_organization_mapping uom','uom.id_user = sp.uid')->where('uom.id_institute',$id_institute)->join('standard_section ss','sp.standard = ss.id')->join('standard s','ss.standard_id = s.id')->where('uom.id_institute = ss.inst_id')->where('ss.inst_id = s.inst_id')->where('uom.status',1)->where('sp.status',1)->where('ss.status',1)->where('s.status',1)->where('uom.id_academicyear',$id_academicyear)->get();
			foreach ($builder_active->getResultArray() as $key => $value) {
			 	if(isset($value['standard'])){
	              $data['section'][$value['standard']]['active_student_count']+=1;
			 	}else{
			 		$data['section'][$value['standard']]['active_student_count']=1;
			 	}
			 	if(isset($value['id'])){
	              $data['standard'][$value['id']]['active_student_count']+=1;
			 	}else{
			 	  $data['standard'][$value['id']]['active_student_count']=1;
			 	}
			 }
			$builder = $db->table('students_profile sp')->select(' sp.status , sp.standard,s.id')->join('user_organization_mapping uom','uom.id_user = sp.uid')->where('uom.id_institute', $id_institute)->join('standard_section ss','sp.standard = ss.id')->join('standard s','ss.standard_id = s.id')->where('uom.id_institute = ss.inst_id')->where('ss.inst_id = s.inst_id')->where('uom.status',1)->where('sp.status',1)->where('ss.status',1)->where('s.status',1)->where('uom.status',1)->where('sp.status',0)->where('uom.id_academicyear',$id_academicyear)->get();
		 foreach ($builder->getResultArray() as $key => $value) {
			 	if(isset($value['standard'])){
	              $data['section'][$value['standard']]['inactive_student_count']+=1;
			 	}else{
			 		$data['section'][$value['standard']]['inactive_student_count']=1;
			 	}
			 	if(isset($value['id'])){
	              $data['standard'][$value['id']]['inactive_student_count']+=1;
			 	}else{
			 	  $data['standard'][$value['id']]['inactive_student_count']=1;
			 	}
			 }
			 return $data;
	}
	public function getCategoriesDetails($id_institute){
		$data 		= array();
		$db      	= \Config\Database::connect();
		 $builder 	= $db->table('category')->select('id,name')->where('id_institute',$id_institute)->where('status',1)->get();
		 if($builder->getResultArray()){
		 	foreach ($builder->getResultArray() as $key => $value) {
		 		$data[$value['id']]['id'] 	= $value['id'];
		 		$data[$value['id']]['name'] = $value['name'];
		 	}
		 }
		 return $data;
		  
	}
	 public function getFeeRemainStudentDetails($id_institute,$id_board){
	 	$data 		= array();
		$db      	= \Config\Database::connect();
		$builder = $db->table('fee_ledger fl');
		$builder->select('fl.UID,fl.id_section');
		 $builder->where('fl.amount>(fl.paid_amt+fl.concession_amount)')->where('fl.id_institute',$id_institute)->groupBy('fl.UID');
		 if($id_board){
		 	$builder->where('fl.id_board',$id_board);
		 }
		 $query   = $builder->get();
		$profiledetails = $query->getResultArray();
		foreach ($profiledetails as $key => $value) {
			if(isset($sectionwisedata[$value['id_section']])){
				$sectionwisedata[$value['id_section']]+=1;
			}else{
				$sectionwisedata[$value['id_section']]=1;
			}
		}
		return $sectionwisedata;
	 }

	public function get_section($count,$id_institute,$id_board,$count_fee,$id_academicyear){
		$db      			= \Config\Database::connect();
		$data 				= array();
		$data_project 		= array();
		$data_assignment 	= array();
		$data_circular      = array();
		$data_sent 			= array();
		$data_subject 		= array();
		$data_event         = array();
		$data_holiday       = array();
		$subject_details 	= $this->getSubjectsStandard($id_institute);
		$student_details 	= $this->getStudentDetailsCount($id_institute);
		$category_details 	= $this->getCategoriesDetails($id_institute);
		$fee_remain_details = $this->getFeeRemainStudentDetails($id_institute,$id_board);
		$data_student 		= array();
		
		 $builder_project = $db->table('project p')->select('p.status,p.id_section')->where('p.id_institute',$id_institute)->where('p.status',1)->get();
			 foreach ($builder_project->getResultArray() as $key => $value) {
			 	if(isset($value['id_section'])){
	              $data_project[$value['id_section']]+=1;
			 	}else{
			 		$data_project[$value['id_section']]=1;
			 	}
			 }
			$builder_assignment = $db->table('assignment p')->select('p.status,p.id_section')->where('p.id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('p.status',1)->get();
			 foreach ($builder_assignment->getResultArray() as $key => $value) {
			 	if(isset($value['id_section'])){
	              $data_assignment[$value['id_section']]+=1;
			 	}else{
			 		$data_assignment[$value['id_section']]=1;
			 	}
			 }
			 $builder_circular = $db->table('circular p')->select('p.status,p.id_section')->where('p.id_institute',$id_institute)->where('p.status',1)->get();
			 foreach ($builder_circular->getResultArray() as $key => $value) {
			 	if(isset($value['id_section'])){
	              $data_circular[$value['id_section']]+=1;
			 	}else{
			 		$data_circular[$value['id_section']]=1;
			 	}
			 }
			 $builder_holiday = $db->table('holidays p')->select('p.student_applicable')->where('p.id_institute',$id_institute)->where('p.id_academicyear',$id_academicyear)->where('p.status',1)->get();
			 foreach ($builder_holiday->getResultArray() as $key => $value) {
			 	if($value['student_applicable']){
			 		$data_holiday[$key]['id'] = explode(',',$value['student_applicable']);
			 	}
			 }
			  $builder_event = $db->table('events p')->select('p.student_applicable')->where('p.id_institute',$id_institute)->where('p.id_academicyear',$id_academicyear)->where('p.status',1)->get();
			 foreach ($builder_event->getResultArray() as $key => $value) {
			 	if($value['student_applicable']){
			 		$data_event[$key]['id'] = explode(',',$value['student_applicable']);
			 	}
			 }
			 if($count_fee || $count=='assignment' || $id_board!='all'){
			 	$builder = $db->table('standard_section sec')->select('sec.id as section_id,sec.name as section_name,s.id as standard_id,s.name as standard_name,t.id as standard_type_id,t.name as standard_type_name,l.id as standard_level_id,l.name as standard_level_name,i.id as inst_id,i.name as inst_name,st.id as board_id ,st.name as board_name')
				 ->join('standard s', 's.id = sec.standard_id AND s.inst_id = sec.inst_id')
				 ->join('standard_type t', 's.type_id = t.id')
				 ->join('standard_level l', 's.level_id = l.id')
				 ->join('institution i', 's.inst_id = i.id')
				 ->join('board st', 's.id_board = st.id AND s.inst_id=st.institute_id')
				 ->where('sec.inst_id = s.inst_id')
				 ->where('sec.inst_id = i.id')
				 ->where('sec.inst_id = st.institute_id')
				 ->where('sec.inst_id',$id_institute)
				 ->where('s.id_academicyear = sec.id_academicyear')
				 ->where('sec.id_academicyear',$id_academicyear)
				 ->where('s.status',1)
				 ->where('t.status',1)
				 ->where('l.status',1)
				 ->where('i.status',1)
				 ->where('sec.status',1)
				 ->where('st.status',1)
				 ->where('sec.id_board',$id_board) 
				 ->orderBy('s.inst_id ASC, s.id ASC, sec.id ASC');
				 $query = $builder->get();
				}else{
					$builder = $db->table('standard_section sec')->select('sec.id as section_id,sec.name as section_name,s.id as standard_id,s.name as standard_name,t.id as standard_type_id,t.name as standard_type_name,l.id as standard_level_id,l.name as standard_level_name,i.id as inst_id,i.name as inst_name,st.id as board_id ,st.name as board_name')
					 ->join('standard s', 's.id = sec.standard_id AND s.inst_id = sec.inst_id')
					 ->join('standard_type t', 's.type_id = t.id')
					 ->join('standard_level l', 's.level_id = l.id')
					 ->join('institution i', 's.inst_id = i.id')
					 ->join('board st', 's.id_board = st.id AND s.inst_id=st.institute_id')
					 ->where('sec.inst_id = s.inst_id')
					 ->where('sec.inst_id = i.id')
					 ->where('sec.inst_id = st.institute_id')
					 ->where('sec.inst_id',$id_institute)
					 ->where('sec.id_academicyear = s.id_academicyear')
				     ->where('sec.id_academicyear',$id_academicyear)
					 ->where('s.status',1)
					 ->where('t.status',1)
					 ->where('l.status',1)
					 ->where('i.status',1)
					 ->where('sec.status',1)
					 ->where('st.status',1); 
					 $builder->orderBy('s.inst_id ASC, s.id ASC, sec.id ASC');
					 $query = $builder->get();
				}
		 
		 foreach ($query->getResultArray() as $key => $value) {
		 	$data[$value['section_id']] = $value;
		 	if($count=='project'){
		 		if(isset($data_project[$value['section_id']])){
		 			$data[$value['section_id']]['project_count'] = $data_project[$value['section_id']];
		 		}else{
		 			$data[$value['section_id']]['project_count'] = 0;
		 		}
		 	}
		 	if($count=='assignment'){
		 		if(isset($data_assignment[$value['section_id']])){
		 			$data[$value['section_id']]['assignment_count'] = $data_assignment[$value['section_id']];
		 		}else{
		 			$data[$value['section_id']]['assignment_count'] = 0;
		 		}
		 	}
		 	if($count=='circular'){
		 		if(isset($data_circular[$value['section_id']])){
		 			$data[$value['section_id']]['circular_count'] = $data_circular[$value['section_id']];
		 		}else{
		 			$data[$value['section_id']]['circular_count'] = 0;
		 		}
		 	}
		 	if($count == 'holiday'){
		 		if($data_holiday){
		 			foreach ($data_holiday as $hkey => $hvalue) {
		 				if(in_array($value['section_id'], $hvalue['id'])){
		 					$data[$value['section_id']]['holiday_count'] +=1;
		 				}else{
		 					$data[$value['section_id']]['holiday_count'] = 0;
		 				}
		 			}
		 		}else{
		 			$data[$value['section_id']]['holiday_count'] = 0;
		 		}
		 	}
		 	if($count == 'event'){
		 		if($data_event){
		 			foreach ($data_event as $hkey => $hvalue) {
		 				if(in_array($value['section_id'], $hvalue['id'])){
		 					$data[$value['section_id']]['event_count'] +=1;
		 				}else{
		 					$data[$value['section_id']]['event_count'] = 0;
		 				}
		 			}
		 		}else{
		 			$data[$value['section_id']]['event_count'] = 0;
		 		}
		 	}
		 	if($count == 'subject'){
		 		if(isset($subject_details[$value['section_id']])){
		 			$data[$value['section_id']]['all_subject_count'] = $subject_details[$value['section_id']]['all_subject_count'] ? $subject_details[$value['section_id']]['all_subject_count'] : "0";
		 			$data[$value['section_id']]['active_subject_count'] = $subject_details[$value['section_id']]['active_subject_count'] ? $subject_details[$value['section_id']]['active_subject_count'] : "0" ;
		 			$data[$value['section_id']]['inactive_subject_count'] = $subject_details[$value['section_id']]['inactive_subject_count'] ? $subject_details[$value['section_id']]['inactive_subject_count']: "0";
		 		}else{
		 			$data[$value['section_id']]['all_subject_count'] = "0";
		 			$data[$value['section_id']]['active_subject_count'] = "0";
		 			$data[$value['section_id']]['inactive_subject_count'] = "0";
		 		}
		 	}

		 	if($count == 'student'){
		 		if(isset($student_details['section'][$value['section_id']])){
		 			$data[$value['section_id']]['all_student_count'] = $student_details['section'][$value['section_id']]['all_student_count'] ? $student_details['section'][$value['section_id']]['all_student_count'] : "0";
		 			$data[$value['section_id']]['active_student_count'] = $student_details['section'][$value['section_id']]['active_student_count'] ? $student_details['section'][$value['section_id']]['active_student_count'] : "0" ;
		 			$data[$value['section_id']]['inactive_student_count'] = $student_details['section'][$value['section_id']]['inactive_student_count'] ? $student_details['section'][$value['section_id']]['inactive_student_count']: "0";
		 		}else{
		 			$data[$value['section_id']]['all_student_count'] = "0";
		 			$data[$value['section_id']]['active_student_count'] = "0";
		 			$data[$value['section_id']]['inactive_student_count'] = "0";
		 		}
		 		if(isset($student_details['standard'][$value['standard_id']])){
		 			$data[$value['section_id']]['standard_all_student_count'] = $student_details['standard'][$value['standard_id']]['all_student_count'] ? $student_details['standard'][$value['standard_id']]['all_student_count'] : "0";
		 			$data[$value['section_id']]['standard_active_student_count'] = $student_details['standard'][$value['standard_id']]['active_student_count'] ? $student_details['standard'][$value['standard_id']]['active_student_count'] : "0" ;
		 			$data[$value['section_id']]['standard_inactive_student_count'] = $student_details['standard'][$value['standard_id']]['inactive_student_count'] ? $student_details['standard'][$value['standard_id']]['inactive_student_count']: "0";
		 		}else{
		 			$data[$value['section_id']]['standard_all_student_count'] = "0";
		 			$data[$value['section_id']]['standard_active_student_count'] = "0";
		 			$data[$value['section_id']]['standard_inactive_student_count'] = "0";
		 		}
		 	}
		 	if($count == 'category_details'){
		 		if($category_details){
		 			foreach ($category_details as $catkey => $catvalue) {
		 				if(!isset($data[$value['section_id']]['categories'])){
		 					$data[$value['section_id']]['categories'] = array();
		 				}
		 				array_push($data[$value['section_id']]['categories'],$catvalue);
		 			}
		 			
		 		}
		 	}
		 	if($count_fee == 'fee_remain_details'){
		 			if(isset($fee_remain_details[$value['section_id']])){
		 			$data[$value['section_id']]['feeremaindetails'] = $fee_remain_details[$value['section_id']] ? $fee_remain_details[$value['section_id']] : "0";
		 		}else{
		 			$data[$value['section_id']]['feeremaindetails'] = "0";
		 		}
		 	}
		 }
		 foreach ($data as $key => $value) {
		 	$data_sent[]= $value;
		 }
		 
		  return $data_sent;

	}

	public function getSectionDetails($count,$id_institute,$id_board,$count_fee,$id_academicyear){
		$db      			= \Config\Database::connect();
		$data 				= array();
		$data_project 		= array();
		$data_assignment 	= array();
		$data_circular      = array();
		$data_sent 			= array();
		$data_subject 		= array();
		$data_event         = array();
		$data_holiday       = array();
		$subject_details 	= $this->getSubjectsStandard($id_institute);
		$student_details 	= $this->getNewStudentDetailsCount($id_institute,$id_academicyear);
		$category_details 	= $this->getCategoriesDetails($id_institute);
		$fee_remain_details = $this->getFeeRemainStudentDetails($id_institute,$id_board);
		$data_student 		= array();
		
		 $builder_project = $db->table('project p')->select('p.status,p.id_section')->where('p.id_institute',$id_institute)->where('p.status',1)->get();
			 foreach ($builder_project->getResultArray() as $key => $value) {
			 	if(isset($value['id_section'])){
	              $data_project[$value['id_section']]+=1;
			 	}else{
			 		$data_project[$value['id_section']]=1;
			 	}
			 }
			$builder_assignment = $db->table('assignment p')->select('p.status,p.id_section')->where('p.id_institute',$id_institute)->where('p.status',1)->get();
			 foreach ($builder_assignment->getResultArray() as $key => $value) {
			 	if(isset($value['id_section'])){
	              $data_assignment[$value['id_section']]+=1;
			 	}else{
			 		$data_assignment[$value['id_section']]=1;
			 	}
			 }
			 $builder_circular = $db->table('circular p')->select('p.status,p.id_section')->where('p.id_institute',$id_institute)->where('p.status',1)->get();
			 foreach ($builder_circular->getResultArray() as $key => $value) {
			 	if(isset($value['id_section'])){
	              $data_circular[$value['id_section']]+=1;
			 	}else{
			 		$data_circular[$value['id_section']]=1;
			 	}
			 }
			 $builder_dailydairy = $db->table('dailydairy p')->select('p.status,p.id_section')->where('p.id_institute',$id_institute)->where('p.status',1)->get();
			 foreach ($builder_dailydairy->getResultArray() as $key => $value) {
			 	if(isset($value['id_section'])){
	              $data_dailydairy[$value['id_section']]+=1;
			 	}else{
			 		$data_dailydairy[$value['id_section']]=1;
			 	}
			 }
			 if($count_fee || $count=='assignment' || $id_board!='all'){
			 	$builder = $db->table('standard_section sec')->select('sec.id as section_id,sec.name as section_name,s.id as standard_id,s.name as standard_name,t.id as standard_type_id,t.name as standard_type_name,l.id as standard_level_id,l.name as standard_level_name,i.id as inst_id,i.name as inst_name,st.id as board_id ,st.name as board_name')
				 ->join('standard s', 's.id = sec.standard_id AND s.inst_id = sec.inst_id')
				 ->join('standard_type t', 's.type_id = t.id')
				 ->join('standard_level l', 's.level_id = l.id')
				 ->join('institution i', 's.inst_id = i.id')
				 ->join('board st', 's.id_board = st.id AND s.inst_id=st.institute_id')
				 ->where('sec.inst_id = s.inst_id')
				 ->where('sec.inst_id = i.id')
				 ->where('sec.inst_id = st.institute_id')
				 ->where('sec.inst_id',$id_institute)
				 ->where('sec.id_academicyear = s.id_academicyear')
				 ->where('sec.id_academicyear',$id_academicyear)
				 ->where('s.status',1)
				 ->where('t.status',1)
				 ->where('l.status',1)
				 ->where('i.status',1)
				 ->where('sec.status',1)
				 ->where('st.status',1)
				 ->where('sec.id_board',$id_board) 
				 ->orderBy('s.inst_id ASC, s.id ASC, sec.id ASC');
				 $query = $builder->get();
				}else{
					$builder = $db->table('standard_section sec')->select('sec.id as section_id,sec.name as section_name,s.id as standard_id,s.name as standard_name,t.id as standard_type_id,t.name as standard_type_name,l.id as standard_level_id,l.name as standard_level_name,i.id as inst_id,i.name as inst_name,st.id as board_id ,st.name as board_name')
					 ->join('standard s', 's.id = sec.standard_id AND s.inst_id = sec.inst_id')
					 ->join('standard_type t', 's.type_id = t.id')
					 ->join('standard_level l', 's.level_id = l.id')
					 ->join('institution i', 's.inst_id = i.id')
					 ->join('board st', 's.id_board = st.id AND s.inst_id=st.institute_id')
					 ->where('sec.inst_id = s.inst_id')
					 ->where('sec.inst_id = i.id')
					 ->where('sec.inst_id = st.institute_id')
					 ->where('sec.inst_id',$id_institute)
					 ->where('sec.id_academicyear = s.id_academicyear')
				     ->where('sec.id_academicyear',$id_academicyear)
					 ->where('s.status',1)
					 ->where('t.status',1)
					 ->where('l.status',1)
					 ->where('i.status',1)
					 ->where('sec.status',1)
					 ->where('st.status',1); 
					 $builder->orderBy('s.inst_id ASC, s.id ASC, sec.id ASC');
					 $query = $builder->get();
				}
		 
		 foreach ($query->getResultArray() as $key => $value) {
		 	$data[$value['section_id']] = $value;
		 	if($count=='project'){
		 		if(isset($data_project[$value['section_id']])){
		 			$data[$value['section_id']]['project_count'] = $data_project[$value['section_id']];
		 		}else{
		 			$data[$value['section_id']]['project_count'] = 0;
		 		}
		 	}
		 	if($count=='assignment'){
		 		if(isset($data_assignment[$value['section_id']])){
		 			$data[$value['section_id']]['assignment_count'] = $data_assignment[$value['section_id']];
		 		}else{
		 			$data[$value['section_id']]['assignment_count'] = 0;
		 		}
		 	}
		 	if($count=='circular'){
		 		if(isset($data_circular[$value['section_id']])){
		 			$data[$value['section_id']]['circular_count'] = $data_circular[$value['section_id']];
		 		}else{
		 			$data[$value['section_id']]['circular_count'] = 0;
		 		}
		 	}
		 	if($count=='dailydairy'){
		 		if(isset($data_dailydairy[$value['section_id']])){
		 			$data[$value['section_id']]['dailydairy_count'] = $data_dailydairy[$value['section_id']];
		 		}else{
		 			$data[$value['section_id']]['dailydairy_count'] = 0;
		 		}
		 	}
		 	if($count == 'subject'){
		 		if(isset($subject_details[$value['section_id']])){
		 			$data[$value['section_id']]['all_subject_count'] = $subject_details[$value['section_id']]['all_subject_count'] ? $subject_details[$value['section_id']]['all_subject_count'] : "0";
		 			$data[$value['section_id']]['active_subject_count'] = $subject_details[$value['section_id']]['active_subject_count'] ? $subject_details[$value['section_id']]['active_subject_count'] : "0" ;
		 			$data[$value['section_id']]['inactive_subject_count'] = $subject_details[$value['section_id']]['inactive_subject_count'] ? $subject_details[$value['section_id']]['inactive_subject_count']: "0";
		 		}else{
		 			$data[$value['section_id']]['all_subject_count'] = "0";
		 			$data[$value['section_id']]['active_subject_count'] = "0";
		 			$data[$value['section_id']]['inactive_subject_count'] = "0";
		 		}
		 	}

		 	if($count == 'student'){
		 		if(isset($student_details['section'][$value['section_id']])){
		 			$data[$value['section_id']]['all_student_count'] = $student_details['section'][$value['section_id']]['all_student_count'] ? $student_details['section'][$value['section_id']]['all_student_count'] : "0";
		 			$data[$value['section_id']]['active_student_count'] = $student_details['section'][$value['section_id']]['active_student_count'] ? $student_details['section'][$value['section_id']]['active_student_count'] : "0" ;
		 			$data[$value['section_id']]['inactive_student_count'] = $student_details['section'][$value['section_id']]['inactive_student_count'] ? $student_details['section'][$value['section_id']]['inactive_student_count']: "0";
		 		}else{
		 			$data[$value['section_id']]['all_student_count'] = "0";
		 			$data[$value['section_id']]['active_student_count'] = "0";
		 			$data[$value['section_id']]['inactive_student_count'] = "0";
		 		}
		 		if(isset($student_details['standard'][$value['standard_id']])){
		 			$data[$value['section_id']]['standard_all_student_count'] = $student_details['standard'][$value['standard_id']]['all_student_count'] ? $student_details['standard'][$value['standard_id']]['all_student_count'] : "0";
		 			$data[$value['section_id']]['standard_active_student_count'] = $student_details['standard'][$value['standard_id']]['active_student_count'] ? $student_details['standard'][$value['standard_id']]['active_student_count'] : "0" ;
		 			$data[$value['section_id']]['standard_inactive_student_count'] = $student_details['standard'][$value['standard_id']]['inactive_student_count'] ? $student_details['standard'][$value['standard_id']]['inactive_student_count']: "0";
		 		}else{
		 			$data[$value['section_id']]['standard_all_student_count'] = "0";
		 			$data[$value['section_id']]['standard_active_student_count'] = "0";
		 			$data[$value['section_id']]['standard_inactive_student_count'] = "0";
		 		}
		 	}
		 	if($count == 'category_details'){
		 		if($category_details){
		 			foreach ($category_details as $catkey => $catvalue) {
		 				if(!isset($data[$value['section_id']]['categories'])){
		 					$data[$value['section_id']]['categories'] = array();
		 				}
		 				array_push($data[$value['section_id']]['categories'],$catvalue);
		 			}
		 			
		 		}
		 	}
		 	if($count_fee == 'fee_remain_details'){
		 			if(isset($fee_remain_details[$value['section_id']])){
		 			$data[$value['section_id']]['feeremaindetails'] = $fee_remain_details[$value['section_id']] ? $fee_remain_details[$value['section_id']] : "0";
		 		}else{
		 			$data[$value['section_id']]['feeremaindetails'] = "0";
		 		}
		 	}
		 }
		 foreach ($data as $key => $value) {
		 	$data_sent[]= $value;
		 }
		 
		  return $data_sent;

	}

	public function get_standard_section($pagedata){
		$id_institute = $pagedata['id_institute'];
		$db      = \Config\Database::connect();
		 $builder = $db->table('standard_section ss')->select('ss.id,ss.name,s.id as standard_id,s.name as standard_name')->join('standard s', 'ss.standard_id = s.id')->where('ss.inst_id',$id_institute)->where('ss.status',1)->where('s.status',1)->get();
		  return $builder->getResultArray();

	}
	 public function get_sections_data($id){
	 	$db      = \Config\Database::connect();
	 	$data = array();
		$builder = $db->table('standard_subject_mapping m')->select('m.id,m.standard')->where('m.subject_id',$id)->get();
			 foreach ($builder->getResultArray() as $key => $value) {
			 	$data[$value['standard']] = $value['id'];
			 }
			 return $data;
	 }
	/*section related*/

	/* new roles related */
	public function permissionData(){
		 $db      = \Config\Database::connect();
		$maindata       = array();
		$subdata        = array();
		$childmapping   = array();
		$resultdata     = array();
		$builder_subdata         = $db->table('nav_menu um')->select('um.*')->where('um.status',1)->orderBy('um.id_parent_menu,um.order_menu')->get();
		$data_subdata = $builder_subdata->getResultArray();
		if($data_subdata){
			foreach ($data_subdata as $subkey => $subvalue) {
				if($subvalue['id_parent_menu']!=0){
					$subdata[$subvalue['id_parent_menu']][$subkey]['id']   			= $subvalue['id'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['name'] 			= $subvalue['name'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['can_view'] 		= 0;
					$subdata[$subvalue['id_parent_menu']][$subkey]['can_view_own'] 	= 0;
					$subdata[$subvalue['id_parent_menu']][$subkey]['can_create'] 	= 0;
					$subdata[$subvalue['id_parent_menu']][$subkey]['can_edit'] 		= 0;
					$subdata[$subvalue['id_parent_menu']][$subkey]['can_delete'] 	= 0;
					$subdata[$subvalue['id_parent_menu']][$subkey]['can_export'] 	= 0;
					$subdata[$subvalue['id_parent_menu']][$subkey]['can_expand'] 	= false;
				}
			}
		}
		if($subdata){
			foreach ($subdata as $skey => $svalue) {
				foreach ($svalue as $sskey => $ssvalue) {
					if(!isset($childmapping[$skey])){
						$childmapping[$skey] = array();
					}
					array_push($childmapping[$skey], $ssvalue);
				}
				
			}
		}
		$builder_maindata    = $db->table('nav_menu um')->select('um.*')->where('um.status',1)->where('um.id_parent_menu',0)->orderBy('um.id,um.order_menu')->get();
		$data_maindata       = $builder_maindata->getResultArray();
		if($data_maindata){
			foreach ($data_maindata as $mainkey => $mainvalue) {
					$maindata[$mainvalue['id']]['id'] 			= $mainvalue['id'];
					$maindata[$mainvalue['id']]['name'] 		= $mainvalue['name'];
					$maindata[$mainvalue['id']]['can_view'] 	= 0;
					$maindata[$mainvalue['id']]['can_view_own'] = 0;
					$maindata[$mainvalue['id']]['can_create'] 	= 0;
					$maindata[$mainvalue['id']]['can_edit'] 	= 0;
					$maindata[$mainvalue['id']]['can_delete'] 	= 0;
					$maindata[$mainvalue['id']]['can_export'] 	= 0;
					$maindata[$mainvalue['id']]['can_expand'] 	= false;
					if($childmapping[$mainvalue['order_menu']])
						$maindata[$mainvalue['id']]['child'] 	= $childmapping[$mainvalue['order_menu']];
					
			}

		}
		if($maindata){
			foreach ($maindata as $key => $value) {
				if(!isset($resultdata)){
					$resultdata = array();
				}
				array_push($resultdata, $value);
			}
		}
		return $resultdata;

	}

		public function permissionDataWithData($id){
		$db      = \Config\Database::connect();
		$data = array();
		$permissionData = array();
		$maindata       = array();
		$maindata1      = array();
		$subdata        = array();
		$subdata1       = array();
		$childmapping   = array();
		$resultdata     = array();
		$resultdata1    = array();
		$childmapping1  = array();
		$rolemappedata     = array();
		
		$resultdata = $this->permissionData();
		$querydata = array();
		$builder = $db->table('roles t1')->select('t1.id as id_role,t1.name as role_name')->where('t1.id',$id)->where('t1.status',1)->get();
		$querydata = $builder->getResultArray(); 
		 foreach ($querydata as $key => $value) {
		 	$rolemappedata[$value['id_role']] = $resultdata;
		 }
		 $builder_subdata         = $db->table('nav_menu um')->select('um.*,rp.id_permission,rp.can_view,rp.can_view_own,rp.can_create,rp.can_edit,rp.can_delete,rp.can_export,rp.id_role,rp.can_expand')->join('roles_permissions rp','rp.id_permission = um.id')->where('rp.id_role',$id)->where('um.status',1)->orderBy('um.id_parent_menu,um.order_menu')->get();
		$data_subdata = $builder_subdata->getResultArray();
		if($data_subdata){
			foreach ($data_subdata as $subkey => $subvalue) {
					$subdata[$subvalue['id_role']][$subvalue['id']]['id']   = $subvalue['id'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['name'] = $subvalue['name'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['can_view'] = $subvalue['can_view'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['can_view_own'] = $subvalue['can_view_own'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['can_create'] = $subvalue['can_create'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['can_edit'] = $subvalue['can_edit'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['can_delete'] = $subvalue['can_delete'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['can_export'] = $subvalue['can_export'];
					$subdata[$subvalue['id_role']][$subvalue['id']]['can_expand'] = $subvalue['can_expand'];
			}
		}

		foreach ($rolemappedata as $roll_key => $rollvalue) {
			foreach ($rollvalue as $samplekey => $samplevalue) {
					if(isset($subdata[$roll_key][$samplevalue['id']])){
						$data[$roll_key][$samplekey] = $subdata[$roll_key][$samplevalue['id']];
					}else{
						$data[$roll_key][$samplekey] = $samplevalue;
					}
					if($samplevalue['child']){
						foreach ($samplevalue['child'] as $childkey => $childvalue) {
							if(isset($subdata[$roll_key][$childvalue['id']])){
								$data[$roll_key][$samplekey]['child'][$childkey] = $subdata[$roll_key][$childvalue['id']];
							}else{
								$data[$roll_key][$samplekey]['child'][$childkey] = $childvalue;
							}
						}
					}
			   }
		    }
		    if($querydata){
		    	foreach ($querydata as $key => $value) {
		    		$maindata[$key] = $value;
		    		$maindata[$key]['permissions'] = $data[$value['id_role']];

		    	}
		    }
		 
		  return $maindata;
	}

	/* new roles related */

	/*roles related*/

	public function permission_data(){
		 $db      = \Config\Database::connect();
		 $builder = $db->table('nav_menu')->select('id,name')->where('status',1)->get();
		  return $builder->getResultArray();

	}
	public function insert_roles_permissions($data){
		 $db      = \Config\Database::connect();
		 $builder = $db->table('roles_permissions')->insertBatch($data);
		 return;		  

	}
	public function update_roles_permissions($data,$cond){
		 $db      = \Config\Database::connect();
		 $builder = $db->table('roles_permissions')->where($cond)->update($data);		  

	}

	public function update_deleterole($data,$cond){
		$db      = \Config\Database::connect();
		$builder = $db->table('roles_permissions')->where($cond)->update($data);	
	}

	public function permission_dataWithData($id){
		$db      = \Config\Database::connect();
		$data = array();
		$querydata = array();
		$builder_new = $db->table('roles_permissions rp')->select('rp.can_view,rp.can_view_own,rp.can_create,rp.can_edit,rp.can_delete,rp.can_expand')->join('roles r', 'rp.id_role = r.id')->join('nav_menu p', 'rp.id_permission = p.id')->where('r.id',$id)->where('rp.id_role',$id)->where('p.status',1)->where('r.status',1)->where('rp.status',1)->get();
		 $querydata_new = $builder_new->getResultArray();


		 $builder = $db->table('roles_permissions rp')->select('rp.id as rolepermission,r.name as name,r.id as id,p.name as permission_name,p.id as permission_id')->join('roles r', 'rp.id_role = r.id')->join('nav_menu p', 'rp.id_permission = p.id')->where('r.id',$id)->where('rp.id_role',$id)->where('p.status',1)->where('r.status',1)->where('rp.status',1)->get();
		 $querydata = $builder->getResultArray();
		 foreach ($querydata as $key => $value) {
		 	$data[$key]=$value;
		 	$data[$key]['permissions'] = $querydata_new[$key];
		 }
		 
		  return $data;
	}

	/*roles related*/

	/*subject related*/

	public function getSubjects($standard_id){
			$db      = \Config\Database::connect();
		 $builder = $db->table('subject_master sm')->select('sm.id,sm.name,sm.code,s.id as subject_id,s.status')->join('standard_subject_mapping s', 'sm.id = s.subject_id')->where('s.standard',$standard_id)->where('sm.status',1)->get();
		  return $builder->getResultArray();
	}

	public function getSubjectsStandard($id_institute){
		$db      = \Config\Database::connect();
		$data = array();
		$builder_all = $db->table('standard_subject_mapping s')->select(' count(*) as subjectcount , s.standard')->where('s.id_institute',$id_institute)->groupBy('s.standard')->get();
		foreach ($builder_all->getResult() as $row)
			{
			        $data[$row->standard]['all_subject_count'] = $row->subjectcount;
			}
			$builder_active = $db->table('standard_subject_mapping s')->select(' count(*) as subjectcount , s.standard')->where('s.id_institute',$id_institute)->where('s.status',1)->groupBy('s.standard')->get();
			foreach ($builder_active->getResult() as $row)
			{
			        $data[$row->standard]['active_subject_count'] = $row->subjectcount;
			}
			$builder = $db->table('standard_subject_mapping s')->select(' count(*) as subjectcount , s.standard')->where('s.id_institute',$id_institute)->where('s.status',0)->groupBy('s.standard')->get();
		 foreach ($builder->getResult() as $row)
			{
			        $data[$row->standard]['inactive_subject_count'] = $row->subjectcount;
			}
			 return $data;
	}

	public function getSubjectsStandardStatus($standard,$id_institute){
		$db      = \Config\Database::connect();
		$data = array();
		 $builder = $db->table('standard_subject_mapping s')->select('s.status , s.subject_id as subject')->where('s.standard',$standard)->where('s.id_institute',$id_institute)->where('s.status',1)->get();
		 foreach ($builder->getResult() as $row)
			{
			        $data[$row->subject] = $row->status;
			}
			 return $data;
	}

	public function get_subjectwise_sections($id_institute,$subject_id,$standard_id){
		$db      			= \Config\Database::connect();
		$data 				= array();
		$sdata 				= array();
		$sectionmapping 	= array();
		$assigneddata 		= array();
		$section_map 		= array();
		$group_map 			= array();
		$unmapping_sections = array();
		$temp 				= array();
		$section_keys 		= array();
		$groupmappig 		= array();
			if($standard_id!=''){
				$builder_stmap = $db->table('standard_section s')->select('s.standard_id')->where('s.id',$standard_id)->get();
			 		$querystdata = $builder_stmap->getResultArray();
			}
			if($standard_id!=''){
				$builder_smap = $db->table('subject_master s')->select('sm.id as subjectmap_id,s.id,s.name,s.code,sm.standard,sc.name as section,st.name as standard_name,sc.id as section_id,sm.status')->join('standard_subject_mapping sm','sm.subject_id = s.id')->join('standard_section sc','sc.id = sm.standard')->join('standard st','st.id=sc.standard_id')->where('s.id_institute',$id_institute)->where('sm.id_institute',$id_institute)->where('sc.inst_id',$id_institute)->where('st.inst_id',$id_institute)->where('s.id',$subject_id)->where('st.id',$querystdata[0]['standard_id'])->where('st.status',1)->where('s.status',1)->where('sm.status',1)->orderBy('sm.status DESC , s.id ASC')->get();
			}else{
				$builder_smap = $db->table('subject_master s')->select('sm.id as subjectmap_id,s.id,s.name,s.code,sm.standard,sc.name as section,st.name as standard_name,sc.id as section_id,sm.status')->join('standard_subject_mapping sm','sm.subject_id = s.id')->join('standard_section sc','sc.id = sm.standard')->join('standard st','st.id=sc.standard_id')->where('s.id_institute',$id_institute)->where('sm.id_institute',$id_institute)->where('sc.inst_id',$id_institute)->where('st.inst_id',$id_institute)->where('s.id',$subject_id)->where('st.status',1)->where('s.status',1)->orderBy('sm.status DESC, s.id ASC')->get();
			}
			  $querysdata = $builder_smap->getResultArray();
			 foreach ($querysdata as $key => $value) {
			 	$section_map[$value['id']][$key]['id'] 		= $value['section_id'];
			 	$section_map[$value['id']][$key]['name'] 	= $value['standard_name'].''.$value['section'];
			 	$section_map[$value['id']][$key]['status'] 	= $value['status'];
			 	$group_map[$value['id']][$key]['id'] 		= $value['subjectmap_id'];
			 	$group_map[$value['id']][$key]['text'] 		= $value['name'];
			 }
			 $builder_amap = $db->table('standard_section sc')->select('sc.id,sc.name as section,st.name as standard')->join('standard st','st.id=sc.standard_id')->where('st.id',$querystdata[0]['standard_id'])->where('sc.inst_id',$id_institute)->where('st.inst_id',$id_institute)->where('st.status',1)->where('sc.status',1)->get();

	         $querysdata1 = $builder_amap->getResultArray();
			 foreach ($section_map as $subkey => $subvalue) {
				 	foreach ($subvalue as $key => $value) {
				 		if(!isset($sectionmapping[$subkey]['sections'])){
				 			$sectionmapping[$subkey]['sections'] = array();	
				 	}
				 	$temp[$value['id']] = $value['id'];
				 	array_push($sectionmapping[$subkey]['sections'],$value);
			 	}
			 	
			 }
			 foreach ($group_map as $subkey => $subvalue) {
			 	foreach ($subvalue as $key => $value) {
				 		if(!isset($groupmappig[$subkey]['groups'])){
				 			$groupmappig[$subkey]['groups'] = array();	
				 	}
				 	array_push($groupmappig[$subkey]['groups'],$value);
			 }
			}
	          foreach ($querysdata1 as $key => $value) {
	         	$unmapping_sections[$value['id']]['id'] 	= $value['id'];
	         	$unmapping_sections[$value['id']]['name'] 	= $value['standard'].''.$value['section'];
	         	$unmapping_sections[$value['id']]['status'] = 0;
	         	if(!isset($temp[$value['id']]))
	         	{
	         		if(!isset($sectionmapping[$subject_id]['sections']))
	         			$sectionmapping[$subject_id]['sections'] = array();
	         		array_push($sectionmapping[$subject_id]['sections'],$unmapping_sections[$value['id']]);
	         	}
	         }

		  	 $builder_map = $db->table('subject_master s')->select('s.id,s.name,s.code,s.status')->where('s.id_institute',$id_institute)->get();
			  $querydata = $builder_map->getResultArray();
			 foreach ($querydata as $key => $value) {
			  	if(isset($sectionmapping[$value['id']])){
			  		$sdata['sections'] = $sectionmapping[$value['id']]['sections'];
			  	} 
			  	if(isset($groupmappig[$value['id']])){
			  		$sdata['groups'] = $groupmappig[$value['id']]['groups'];
			  	}	
		 	 } 
		 return $sdata;

	}
	public function get_all_subjects($standardmapping,$pagedata,$excel=''){
		$db      			= \Config\Database::connect();
		$data 				= array();
		$sdata 				= array();
		$sectionmapping 	= array();
		$assigneddata 		= array();
		$section_map 		= array();
		$id_institute 		= $pagedata['id_institute'];
		$pageSize 			= $pagedata['pageSize'];
		$pageNumber 		= $pagedata['pageNumber'];
		  if($standardmapping == 'standardmapping'){
		   $builder_smap = $db->table('subject_master s')->select('sm.id as smid,s.id,s.name,s.code,sm.standard,sc.name as section,st.name as standard_name,sc.id as section_id,sm.status')->join('standard_subject_mapping sm','sm.subject_id = s.id')->join('standard_section sc','sc.id = sm.standard')->join('standard st','st.id=sc.standard_id')->where('s.id_institute',$id_institute)->where('sm.id_institute',$id_institute)->where('sc.inst_id',$id_institute)->where('st.inst_id',$id_institute)->where('sc.inst_id',$id_institute)->where('st.inst_id',$id_institute)->where('st.status',1)->where('s.status',1)->where('sm.status',1)->where('sc.status',1)->orderBy('sm.status DESC,s.id ASC')->get();
			  $querysdata = $builder_smap->getResultArray();
			 foreach ($querysdata as $key => $value) {
			 	$section_map[$value['id']][$key]['id'] 		= $value['section_id'];
			 	$section_map[$value['id']][$key]['name'] 	= $value['standard_name'].''.$value['section'];
			 	$section_map[$value['id']][$key]['status'] 	= $value['status'];
			 	$sectionmapping[$value['id']]['assigned'][] = $value['standard_name'].''.$value['section'];
			 }
			 foreach ($section_map as $subkey => $subvalue) {
				 	foreach ($subvalue as $key => $value) {
				 		if(!isset($sectionmapping[$subkey]['sections'])){
				 		$sectionmapping[$subkey]['sections'] = array();
				 	}
				 	array_push($sectionmapping[$subkey]['sections'],$value);
			 	}
			 	
			 }
		  	 $builder_map = $db->table('subject_master s')->select('s.id,s.name,s.code,s.status')->where('s.id_institute',$id_institute)->orderBy('s.status DESC,s.id ASC')->get();
			  $querydata = $builder_map->getResultArray();
			 foreach ($querydata as $key => $value) {
			  	$sdata[$value['id']]['id'] 		= $value['id'];
			  	$sdata[$value['id']]['name'] 	= $value['name'];
			  	$sdata[$value['id']]['code'] 	= $value['code'];
			  	$sdata[$value['id']]['status'] 	= $value['status'];
			  	if(isset($sectionmapping[$value['id']])){
			  		$sdata[$value['id']]['assigned'] = implode(",",$sectionmapping[$value['id']]['assigned']);
			  		$sdata[$value['id']]['sections'] = $sectionmapping[$value['id']]['sections'];
			  	} 	
		 	 } 
		 	 foreach ($sdata as $key => $value) {
		 	 	array_push($data,$value);
		 	 }
		  }else{
		  	if($excel=='1'){
		  		$builder = $db->table('subject_master')->select('*')->where('id_institute',$id_institute)->get();
		  	}else{
		  		$builder = $db->table('subject_master')->select('*')->where('id_institute',$id_institute)->get($pageSize,$pageNumber);
		  	}
			  $querydata_new = $builder->getResultArray();
			 foreach ($querydata_new as $key => $value) {
			  	$data[$key]['id'] 		=  $value['id'];
			  	$data[$key]['name'] 	=  $value['name'];
			  	$data[$key]['text'] 	=  $value['name'];
			  	$data[$key]['code'] 	=  $value['code'];
			  	$data[$key]['status'] 	=  $value['status'];
			  }
			  
		  }
		 return $data;
		  
	}

	public function getSubjectsStandardwise($standard,$id_institute,$type){
		$db      = \Config\Database::connect();
		$data = array();
		$sdata = array();
		$sectionmapping = array();
		$assigneddata = array();
		$section_map = array();
		$builder_stmap = $db->table('standard_section s')->select('s.standard_id')->whereIn('s.id',$standard)->groupBy('s.standard_id')->get();
		 $querystdata = $builder_stmap->getResultArray();
		  	$builder_smap = $db->table('subject_master s')->select('sm.id as smid,s.id,s.name,s.code,sm.standard,sc.name as section,st.name as standard_name,sc.id as section_id,sm.subject_type')->join('standard_subject_mapping sm','sm.subject_id = s.id')->join('standard_section sc','sc.id = sm.standard')->join('standard st','st.id=sc.standard_id')->where('s.id_institute',$id_institute)->where('sm.id_institute',$id_institute)->where('sc.inst_id',$id_institute)->where('st.inst_id',$id_institute)->where('st.status',1)->where('s.status',1)->where('sm.status',1)->where('sc.status',1);
		  	if(!isset($type)){
		  		$builder_smap->where('st.id',$querystdata[0]['standard_id']);
		  	}
		  	
		  	$querymapdata = $builder_smap->get();
			  $querysdata = $querymapdata->getResultArray();
			 foreach ($querysdata as $key => $value) {
			 	$section_map[$value['id']][$key]['id'] 		= $value['section_id'];
			 	$section_map[$value['id']][$key]['name'] 	= $value['standard_name'].' '.$value['section'];
			 	$sectionmapping[$value['id']]['assigned'][] = $value['standard_name'].' '.$value['section'];
			 }
			  foreach ($section_map as $subkey => $subvalue) {
				 	foreach ($subvalue as $key => $value) {
				 		if(!isset($sectionmapping[$subkey]['sections'])){
				 		$sectionmapping[$subkey]['sections'] = array();
				 	}
				 	array_push($sectionmapping[$subkey]['sections'],$value);
			 	}	
			 }
		  	 $builder_map = $db->table('subject_master s')->select('sm.id as smid,s.id,s.name,s.code,sm.standard,sc.name as section,st.name as standard_name,sc.id as section_id,sm.status,sm.subject_type')->join('standard_subject_mapping sm','sm.subject_id = s.id')->join('standard_section sc','sc.id = sm.standard')->join('standard st','st.id=sc.standard_id')->whereIn('sc.id',$standard)->where('s.id_institute',$id_institute)->where('sc.inst_id',$id_institute)->where('st.inst_id',$id_institute)->where('sm.id_institute',$id_institute)->where('st.status',1)->where('s.status',1)->where('sc.status',1)->orderBy('sm.status DESC')->get();
			  $querydata = $builder_map->getResultArray();
			 foreach ($querydata as $key => $value) {
			  	$sdata[$value['id']]['id'] 				= $value['id'];
			  	$sdata[$value['id']]['subject_id'] 	    = $value['smid'];
			  	$sdata[$value['id']]['name'] 			= $value['name'];
			  	$sdata[$value['id']]['code'] 			= $value['code'];
			  	$sdata[$value['id']]['subject_type'] 	= $value['subject_type'];
			  	$sdata[$value['id']]['status'] 			= $value['status'];
			  	if(isset($sectionmapping[$value['id']])){	
			  		$sdata[$value['id']]['assigned'] 	= implode(",",$sectionmapping[$value['id']]['assigned']);
			  		//$sdata[$value['id']]['sections'] = $sectionmapping[$value['id']]['sections'];
			  	}
			  	
		 	 } 
		 	 foreach ($sdata as $key => $value) {
		 	 	array_push($data,$value);
		 	 }
		 return $data;
	}

	public function get_all_subjects_data($id_institute){
		$db      	= \Config\Database::connect();
		$data 		= array();
		 $builder 	= $db->table('subject_master')->select('*')->where('id_institute',$id_institute)->get();
		  $querydata_new = $builder->getResultArray();
		 foreach ($querydata_new as $key => $value) {
		  	$data[$value['name']] =  $value['name'];
		  }
		  return $data;
	}

	/*subject related*/
	/*project related*/

	/*public function getProjects($pagedata){
		$standard_id = $pagedata['standard_id'];
		$id_institute = $pagedata['id_institute'];
		$pageSize = $pagedata['pageSize'];
		$pageNumber = $pagedata['pageNumber'];
		$db      = \Config\Database::connect();
		 $builder = $db->table('project p')->select('p.id,p.name,s.name as staffname,sm.name as subjectname,p.start_date,p.end_date,p.details,p.path')->join('staff_profile s','p.staff = s.UID')->join('standard_subject_mapping su', 'su.subject_id = p.subject_id')->join('subject_master sm', 'sm.id = su.subject_id')->where('su.standard',$standard_id)->where('p.standard',$standard_id)->where('su.id_institute = p.id_institute')->where('p.id_institute = sm.id_institute')->where('p.id_institute',$id_institute)->where('sm.status',1)->where('su.status',1)->where('s.status',1)->where('p.status',1)->get($pageSize,$pageNumber);
		 return $builder->getResultArray();

	}*/
	public function getProjects($pagedata){
		$id_section 	= $pagedata['id_section'];
		$pageSize 		= $pagedata['pageSize'];
		$pageNumber 	= $pagedata['pageNumber'];
		$id_institute 	= $pagedata['id_institute'];
		$id_board 	    = $pagedata['id_board'];
		$id_academicyear 	= $pagedata['id_academicyear'];
		$db      		= \Config\Database::connect();
		$data           = array();
		//$builder  = $db->table('assignment')->select('*')->get();
		 $builder = $db->table('project p')->select('p.id,p.name,sec.standard as standardname,sec.section as sectionname,sm.name as subjectname,p.start_date,p.end_date,p.details,p.path,p.type,p.submission,p.chapter,p.grade_required')->join('class_master sec','sec.id = p.id_section')->join('standard_subject_mapping su', 'su.subject_id = p.subject_id')->join('subject_master sm', 'sm.id = su.subject_id')->where('p.id_institute = sec.id_institute')->where('sec.id_institute = su.id_institute')->where('su.id_institute = sm.id_institute')->where('p.id_board = sec.id_board')->where('sec.id_board = su.id_board')->where('su.id_board = sm.id_board')->where('p.id_academicyear = sec.id_academicyear')->where('sec.id_academicyear = su.id_academicyear')->where('su.id_academicyear = sm.id_academicyear')->where('su.standard = p.id_section')->where('p.id_section',$id_section)->where('p.id_institute',$id_institute)->where('p.id_board',$id_board)->where('p.id_academicyear',$id_academicyear)->where('sm.status',1)->where('su.status',1)->where('p.status',1)->where('sec.status',1)->groupBy('p.id')->orderBy('p.id ASC')->get();
		 //$query = $builder->get();
		 //$pageSize,$pageNumber
		 if($builder->getResultArray()){
		 	foreach ($builder->getResultArray() as $key => $value) {
		 		$data[$key]['id'] 			= $value['id'];
		 		$data[$key]['title'] 		= $value['name'];
		 		$data[$key]['standrad'] 	= $value['standardname'].$value['sectionname'];
		 		$data[$key]['subjectname'] 	= $value['subjectname'];
		 		$data[$key]['start_date'] 	= $value['start_date'];
		 		$data[$key]['end_date'] 	= $value['end_date'];
		 		$data[$key]['details'] 	    = $value['details'];
		 		$data[$key]['path'] 	    = $value['path'];
		 		$data[$key]['type'] 	    = $value['type'];
		 		$data[$key]['submission'] 	= $value['submission'];
		 		$data[$key]['chapter'] 	    = $value['chapter'];
		 		$data[$key]['grade_required'] = $value['grade_required'];
		 	}
		 }
		 return $data;

	}
	public function getProjectsWithId($pagedata){
		$id_section 	= $pagedata['id_section'];
		$pageSize 		= $pagedata['pageSize'];
		$pageNumber 	= $pagedata['pageNumber'];
		$id_institute 	= $pagedata['id_institute'];
		$id_board 	    = $pagedata['id_board'];
		$id_academicyear 	= $pagedata['id_academicyear'];
		$id             = $pagedata['id'];
		$db      		= \Config\Database::connect();
		$data           = array();
		//$builder  = $db->table('assignment')->select('*')->get();
		 $builder = $db->table('project p')->select('p.id,p.name,sec.standard as standardname,sec.section as sectionname,sm.name as subjectname,p.start_date,p.end_date,p.details,p.path,p.type,p.submission,p.chapter,p.note,p.note_created,p.grade/marks as gmarks,p.grade_required as graderequired,p.read_receipt,p.sms_alert,su.id as subject_id,p.mentored_by,p.submission')->join('class_master sec','sec.id = p.id_section')->join('standard_subject_mapping su', 'su.subject_id = p.subject_id')->join('subject_master sm', 'sm.id = su.subject_id')->where('p.id_institute = sec.id_institute')->where('sec.id_institute = su.id_institute')->where('su.id_institute = sm.id_institute')->where('p.id_board = sec.id_board')->where('sec.id_board = su.id_board')->where('su.id_board = sm.id_board')->where('p.id_academicyear = sec.id_academicyear')->where('sec.id_academicyear = su.id_academicyear')->where('su.id_academicyear = sm.id_academicyear')->where('su.standard = p.id_section')->where('p.id_section',$id_section)->where('p.id_institute',$id_institute)->where('p.id_board',$id_board)->where('p.id_academicyear',$id_academicyear)->where('sm.status',1)->where('su.status',1)->where('p.status',1)->where('sec.status',1)->orderBy('p.id ASC')->where('p.id',$id)->get();
		 $data = $builder->getRow();
		 if(isset($data->details)){
		 	$data->details = strip_tags($data->details);
		 }
		 return $data;
	}

	public function getStudentProjectMap($pagedata){
		$id_institute 	= $pagedata['id_institute'];
		$id             = $pagedata['id'];
		$db      		= \Config\Database::connect();
		$data           = array();
		$builder = $db->table('project_student_mapping asm')->select('asm.id,asm.submitted,asm.attachment,asm.feedback,asm.grade as gd,asm.marks,asm.view_count,sp.name as studentname,sp.email_id as email,sp.primary_contact as contact,sp.id as roll_no,asm.id_user,a.id as id_assignment,a.id_section,a.grade/marks as grade,a.type,sp.UID,sp.father_name,sp.primary_contact')->join('project a','a.id = asm.id_project')->join('students_profile sp','sp.UID = asm.id_user')->join('user_organization_mapping uom','uom.id_user = sp.UID')->where('a.id',$id)->where('a.id_institute = asm.id_institute')->where('asm.id_institute = uom.id_institute')->where('asm.status',1)->where('a.status',1)->where('sp.status',1)->where('uom.status',1)->where('asm.id_institute',$id_institute)->get();
		return $builder->getResultArray();

	}

	public function getProjectMappedDataWithId($pagedata){
		$id_institute 	= $pagedata['id_institute'];
		$id             = $pagedata['id'];
		$db      		= \Config\Database::connect();
		$data           = array();
		$builder = $db->table('project_student_mapping asm')->select('asm.id,asm.submitted,asm.attachment,asm.feedback,asm.grade,asm.marks,asm.view_count,sp.name as studentname,sp.email_id as email,sp.primary_contact as contact,sp.id as roll_no,asm.id_user,a.name as title,a.	type,a.grade/marks as grademarks,asm.grade as mapgrade,asm.marks as mapmarks,a.path as attachment')->join('project a','a.id = asm.id_project')->join('students_profile sp','sp.UID = asm.id_user')->join('user_organization_mapping uom','uom.id_user = sp.UID')->where('asm.id',$id)->where('a.id_institute = asm.id_institute')->where('asm.id_institute = uom.id_institute')->where('a.status',1)->where('sp.status',1)->where('uom.status',1)->where('asm.id_institute',$id_institute)->get();
		$data = $builder->getRow();
		if($data->mapgrade!=''){
			$data->grademarks = $data->mapgrade;
		}else if($data->mapmarks!=''){
			$data->grademarks = $data->mapmarks;
		}else if($data->grademarks!=''){
			$data->grademarks = $data->grademarks;
		}
		return $data;
	}

	public function getProjectNoteData($pagedata){
		date_default_timezone_set('Asia/Kolkata');
		$id_institute 	= $pagedata['id_institute'];
		$id             = $pagedata['id'];
		$db      		= \Config\Database::connect();
		$data           = array();
		$builder = $db->table('project_note_mapping asm')->select('*')->where('id_project',$id)->where('asm.id_institute',$id_institute)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$data[$key]['note'] = $value['note'];
				$data[$key]['note_created'] = date("jS \of F Y h:i:s A",strtotime($value['note_created']));
			}
		}
		return $data;
	}

	public function getProjectGradeDetails($pagedata){
		$id_institute 	= $pagedata['id_institute'];
		$db      		= \Config\Database::connect();
		$data           = array();
		$builder = $db->table('project a')->select('a.grade/marks as grademark')->where('a.id_institute',$id_institute)->groupBy('a.grade/marks')->where('a.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if(!ctype_digit($value['grademark'])){
					$data[$key]['grademark'] = $value['grademark'];
				}	
			}
			foreach ($data as $gkey => $val) {
				if(!isset($gradedetails)){
					$gradedetails = array();
				}
				array_push($gradedetails, $val);
			}
			
		}
		return $gradedetails;
	}
	/*project related*/

	/*fee related*/
	public function get_duration(){
		$db      	= \Config\Database::connect();
		 $builder 	= $db->table('fee_duration')->select('id,name')->where('status',1)->get();
		  return $builder->getResultArray();
	}

	public  function get_fee_config($pagedata){
		$pageSize 		= $pagedata['pageSize'];
		$pageNumber 	= $pagedata['pageNumber'];
		$id_institute 	= $pagedata['id_institute'];
		$db      		= \Config\Database::connect();
		$builder 		= $db->table('fee_configs fc')
		 ->select('fc.id,fc.duration,fc.amount,f.name as fee_name,ac.label as academic_year,s.name as standard_name,sec.name as section_name,i.name as institute_name,fc.id_fee_category,fc.no_of_installments,fc.due_start_date,fc.id_academicyear,c.name as category,s.id as id_standard,sec.id as id_section,str.id as id_board')
		 ->join('academic_year ac','ac.id = fc.id_academicyear')
		 ->join('institution i','i.id = fc.id_institute')
		 ->join('standard_section sec','sec.id = fc.id_standard')
		 ->join('standard s','s.id=sec.standard_id')
		 ->join('fee_master f','f.id = fc.id_master')
		 ->join('category c','c.id = fc.id_fee_category')
		 ->join('board str','str.institute_id = i.id')
		 ->where('fc.id_institute = str.institute_id')
		 ->where('fc.id_institute = sec.inst_id')
		 ->where('sec.inst_id = s.inst_id')
		 ->where('s.inst_id = f.id_institute')
		 ->where('f.id_institute = c.id_institute')
		 ->where('i.id',$id_institute)
		 ->where('i.status',1)
		 ->where('fc.status',1)
		 ->where('ac.status',1)
		 ->where('s.status',1)
		 ->where('sec.status',1)
		 ->where('c.status',1)
		 ->where('str.status',1)
		 ->get();
		 //$pageSize,$pageNumber
		  return $builder->getResultArray();

	}

	 public function get_column_name(){
		  	$db      	= \Config\Database::connect();
		  	$builder 	= $db->query('DESC student_profile');
		  	$result 	= array_column($builder->getResultArray(), 'Field');
		  	return $result;
		  }
	/*fee related*/
	public function get_user_details_search($name,$phone){
		$db      	= \Config\Database::connect();
		$data 		= array();
		 $builder 	= $db->table('standard_subject_mapping s')->select('*')->where('s.status',1)->like('name', $name)->orLike('phone', $phone)->get();
		 return $builder->getResultArray();
	}
	/*student related*/
	public function getStudentDetails($pagedata){
		$db      		= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$type           = $pagedata['type'];
		$id_institute 	= $pagedata['id_institute'];
		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('i.status',1)->where('u.type',1)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.type',1)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		//$builder = $db->table('student_profile sp')->select('*')->where('sp.status',1)->limit($pagedata['pageSize'],$pagedata['pageNumber'])->get();
		 $builder = $db->table('student_profile sp');
		 $builder->select('sp.*,sec.name as section_name,s.name as standard_name')->join('standard_section sec','sec.id = sp.standard')->join('standard s','s.id = sec.standard_id');
		  if($pagedata['filter']){
		 	foreach ($pagedata['filter'] as $key => $value) {
		 		if($value['operator'] == 'like'){
		 			$builder->like('sp.'.$value['column'], $value['columnvalue']);
		 		}else{
		 			$builder->where('sp.'.$value['column'], $value['columnvalue']);
		 		}
		 	}
		 }
		 $builder->where('sp.status', 1)->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('id_institute',$id_institute)->where('uom.status',1);
		 if($pagedata['standard'] && $type =="section"){
		 	$builder->where('sp.standard',$pagedata['standard']);
		 }
		 if($pagedata['standard'] && $type =="standard"){
		 	$builder->where('sec.standard_id',$pagedata['standard'])->where('s.id',$pagedata['standard']);
		 }
		 $builder->limit($pagedata['pageSize'],$pagedata['pageNumber']);
		 $query   = $builder->get();
		$profiledetails = $query->getResultArray();
		foreach ($profiledetails as $key => $value) {
		     	$data[$key] = $value;
				$data[$key]['organizations'] = $sdata[$value['UID']];
		   }  
		     return $data;

	}

	public function getStudentDetailsWithId($UID,$pagedata){		
		$db      		= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$id_institute 	= $pagedata['id_institute'];
		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('u.UID',$UID)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('i.status',1)->where('u.type',1)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.UID',$UID)->where('u.type',1)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		$builder = $db->table('student_profile sp')->select('sp.*')->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('id_institute',$id_institute)->where('uom.status',1)->where('sp.status',1)->get();
		$data = $builder->getRow();
	    
		$data->organization = $sdata[$data->UID];
		     
		     return $data;

	}
	/*student related*/
	/*staff related*/
	public function getStaffDetails($pagedata){
		$db      		= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$id_institute 	= $pagedata['id_institute'];
		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('i.status',1)->where('u.type',2)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.type',2)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		 $builder = $db->table('staff_profile sp');
		 $builder->select('sp.UID,sp.rfid,sp.name,sp.designation,sp.class_teacher,sp.qualification');
		 if($pagedata['filter']){
		 	foreach ($pagedata['filter'] as $key => $value) {
		 		if($value['operator'] == 'like'){
		 			$builder->like($value['column'], $value['columnvalue']);
		 		}else{
		 			$builder->where($value['column'], $value['columnvalue']);
		 		}
		 	}
		 }
		 $builder->where('sp.status', 1)->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('id_institute',$id_institute)->where('uom.status',1);
		 $query   = $builder->get();
		//$builder = $db->table('staff_profile sp')->select('sp.UID,sp.rfid,sp.name,sp.designation,sp.class_teacher,sp.qualification')->where('sp.status',1)->get();
		$profiledetails = $query->getResultArray();
		foreach ($profiledetails as $key => $value) {
		     	$data[$key] 					= $value;
				$data[$key]['organizations'] 	= $sdata[$value['UID']];
		     
		   }
		     
		     return $data;
	}


	public function getStaffDetailsWithId($UID,$pagedata){
		$db      			= \Config\Database::connect();
		$data 				= array();
		$querydata 			= array();
		$profiledetails 	= array();
		$pdata 				= array();
		$inst_data 			= array();
		$id_institute 		= $pagedata['id_institute'];
		$builder_new1 		= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('i.status',1)->where('u.type',2)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.type',2)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		$builder = $db->table('staff_profile sp')->select('sp.UID,sp.rfid,sp.name,sp.designation,sp.class_teacher,sp.qualification')->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('id_institute',$id_institute)->where('uom.status',1)->where('sp.status',1)->get();
		$data = $builder->getRow();
	    
		$data->organization = $sdata[$data->UID];
		     
		     return $data;

	}

	public function getStaffDetailsStatus(){
	 	$db      	= \Config\Database::connect();
		$data 		= array();
		$builder 	= $db->table('staff_profile m')->select('m.role,m.status')->where('m.status',1)->get();
			 foreach ($builder->getResultArray() as $key => $value) {
			 	if(isset($value['role'])){
	              $data[$value['role']]+=1;
			 	}else{
			 		$data[$value['role']]=1;
			 	}
			 }
			 return array($data);
	 }
/*staff related*/

/*leave related*/
	public function get_leavetype_details($pagedata)
	{
		$id_institute 	= $pagedata['id_institute'];
	 	$pageSize 		= $pagedata['pageSize'];
	 	$pageNumber 	= $pagedata['pageNumber'];
		$db      		= \Config\Database::connect();
		$data 			= array();
		$builder 		= $db->table('leave_type l')->select('l.id,l.type,l.total_leaves,a.label as acedemic_year,l.starting_date,l.allocation_type,l.description,l.leave_status,l.last_processed')->join('academic_year a', 'l.id_academicyear = a.id')->where('l.id_institute',$id_institute)->where('l.status',1)->where('a.status',1)->get($pageSize,$pageNumber);
		$data = $builder->getResultArray();
		return $data;

	}

	public function leaveStatusUpdation(){
		$db      		= \Config\Database::connect();
		$leaveData      = $this->getLeavesAppliedStatus();
		$data 			= array();
		 $builder 		= $db->table('leave_status l')->select('*')->get();
		$querydata_new1 = $builder->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 		$data[$value['id_leave']][$value['id_user']] = $value['leave_pending'];
		 }
		 foreach ($leaveData as $lkey => $lvalue) {
	              foreach ($lvalue as $llkey => $llvalue) {   
	                $data1 = [
	               'leave_pending' 	=> $data[$lkey][$llkey]-$llvalue,
	               'leave_taken'    => $llvalue
	          ];

			$db->table('leave_status sp')->where('id_user', $llkey)->where('id_leave',$lkey)->update($data1);
	              }
	           } 
	           return;
	}
	public function getleaves($id_institute){
		$db      = \Config\Database::connect();
		 $builder = $db->table('leave_type lt')->select('lt.id,lt.allocation_type,lt.total_leaves,a.label as academic_year,a.start_date as start_date')->join('academic_year a','a.id = lt.id_academicyear')->where('lt.status',1)->where('lt.id_institute',$id_institute)->where('lt.leave_status','NOT PROCESSED')->get();
		  return $builder->getResultArray();

	}
	public function get_remaining_leave($id_institute){
	$db      	= \Config\Database::connect();
	 $builder2 	= $db->table('leave_status sp')->select('*')->where('id_institute',$id_institute)->get();
	        $data = $builder2->getResultArray();
	        foreach ($data as $bkey => $bvalue) {
	        	$leaveresponse[$bvalue['id_user']][$bvalue['id_leave']] = $bvalue['leave_pending'];
	        }
	         return $leaveresponse;
	     }

     public function getLeavesEachAppliedStatus($id_institute){
	$db      = \Config\Database::connect();
	$data = array();
	$pdata = array();
	$leavepending = $this->getStaffWiseLeave($id_institute);
	 $builder = $db->table('leave_applications l')->select('l.id,lt.type,l.from_date,l.to_date,l.description,l.posting_date,u.name,l.leave_status,l.admin_remark,l.staff_id,lt.id as type_id,u.UID')->join('leave_type lt', 'l.type=lt.id')->join('users u', 'l.staff_id = u.UID')->where('l.id_institute = lt.id_institute')->where('l.id_institute',$id_institute)->where('l.status',1)->where('lt.status',1)->where('u.status',1)->get();
	$querydata_new1 = $builder->getResultArray();
	 foreach ($querydata_new1 as $key =>$value)
		{
		    $pdata[$key] = $value;
		    $pdata[$key]['leave_pending'] = $leavepending[$value['UID']][$value['type_id']]['leave_pending']?$leavepending[$value['UID']][$value['type_id']]['leave_pending']:0;
	 		$pdata[$key]['leave_taken'] = $leavepending[$value['UID']][$value['type_id']]['leave_taken']?$leavepending[$value['UID']][$value['type_id']]['leave_taken']:0;	
		}
		foreach ($pdata as $key1 => $value1) {
			if(!isset($data[$value1['leave_status']])){
				$data[$value1['leave_status']] =array();
			}
			array_push($data[$value1['leave_status']], $value1);
		}
		return $data;
	}

	public function getLeavesAppliedReporting($id_institute)
	{
		$db      		= \Config\Database::connect();
		$data 			= array();
		$leavepending 	= array();
		$pdata 			=array();
		$builder = $db->table('leave_status l')->select('l.leave_pending,l.leave_taken,lt.id as leave_id,u.UID')->join('leave_type lt','lt.id = l.id_leave')->join('users u','u.UID = l.id_user')->where('l.id_institute',$id_institute)->where('lt.status',1)->where('u.status',1)->get();
		  $querydata_new = $builder->getResultArray();
		 foreach ($querydata_new as $key => $value) {
		  	$leavepending[$value['UID']][$value['leave_id']]['leave_pending'] 	=  $value['leave_pending'];
		  	$leavepending[$value['UID']][$value['leave_id']]['leave_taken'] 	=  $value['leave_taken'];
		  }

		 $builder1 = $db->table('leave_applications l')->select('u.UID,l.id,lt.id as leave_id,lt.type,l.from_date,l.to_date,l.description,l.posting_date,u.name,l.leave_status,sp.reporting_staff')->join('leave_type lt', 'l.type=lt.id')->join('users u', 'l.staff_id = u.UID')->join('staff_profile sp','u.UID = sp.UID')->where('l.id_institute = lt.id_institute')->where('l.id_institute',$id_institute)->where('sp.status',1)->where('l.status',1)->where('lt.status',1)->where('u.status',1)->get();
		  $querydata_new1 = $builder1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$pdata[$key] = $value;	
		 	$pdata[$key]['leave_pending'] 	= $leavepending[$value['UID']][$value['leave_id']]['leave_pending']?$leavepending[$value['UID']][$value['leave_id']]['leave_pending']:0;
		 	$pdata[$key]['leave_taken'] 	= $leavepending[$value['UID']][$value['leave_id']]['leave_taken']?$leavepending[$value['UID']][$value['leave_id']]['leave_taken']:0;	
		 }
		 foreach ($pdata as $key1 => $value1) {
				if(!isset($data[$value1['reporting_staff']])){
					$data[$value1['reporting_staff']] =	array();
				}
				array_push($data[$value1['reporting_staff']], $value1);
			}
			return  array($data);
	}

	public function getStaffWiseLeave($id_institute){
		$db      		= \Config\Database::connect();
		$data 			= array();
		$leavepending 	= array();
		$builder = $db->table('leave_status l')->select('l.leave_pending,l.leave_taken,lt.id as leave_id,u.UID')->join('leave_type lt','lt.id = l.id_leave')->join('users u','u.UID = l.id_user')->where('l.id_institute = lt.id_institute')->where('l.id_institute',$id_institute)->where('lt.status',1)->where('u.status',1)->get();
		  $querydata_new = $builder->getResultArray();
		 foreach ($querydata_new as $key => $value) {
		  	$leavepending[$value['UID']][$value['leave_id']]['leave_pending'] 	=  $value['leave_pending'];
		  	$leavepending[$value['UID']][$value['leave_id']]['leave_taken'] 	=  $value['leave_taken'];
		  }
		  return $leavepending;
	}

	public function getLeavesApplied($pagedata){
		$id_institute 	= $pagedata['id_institute'];
	 	$pageSize 		= $pagedata['pageSize'];
	 	$pageNumber 	= $pagedata['pageNumber'];
		$db      		= \Config\Database::connect();
		$data 			= array();
		$leavepending 	= $this->getStaffWiseLeave($id_institute);
		 $builder1 		= $db->table('leave_applications l')->select('u.UID,l.id,lt.id as leave_id,lt.type,l.from_date,l.to_date,l.description,l.posting_date,u.name,l.leave_status')->join('leave_type lt', 'l.type=lt.id')->join('users u', 'l.staff_id = u.UID')->where('l.id_institute',$id_institute)->where('l.status',1)->where('lt.status',1)->where('u.status',1)->get($pageSize,$pageNumber);
		  $querydata_new1 = $builder1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$data[$key] 					= $value;
		 	$data[$key]['leave_pending'] 	= $leavepending[$value['UID']][$value['leave_id']]['leave_pending']?$leavepending[$value['UID']][$value['leave_id']]['leave_pending']:0;
		 	$data[$key]['leave_taken'] 		= $leavepending[$value['UID']][$value['leave_id']]['leave_taken']?$leavepending[$value['UID']][$value['leave_id']]['leave_taken']:0;		
		 }
		 return $data;
	}

	public function getLeavesAppliedStatus(){
		$db      	= \Config\Database::connect();
		$data 		= array();
		 $builder 	= $db->table('leave_applications l')->select('l.id,lt.type,l.from_date,l.to_date,l.description,l.posting_date,u.name,l.leave_status,l.admin_remark,l.staff_id,lt.id as type_id')->join('leave_type lt', 'l.type=lt.id')->join('users u', 'l.staff_id = u.UID')->where('l.status',1)->where('lt.status',1)->where('u.status',1)->whereIn('l.leave_status',['Approved','Pending'])->get();
		$querydata_new1 = $builder->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 		
		 		if(isset($data[$value['type_id']][$value['staff_id']])){
		 			$data[$value['type_id']][$value['staff_id']] += 1;
		 		}else{
		 			$data[$value['type_id']][$value['staff_id']] = 1;
		 		}
		 }
		 return $data;

	}
	public function getLeavesAppliedWithId($leave_type,$id_institute){
		$db      		= \Config\Database::connect();
		$data 			= array();
		$leavepending 	= array();
		$builder = $db->table('leave_status l')->select('l.leave_pending,l.leave_taken,lt.id as leave_id,u.UID')->join('leave_type lt','lt.id = l.id_leave')->join('users u','u.UID = l.id_user')->where('l.id_institute',$id_institute)->where('lt.status',1)->where('u.status',1)->get();
		  $querydata_new = $builder->getResultArray();
		 foreach ($querydata_new as $key => $value) {
		  	$leavepending[$value['UID']][$value['leave_id']]['leave_pending'] 	=  $value['leave_pending'];
		  	$leavepending[$value['UID']][$value['leave_id']]['leave_taken'] 	=  $value['leave_taken'];
		  }

		 $builder1 = $db->table('leave_applications l')->select('u.UID,l.id,lt.id as leave_id,lt.type,l.from_date,l.to_date,l.description,l.posting_date,u.name,l.leave_status')->join('leave_type lt', 'l.type=lt.id')->join('users u', 'l.staff_id = u.UID')->where('l.type',$leave_type)->where('l.id_institute = lt.id_institute')->where('l.id_institute',$id_institute)->where('l.status',1)->where('lt.status',1)->where('u.status',1)->get();
		  $querydata_new1 = $builder1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$data[$key] = $value;
		 	$data[$key]['leave_pending'] 	= $leavepending[$value['UID']][$value['leave_id']]['leave_pending']?$leavepending[$value['UID']][$value['leave_id']]['leave_pending']:0;
		 	$data[$key]['leave_taken'] 		= $leavepending[$value['UID']][$value['leave_id']]['leave_taken']?$leavepending[$value['UID']][$value['leave_id']]['leave_taken']:0;		
		 }
		 return $data;

	}
/*leave related*/

/*transportation related*/
	 public function getRouteMappingcount(){
	 		$db      		= \Config\Database::connect();
			$data 			= array();
			$data_route 	= array();
			$route_details 	= array();
			$builder 		= $db->table('route_mapping m')->select('m.status,m.id_route')->where('m.status',1)->get();
			 foreach ($builder->getResultArray() as $key => $value) {
			 	if(isset($value['id_route'])){
	              $data[$value['id_route']]+=1;
			 	}else{
			 		$data[$value['id_route']]=1;
			 	}
			 }
			 $builder_route = $db->table('bus_route_master m')->select('m.id,m.route_name,m.status')->where('m.status',1)->get();
			 foreach ($builder_route->getResultArray() as $key => $value) {
			 	$data_route[$value['id']] = $value;
			 	if(isset($data[$value['id']])){
			 		$data_route[$value['id']]['route_count'] = $data[$value['id']];
			 	}else{
			 		$data_route[$value['id']]['route_count'] = 0;
			 	}
			 }
			 foreach ($data_route as $key => $value) {
			 	$route_details[] =  $value;
			 }

			 return $route_details;
	 }

	  public function get_studentroutedetails($id){
	 	$db      	= \Config\Database::connect();
		$data 		= array();
		$builder 	= $db->table('student_route_mapping sr')->select('sr.id,sr.id_user,sr.id_route,br.route_name,sr.id_stop,rm.stop,sp.name,sp.primary_contact')->join('student_profile sp','sp.UID = sr.id_user')->join('bus_route_master br','br.id = sr.id_route')->join('route_mapping rm','rm.id_route = br.id')->where('br.id',$id)->where('rm.id_route',$id)->where('sr.id_stop = rm.id')->where('sr.status',1)->where('sp.status',1)->where('br.status',1)->where('rm.status',1)->get();
			 return $builder->getResultArray();
	 }	
 /*transportation related*/
 /*message center related*/

	public function getGroupMembers($pagedata){
		$db      	= \Config\Database::connect();
		 $builder 	= $db->table('group_members gm')->select('gm.id,gm.UID,gm.name,gm.email,gm.phone')->where('gm.id_group',$pagedata['id_group'])->where('gm.id_institute',$pagedata['id_institute'])->where('gm.id_board',$pagedata['id_board'])->where('gm.status',1)->get();
		  return $builder->getResultArray();

	}

	 public function get_messagedata($type,$to,$id_institute,$id_board){
	 	$db      			= \Config\Database::connect();
	 	$staff_data 		= array();
	 	$student_data 		= array();
	 	$student_dataid 	= array();
		$data 				= array();
		$group_data 		= array();
		$group_all 			= array();
		$group_details 		= array();
		$individual_details = array();
		$individual_data    = array();
		$ind_data['flag']   = 0;
		$builder_staff = $db->table('staff_profile m')->select('m.name,m.UID,m.phone')->join('user_organization_mapping uom','uom.id_user = m.UID')->where('uom.id_institute',$id_institute)->where('uom.status',1)->where('m.status',1)->get();
			if($builder_staff->getResultArray()){
				foreach ($builder_staff->getResultArray() as $key => $value) {
					$staff_data[$key]['name']	 = $value['name'];
					$staff_data[$key]['UID']	 = $value['UID'];
					$staff_data[$key]['phone'] 	 = $value['phone'];
				}	
			}
			
			$builder_student = $db->table('student_profile m')->select('m.name,m.UID,m.primary_contact')->join('user_organization_mapping uom','uom.id_user = m.UID')->where('uom.id_institute',$id_institute)->where('uom.status',1)->where('m.status',1)->get();
			if($builder_student->getResultArray()){
				foreach ($builder_student->getResultArray() as $key => $value) {
					$student_data[$key]['name']	    = $value['name'];
					$student_data[$key]['UID'] 		= $value['UID'];
					$student_data[$key]['phone'] 	= $value['primary_contact'];
				}
			}
			
			if($type=='StudentWise'){
				$builder_studentstandard = $db->table('student_profile m')->select('m.UID,m.primary_contact')->join('user_organization_mapping uom','uom.id_user = m.UID')->where('uom.id_institute',$id_institute)->where('uom.status',1)->where('standard',$to)->where('m.status',1)->get();
				if($builder_studentstandard->getResultArray()){
					foreach ($builder_studentstandard->getResultArray() as $key => $value) {
						$student_dataid[$key]['UID'] 	= $value['UID'];
						$student_dataid[$key]['phone'] 	= $value['primary_contact'];
					}
				}
			}
			if($type=='Group'){
				//$to = explode(",",$to);
				//$to = json_decode($to,TRUE);
				$builder_group = $db->table('group_members')->where('id_group',$to)->where('id_institute',$id_institute)->where('id_board',$id_board)->where('status',1)->get();
				if($builder_group->getResultArray()){
					foreach ($builder_group->getResultArray() as $key => $value) {
						$group_data[$key] = $value;
					}
				}

			}
		$group_all = array_merge($staff_data,$student_data);	
		if($type=='All' && $to=='All'){
			$data = array_merge($staff_data,$student_data);
		}else if($type=='All' && $to=='Staff' || ($type=='Staff' && $to = 'All')){
			$data = $staff_data;
		}else if($type=='All' && $to=='Student' || ($type=='Student' && $to == 'All')){
			$data = $student_data;
		}else if($type=='StudentWise'){
			$data = $student_dataid;
		}else if($type == 'Group'){
			foreach ($group_data as $key => $value) {
				//if(in_array($value['UID'],$group_data)){
					$group_details[$key]['UID'] 	= $value['UID'];
					$group_details[$key]['phone'] 	= $value['phone'];
				//}
			}
			$data = $group_details;
		}else if($type == 'classWise'){
			foreach ($student_data as $key => $value) {
				if($value['UID'] == $to){
					$individual_details[$key]['UID'] 	= $to;
					$individual_details[$key]['phone'] 	= $value['phone'];
				}
			}
			$data = $individual_details;
		}else if($type == 'Individuals'){
			foreach ($group_all as $key => $value) {
				if($value['UID'] == $to || $value['name'] == $to || $value['phone']== $to){
					$individual_data[$key]['UID'] 		= $value['UID'];
					$individual_data[$key]['phone'] 	= $value['phone'];
					$ind_data['flag'] = 1;
				}
			}
			if($ind_data['flag']==0){
				$individual_data[$key]['UID'] 		= -1;
				$individual_data[$key]['phone'] 	= $to;
			}
			$data = $individual_data;
		}
		return $data;
	 }

	 public function get_data_bydate($date){
	 	$db      = \Config\Database::connect();
	 	$builder = $db->table('user_message')->select('*')->where('DATE(created_on)',$date)->where('status','AWAITING-DLR')->get();
	 	return $builder->getResultArray();

	 }

	 public function getDataMessageCenter($pagedata){
	 	$db      		 = \Config\Database::connect();
	 	$id_institute    = $pagedata['id_institute'];
	 	$receipient      = $pagedata['receipient'];
	 	if($receipient){
	 		$recp =  explode('●',$receipient);
	 	}
	 	$messagedetails =array();
	 	$message        = array();
	 	$totalmessage   = array();
	 	$balancemessage = array();
	 	$filtarr        = array('description','start_date','end_date');
	 	$builder        = $db->table('user_message um');	
	 	$builder->select('um.id,um.contact_number as sent_to,mc.description as message,mc.date as sent_date,um.status');
		 	if($receipient && trim($recp[2])){
		 		$builder->where('um.contact_number',trim($recp[2]));
		 	}
		  if($pagedata['filter']){
		 	foreach ($pagedata['filter'] as $key => $value) {
		 		if(!in_array($value['column'], $filtarr)){
		 			if($value['operator'] == 'like'){
		 				$builder->like('um.'.$value['column'], $value['columnvalue']);
			 		}else{
			 			$builder->where('um.'.$value['column'], $value['columnvalue']);
			 		}
		 		}else{
		 			if($value['column']=='description'){
		 				if($value['operator'] == 'like'){
		 					$builder->like('mc.'.$value['column'], $value['columnvalue']);
				 		}else{
				 			$builder->where('mc.'.$value['column'], $value['columnvalue']);
				 		}
		 			}else{
		 				if($value['column']==='start_date'){
		 					$where = "mc.date >= '".$value['columnvalue']."'";
		 				}
		 				if($value['column']==='end_date'){
		 					$where .= " AND mc.date <= '".$value['columnvalue']."'";
		 					
		 				}
		 				$builder->where($where);
		 			}
		 			
		 		}	
		 	}
		 }
		 $builder->join('message_center mc','mc.id = um.id_message')->where('um.id_institute',$id_institute)->where('um.id_institute = mc.id_institute')->where('um.id_board = mc.id_board')->where('mc.status',1);
		 $query   = $builder->get();
		 $builder_messageusage = $db->table('user_message um')->select('um.units')->get();
			if($builder_messageusage->getResultArray()){
				foreach ($builder_messageusage->getResultArray() as $key => $value) {
					$message[$key] = $value['units'];
				}
			}
		 $builder_totalmessage = $db->table('institute_configs um')->select('um.sms_allotted')->where('um.id_institute',$id_institute)->get();
		 if($builder_totalmessage->getResultArray()){
				foreach ($builder_totalmessage->getResultArray() as $key => $value) {
					$totalmessage['totalmessage'] = $value['sms_allotted'];
				}
			}
		 $builder_messagedata = $db->table('message_center mc')->select('mc.id,mc.description,mc.type,mc.to,mc.date')->where('mc.id_institute',$id_institute);
		 if($pagedata['filter']){
		 	foreach ($pagedata['filter'] as $key => $value) {
		 		if($value['column']=='id_board' || $value['column']=='description'){
		 				if($value['operator'] == 'like'){
		 					$builder_messagedata->like('mc.'.$value['column'], $value['columnvalue']);
				 		}else{
				 			$builder_messagedata->where('mc.'.$value['column'], $value['columnvalue']);
				 		}
		 			}else{
		 				if($value['column']==='start_date'){
		 					$where = "mc.date >= '".$value['columnvalue']."'";
		 				}
		 				if($value['column']==='end_date'){
		 					$where .= " AND mc.date <= '".$value['columnvalue']."'";
		 					
		 				}
		 				$builder_messagedata->where($where);
		 			}	
		 	}
		 }
		 $query_messagedata   					= $builder_messagedata->get();
		 $messagedetails['messagedata']         = $query_messagedata->getResultArray();
		 $messagedetails['messagehistory'] 		= $query->getResultArray();
		 $messagedetails['messageusedcount'] 	= array_sum($message);
		 $messagedetails['totalmessage'] 	    = $totalmessage['totalmessage'];
		 $messagedetails['balancemessage'] 	    = ($messagedetails['totalmessage']-$messagedetails['messageusedcount']);

		return $messagedetails;
	 }
	 public function getDataMessageCenterWithId($pagedata){
	 	$db      		 = \Config\Database::connect();
	 	$id_institute    = $pagedata['id_institute'];
	 	$id              = $pagedata['id'];
	 	$messagedetails =array();
	 	$filtarr        = array('description','start_date','end_date');
	 	$builder        = $db->table('user_message um');	
	 	$builder->select('mc.id as messageid,um.id,um.contact_number as sent_to,mc.description as message,mc.date as sent_date,um.status,um.sent_id');
		 $builder->join('message_center mc','mc.id = um.id_message')->where('mc.id',$id)->where('um.id_institute',$id_institute)->where('um.id_institute = mc.id_institute')->where('um.id_board = mc.id_board')->where('mc.status',1)->where('um.type','messagecenter');
		 $query   = $builder->get();
		 if($query->getResultArray()){
		 	foreach ($query->getResultArray() as $key => $value) {
		 		if($value['sent_id']!=''){
		 			$value['status'] = 'DELIVERED';
		 		}else if($value['sent_id']=='' && $value['status']=='INV-NUMBER'){
		 			$value['status'] = 'NOT DELIVERED';
		 		}else{
		 			$value['status'] = 'PENDING';
		 		}
		 		$messagedetails[$key] = $value;
		 	}
		 }
		 return $messagedetails;
	 }
	/*message center related*/
	 /*Hostel blocks starts*/
	 public function getHostelBlocks($pagedata){
	 	$id_institute 	= $pagedata['id_institute'];
	 	$pageSize 		= $pagedata['pageSize'];
	 	$pageNumber 	= $pagedata['pageNumber'];
	 	$db      		= \Config\Database::connect();
	 	$data 			= array();
	 	$builder = $db->table('hostel_block hb')->select('hb.id,hb.name,hb.no_of_rooms,hb.type,hb.wardon,s.name as staff')->join('staff_profile s','hb.wardon = s.UID')->where('hb.id_institute',$id_institute)->where('hb.status',1)->where('s.status',1)->get($pageSize,$pageNumber);
			 return $builder->getResultArray();
	 }

	 public function getHostelRooms($pagedata){
	 	$id_institute 	= $pagedata['id_institute'];
	 	$pageSize 		= $pagedata['pageSize'];
	 	$pageNumber  	= $pagedata['pageNumber'];
	 	$db      		= \Config\Database::connect();
	 	$data 			= array();
	 	$builder = $db->table('hostel_room hr')->select('hr.id,hr.floor,hr.room_no,hr.no_of_beds,hr.price_per_bed,hr.id_block,hb.name as block_name')->join('hostel_block hb','hb.id = hr.id_block')->where('hr.id_institute = hb.id_institute')->where('hb.id_institute',$id_institute)->where('hb.status',1)->where('hr.status',1)->get($pageSize,$pageNumber);
			 return $builder->getResultArray();
	 }

	 public function getHostelAllotments($pagedata){
	 	$id_institute 	= $pagedata['id_institute'];
	 	$pageSize 		= $pagedata['pageSize'];
	 	$pageNumber 	= $pagedata['pageNumber'];
	 	$db      		= \Config\Database::connect();
	 	$data 			= array();
	 	$builder = $db->table('hostel_allotment ha')->select('ha.id,ha.id_user,ha.bed_no,ha.allocated_date,ha.start_date,ha.end_date,hr.room_no,hr.price_per_bed,hr.floor,hb.id as id_block,hb.name as block_name,s.name as student_name,hr.id as id_room')->join('hostel_room hr','hr.id=ha.id_room')->join('hostel_block hb','hb.id = hr.id_block')->join('student_profile s','ha.id_user = s.UID')->where('ha.id_institute = hb.id_institute')->where('hr.id_institute = hb.id_institute')->where('ha.id_institute',$id_institute)->where('s.status',1)->where('hb.status',1)->where('ha.status',1)->where('hr.status',1)->get($pageSize,$pageNumber);
			 return $builder->getResultArray();
	 }

	 public function getHostelAllotmentsStudents($pagedata){
	 	$id_institute 		= $pagedata['id_institute'];
	 	$pageSize 			= $pagedata['pageSize'];
	 	$pageNumber 		= $pagedata['pageNumber'];
	 	$db      			= \Config\Database::connect();
	 	$data 				= array();
	 	$student_ids 		= array();
	 	$builder_all 		= $db->table('student_profile sp')->select(' sp.name , sp.UID')->join('user_organization_mapping uom','uom.id_user = sp.UID')->where('uom.id_institute',$id_institute)->where('sp.status',1)->where('uom.status',1)->get();
	 	$query = $builder_all->getResultArray();

	 	$builder = $db->table('hostel_allotment ha')->select('ha.id,ha.id_user,ha.bed_no,ha.allocated_date,ha.start_date,ha.end_date,hr.room_no,hr.price_per_bed,hr.floor,hb.id as id_block,hb.name as block_name,s.name as student_name')->join('hostel_room hr','hr.id=ha.id_room')->join('hostel_block hb','hb.id = hr.id_block')->join('student_profile s','ha.id_user = s.UID')->where('ha.id_institute = hb.id_institute')->where('hr.id_institute = hb.id_institute')->where('ha.id_institute',$id_institute)->where('s.status',1)->where('hb.status',1)->where('ha.status',1)->where('hr.status',1)->get();
			$query2 =  $builder->getResultArray();
			if($query2){
				foreach ($query2 as $key => $value) {
					$student_ids[$value['id_user']] = $value['id_user'];
				}
			}
			if($query){
				foreach ($query as $key => $value) {
					if(!in_array($value['UID'], $student_ids)){
						$data[] = $value;
					}
				}
			}
			return $data;
	 }

	 public function getHostelAllotmentsBeds($pagedata){
	 	$id_institute 	= $pagedata['id_institute'];
	 	$id 			= $pagedata['id'];
	 	$db      		= \Config\Database::connect();
	 	$data 			= array();
	 	$student_count 	= array();
	 	$bed_count 		= array();
	 	$beds 			= array();
	 	$builder = $db->table('hostel_allotment ha')->select('ha.id,ha.id_user,ha.bed_no,ha.allocated_date,ha.start_date,ha.end_date,hr.room_no,hr.no_of_beds,hr.price_per_bed,hr.floor,hb.id as id_block,hb.name as block_name,s.name as student_name,hr.id as id_room')->join('hostel_room hr','hr.id=ha.id_room')->join('hostel_block hb','hb.id = hr.id_block')->join('student_profile s','ha.id_user = s.UID')->where('hr.id',$id)->where('ha.id_institute = hb.id_institute')->where('hr.id_institute = hb.id_institute')->where('ha.id_institute',$id_institute)->where('s.status',1)->where('hb.status',1)->where('ha.status',1)->where('hr.status',1)->get();
		 	$query = $builder->getResultArray();
		 	$builder_bed = $db->table('hostel_room hr')->select('hr.room_no,hr.no_of_beds,hr.price_per_bed,hr.floor,hb.id as id_block,hb.name as block_name,hr.id as id_room')->join('hostel_block hb','hb.id = hr.id_block')->where('hr.id',$id)->where('hr.id_institute = hb.id_institute')->where('hr.id_institute',$id_institute)->where('hb.status',1)->where('hr.status',1)->get();
		 	$query1 = $builder_bed->getResultArray();
		 	if($query1){
		 		foreach ($query as $key => $value) {
			 		if(isset($student_count[$value['id_block']][$value['floor']][$value['id_room']])){
			 			$student_count[$value['id_block']][$value['floor']][$value['id_room']]+=1;
			 		}else{
			 			$student_count[$value['id_block']][$value['floor']][$value['id_room']]=1;
			 		}
			 	}
			 	$array = array_column($query1,'bed_no');
			 	foreach ($query1 as $key => $value) {
			 		for($i=1;$i<=$value['no_of_beds'];$i++){
			 			if(!in_array($i, $array)){
			 				$bed_no[$i] = $i;
			 			}

			 		}
		 		}
				 		foreach ($bed_no as $key2 => $value2) {
				 		 array_push($beds,$value2);
				 	}
		 	}
			 return $beds;

	 }


	/* message group data*/

	 public function getMessageGroupDetails($pagedata){
	 	$id_institute 	= $pagedata['id_institute'];
	 	$id_board 	    = $pagedata['id_board'];
	 	$pageSize 		= $pagedata['pageSize'];
	 	$pageNumber 	= $pagedata['pageNumber'];
	 	$db      		= \Config\Database::connect();
	 	$data 			= array();
	 	$members 		= array();
	 	$builder_member = $db->table('group_members gm')->select('gm.name,gm.phone,gm.email,gm.id_group')->where('gm.id_institute',$id_institute)->where('gm.id_board',$id_board)->where('gm.status',1)->get();
	 	if($builder_member->getResultArray()){
	 		foreach ($builder_member->getResultArray() as $key => $value) {
	 			if(isset($value['name'])){
	 				$members[$value['id_group']]+=1;
	 			}else{
	 				$members[$value['id_group']]=1;
	 			}
	 		}
	 	}
	 	$builder = $db->table('message_group mp')->select('*')->where('mp.id_institute',$id_institute)->where('mp.id_board',$id_board)->get();
	 	//$pageSize,$pageNumber
	 	foreach ($builder->getResultArray() as $key => $value) {
	 		$data[$key] = $value;
	 		$data[$key]['member_count'] = $members[$value['id']]?$members[$value['id']]:0;
	 	}
	 	return $data;
			
	 }

	 

	
	

	

	

	
	/*assignment related*/
	/*new queries */
	/*users related */
	public function getUserDetails($pagedata){
		$db      		= \Config\Database::connect();
		$id_institute 	= $pagedata['id_institute'];
		$data           = array();
		$student_data   = array();
		$staff_data     = array();
		$builder_student = $db->table('student_profile sp')->select('sp.UID,sp.name,sp.email,sp.primary_contact as phone')->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('uom.id_institute',$id_institute)->where('sp.status',1)->where('uom.status',1)->get();
		$student_data = $builder_student->getResultArray();

		$builder_staff = $db->table('staff_profile sp')->select('sp.UID,sp.name,sp.email,sp.phone as phone')->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('uom.id_institute',$id_institute)->where('sp.status',1)->where('uom.status',1)->get();
		$staff_data = $builder_staff->getResultArray();
		$data = array_merge($student_data,$staff_data);
         return $data;

	}

	/*student related*/
	public function getStudentDataDetails($pagedata){
		$db      		= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$type           = $pagedata['type'];
		$id_institute 	= $pagedata['id_institute'];
		$id_board 	    = $pagedata['id_board'];
		$id_academicyear 	= $pagedata['id_academicyear'];
		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('s.id',$id_board)->where('uom.id_academicyear',$id_academicyear)->where('i.status',1)->where('u.type',1)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.type',1)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('s.id',$id_board)->where('uom.id_academicyear',$id_academicyear)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		//$builder = $db->table('student_profile sp')->select('*')->where('sp.status',1)->limit($pagedata['pageSize'],$pagedata['pageNumber'])->get();
		 $builder = $db->table('students_profile sp');
		 $builder->select('sp.*,sec.section as section_name,sec.standard as standard_name')->join('class_master sec','sec.id = sp.standard');
		  if($pagedata['filter']){
		 	foreach ($pagedata['filter'] as $key => $value) {
		 		if($value['operator'] == 'like'){
		 			$builder->like('sp.'.$value['column'], $value['columnvalue']);
		 		}else{
		 			$builder->where('sp.'.$value['column'], $value['columnvalue']);
		 		}
		 	}
		 }
		 $builder->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('sec.id_institute = uom.id_institute')->where('sec.id_board = uom.id_board')->where('sec.id_academicyear = uom.id_academicyear')->where('uom.id_institute',$id_institute)->where('uom.id_board',$id_board)->where('uom.id_academicyear',$id_academicyear)->where('uom.status',1);
		 if($pagedata['standard'] && $type =="section"){
		 	$builder->where('sp.standard',$pagedata['standard']);
		 }
		 /*if($pagedata['standard'] && $type =="standard"){
		 	$builder->where('sec.standard_id',$pagedata['standard'])->where('s.id',$pagedata['standard']);
		 }*/
		 //->where('sp.status', 1)
		 $builder->limit($pagedata['pageSize'],$pagedata['pageNumber'])->orderBy('sec.id');
		 $query   = $builder->get();
		$profiledetails = $query->getResultArray();
		foreach ($profiledetails as $key => $value) {
		     	$data[$key] = $value;
		     	$data[$key]['class_name'] = $value['standard_name'].' '.$value['section_name'];
				$data[$key]['organizations'] = $sdata[$value['UID']];
		   }  
		     return $data;

	}


	/*users related */
	public function getStudentDataDetailsWithId($UID,$pagedata){		
		$db      		= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$mainData       = array();
		$resultData     = array();
		$attachmentData = array();
		$id_institute 	= $pagedata['id_institute'];
		$id_board 	    = $pagedata['id_board'];
		$id_academicyear 	= $pagedata['id_academicyear'];
		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('u.UID',$UID)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('s.id',$id_board)->where('uom.id_academicyear',$id_academicyear)->where('i.status',1)->where('u.type',1)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.UID',$UID)->where('u.type',1)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('s.id',$id_board)->where('uom.id_academicyear',$id_academicyear)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		$builder = $db->table('students_profile sp')->select('sp.*,sec.section as section_name,sec.standard as standard_name')->join('user_organization_mapping uom','sp.UID = uom.id_user')->join('class_master sec','sp.standard = sec.id')->where('sec.id_institute = uom.id_institute')->where('uom.id_institute',$id_institute)->where('uom.id_board',$id_board)->where('uom.id_academicyear',$id_academicyear)->where('uom.status',1)->where('sp.status',1)->where('sp.UID',$UID)->where('sec.status',1)->get();
		$data['profile'] = $builder->getRow();
		

		$builder_fee = $db->table('students_fee_config sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_fee = $builder_fee->getRow();
		$builder_prevdetail = $db->table('students_previous_details sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_prevdetail = $builder_prevdetail->getResultArray();
		$builder_awards = $db->table('students_awards sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_awards = $builder_awards->getResultArray();
		$builder_siblings = $db->table('students_siblings sp')->select('sp.*')->where('UID',$UID)->where('sp.sibling_status',1)->get();
		$data_sibling = $builder_siblings->getResultArray();
		$builder_attachment = $db->table('students_attachments sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_attachment = $builder_attachment->getResultArray();
		if($builder_attachment->getResultArray()){
			foreach ($builder_attachment->getResultArray() as $key => $value) {
				$attachmentData[$value['UID']] = $value['student_photo'];
			}
		}
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$mainData[$value['UID']] = $value;
				$mainData[$value['UID']]['student_photo'] = $attachmentData[$value['UID']]?$attachmentData[$value['UID']]:'';
			}
		}
		if($mainData){
			foreach ($mainData as $key => $value) {
				array_push($resultData, $value);
			}
		}
		$data['personal']     = $resultData;
		$data['organization'] = $sdata[$data->UID];
		$data['feeconfig'] 	  = $data_fee;
		$data['previous'] 	  = $data_prevdetail;
		$data['awards'] 	  = $data_awards;
		$data['siblings']     = $data_sibling;
		$data['attachment']   = $data_attachment;

		     
		     return $data;

	}



	public function getManagementWithId($id){
		$db      		= \Config\Database::connect();
		$data 			= array();
		$builder = $db->table('management_profile ap')->select('ap.*')->where('ap.status',1)->where('ap.id',$id)->get();
		$data_profile = $builder->getRow();
		
		$builder_profile = $db->table('management_profile ap')->select('ap.*')->where('ap.status',1)->where('ap.id',$id)->get();
		$data_personal     = $builder_profile->getResultArray();

		$builder_profession = $db->table('management_profession ap')->select('ap.*')->where('ap.id_management',$id)->where('ap.status',1)->get();
		$data_profession = $builder_profession->getResultArray();

		$builder_position = $db->table('management_position ap')->select('ap.*')->where('ap.id_management',$id)->where('ap.status',1)->get();
		$data_position     = $builder_position->getResultArray();

		$builder_family = $db->table('management_family ap')->select('ap.*')->where('ap.id_management',$id)->where('ap.status',1)->get();
		$data_family     = $builder_family->getResultArray();

		$builder_attachment = $db->table('management_attachment ap')->select('ap.*')->where('ap.id_management',$id)->where('ap.status',1)->get();
		$data_attachment    = $builder_attachment->getResultArray();

		$data['profile']        = $data_profile;
		$data['personal']       = $data_personal;
		$data['profession'] 	= $data_profession;
		$data['position'] 		= $data_position;
		$data['family'] 		= $data_family;
		$data['attachment'] 	= $data_attachment; 
		     
		     return $data;

	}
	public function getDesignationWiseStaffCount(){
		$db       = \Config\Database::connect();
		$mainData = array();
		$builder    = $db->table('staff_role')->select('*')->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$mainData[$value['id']] = $value['name'];
			}
		}
		return $mainData;
	}
	public function getDataWithDesigntationCards($pagedata){
		$db      		= \Config\Database::connect();
		$id_institute 	= $pagedata['id_institute'];
		$builder        = $db->table('management_profile')->select('current_designation')->where('status',1)->groupBy('current_designation')->get();
		return $builder->getResultArray();
	}
	

	public function getStaffDataDetails($pagedata){
		$db      		= \Config\Database::connect();
		$staffDesignation     = $this->getDesignationWiseStaffCount();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$id_institute 	= $pagedata['id_institute'];
		$id_academicyear 	= $pagedata['id_academicyear'];
		$id_board 	    = $pagedata['id_board'];
		$department     = $pagedata['department'];
		$designation    = $pagedata['designation'];
		$standard_count = array();
		$subject_count  = array();
		$builder_total = $db->table('standard_subject_staff_mapping sp')->select('sp.id_staff')->where('sp.id_institute',$id_institute)->where('sp.id_academicyear',$id_academicyear)->where('sp.id_board',$id_board)->get();
		if($builder_total->getResultArray()){
			foreach ($builder_total->getResultArray() as $key => $value) {
				if(isset($value['id_staff'])){
					$standard_count[$value['id_staff']] += 1;
					$subject_count[$value['id_staff']] += 1;
				}else{
					$standard_count[$value['id_staff']] = 1;
					$subject_count[$value['id_staff']]  = 1;
				}
			}
		}

		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('i.status',1)->where('u.type',2)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.type',2)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		 $builder = $db->table('staffs_profile sp');
		 $builder->select('sp.*,b.name as board');
		 if($pagedata['filter']){
		 	foreach ($pagedata['filter'] as $key => $value) {
		 		if($value['operator'] == 'like'){
		 			$builder->like($value['column'], $value['columnvalue']);
		 		}else{
		 			$builder->where($value['column'], $value['columnvalue']);
		 		}
		 	}
		 }
		 if($department){
		 	$builder->where('sp.department',$department);
		 }
		 if($designation){
		 	$builder->where('sp.designation',$designation);
		 }
		 $builder->join('user_organization_mapping uom','sp.UID = uom.id_user')->where('id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('id_board',$id_board)->where('uom.status',1)->join('board b','uom.id_institute = b.institute_id')->where('b.id = uom.id_board')->where('b.status',1);
		 $query   = $builder->get();
		//$builder = $db->table('staff_profile sp')->select('sp.UID,sp.rfid,sp.name,sp.designation,sp.class_teacher,sp.qualification')->where('sp.status',1)->get();
		$profiledetails = $query->getResultArray();
		foreach ($profiledetails as $key => $value) {
		     	$data[$key] 					= $value;
		     	$data[$key]['standard_count'] 	= $standard_count[$value['UID']]?$standard_count[$value['UID']]:0;
		     	$data[$key]['subject_count'] 	= $subject_count[$value['UID']]?$subject_count[$value['UID']]:0;
				$data[$key]['organizations'] 	= $sdata[$value['UID']];
				$data[$key]['designation_data']      = $staffDesignation[$value['designation']]?$staffDesignation[$value['designation']]:0;
		     
		   }
		     
		     return $data;
	}

	public function getStaffDataDetailsWithId($UID,$pagedata){		
		$db      		= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$staffstandard  = array();
		$staffsubject   = array();
		$id_institute 	= $pagedata['id_institute'];
		$builder_new1 	= $db->table('organization o')->select('o.id as organization_id,i.id,i.name,s.name as board_name,s.id as board_id,u.UID')->join('institution i ', 'i.organization_id = o.id')->join('board s ', 'i.id = s.institute_id')->join('user_organization_mapping uom','uom.id_organization = o.id')->join('users u','u.UID=uom.id_user')->where('u.UID',$UID)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('i.status',1)->where('u.type',1)->where('o.status',1)->where('s.status',1)->where('u.status',1)->where('uom.status',1)->get();
		 $querydata_new1 = $builder_new1->getResultArray();
		 foreach ($querydata_new1 as $key => $value) {
		 	$key = $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['id'] 	= $value['id'];
		 	$inst_data[$value['UID']][$value['organization_id']][$key]['name'] 	= $value['name'];
		 }

		$builder = $db->table('organization o')->select('o.id as organization_id,o.name as organization_name,o.trust_name,u.UID,i.id as institute_id')->join('institution i ', 'i.organization_id = o.id')->join('user_organization_mapping uom ', 'i.organization_id = uom.id_organization')->join('board s ', 'i.id = s.institute_id')->join('users u','u.UID = uom.id_user')->where('u.UID',$UID)->where('u.type',1)->where('i.status',1)->where('uom.id_institute = i.id')->where('i.id',$id_institute)->where('o.status',1)->where('s.status',1)->where('uom.status',1)->get();
		$querydata_new = $builder->getResultArray();
		//count($querydata_new);
		foreach ($querydata_new as $key => $value) {
			$key = $value['organization_id'];
		 	$pdata[$value['UID']][$key]['id'] 			= $value['organization_id'];
		 	$pdata[$value['UID']][$key]['name'] 		= $value['organization_name'];
		 	$pdata[$value['UID']][$key]['institutes']	= array_values($inst_data[$value['UID']][$value['organization_id']]);
		 	
		 }

		 foreach ($pdata as $key1 => $value1) {
		 	foreach ($value1 as $key2 => $value2) {
		 		 if(!isset($sdata[$key1]))
		 	{
		 		$sdata[$key1] =array();
		 	}
		 		 array_push($sdata[$key1],$value2);
		 	}
		 	
		 }
		//exit;
		$builder = $db->table('staffs_profile sp')->select('sp.*,b.name as board')->join('user_organization_mapping uom','sp.UID = uom.id_user')->join('board b','uom.id_institute = b.institute_id')->where('b.id = uom.id_board')->where('b.status',1)->where('uom.id_institute',$id_institute)->where('uom.status',1)->where('sp.status',1)->where('sp.UID',$UID)->get();
		$data['profile'] = $builder->getRow();
		$data['personal'] = $builder->getResultArray();

		$builder_work = $db->table('staffs_work sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_work = $builder_work->getResultArray();

		$builder_awards = $db->table('staffs_awards sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_awards = $builder_awards->getResultArray();

		$builder_skill = $db->table('staffs_skill sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_skill = $builder_skill->getResultArray();
		
		$builder_education = $db->table('staffs_education sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_education = $builder_education->getResultArray();

		$builder_attachment = $db->table('staffs_attachments sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_attachment = $builder_attachment->getResultArray();

		$builder_staffstandard = $db->table('standard_subject_staff_mapping sp')->select('sp.id,s.standard,s.section,sp.id_section,sp.id_staff')->join('class_master s','s.id = sp.id_section')->where('sp.id_institute = s.id_institute')->where('sp.id_academicyear = s.id_academicyear')->where('sp.id_board = s.id_board')->where('sp.id_staff',$UID)->where('sp.status',1)->get();
		$data_staffstandard = $builder_staffstandard->getResultArray();
		if($data_staffstandard){
			foreach ($data_staffstandard as $staffkey => $staffvalue) {
				$staffstandard[$staffvalue['id_staff']][] = $staffvalue['id_section'];
			}
		}
		$builder_staffsubject = $db->table('standard_subject_staff_mapping sp')->select('sp.id,s.name as subjectname')->join('standard_subject_mapping t2','t2.id = sp.id_subject')->join('subject_master s','s.id = t2.subject_id')->where('sp.id_institute = s.id_institute')->where('s.id_institute = t2.id_institute')->where('sp.id_academicyear = s.id_academicyear')->where('s.id_academicyear = t2.id_academicyear')->where('sp.id_board = s.id_board')->where('s.id_board = t2.id_board')->where('sp.id_staff',$UID)->where('sp.status',1)->where('s.status',1)->where('t2.status',1)->get();
		$data_staffsubject = $builder_staffsubject->getResultArray();
	    

		$data['organization'] 	= $sdata[$data->UID];
		$data['work'] 			= $data_work;
		$data['awards'] 		= $data_awards;
		$data['skill'] 			= $data_skill;
		$data['education']     	= $data_education;
		$data['attachment'] 	= $data_attachment;
		$data['staffstandard']  = $data_staffstandard;
		$data['staffsubject']    = $data_staffsubject;
		if(isset($staffstandard[$UID])){
			$data['selectedstaffsection'] = implode(",",$staffstandard[$UID]);
		}
		     
		     return $data;

	}

	
	

	public function getRoomMasterDetails($data){
		$db      				= \Config\Database::connect();
		$resultdata 			= array();
		$maindata               = array();
		$id_institute   		= $data['id_institute'];
		$id_board       		= $data['id_board'];
		$id_academicyear 		= $data['id_academicyear'];
		$sectiondata          	= array();
		$streamdata             = array();
		$builder         = $db->table('room_master rm')->select('rm.*')->where('rm.id_institute',$id_institute)->where('rm.id_academicyear',$id_academicyear)->where('rm.id_board',$id_board)->get();
		return $builder->getResultArray();

	}
	public function getRoomMasterDetailsWithId($data){
		$db      				= \Config\Database::connect();
		$resultdata 			= array();
		$maindata               = array();
		$section_map            = array();
		$sectionmapping         = array();
		$id   		            = $data['id'];
		$builder_smap = $db->table('room_master s')->select('sm.id as smid,s.id,sm.id_section,sc.section as section,sc.standard as standard_name,sc.id as section_id,sm.id_subject')->join('standard_subject_room_mapping sm','sm.id_room = s.id')->join('class_master sc','sc.id = sm.id_section')->where('s.id',$id)->where('s.id_institute = sm.id_institute')->where('sm.id_institute = sc.id_institute')->where('s.id_board = sm.id_board')->where('sm.id_board = sc.id_board')->where('s.id_academicyear = sm.id_academicyear')->where('sm.id_academicyear = sc.id_academicyear')->where('s.status',1)->where('sm.status',1)->where('sc.status',1);
		$querymapdata = $builder_smap->get();
			  $querysdata = $querymapdata->getResultArray();
			 foreach ($querysdata as $key => $value) {
			 	$section_map[$value['id']][$key]['id'] 		= $value['section_id'];
			 	$section_map[$value['id']][$key]['name'] 	= $value['standard_name'].' '.$value['section'];
			 	$sectionmapping[$value['id']]['assigned'][$value['section_id']] = $value['standard_name'].' '.$value['section'];
			 	$sectionmapping[$value['id']]['selectedsubjects'][] = $value['id_subject'];
			 }
			  foreach ($section_map as $subkey => $subvalue) {
				 	foreach ($subvalue as $key => $value) {
				 		if(!isset($sectionmapping[$subkey]['sections'])){
				 		$sectionmapping[$subkey]['sections'] = array();
				 	}
				 	array_push($sectionmapping[$subkey]['sections'],$value);
			 	}	
			 }

		
		$builder         = $db->table('room_master rm')->select('rm.*')->where('rm.id',$id)->get();
		$querydata       = $builder->getResultArray();
		foreach ($querydata as $key => $value) {
			  	$resultdata[$value['id']]['id'] 		    = $value['id'];
			  	$resultdata[$value['id']]['floor'] 	        = $value['floor'];
			  	$resultdata[$value['id']]['room_no'] 	    = $value['room_no'];
			  	$resultdata[$value['id']]['room_name'] 	    = $value['room_name'];
			  	$resultdata[$value['id']]['status'] 			= $value['status'];
			  	if(isset($sectionmapping[$value['id']])){	
			  		$resultdata[$value['id']]['assigned'] 	= implode(",",$sectionmapping[$value['id']]['assigned']);
			  		$resultdata[$value['id']]['selectedsubjects'] 	= implode(",",$sectionmapping[$value['id']]['selectedsubjects']);
			  	}
			  	
		 	 } 
		 	 foreach ($resultdata as $key => $value) {
		 	 	array_push($maindata,$value);
		 	 }
		return $maindata;

	}
	public function getRoomWiseSubjects($id_section,$id_institute,$id_board,$id_academicyear,$id_room){
		$db      				= \Config\Database::connect();
		$maindata = array();
		$resultdata = array();
		$data['data']        = array();
		$data['selectedsubject'] = array();
		$builder         = $db->table('standard_subject_room_mapping t1')->select('t1.id_section,t1.id,t1.id_subject,t2.floor,t2.room_no,t2.room_name,t3.name as subjectname,t4.standard,t4.section,t4.streams')->join('room_master t2','t2.id = t1.id_room')->join('subject_master t3','t3.id = t1.id_subject')->join('class_master t4','t4.id = t1.id_section')->where('t1.id_institute = t2.id_institute')->where('t2.id_institute = t3.id_institute')->where('t3.id_institute = t4.id_institute')->where('t1.id_academicyear = t2.id_academicyear')->where('t2.id_academicyear = t3.id_academicyear')->where('t3.id_academicyear = t4.id_academicyear')->where('t1.id_board = t2.id_board')->where('t2.id_board = t3.id_board')->where('t3.id_board = t4.id_board')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.id_board',$id_board)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1);
		if($id_section){
			$builder->where('t1.id_section',$id_section);
		}
		if($id_room){
			$builder->where('t1.id_room',$id_room);
		}
		$query = $builder->get();
		if($query->getResultArray()){
			 foreach ($query->getResultArray() as $key => $value) {
                 $resultdata[$value['id_section']]['selectedsubject'][$value['id']] = $value['id_subject'];
                 $resultdata[$value['id_section']]['selectedsubjectname'][$value['id']] = $value['subjectname'];
			 }
			 foreach ($query->getResultArray() as $key => $value) {
                 $maindata[$value['id']]['id']         = $value['id'];
                 $maindata[$value['id']]['id_section'] = $value['id_section'];
                 $maindata[$value['id']]['id_subject'] = $value['id_subject'];
                 $maindata[$value['id']]['floor']      = $value['floor'];
                 $maindata[$value['id']]['room_no']    = $value['room_no'];
                 $maindata[$value['id']]['room_name']  = $value['room_name'];
                 $maindata[$value['id']]['subjectname'] = $value['subjectname'];
                 $maindata[$value['id']]['standard']   = $value['standard'].' '.$value['section'];
                  $maindata[$value['id']]['streams']    = $value['streams'];
                 if(isset($resultdata[$value['id']])){	
			  		//$maindata['selectedsubject'][$value['id_section']] 	= implode(",",$resultdata[$value['id']]['selectedsubject']);
			  		//$maindata[$value['id_section']]['selectedsubjectname'][]	= $resultdata[$value['id']]['selectedsubjectname'];
			  	}
			 }
			 foreach ($maindata as $key => $value) {
			 	if(!isset($data['data'])){
			 		$data['data'] = array();
			 	}
			 	array_push($data['data'], $value);
		 		if(isset($resultdata[$value['id_section']])){	
		 			$data['selectedsubject'][$value['id_section']] = implode(",",$resultdata[$value['id_section']]['selectedsubject']);
		 	   }	
			 }
		}
		return $data;

	}
	public function getPreadmssionData(){
		$db      				  = \Config\Database::connect();
		$preadmissionSettingData  = array();
		$typeData                 = array();
		$countArray               = array();
		$builder                  = $db->table('preadmission_settings rm')->select('rm.*')->orderBy('start_date DESC,end_date DESC')->get();
		$query                    = $builder->getResultArray();
		$builder_profiledata      = $db->table('preadmission_profile rm')->select('rm.*')->get();
		$query_profiledata        = $builder_profiledata->getResultArray();
		if($query_profiledata){
			foreach ($query_profiledata as $pfkey => $pfvalue) {
				if(isset($pfvalue['id_setting'])){
					$typeData[$pfvalue['id_setting']]['applications'] +=1;
				}else{
					$typeData[$pfvalue['id_setting']]['applications'] =1;
				}
				if(isset($pfvalue['id_setting']) && $pfvalue['application_status']=='accepted'){
					$countArray[$pfvalue['id_setting']]['accepted'][$pfkey] =1;
				}else{
					$countArray[$pfvalue['id_setting']]['accepted'][$pfkey] =0;
				}
				if(isset($pfvalue['id_setting']) && $pfvalue['application_status']=='rejected'){
					$countArray[$pfvalue['id_setting']]['rejected'][$pfkey] =1;
				}else{
					$countArray[$pfvalue['id_setting']]['rejected'][$pfkey] =0;
				}
				if(isset($pfvalue['id_setting']) && $pfvalue['application_status']=='onhold'){
					$countArray[$pfvalue['id_setting']]['onhold'][$pfkey] =1;
				}else{
					$countArray[$pfvalue['id_setting']]['onhold'][$pfkey] =0;
				}
				$typeData[$pfvalue['id_setting']]['accepted'] = $countArray[$pfvalue['id_setting']]['accepted']?array_sum($countArray[$pfvalue['id_setting']]['accepted']):0;
				$typeData[$pfvalue['id_setting']]['rejected'] = $countArray[$pfvalue['id_setting']]['rejected']?array_sum($countArray[$pfvalue['id_setting']]['rejected']):0;
				$typeData[$pfvalue['id_setting']]['onhold'] = $countArray[$pfvalue['id_setting']]['onhold']?array_sum($countArray[$pfvalue['id_setting']]['onhold']):0;
			}
		}

	    if($query){
	    	foreach ($query as $pkey => $pvalue) {
                $preadmissionSettingData[$pkey]['id']              = $pvalue['id'];
                $preadmissionSettingData[$pkey]['description']     = $pvalue['description'];
                $preadmissionSettingData[$pkey]['start_date']      = date("F j, Y",strtotime($pvalue['start_date']));
                $preadmissionSettingData[$pkey]['end_date']        = date("F j, Y",strtotime($pvalue['end_date']));
                $preadmissionSettingData[$pkey]['date']            = date('Y-m-d');
                if(strtotime(date('Y-m-d'))<strtotime($pvalue['start_date']) && (strtotime(date('Y-m-d'))<strtotime($pvalue['end_date']))){
                  $preadmissionSettingData[$pkey]['prestatus']     = 'Future';
                }else if(strtotime(date('Y-m-d'))>strtotime($pvalue['start_date']) && strtotime(date('Y-m-d'))>strtotime($pvalue['end_date'])){
                  $preadmissionSettingData[$pkey]['prestatus']     = 'Expired';
                }else{
                   $preadmissionSettingData[$pkey]['prestatus']    = 'Running';
                }
                $preadmissionSettingData[$pkey]['status']          = $pvalue['status'];
                $preadmissionSettingData[$pkey]['instructions']    = $pvalue['instructions'];
                $preadmissionSettingData[$pkey]['applications']    = $typeData[$pvalue['id']]['applications']?$typeData[$pvalue['id']]['applications']:0;
                $preadmissionSettingData[$pkey]['accepted']    	   = $typeData[$pvalue['id']]['accepted']?$typeData[$pvalue['id']]['accepted']:0;
                $preadmissionSettingData[$pkey]['rejected']        = $typeData[$pvalue['id']]['rejected']?$typeData[$pvalue['id']]['rejected']:0;
                $preadmissionSettingData[$pkey]['onhold']        = $typeData[$pvalue['id']]['onhold']?$typeData[$pvalue['id']]['onhold']:0;
              }
              
	    }
	    return $preadmissionSettingData;

	}
	public function getPreadmssionDetails($data){
		$db      			= \Config\Database::connect();
		$id_academicyear	= $data['id_academicyear'];
		$id_board	        = $data['id_board'];
		$id_institute       = $data['id_institute'];
		$id_setting         = $data['id_setting'];
		$preadmissionData   = array();
		$builder            = $db->table('preadmission_profile sp')->select('sp.*,ps.description,ps.start_date,ps.end_date')->join('user_organization_mapping uom','sp.UID = uom.id_user')->join('preadmission_settings ps','ps.id = sp.id_setting')->where('uom.id_academicyear',$id_academicyear)->where('uom.id_institute',$id_institute)->where('uom.id_board',$id_board)->where('sp.status',1)->where('uom.status',1)->where('sp.type',3);
		if($id_setting){
			$builder->where('sp.id_setting',$id_setting);
		}
		$builder->where('ps.id_board = uom.id_board')->where('ps.id_institute = uom.id_institute')->where('ps.id_academicyear = uom.id_academicyear');
		$query   = $builder->get();
		if($query->getResultArray()){
	    	foreach ($query->getResultArray() as $pkey => $pvalue) {
	    		$preadmissionData[$pkey]['id'] = $pvalue['id'];
	    		$preadmissionData[$pkey]['UID'] = $pvalue['UID'];
	    		$preadmissionData[$pkey]['description'] = $pvalue['description'];
	    		$preadmissionData[$pkey]['name'] = $pvalue['name'];
	    		$preadmissionData[$pkey]['father_name'] = $pvalue['father_name'];
	    		$preadmissionData[$pkey]['primary_contact'] = $pvalue['primary_contact'];
	    		$preadmissionData[$pkey]['application_status'] = $pvalue['application_status'];
	    		 if(strtotime(date('Y-m-d'))<strtotime($pvalue['start_date']) && (strtotime(date('Y-m-d'))<strtotime($pvalue['end_date']))){
                  $preadmissionData[$pkey]['prestatus']     = 'Future';
                }else if(strtotime(date('Y-m-d'))>strtotime($pvalue['start_date']) && strtotime(date('Y-m-d'))>strtotime($pvalue['end_date'])){
                  $preadmissionData[$pkey]['prestatus']     = 'Expired';
                }else{
                   $preadmissionData[$pkey]['prestatus']    = 'Running';
                }
	    	}
	    }
		return $preadmissionData;
	}

	public function getPreadmissionDataDetailsWithId($UID,$pagedata){		
		$db      		= \Config\Database::connect();
		$data 			= array();
		$querydata 		= array();
		$profiledetails = array();
		$pdata 			= array();
		$inst_data 		= array();
		$id_institute 	= $pagedata['id_institute'];

		$builder = $db->table('preadmission_profile sp')->select('sp.*,sec.name as section_name,s.name as standard_name')->join('user_organization_mapping uom','sp.UID = uom.id_user')->join('standard_section sec','sp.standard = sec.id')->join('standard s','sec.standard_id = s.id')->where('sec.inst_id = s.inst_id')->where('sec.inst_id = uom.id_institute')->where('uom.id_institute',$id_institute)->where('uom.status',1)->where('sp.status',1)->where('sp.UID',$UID)->where('sec.status',1)->where('s.status',1)->get();
		$data['profile'] = $builder->getRow();
		$data['personal'] = $builder->getResultArray();

		$builder_fee = $db->table('preadmission_fee_config sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_fee = $builder_fee->getResultArray();
		
		
		$builder_siblings = $db->table('preadmission_siblings sp')->select('sp.*')->where('UID',$UID)->where('sp.sibling_status',1)->get();
		$data_sibling = $builder_siblings->getResultArray();

		$builder_attachment = $db->table('preadmission_attachments sp')->select('sp.*')->where('UID',$UID)->where('sp.status',1)->get();
		$data_attachment = $builder_attachment->getResultArray();
	    

		$data['feeconfig'] 	= $data_fee;
		$data['siblings']     = $data_sibling;
		$data['attachment'] 	= $data_attachment;
		     
		     return $data;
	}
	public function getHolidayData($data){
		$db      				= \Config\Database::connect();
		$resultdata 			= array();
		$resdata                =  array();
		$id_institute           = $data['id_institute'];
		$id_board               = $data['id_board'];
		$id_academicyear        = $data['id_academicyear'];
		$id_section             = $data['id_section'];
		$id_dept                = $data['id_dept'];
		$type                   = $data['type'];
		if($type=='student'){
			$studentcond = ['h.student_applicable !=' => ''];
			$builder         = $db->table('holidays h')->select('h.*')->where('h.id_academicyear',$id_academicyear)->where($studentcond);
			if($id_board!='all'){
				$builder->where('h.id_board',$id_board);
			}
			$query = $builder->get();
			if($query->getResultArray()){
			foreach ($query->getResultArray() as $hkey => $hvalue) {
			  if(isset($id_section) && $id_section!='' && $type=='student'){
			  	if(isset($hvalue['student_applicable']) &&  in_array($id_section, explode(',', $hvalue['student_applicable']))){
			  		$resultdata[] = $hvalue;
			  	}
			  }else{
			  	    $resultdata[$hkey]['id'] 			= $hvalue['id'];
			  		$resultdata[$hkey]['title'] 		= $hvalue['title'];
			  		$resultdata[$hkey]['start_date'] 	= $hvalue['start_date'];
			  		$resultdata[$hkey]['end_date'] 		= $hvalue['end_date'];
			  		$resultdata[$hkey]['day_difference'] = $hvalue['day_difference'];
			  		$resultdata[$hkey]['student_applicable'] = $hvalue['student_applicable'];
			  		$resultdata[$hkey]['staff_applicable'] = $hvalue['staff_applicable'];
			  		$resultdata[$hkey]['status'] 			= $hvalue['status'];
			  }
			}	
		}
		}else if($type=='staff'){
			$staffcond = ['h.staff_applicable !=' => ''];
			$builder         = $db->table('holidays h')->select('h.*')->where('h.id_academicyear',$id_academicyear)->where($staffcond);
			if($id_board!='all'){
				$builder->where('h.id_board',$id_board);
			}
				$query = $builder->get();
				if($query->getResultArray()){
				foreach ($query->getResultArray() as $hkey => $hvalue) {
					if(isset($id_dept) && $id_dept!='' && $type=='staff'){
					  	if(isset($hvalue['staff_applicable']) &&  in_array($id_dept, explode(',', $hvalue['staff_applicable']))){
					  		$resultdata[] = $hvalue;
					  	}
				  }else{
				  	    $resultdata[$hkey]['id'] 			= $hvalue['id'];
				  		$resultdata[$hkey]['title'] 		= $hvalue['title'];
				  		$resultdata[$hkey]['start_date'] 	= $hvalue['start_date'];
				  		$resultdata[$hkey]['end_date'] 		= $hvalue['end_date'];
				  		$resultdata[$hkey]['day_difference'] = $hvalue['day_difference'];
				  		$resultdata[$hkey]['student_applicable'] = $hvalue['student_applicable'];
				  		$resultdata[$hkey]['staff_applicable'] = $hvalue['staff_applicable'];
				  		$resultdata[$hkey]['status'] 			= $hvalue['status'];
				  }
				}	
			}
		}
		return $resultdata;
	}
	
	
	public function getQuestionBankChapterCount($id_section,$id_institute,$id_board,$id_academicyear){
		$db      = \Config\Database::connect();
		$questionbankCount = array();
		$builder = $db->table('question_bank_capters s')->select('s.*')->where('s.id_section',$id_section)->where('s.id_institute',$id_institute)->where('s.id_academicyear',$id_academicyear)->where('s.id_board',$id_board)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if(isset($value['id_subject'])){
					$questionbankCount[$value['id_subject']]+=1;
				}else{
					$questionbankCount[$value['id_subject']]=1;
				}
			}
			return $questionbankCount;
		}

	}

	public function getQuestionBankQuestionCount($id_section,$id_institute,$id_board,$id_academicyear){
		$db      = \Config\Database::connect();
		$questionbankCount = array();
		$builder = $db->table('question_bank_questions s')->select('sp.id_subject,s.id')->join('question_bank_capters sp','sp.id=s.id_chapter')->where('sp.id_section',$id_section)->where('sp.id_institute',$id_institute)->where('sp.id_academicyear',$id_academicyear)->where('sp.id_board',$id_board)->where('sp.status',1)->where('s.status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if(isset($value['id_subject'])){
					$questionbankCount[$value['id_subject']]+=1;
				}else{
					$questionbankCount[$value['id_subject']]=1;
				}
			}
			return $questionbankCount;
		}
	}


	public function getSubjectsStandardwiseData($standard,$id_institute,$type,$id_board,$id_academicyear){
		$db      = \Config\Database::connect();
		$data = array();
		$sdata = array();
		$sectionmapping = array();
		$assigneddata = array();
		$section_map = array();
		$teacher_count = array();
		$questionbankChapterCount = $this->getQuestionBankChapterCount($standard,$id_institute,$id_board,$id_academicyear);
		$questionbankQuestionCount = $this->getQuestionBankQuestionCount($standard,$id_institute,$id_board,$id_academicyear);
		//$secData = explode(',', $standard);
		$builder_stmap = $db->table('class_master s')->select('s.standard')->whereIn('s.id',$standard)->groupBy('s.standard')->get();
		 $querystdata = $builder_stmap->getResultArray();
		  	$builder_smap = $db->table('subject_master s')->select('sm.id as smid,s.id,s.name,s.code,sm.standard,sc.section as section,sc.standard as standard_name,sc.id as section_id,sm.subject_type,s.substate')->join('standard_subject_mapping sm','sm.subject_id = s.id')->join('class_master sc','sc.id = sm.standard')->where('s.id_institute = sm.id_institute')->where('sm.id_institute = sc.id_institute')->where('sc.id_institute',$id_institute)->where('s.id_board = sm.id_board')->where('sm.id_board = sc.id_board')->where('sc.id_board',$id_board)->where('s.id_academicyear = sm.id_academicyear')->where('sm.id_academicyear = sc.id_academicyear')->where('sc.id_academicyear',$id_academicyear)->where('s.status',1)->where('sm.status',1)->where('sc.status',1);
		  /*	if(!isset($type)){
		  		$builder_smap->where('st.id',$querystdata[0]['standard_id']);
		  	}*/
		  	if(isset($type) && $type='cstr'){
		  		$builder_smap->where('sm.standard',$standard);
		  		$builder_teachercount = $db->table('standard_subject_staff_mapping s')->select('s.*')->where('s.id_institute',$id_institute)->where('s.id_board',$id_board)->where('s.id_academicyear',$id_academicyear)->where('s.status',1)->get();
		  		 foreach ($builder_teachercount->getResultArray() as $key => $value) {
		 			$teacher_count[$value['id_subject']][$value['id_staff']] = $value['id_staff'];
		 		}

		  	}else if(isset($type) && $type=='assignment'){
		  		$sub_count = count($standard);
		  	}
		  	
		  	$querymapdata = $builder_smap->get();
			  $querysdata = $querymapdata->getResultArray();
			 foreach ($querysdata as $key => $value) {
			 	$section_map[$value['id']][$key]['id'] 		= $value['section_id'];
			 	$section_map[$value['id']][$key]['name'] 	= $value['standard_name'].' '.$value['section'];
			 	$sectionmapping[$value['id']]['assigned'][] = $value['standard_name'].' '.$value['section'];
			 	$sectionmapping[$value['id']]['selectedsections'][] = $value['section_id'];
			 }
			  foreach ($section_map as $subkey => $subvalue) {
				 	foreach ($subvalue as $key => $value) {
				 		if(!isset($sectionmapping[$subkey]['sections'])){
				 		$sectionmapping[$subkey]['sections'] = array();
				 	}
				 	array_push($sectionmapping[$subkey]['sections'],$value);
			 	}	
			 }
			 
		  	 $builder_map = $db->table('subject_master s')->select('sm.id as smid,s.id,s.name,s.code,sm.standard,sc.section as section,sc.standard as standard_name,sc.id as section_id,sm.status,sm.subject_type,s.type,s.substate')->join('standard_subject_mapping sm','sm.subject_id = s.id')->join('class_master sc','sc.id = sm.standard')->where('s.id_institute = sm.id_institute')->where('sm.id_institute = sc.id_institute')->where('sc.id_institute',$id_institute)->where('s.id_board = sm.id_board')->where('sm.id_board = sc.id_board')->where('sc.id_board',$id_board)->where('s.id_academicyear = sm.id_academicyear')->where('sm.id_academicyear = sc.id_academicyear')->where('sc.id_academicyear',$id_academicyear)->where('s.status',1)->where('sc.status',1)->orderBy('sm.status DESC');
		  	 if(isset($type) && $type='cstr'){
		  	 	$builder_map->where('sm.standard',$standard);
		  	 }else{
		  	 	if(isset($type) && $type=='assignment'){
		  	 		$builder_map->whereIn('sc.id',$standard)->groupBy('sm.subject_id')->having('COUNT(sm.subject_id)',  $sub_count)->where('sm.status',1); 
		  	 	}else{
		  	 		$builder_map->where('sm.standard',$standard);
		  	 	} 	
		  	 }
		  	 $buildermainmap = $builder_map->get();
			  $querydata = $buildermainmap->getResultArray();
			 foreach ($querydata as $key => $value) {
			  	$sdata[$value['id']]['id'] 				= $value['id'];
			  	$sdata[$value['id']]['subject_id'] 	    = $value['smid'];
			  	$sdata[$value['id']]['smid'] 	        = $value['smid'];
			  	$sdata[$value['id']]['name'] 			= $value['name'];
			  	$sdata[$value['id']]['code'] 			= $value['code'];
			  	$sdata[$value['id']]['subject_type'] 	= $value['subject_type'];
			  	$sdata[$value['id']]['type'] 	        = $value['type'];
			  	$sdata[$value['id']]['substate'] 	    = $value['substate'];
			  	$sdata[$value['id']]['status'] 			= $value['status'];
			  	$sdata[$value['id']]['teacher_count'] 			= $teacher_count[$value['smid']]?count($teacher_count[$value['smid']]):0;
			  	$sdata[$value['id']]['chapter_count']  = $questionbankChapterCount[$value['smid']]?$questionbankChapterCount[$value['smid']]:0;
			  	$sdata[$value['id']]['question_count']  = $questionbankQuestionCount[$value['smid']]?$questionbankQuestionCount[$value['smid']]:0;
			  	if(isset($sectionmapping[$value['id']])){	
			  		$sdata[$value['id']]['assigned'] 	= implode(",",$sectionmapping[$value['id']]['assigned']);
			  		//$sdata[$value['id']]['sections'] = $sectionmapping[$value['id']]['sections'];
			  		$sdata[$value['id']]['selectedsections'] 	= implode(",",$sectionmapping[$value['id']]['selectedsections']);
			  	}
			  	
		 	 } 
		 	 foreach ($sdata as $key => $value) {
		 	 	array_push($data,$value);
		 	 }
		 return $data;
	}

	public function getCSTROverview(){
		$db      		= \Config\Database::connect();
		$sql ="SELECT t4.id,t4.status,t1.standard,t1.section,t2.name as subject,(CASE WHEN t4.id_room is NULL THEN NULL ELSE t3.room_name END) as room_name ,t4.id_room FROM standard_subject_mapping t4 JOIN class_master t1 ON t1.id=t4.standard JOIN subject_master t2 ON t2.id=t4.subject_id JOIN room_master t3 ON (t3.id=t4.id_room OR t4.id_room is NULL) where t1.id_institute=t2.id_institute and t2.id_institute=t3.id_institute and t3.id_institute=t4.id_institute and t1.id_academicyear=t2.id_academicyear and t2.id_academicyear=t3.id_academicyear and t3.id_academicyear=t4.id_academicyear and t1.id_board=t2.id_board and t2.id_board=t3.id_board and t3.id_board=t4.id_board and t4.id_institute=1 and t4.id_academicyear=2 and t4.id_board=3 and t1.status=1 and t2.status=1 and t3.status=1 and t4.status=1 GROUP by t4.id order by t1.id,t1.standard,t1.section";
		$query = $db->query($sql);

		return $query->getResult();
	}

	public function getUserMenuData($data){
		$db      		= \Config\Database::connect();
		$id_institute   = $data['id_institute'];
		$id_board       = $data['id_board'];
		$id_academicyear = $data['id_academicyear'];
		$maindata       = array();
		$subdata        = array();
		$childmapping   = array();
		$resultdata     = array();
		$builder_subdata         = $db->table('nav_menu um')->select('um.*')->where('um.id_institute',$id_institute)->where('um.id_board',$id_board)->where('um.id_academicyear',$id_academicyear)->where('um.status',1)->orderBy('um.id_parent_menu,um.order_menu')->get();
		$data_subdata = $builder_subdata->getResultArray();
		if($data_subdata){
			foreach ($data_subdata as $subkey => $subvalue) {
				if($subvalue['id_parent_menu']!=0){
					$subdata[$subvalue['id_parent_menu']][$subkey]['id']   = $subvalue['id'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['name'] = $subvalue['name'];
					$subdata[$subvalue['id_parent_menu']][$subkey]['path'] = $subvalue['path'];
				}
			}
		}
		if($subdata){
			foreach ($subdata as $skey => $svalue) {
				foreach ($svalue as $sskey => $ssvalue) {
					if(!isset($childmapping[$skey])){
						$childmapping[$skey] = array();
					}
					array_push($childmapping[$skey], $ssvalue);
				}
				
			}
		}
		$builder_maindata    = $db->table('nav_menu um')->select('um.*')->where('um.id_institute',$id_institute)->where('um.id_board',$id_board)->where('um.id_academicyear',$id_academicyear)->where('um.status',1)->where('um.id_parent_menu',0)->orderBy('um.id,um.order_menu')->get();
		$data_maindata       = $builder_maindata->getResultArray();
		if($data_maindata){
			foreach ($data_maindata as $mainkey => $mainvalue) {
					$maindata[$mainvalue['id']]['id'] = $mainvalue['id'];
					$maindata[$mainvalue['id']]['name'] = $mainvalue['name'];
					$maindata[$mainvalue['id']]['path'] = $mainvalue['path'];
					if($childmapping[$mainvalue['order_menu']])
						$maindata[$mainvalue['id']]['child'] = $childmapping[$mainvalue['order_menu']];
					
			}

		}
		if($maindata){
			foreach ($maindata as $key => $value) {
				if(!isset($resultdata)){
					$resultdata = array();
				}
				array_push($resultdata, $value);
			}
		}
		return $resultdata;

	}

	public function getUserMenuDataWithPath($pagedata){
		$db      		= \Config\Database::connect();
		$id_institute   = $pagedata['id_institute'];
		$id_board       = $pagedata['id_board'];
		$id_academicyear = $pagedata['id_academicyear'];
		$builder        = $db->table('nav_menu um')->select('um.name,um.label,um.path')->where('um.id_institute',$id_institute)->where('um.id_board',$id_board)->where('um.id_academicyear',$id_academicyear)->where('um.status',1)->orderBy('um.id,um.order_menu')->get();
		return $builder->getResultArray();
	}
	
   public function getTeacherDetailsSubjectWise($pagedata){
   	    $db      		   = \Config\Database::connect();
		$id_institute      = $pagedata['id_institute'];
		$id_board          = $pagedata['id_board'];
		$id_academicyear   = $pagedata['id_academicyear'];
		$id_subject        = $pagedata['id_subject'];
		$builder_maindata    = $db->table('standard_subject_staff_mapping um')->select('um.id,s.UID,s.first_name as name')->join('staffs_profile s','s.UID = um.id_staff')->where('um.id_subject',$id_subject)->where('um.id_institute',$id_institute)->where('um.id_board',$id_board)->where('um.id_academicyear',$id_academicyear)->where('um.status',1)->where('s.status',1)->get();
		return $builder_maindata->getResultArray();
   }
   public function getTeacherListClassWise($pagedata){
   	    $db      		   = \Config\Database::connect();
		$id_institute      = $pagedata['id_institute'];
		$id_board          = $pagedata['id_board'];
		$id_academicyear   = $pagedata['id_academicyear'];
		$id_section        = $pagedata['id_section'];
		$builder_maindata    = $db->table('standard_subject_staff_mapping um')->select('um.id,s.UID,s.first_name as name')->join('staffs_profile s','s.UID = um.id_staff')->where('um.id_section',$id_section)->where('um.id_institute',$id_institute)->where('um.id_board',$id_board)->where('um.id_academicyear',$id_academicyear)->where('um.status',1)->where('s.status',1)->get();
		return $builder_maindata->getResultArray();
   }

   public function getRoleData(){
	$db      		   = \Config\Database::connect();

	 $roledata          = array();
	 $mappedData        = array();
	 $builder_mappeddata = $db->table('roles_permissions t1')->select('t1.*')->join('nav_menu t2','t2.id = t1.id_permission')->where('t2.id_parent_menu',0)->where('t2.status',1)->where('t1.can_view',1)->get();
	 //print_r($builder_mappeddata);exit;
	 if($builder_mappeddata->getResultArray()){
		 foreach ($builder_mappeddata->getResultArray() as $rolekey => $rolevalue) {
			 if(isset($rolevalue['id_role'])){
				 $mappedData[$rolevalue['id_role']][$rolekey] = $rolevalue['id_permission'];
			 }
			 
		 }
	 }
	 $builder = $db->table('roles r')->select('*')->where('r.status',1)->get();
	 if($builder->getResultArray()){
		 foreach ($builder->getResultArray() as $rolekey => $rolevalue) {
			 $roledata[$rolekey]['id'] = $rolevalue['id'];
			 $roledata[$rolekey]['id_institute'] = $rolevalue['id_institute'];
			 $roledata[$rolekey]['id_board'] = $rolevalue['id_board'];
			 $roledata[$rolekey]['id_academicyear'] = $rolevalue['id_academicyear'];
			 $roledata[$rolekey]['name'] = $rolevalue['name'];
			 $roledata[$rolekey]['status'] = $rolevalue['status'];
			 $roledata[$rolekey]['mappedcount'] = $mappedData[$rolevalue['id']]?count($mappedData[$rolevalue['id']]):0;
			 
		 }
	 }
	 return $roledata;
}

	
	public function getAssessmentSubjectsDetails($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$resultdata             = array();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_section             = $pagedata['id_section'];
		$id_exam                = $pagedata['id_exam'];
		$subjectDetails         = $this->getSubjectDetails($id_institute,$id_board,$id_academicyear);
		$builder = $db->table('exams_timetable_subjects t1')->select('t1.id,t1.id_timetable,t1.id_subject,t2.internal_considered,t2.attendance_considered,t2.id_section')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->where('t3.id_institute',$id_institute)->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t2.id',$id_exam)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1)->where('t2.id_section',$id_section)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if($subjectDetails[$value['id_section']][$value['id_subject']]){
					$maindata['sub'][$key]['id'] 				= $value['id'];
					$maindata['sub'][$key]['subject'] 			= $subjectDetails[$value['id_section']][$value['id_subject']];
					if(isset($value['internal_considered'])){
						$maindata['sub'][$key]['marks']['internal_marks'] = '';
					}
					$maindata['sub'][$key]['marks']['external_marks'] = '';
					if(isset($value['attendance_considered'])){
						$maindata['attendance_considered'] 		= 1;
					}

					$maindata[$value['id_section']][$subjectDetails[$value['id_section']][$value['id_subject']].'_'.$value['id_subject']] = '';
				}
			}
		}
         return $maindata;
	}

	
	

	

	public function getGalleryDetails($pagedata){
		$db        = \Config\Database::connect();
		$id_album 		 = $pagedata['id_album'];
		$id_institute 	= $pagedata['id_institute'];
		$id_board       = $pagedata['id_board'];
		$id_academicyear = $pagedata['id_academicyear'];
		$standardData           = $this->getStandardDetails($id_board,$id_institute);
		$selectedStandard       = array();
		$imageData = array();
		$mainData  = array();
		$builder   = $db->table('gallery_images')->where('id_album',$id_album)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$imageData[$value['id_album']][$key] = $value;
			}
		}
		$builder_gallery   = $db->table('gallery')->where('id',$id_album)->get();
		if($builder_gallery->getResultArray()){
			foreach ($builder_gallery->getResultArray() as $key => $value) {
				$mainData[$key] = $value;
				$selectedStandard[$key]   = explode(',', $value['standards']);
				$mainData[$key]['images'] = $imageData[$value['id']]?$imageData[$value['id']]:'';
			}
			if($selectedStandard){
				foreach ($selectedStandard as $selectkey => $selectvalue) {
					foreach ($selectvalue as $skey => $svalue) {
						$mainData[$selectkey]['selectedstandards'][$skey] = $standardData[$svalue]?$standardData[$svalue]:'';
					}
				}

			}
		}
		return $mainData;
	}

	public function getExamHallticketData($pagedata){
		$db      				= \Config\Database::connect();
		$maindata               = array();
		$id_exam    			= $pagedata['id_exam'];
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_section    			= explode(',',$pagedata['id_section']);
		$examName               = array();
		$roomData               = array();
		$selectedData           = array();
		$resultdata             = array();
		$stuData                = array();
		$studList               = array();
		$instructions           = array();
		$staffDetails           = $this->getStaffDetailsWithUID($id_institute,$id_board,$id_academicyear);
		$subjectDetails         = $this->getSubjectDetails($id_institute,$id_board,$id_academicyear);
		$standardData   		= $this->getStandardDetails($id_board,$id_institute);
		$examData               = $this->getExamDataDetails($pagedata);
		$builder = $db->table('exams_timetable_subjects t1')->select('t1.id,t1.id_timetable,t1.id_subject,t2.id as id_timetable_subject,t1.id_section,t1.invigilator')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->where('t3.id_institute',$id_institute)->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t3.id',$id_exam)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1);
		if($id_section){
			$builder->whereIn('t1.id_section',$id_section);
		}

		$querydata  = $builder->get();
		if($querydata->getResultArray()){
			date_default_timezone_set('Asia/Kolkata');
			foreach ($querydata->getResultArray() as $key => $value) {
				$maindata[$value['id']]['id'] 					= $value['id'];
				$maindata[$value['id']]['id_timetable'] 		= $value['id_timetable'];
				$maindata[$value['id']]['id_subject'] 	        = $value['id_subject'];
				$maindata[$value['id']]['id_section'] 	        = $value['id_section'];
				$maindata[$value['id']]['start_date'] 	        = $examData[$value['id']][$value['id_timetable_subject']]['start_date']?$examData[$value['id']][$value['id_timetable_subject']]['start_date']:'';
				$maindata[$value['id']]['start_time'] 	        = $examData[$value['id']][$value['id_timetable_subject']]['start_time']?$examData[$value['id']][$value['id_timetable_subject']]['start_time']:'';
				/*$maindata[$value['id']]['id_exam'] 		        = $value['id_exam'];
				$maindata[$value['id']]['exam_name'] 		    = $value['exam_name'];
				$maindata[$value['id']]['subject'] 		        = $subjectDetails[$value['id_section']][$value['id_subject']]?$subjectDetails[$value['id_section']][$value['id_subject']]:'';
				$maindata[$value['id']]['duration'] 				= round(abs(strtotime($value['start_time'])-strtotime($value['end_time'])) / 3600,2).' Hours';
				$maindata[$value['id']]['status'] 		        = $value['status'];
				$maindata[$value['id']]['examdate_time'] 		= date('j M',$value['exam_date']).', '.$value['start_time'];
				$maindata[$value['id']]['invigi']               = '';
				$examName[$value['id_section']]                 = $value['exam_name'];
				$roomData[$value['id_section']]                 = json_decode($value['students_rooms'],TRUE);
				$instructions[$value['id_section']]             = $value['special_instructions'];
				$studList[$value['id_section']]                 = explode(',', $value['selected_students']);*/

			}
			if($maindata){
				foreach ($maindata as $mainkey => $mainvalue) {
					if(!isset($resultdata)){
						$resultdata = array();
					}
					array_push($resultdata, $mainvalue);
				}
			}
		/*	$builder_student                = $db->table('students_profile t1')->select('t1.id,t1.UID,t1.name,t1.middle_name,t1.last_name,t1.standard')->join('user_organization_mapping t2','t1.UID = t2.id_user')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_board',$id_board)->where('t1.standard',$id_section)->where('t1.status',1)->where('t2.status',1)->whereIn('t1.UID',$studList[$id_section])->get();
			if($builder_student->getResultArray()){
				foreach ($builder_student->getResultArray() as $studkey => $studvalue) {
					$stuData[$studkey]  = $studvalue;
					$stuData[$studkey]['standard']  = $standardData[$studvalue['standard']]['name']?$standardData[$studvalue['standard']]['name']:'';
					$stuData[$studkey]['exam_name']  = $examName[$studvalue['standard']]?$examName[$studvalue['standard']]:'';
					if($resultdata){
						foreach ($resultdata as $subkey => $subvalue) {
							$stuData[$studkey]['subjects'][$subkey] = $subvalue;
							$stuData[$studkey]['subjects'][$subkey]['room_no'] = $roomData[$studvalue['standard']][$studvalue['UID']]?$roomData[$studvalue['standard']][$studvalue['UID']]:'';
						}
					}
				}
			}*/
			return $resultdata;

		}
	}
	public function getViewHallticketData($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$mindate                = array();
		$mainData               = array();
		$getStudentCount        = $this->getStudentCountDetails($id_institute,$id_board,$id_academicyear);
		$builder_minDate = $db->table('exams_timetable_subjects t1')->select('t1.id,t1.id_timetable,t1.id_subject,t1.exam_date,t1.start_time,t1.end_time,t1.internal_max_marks,t1.internal_min_marks,t1.exam_max_marks,t1.exam_min_marks,t1.invigilator,t2.status,t2.id_exam,t2.id_section,t3.name as exam_name,t1.exam_date as exam_date,t2.published as published')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t3.id_institute',$id_institute)->where('t1.status',1)->where('t3.status',1)->orderBy('t2.status DESC')->get();
		if($builder_minDate->getResultArray()){
			foreach ($builder_minDate->getResultArray() as $key => $value) {
			   $mindate[$value['id_exam']][$key]              = $value['exam_date'];
			}	
		}
		$builder = $db->table('exam_halltickets t1')->select('t1.*')->join('exams t2','t2.id = t1.id_exam')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_academicyear',$id_academicyear)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$mainData[$key]['id'] 			= $value['id'];
				$mainData[$key]['id_exam'] 		= $value['id_exam'];
				$mainData[$key]['id_section'] 	= $value['id_section'];
				$mainData[$key]['start_date'] 	= min($mindate[$value['id_exam']]);
				$mainData[$key]['generated'] 	= count(explode(',', $value['selected_students'])).' Hall tickets';
				$mainData[$key]['assigned'] 	= $getStudentCount[$value['id_section']]?$getStudentCount[$value['id_section']]:'0';
				$mainData[$key]['assigned'].=' students';

			}
		}
		return $mainData;

	}

	/*public function getViewHallticketData($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		
		$mindate                = array();
		$mainData               = array();
		$getStudentCount        = $this->getStudentCountDetails($id_institute,$id_board,$id_academicyear);
		$builder_minDate = $db->table('exams_timetable_subjects t1')->select('t1.id,t1.id_timetable,t1.id_subject,t1.exam_date,t1.start_time,t1.end_time,t1.internal_max_marks,t1.internal_min_marks,t1.exam_max_marks,t1.exam_min_marks,t1.invigilator,t2.status,t2.id_exam,t2.id_section,t3.name as exam_name,t1.exam_date as exam_date,t2.published as published')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t3.id_institute',$id_institute)->where('t1.status',1)->where('t3.status',1)->orderBy('t2.status DESC')->get();
		if($builder_minDate->getResultArray()){
			foreach ($builder_minDate->getResultArray() as $key => $value) {
			   $mindate[$value['id_exam']][$key]              = $value['exam_date'];
			}	
		}
		$builder = $db->table('exam_halltickets t1')->select('t1.*')->join('exams t2','t2.id = t1.id_exam')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_academicyear',$id_academicyear)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$mainData[$key]['id'] 			= $value['id'];
				$mainData[$key]['id_exam'] 		= $value['id_exam'];
				$mainData[$key]['id_section'] 	= $value['id_section'];
				$mainData[$key]['start_date'] 	= min($mindate[$value['id_exam']]);
				$mainData[$key]['generated'] 	= count(explode(',', $value['selected_students'])).' Hall tickets';
				$mainData[$key]['assigned'] 	= $getStudentCount[$value['id_section']]?$getStudentCount[$value['id_section']]:'0';
				$mainData[$key]['assigned'].=' students';

			}
		}
		return $mainData;

	}*/

		public function getViewHallticketDataNew($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute    		= $pagedata['id_institute'];
		$id_board    			= $pagedata['id_board'];
		$id_academicyear 		= $pagedata['id_academicyear'];
		$id_exam 		        = $pagedata['id_exam'];
		$id_timetable 		    = $pagedata['id_timetable'];
		$id_section 		    = $pagedata['id_section'];
		$mindate                = array();
		$mainData               = array();
		$builder_minDate = $db->table('exams_timetable_subjects t1')->select('t1.id as id_timetable_subject,t1.id_section,t1.id_subject,t1.duration,t1.max_marks,t1.invigilator,t4.start_date,t4.start_time,t3.name as exam_name')->join('exams_timetable t2','t2.id = t1.id_timetable')->join('exams t3','t3.id = t2.id_exam')->join('exams_timetable_subject_schedule t4','t1.id = t4.id_timetable_subject')->where('t1.id_timetable = t4.id_timetable')->where('t2.id',$id_timetable)->where('t2.id_exam',$id_exam)->where('t1.id_section',$id_section)->where('t3.id_academicyear',$id_academicyear)->where('t3.id_board',$id_board)->where('t3.id_institute',$id_institute)->where('t1.status',1)->where('t3.status',1)->orderBy('t4.start_time')->get();
		if($builder_minDate->getResultArray()){
			foreach ($builder_minDate->getResultArray() as $key => $value) {
			   $mindate['exam_name']              = $value['exam_name'];
			   $mindate['subjects'][$key]         = $value;
			   $mindate['subjects'][$key]['date_time'] = date('M d,Y',strtotime($value['start_date'])).' '.date('H:i A',strtotime($value['start_time']));
			   $mindate['subjects'][$key]['duration'] = $value['duration'].' Minutes';
			}	
		}
		$builder = $db->table('generate_hallticket t1')->select('t1.*')->join('exams t2','t2.id = t1.id_exam')->where('t2.id_institute',$id_institute)->where('t2.id_board',$id_board)->where('t2.id_academicyear',$id_academicyear)->where('t1.id_exam',$id_exam)->where('t1.id_exam_timetable',$id_timetable)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$mainData = $mindate;

			}
		}
		return $mainData;

	}

	public function getOrganization(){
		$db      				= \Config\Database::connect();
		$orgContactsDetails     = array();
		$instContactsDetails    = array();
		$orgDetails             = array();
		$instDetails            = array();
		$institutionDetails     = array();
		$organizationDetails    = array();

      $builder_instcontacts    = $db->table('institutions_contacts_mapping')->select('*')->where('status',1)->get();
		if($builder_instcontacts->getResultArray()){
			foreach ($builder_instcontacts->getResultArray() as $instkey => $instvalue) {
				$instContactsDetails[$instvalue['id_institute']][$instkey] = $instvalue;
			}
		}
		$builder_institutes     = $db->table('institutions')->select('*')->where('status',1)->get();
		if($builder_institutes->getResultArray()){
			foreach ($builder_institutes->getResultArray() as $key => $value) {
				$instDetails[$value['id_organization']][$value['id']] = $value;
				$instDetails[$value['id_organization']][$value['id']]['contacts'] = $instContactsDetails[$value['id']];
			}
		}

		if($instDetails){
			foreach ($instDetails as $orgkey => $orgvalue) {
				foreach ($orgvalue as $key => $value) {
					if(!isset($institutionDetails[$orgkey])){
						$institutionDetails[$orgkey] = array();
					}
					array_push($institutionDetails[$orgkey], $value);
				}
			}
		}
		$builder_orgcontacts    = $db->table('organizations_contacts_mapping')->select('*')->where('status',1)->get();
		if($builder_orgcontacts->getResultArray()){
			foreach ($builder_orgcontacts->getResultArray() as $orgkey => $orgvalue) {
				$orgContactsDetails[$orgvalue['id_organization']][$orgkey] = $orgvalue;
			}
		}
		$builder                = $db->table('organizations')->select('*')->where('status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				$orgDetails[$value['id']] = $value;
				$orgDetails[$value['id']]['contacts'] = $orgContactsDetails[$value['id']];
				$orgDetails[$value['id']]['institute'] = $institutionDetails[$value['id']];

			}
		}
		if($orgDetails){
			foreach ($orgDetails as $key => $value) {
				array_push($organizationDetails, $value);
			}
		}
		return $organizationDetails;
	}
	public function getSubjectsExamTimetable($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute           = $pagedata['id_institute'];
		$id_academicyear        = $pagedata['id_academicyear'];
		$id_board               = $pagedata['id_board'];
		$standard_id            = explode(",", $pagedata['standard_id']);
		$mainData               = array();
		$resultData             = array();
		$builder                = $db->table('subject_master t1')->select('t1.id as id_master,t1.name,t2.id as id_subject,t3.standard,t3.section,t3.id as id_section')->join('standard_subject_mapping t2','t1.id = t2.subject_id')->join('class_master t3','t2.standard = t3.id')->where('t1.id_institute = t2.id_institute')->where('t1.id_academicyear = t2.id_academicyear')->where('t1.id_board = t2.id_board')->where('t3.id_institute = t2.id_institute')->where('t3.id_academicyear = t2.id_academicyear')->where('t3.id_board = t2.id_board')->where('t1.id_institute',$id_institute)->where('t1.id_academicyear',$id_academicyear)->where('t1.id_board',$id_board)->where('t1.status',1)->where('t2.status',1)->where('t3.status',1);
		if($pagedata['standard_id']){
			$builder->whereIn('t2.standard',$standard_id);
		}

		$querydata = $builder->get();
		if($querydata->getResultArray()){
			foreach ($querydata->getResultArray() as $key => $value) {
				$mainData[$value['id_master']]['id_master']      = $value['id_master'];
				$mainData[$value['id_master']]['name']           = $value['name'];
				$mainData[$value['id_master']]['standards'][$key]   = $value['standard'].' '.$value['section'];
				$mainData[$value['id_master']]['sections'][$key] = $value['id_section'];
				$mainData[$value['id_master']]['flag'][$value['id_section']]                    = $value['id_section'];
			}
		}
		if($mainData){
			foreach ($mainData as $key => $value) {
				$mainvalue['id_master'] = $value['id_master'];
				$mainvalue['name'] = $value['name'];
				if($value['standards']){
					$mainvalue['standard'] = implode(',', $value['standards']);
				}
				if($value['sections']){
					$mainvalue['sections'] = implode(',', $value['sections']);
				}
				if($standard_id){
					foreach ($standard_id as $key => $vcvalue) {
						if($value['flag'] && isset($value['flag'][$vcvalue])){
							$mainvalue['common'] = 1;
						}else{
							$mainvalue['common'] = 0;
						}	
					}
				}
				array_push($resultData, $mainvalue);		
			}

		}
		return $resultData;
	}

	public function getChecklistMenuDetails($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute           = $pagedata['id_institute'];
		$id_academicyear        = $pagedata['id_academicyear'];
		$id_board               = $pagedata['id_board'];
		$parentData             = array();
		$childData              = array();
		$mainData               =  array();
		$resultData             = array();
		$builder                = $db->table('nav_menu')->where('id_institute',$id_institute)->where('id_academicyear',$id_academicyear)->where('id_board',$id_board)->where('status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if($value['id_parent_menu']==0){
					$parentData[$value['id']] = $value['name'];
				}
				if($value['id_parent_menu']!=0){
					$childData[$value['id']] = $value;
				}
			}
		}
		if($childData){
			foreach ($childData as $key => $value) {
				$mainData[$key] = $value;
				$mainData[$key]['main_module'] = $parentData[$value['id_parent_menu']]?$parentData[$value['id_parent_menu']]:'';
			}
		}
		if($mainData){
			foreach ($mainData as $key => $value) {
				array_push($resultData, $value);
			}
		}
		return $resultData;
	}
	public function getNoteData($pagedata){
		$db      				= \Config\Database::connect();
		$mainData = array();
		$builder  = $db->table('ba_visitors_note')->where('status',1)->get();
		if($builder->getResultArray()){
			foreach ($builder->getResultArray() as $key => $value) {
				if($value['id_ba_visitor']){
					$mainData[$value['id_ba_visitor']] = 'Y';
				}else{
					$mainData[$value['id_ba_visitor']] = 'N';
				}
			}
		}
		return $mainData;
	}

	public function getBAVisitors($pagedata){
		$db      				= \Config\Database::connect();
		$id_institute           = $pagedata['id_institute'];
		$id_academicyear        = $pagedata['id_academicyear'];
		$id_board               = $pagedata['id_board'];
		$id                     = $pagedata['id'];
		$notePresent            = $this->getNoteData($pagedata);
		$mainData               = array();
		$builder                = $db->table('ba_visitors')->where('id_institute',$id_institute)->where('id_board',$id_board)->where('id_academicyear',$id_academicyear)->where('status',1);
		if($id){
			$builder->where('id',$id);
		}
		$querydata = $builder->get();
		if($querydata->getResultArray()){
			foreach ($querydata->getResultArray() as $key => $value) {
				$datedisplay   = explode(' ', $value['visited_time']);
				$mainData[$key] = $value;
				$mainData[$key]['note_present'] = $notePresent[$value['id']]?$notePresent[$value['id']]:'';
				$mainData[$key]['visited_date'] = date("M j, Y",strtotime($datedisplay['0']));
				$mainData[$key]['visited_datetime'] = date("H:i A",strtotime($datedisplay['1']));
			}
		}
		 return $mainData;
	}

	
	public function recursion($parent_id = '') {
		
		$categories = array();
		$db      	= \Config\Database::connect();
		$builder_maindata    = $db->table('employees m')->select('m.id,m.reporting_id,m.user_id,m.name,m.department,m.phone,m.mail_id')->where('m.reporting_id',$parent_id)->orderBy('m.id')->get();
		$data_maindata       = $builder_maindata->getResultArray();
          if($data_maindata) {
              foreach ($data_maindata as $c) {
                $child = $this->recursion($c['id']);
                if($child) {
                    $c ['children']= $child;
                }
                $categories[] = $c;
              }
          }
          return $categories;

	}

	public function getNavMenu($role_id = '') {
		
	
		$db      	= \Config\Database::connect();
		$builder_maindata         = $db->table('nav_menu um')->select('um.*,rp.id_permission')->join('roles_permissions rp','rp.id_permission = um.id')->where('rp.id_role',$role_id)->where('um.status',1)->where('rp.can_view',1)->orderBy('um.id_parent_menu,um.order_menu')->get();
		$data_maindata       = $builder_maindata->getResultArray();
        
          return $data_maindata;

	}

}
