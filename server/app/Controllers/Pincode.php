<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
class Pincode extends ResourceController
{
    protected $format    = 'json';
    public $threshold = 5;

    public function GetPincode()
    { 
        try
        {
            $jsnSSRForm    = $this->request->getJSON();
            $pincode       = $jsnSSRForm->pincode;

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://pincode.p.rapidapi.com/",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"searchBy\":\"pincode\",\"value\":$pincode}",
                CURLOPT_HTTPHEADER => array(
                    "accept: application/json",
                    "content-type: application/json",
                    "x-rapidapi-host: pincode.p.rapidapi.com",
                    "x-rapidapi-key: f2bd763efbmshdce5158f5b57b05p18f6e8jsn42d2df2de7da"
                ),
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);

            curl_close($curl);

            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
            }
        }
        catch (\Exception $e)
        {
            log_message('error', $e->getMessage());
            return $this->respond($e->getMessage(),500);
        }
    }
}