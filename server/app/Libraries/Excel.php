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
    

    class Excel
    {
    public $module = '';
    public $headings=array();
    public $moduledata = array();
    public $isPasswordProtected;
    public $password;
    public $headerRequired;
    public $headerLogo;
    public $institueName;
        public function getModule() {
            return $this->module;
        }
        public function setModule($module) {
            $this->module = $module;
        }

         public function getHeadings() {
            return $this->headings;
        }
        public function setHeadings($headings){
            $this->headings = $headings;
        }

         public function getModuleData() {
            return $this->moduledata;
        }
        public function setModuleData($moduledata){
            $this->moduledata = $moduledata;
        }

        public function getIsPasswordProtected() {
            return $this->isPasswordProtected;
        }
        public function setIsPasswordProtected($isPasswordProtected){
            $this->isPasswordProtected = $isPasswordProtected;
        }

        public function getPassword() {
            return $this->password;
        }
         public function setPassword($password){
            $this->password = $password;
        }
        public function getheaderRequired() {
            return $this->headerRequired;
        }
        public function setheaderRequired($headerRequired){
            $this->headerRequired = $headerRequired;
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
    }

