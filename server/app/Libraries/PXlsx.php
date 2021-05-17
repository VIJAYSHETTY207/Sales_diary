<?php

namespace App\Libraries;

use Xlsx; // relates to the Autoload.php config

class PXlsx extends Xlsx {
    function __construct() {
        parent::__construct();
    }
}