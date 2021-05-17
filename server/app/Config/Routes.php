<?php namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes(true);

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

$routes->presenter('photos');
$routes->get('photos','Photos::index');

//$routes->presenter('users');
$routes->resource('users');

$routes->post('users','Users::get_data');
$routes->post('users','Users::get_password');


$routes->resource('rooms');

$routes->post('rooms','Rooms::get_data');
$routes->post('rooms','Rooms::insert_room');

$routes->resource('iiqaform');

$routes->post('iiqaform','IIQAForm::get_data');
$routes->post('iiqaform','IIQAForm::insert_iiqa');
$routes->post('iiqaform','IIQAForm::update_iiqa');
$routes->post('iiqaform','IIQAForm::delete_iiqa');

$routes->resource('iiqaformaf');

$routes->post('iiqaformaf','IIQAFormAffiliationCompliance::getAFData');
$routes->post('iiqaformaf','IIQAFormAffiliationCompliance::insert_iiqaAF');
$routes->post('iiqaformaf','IIQAFormAffiliationCompliance::update_iiqaAF');
$routes->post('iiqaformaf','IIQAFormAffiliationCompliance::delete_iiqaAF');

$routes->resource('state');

$routes->post('state','State::getStateData');
$routes->post('state','State::insertStateData');
$routes->post('state','State::updateStateData');
$routes->post('state','State::deleteStateData');

$routes->resource('university');

$routes->post('university','University::getUniversityData');
$routes->post('university','University::insertStateData');
$routes->post('university','University::updateStateData');
$routes->post('university','University::deleteStateData');

$routes->resource('commonfetch');

$routes->post('commonfetch','CommonFetch::getSRAData');
$routes->post('commonfetch','CommonFetch::getStateData');
$routes->post('commonfetch','CommonFetch::getTitleData');
$routes->post('commonfetch','CommonFetch::getDesignationData');

$routes->resource('iiqadocument');

$routes->post('iiqadocument','IIQADocument::getACDocuData');


/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need to it be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
