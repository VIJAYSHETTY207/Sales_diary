<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;


class UtilFunction extends ResourceController 
{     

    public function getDataByQueryId()
    {
		try{
			$jsnQueryData                 = $this->request->getJSON();
			$query_id                    = $jsnQueryData->query_id;
			$queryParamData				 = $jsnQueryData->query_data;
			$db      		= \Config\Database::connect();
			$dataQuery = '';
			$builder = $db->table('data_queries')->select('query')->where('query_label',$query_id);
			$querydata = $builder->get();
			
			 //if($querydata->getResultArray()){
				foreach ($querydata->getResultArray() as $key => $value) {
					$dataQuery = $value['query']; 
					
				}
			// }
			 
			 $sql = $dataQuery;
			$result = $db->query($sql,$queryParamData);
			 return $this->respond($result->getResultArray(),200);
		}
		catch (\Exception $e)
		{
			log_message('error', $e->getMessage());
			return $this->respond($e->getMessage(),500);
		}
	}
}
		
?>