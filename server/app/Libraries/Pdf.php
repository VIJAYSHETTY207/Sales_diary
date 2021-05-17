<?php 
namespace App\Libraries;

    /**
     * Excel Class
     *
     * @package RESTful\Services
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    

    class Pdf
    {
    public $module = '';
    public $moduledata = array();
    public $headerLogo;
    public $institueName;
    public $headerDetails;
        public function getModule() {
            return $this->module;
        }
        public function setModule($module) {
            $this->module = $module;
        }

         public function getModuleData() {
            return $this->moduledata;
        }
        public function setModuleData($moduledata){
            $this->moduledata = $moduledata;
        }

        public function getHeaderLogo() {
            return $this->headerLogo;
        }
        public function setHeaderLogo($headerLogo){
            $this->headerLogo = $headerLogo;
        }
        public function getInstitueName() {
            return $this->institueName;
        }

         public function setInstitueName($institueName){
            $this->institueName = $institueName;
        }
         public function getheaderDetails() {
            return $this->headerDetails;
        }

         public function setheaderDetails($headerDetails){
            $this->headerDetails = $headerDetails;
        }
    }

