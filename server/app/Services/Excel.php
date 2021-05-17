<?php namespace RESTful\Services {

    /**
     * Excel Class
     *
     * @package RESTful\Services
     *
     * @author   Jason Napolitano <jnapolitanoit@gmail.com>
     * @updated  Jan 16th, 2020
     */
    public $module;
    public $headings[];
    public $data[];
    public $isPasswordProtected;
    public $password;
    public $headerRequired;
    public $headerLogo;
    public $institueName;

    class Excel
    {
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

         public function getData() {
            return $this->data;
        }
        public function setData(){
            $this->data = $data;
        }

        public function getIsPasswordProtected() {
            return $this->isPasswordProtected;
        }
        public function setIsPasswordProtected(){
            $this->data = $data;
        }

        public function getPassword() {
            return $this->password;
        }
         public function setPassword(){
            $this->password = $password;
        }
        public function getheaderRequired() {
            return $this->headerRequired;
        }
        public function setheaderRequired(){
            $this->headerRequired = $headerRequired;
        }
        public function getHeaderLogo() {
            return $this->headerLogo;
        }
        public function setHeaderLogo(){
            $this->headerLogo = $headerLogo;
        }
        public function getInstitueName() {
            return $this->institueName;
        }

         public function setInstitueName(){
            $this->institueName = $institueName;
        }
    }
}
