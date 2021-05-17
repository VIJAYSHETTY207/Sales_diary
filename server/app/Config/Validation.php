<?php namespace Config;

class Validation
{
	//--------------------------------------------------------------------
	// Setup
	//--------------------------------------------------------------------

	/**
	 * Stores the classes that contain the
	 * rules that are available.
	 *
	 * @var array
	 */
	public $ruleSets = [
		\CodeIgniter\Validation\Rules::class,
		\CodeIgniter\Validation\FormatRules::class,
		\CodeIgniter\Validation\FileRules::class,
		\CodeIgniter\Validation\CreditCardRules::class,
	];

	/**
	 * Specifies the views that are used to display the
	 * errors.
	 *
	 * @var array
	 */
	public $templates = [
		'list'   => 'CodeIgniter\Validation\Views\list',
		'single' => 'CodeIgniter\Validation\Views\single',
	];

	//--------------------------------------------------------------------
	// Rules
	//--------------------------------------------------------------------
	// LOGIN PAGE
	public $email 	            = ['email'    		=> 'required|valid_email'];
	public $phone 	            = ['phone'    		=> 'required|max_length[12]'];
	public $UID 	            = ['UID'    		=> 'required'];
	public $password            = ['password'    	=> 'required'];
	public $board               = ['name'    	    => 'required'];
	public $room                = ['name'    	    => 'required'];
    public $feeconfig           = ['amount'         => 'required'];
    public $feemaster           = ['name'           => 'required'];
    public $institution         = ['name'           => 'required'];
    public $messagegroup        = ['name'           => 'required'];
    public $standard            = ['name'           => 'required'];
    public $subjectmaster       = ['name'           => 'required'];
    public $category            = ['name'           => 'required'];
    public $vehicle             = ['name'           => 'required'];
    public $routemaster         = ['routes'         => 'required'];
    public $routemapping        = ['stops'          => 'required'];
    public $busmapping          = ['buses'          => 'required'];
    public $studentroute        = ['students'       => 'required'];
    public $hostelblocks        = ['hostelblocks'   => 'required'];
    public $hostelrooms         = ['hostelrooms'    => 'required'];
    public $hostelallotments    = ['hostelallotments' => 'required'];
    public $usermenus           =['usermenus'       => 'required'];
    public $menumapping         =['menumapping'     => 'required'];
    public $exammaster          = ['name'           => 'required'];
    public $vendor              = ['name'           => 'required'];
    public $iiqa_basic_eligibility = [
        'client_id'                 => 'required',
        'accreditation_type'        => 'required',
        'cycle_of_accreditation'    => 'required',
        'name_of_the_university'    => 'required',
        'city'                      => 'required',
        'state_ut'                  => 'required',
        'date_of_establishment'     => 'required',
        'year_of_establishment'     => 'required',
        'graduation_year_1'         => 'required',
        'graduation_year_2'         => 'required'
    ]; 
    
    public $iiqa_affiliation = [
        'client_id'              => 'required',
        'affiliated'             => 'required',
        'sra_status'             => 'required'
    ]; 
    
    public $iiqa_profile = [
        'client_id'              => 'required',
        'head_title'             => 'required'
    ];
   

    public $iiqa_basic_eligibility_errors =[
        'client_id' => [
            'required' => 'Client ID required.!'
        ],
        'accreditation_type'=> [
            'required' => 'Accreditation type required.!'
        ],
        'cycle_of_accreditation'=> [
            'required' => 'Cycle of Accreditation required.!'
        ],
        'name_of_the_university'=> [
            'required' => 'Name of the University required.!'
        ],
        'city'=> [
            'required' => 'City required.!'
        ],
        'state_ut'=> [
            'required' => 'State/UT required.!'
        ],
        'date_of_establishment'=> [
            'required' => 'Date of Establishment required.!'
        ],
        'year_of_establishment'=> [
            'required' => 'Year of Establishment required.!'
        ],
        'graduation_year_1'=> [
            'required' => 'GraduationYear I required.!'
        ],
        'graduation_year_2'=> [
            'required' => 'GraduationYear II required.!'
        ]
    ];  
    
    public $iiqa_affiliation_errors =[
        'client_id' => [
            'required' => 'Client ID required.!'
        ],
        'affiliated'=> [
            'required' => 'Affiliated type required.!'
        ],
        'sra_status'=> [
            'required' => 'SRA required.!'
        ]
    ];   
    
    public $iiqa_profile_errors =[
        'head_title' => [
            'required' => 'Title required.!'
        ]
    ];
    
   
}
