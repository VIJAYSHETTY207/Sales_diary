<?php
if ( ! function_exists('response_data'))
{
	function response_data($data,$error,$message='')
	{
		if($data)
		{
			 $response['data'] = json_encode($data,true);
			 $response['code'] = 200;
		}
		else
		{
			$response['data'] = $message;
			$response['code'] = 500;
		}
		return $response;
	}

}

if(!function_exists('filter_data')){
	function filter_data($jsonData){
		$data = array();
		//$jsonData = $data;
		$data['pageNumber'] = isset($jsonData->pageNumber)?$jsonData->pageNumber:0;
         $data['pageSize']   = isset($jsonData->pageSize)?$jsonData->pageSize:10;
		if($jsonData->filter)
		{
            foreach ($jsonData->filter as $key => $value) {
            	$cond[$key]['column'] = $value->columname;
            	$cond[$key]['operator'] = $value->operator;
            	$cond[$key]['columnvalue'] = $value->columnvalue;
            }
            $data['filter']		=	$cond;
		}
		return $data;
	}
}

?>