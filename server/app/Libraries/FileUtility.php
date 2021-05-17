<?php 
namespace App\Libraries;
//error_reporting(E_ALL);
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx as readerXlsx;
use App\Models\Institution_model as InstitutionModel;
use App\Models\Users_model as UserModel;
    /**
     * Excel Class
     *
     * @package RESTful\Services
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    

    class FileUtility
    {
        public function exportExcelFile($Excel){
            $name                   = $Excel->module;
            $institutename          = $Excel->institueName;
            $headerlogo             = $Excel->headerLogo;
            $headings               = $Excel->headings;
            $moduledata             = $Excel->moduledata;
            $filename               = $name.'_data_'.time().'.xlsx';
            $spreadsheet            = new Spreadsheet();
            $sheet                  = $spreadsheet->getActiveSheet();
            if(isset($institutename) || isset($headerlogo)){
                 $instituteModel         = new InstitutionModel();
                $userModel               = new UserModel();
                $inst_details            = $instituteModel->where('id',1)->where('status',1)->first();
                $user_details            = $userModel->where('UID',$inst_details['created_by'])->where('status',1)->first(); 
                $drawing                 = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                $instURL                 = 'http://localhost/server_4/writable/uploads/institute_logo/';
                $styleArray = array(
                        'font'  => array(
                        'bold'  => true,
                        'color' => array('rgb' => '000000'),
                        'size'  => 18,
                        'name'  => 'Verdana',
                        'margin_top' => '20px',
                        'margin_bottom' => '20px'
                    ));
                $spreadsheet->getActiveSheet()->mergeCells("A1:B3");
                $actual_link =  ROOTPATH.'writable/uploads/institute_logo/USA_LOGO.png'; 
                $drawing->setName('Thumb');
                $drawing->setDescription('Thumbnail Image');
                $drawing->setPath($actual_link);
                $drawing->setHeight(60);
                $drawing->setWidth(60);
                $drawing->setCoordinates('A1');
                $drawing->setWorksheet($spreadsheet->getActiveSheet());
                $currentDateTime = date('Y-M-d H:i:s');
                $spreadsheet->getActiveSheet()->mergeCells("C1:H3");
               // $spreadsheet->getActiveSheet()->setCellValue('C1', $inst_details['name'])->getStyle('C1')->applyFromArray($styleArray);
                $spreadsheet->getActiveSheet()->setCellValue('C1', 'Universal School of Administration')->getStyle('C1')->applyFromArray($styleArray);
                
                //$spreadsheet->getActiveSheet()->setCellValue('A4', 'This report is generated on '.$currentDateTime. ' by '.$user_details['name'])->getStyle('A4')->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('A4', 'This report is generated on '.$currentDateTime)->getStyle('A4')->getFont()->setBold(true);
                $i=5; 
            }else{
                $i = 1;
            }
            $alphas = range('A', 'Z');
              $j=0;
              $k=1000;
            foreach ($headings as $key => $value) {
                $index = $alphas[$j].$i;
                $colWidth = strlen($value['name']);
                $spreadsheet->getActiveSheet()->SetCellValue($index, strtoupper($value['name']))->getStyle($index)->getFont()->setBold(true);
               
                $spreadsheet->getActiveSheet()->getProtection()->setSheet(true);
                $spreadsheet->getDefaultStyle()->getProtection()->setLocked(false);
                $spreadsheet->getActiveSheet()->getStyle($index)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('c3c3c3');
                $spreadsheet->getActiveSheet()->getColumnDimension($alphas[$j])->setWidth($colWidth+5);
                if(isset($value['isProtected']) && $value['isProtected']==true){
                     $sheet->getStyle($alphas[$j])->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);
                }
                if(isset($value['isDropdown']) && $value['isDropdown']==true){
                    $validation = $spreadsheet->getActiveSheet()->getCell($index)->getDataValidation();
                    $validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_LIST );
                    $validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_INFORMATION );
                    $validation->setAllowBlank(false);
                    $validation->setShowInputMessage(true);
                    $validation->setShowErrorMessage(true);
                    $validation->setShowDropDown(true);
                    $validation->setErrorTitle('Input error');
                    $validation->setError('Value is not in list.');
                    $validation->setPromptTitle('Pick from list');
                    $validation->setPrompt('Please pick a value from the drop-down list.');
                    $validation->setFormula1('"'.implode(",",$value['dropDownValues']).'"');
                    $sheet->setDataValidation($index.':'.$alphas[$j].$k, $validation);
                }
                $j++;
            }
            if($moduledata){
                foreach ($moduledata as $data_key => $val) {
                    ++$i;
                      $j=0;
                    foreach ($headings as $head_key => $value) {
                        $index = $alphas[$j].$i;
                        if($head_key=='assigned' && $val[$head_key]==''){
                            $val[$head_key] = 'Not Assigned';
                        }
                        $spreadsheet->getActiveSheet()->SetCellValue($index, $val[$head_key]);
                        $j++;
                    }
                }
            }
        $writer = new Xlsx($spreadsheet); // instantiate Xlsx
 
        //$filename = 'list-of-jaegers'; // set filename for excel file to be exported
 
        header('Content-Type: application/vnd.ms-excel'); // generate excel file
        header('Content-Disposition: attachment;filename="'. $filename); 
        header('Cache-Control: max-age=0');
        
        $writer->save('php://output');

            
        }

         Public function importExcelFile($file,$headings,$module){
        $reader         =   new readerXlsx();
        $spreadsheet    =   $reader->load($file);
        $sheet          =   $spreadsheet->getActiveSheet();
        $highestRow     =   $spreadsheet->getActiveSheet()->getHighestRow();
        for($i=2;$i<=($highestRow);$i++)
        { 
            $id=$sheet->getCell('A'.$i)->getValue();
            foreach ($headings as $headkey => $headval) {
                $key=$headkey.$i;
                $id  = ($id)?$id:$i+1;
               // $cellValue[$id][$headval] = $sheet->getCell($key)->getValue();
                $cellValue[$i][$headval] = $sheet->getCell($key)->getValue();
            }
        }
        return $cellValue;
     }

         public function  exportPdfFile($Pdf){
            $name                   = $Pdf->module;
            $institutename          = $Pdf->institueName;
            $headerlogo             = $Pdf->headerLogo;
            $moduledata             = $Pdf->moduledata;
            $headerlogo             = $Pdf->headerLogo;
            $institueName           = $Pdf->institueName;
            if((isset($headerlogo) && $headerlogo==true) || (isset($institueName) && $institueName==true)){
                $headerDetails      =  $Pdf->headerDetails;
            }else{
                $headerDetails      = '';
            }

            $mpdf = new \Mpdf\Mpdf();
            $mpdf->WriteHTML($headerDetails.$moduledata);
           $mpdf->Output($name.'.pdf', \Mpdf\Output\Destination::DOWNLOAD);
         }
    }

