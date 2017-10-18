<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/


Route::group( [ 'domain' => '{subdomain}.' . config('app.domain'), 'middleware' => 'subdomainmiddleware'], function() {

    Route::post('/portal/sendaccessrequest', 'SubdomainController@sendAccessRequest');
    Route::post('/portal/saveportalpayment', 'Payments\PaymentsController@savePayment');
    Route::post('/subdomain/login', 'Auth\SubdomainLoginController@postLogin');
    Route::post('/subdomain/register', 'Auth\SubdomainLoginController@postRegisterSubdomain');
    Route::post('/subdomain/logout', 'Auth\SubdomainLoginController@subdomainLogout');
    Route::get('{all?}', 'SubdomainController@indexSubdomain')->where('all', '.+');
    Route::post('{all?}', 'SubdomainController@indexSubdomain')->where('all', '.+');

});


Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::get('/home', 'HomeController@index');
Route::get('/testdrive', 'TestDrive\TestDriveController@testDrive');

Route::group(['middleware' => ['auth', 'owner']], function () {

	Route::get('owner/ownerpanel', 'Owner\OwnerController@getPanel');
	Route::get('owner/loginas/{userId}', 'Owner\OwnerController@loginAsOtherUser');

	Route::get('owner/userslist', [
        'uses' => 'Owner\OwnerController@getUsersList'
    ]);

    Route::post('owner/userslist', [
        'uses' => 'Owner\OwnerController@addNewUser'
    ]);

    Route::put('owner/userslist', [
        'uses' => 'Owner\OwnerController@editUser'
    ]);

    Route::delete('owner/userslist', [
        'uses' => 'Owner\OwnerController@deleteUser'
    ]);
});

Route::group(['middleware' => ['auth', 'admin']], function () {

	Route::get('admin/adminpanel', 'Admin\AdminController@getPanel');
    Route::get('admin/loginas/{userId}', 'Admin\AdminController@loginAsOtherUser');
    Route::get('admin/loginasadmin', 'Admin\AdminController@loginAsAdmin');

    // Użytkownicy
	Route::get('admin/userslist', [
        'uses' => 'Admin\AdminController@getUsersList'
    ]);

    Route::post('admin/userslist', [
        'uses' => 'Admin\AdminController@addNewUser'
    ]);

    Route::put('admin/userslist', [
        'uses' => 'Admin\AdminController@editUser'
    ]);

    Route::delete('admin/userslist', [
        'uses' => 'Admin\AdminController@deleteUser'
    ]);

    // Użytkownik admin
    Route::get('admin/user/{id}', [
        'uses' => 'Admin\AdminUserByIdController@getUsersById'
    ]);

    Route::post('admin/user/{id}', [
        'uses' => 'Admin\AdminUserByIdController@addNewUser'
    ]);

    Route::put('admin/user/{id}', [
        'uses' => 'Admin\AdminUserByIdController@editUser'
    ]);

    Route::delete('admin/user/{id}', [
        'uses' => 'Admin\AdminUserByIdController@deleteUser'
    ]);

    // Plany
    Route::get('admin/planslist', [
        'uses' => 'Admin\AdminControllerPlans@getPlansList'
    ]);

    Route::post('admin/addnewplan', [
        'uses' => 'Admin\AdminControllerPlans@addNewPlan'
    ]);

    Route::put('admin/editplan', [
        'uses' => 'Admin\AdminControllerPlans@editPlan'
    ]);

    Route::delete('admin/deleteplan', [
        'uses' => 'Admin\AdminControllerPlans@deletePlan'
    ]);

   

    // Opcje planu
    Route::get('admin/plansoptionslist', [
        'uses' => 'Admin\AdminControllerPlansOptions@getPlansOptionsList'
    ]);

    Route::post('admin/plansoptionslist', [
        'uses' => 'Admin\AdminControllerPlansOptions@addNewPlanOption'
    ]);

    Route::put('admin/plansoptionslist', [
        'uses' => 'Admin\AdminControllerPlansOptions@editPlanOption'
    ]);

    Route::delete('admin/plansoptionslist', [
        'uses' => 'Admin\AdminControllerPlansOptions@deletePlanOption'
    ]);

    //Cena planu
    Route::get('admin/planscostlist', [
        'uses' => 'Admin\AdminControllerPlansCost@getPlansCostList'
    ]);

    Route::post('admin/planscostlist', [
        'uses' => 'Admin\AdminControllerPlansCost@addNewPlanCost'
    ]);

    Route::put('admin/planscostlist', [
        'uses' => 'Admin\AdminControllerPlansCost@editPlanCost'
    ]);

    Route::delete('admin/planscostlist', [
        'uses' => 'Admin\AdminControllerPlansCost@deletePlanCost'
    ]);

    //Waluty
    Route::get('admin/currencieslist', [
        'uses' => 'Admin\AdminControllerCurrencies@getCurrenciesList'
    ]);

    Route::post('admin/currencieslist', [
        'uses' => 'Admin\AdminControllerCurrencies@addNewCurrency'
    ]);

    Route::put('admin/currencieslist', [
        'uses' => 'Admin\AdminControllerCurrencies@editCurrency'
    ]);

    Route::delete('admin/currencieslist', [
        'uses' => 'Admin\AdminControllerCurrencies@deleteCurrency'
    ]);

    //Cena planu {planId}
    Route::get('admin/planscostlist/{id}', [
        'uses' => 'Admin\AdminControllerPlansCostForPlan@getPlansCostList'
    ]);

    Route::post('admin/planscostlist/{id}', [
        'uses' => 'Admin\AdminControllerPlansCostForPlan@addNewPlanCost'
    ]);

    Route::put('admin/planscostlist/{id}', [
        'uses' => 'Admin\AdminControllerPlansCostForPlan@editPlanCost'
    ]);

    Route::delete('admin/planscostlist/{id}', [
        'uses' => 'Admin\AdminControllerPlansCostForPlan@deletePlanCost'
    ]);

    // Szczegóły planu
    Route::get('admin/planstoplansoptionslist', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptions@getPlansToPlanOptionsList'
    ]);

    Route::post('admin/planstoplansoptionslist', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptions@addNewPlanToPlanOptions'
    ]);

    Route::put('admin/planstoplansoptionslist', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptions@editPlanToPlanOptions'
    ]);

    Route::delete('admin/planstoplansoptionslist', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptions@deletePlanToPlanOptions'
    ]);

    // Szczegóły planu {planId}
    Route::get('admin/planstoplansoptionslist/{id}', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptionsForPlan@getPlansToPlanOptionsList'
    ]);

    Route::post('admin/planstoplansoptionslist/{id}', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptionsForPlan@addNewPlanToPlanOptions'
    ]);

    Route::put('admin/planstoplansoptionslist/{id}', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptionsForPlan@editPlanToPlanOptions'
    ]);

    Route::delete('admin/planstoplansoptionslist/{id}', [
        'uses' => 'Admin\AdminControllerPlanToPlanOptionsForPlan@deletePlanToPlanOptions'
    ]);

    // Kody promocyjne
    Route::get('admin/promocodeslist', [
        'uses' => 'Admin\AdminControllerPromoCodes@getPromoCodesList'
    ]);

    Route::post('admin/promocodeslist', [
        'uses' => 'Admin\AdminControllerPromoCodes@addNewPromoCode'
    ]);

    Route::put('admin/promocodeslist', [
        'uses' => 'Admin\AdminControllerPromoCodes@editPromoCode'
    ]);

    Route::delete('admin/promocodeslist', [
        'uses' => 'Admin\AdminControllerPromoCodes@deletePromoCode'
    ]);

    // Plany użytkownika
    Route::get('admin/userplanslist/{id}', [
        'uses' => 'Admin\AdminControllerUserPlans@getUserPlansList'
    ]);

    Route::post('admin/userplanslist/{id}', [
        'uses' => 'Admin\AdminControllerUserPlans@addUserPlanToUser'
    ]);

    Route::put('admin/userplanslist/{id}', [
        'uses' => 'Admin\AdminControllerUserPlans@editUserPlanToUser'
    ]);

    Route::delete('admin/userplanslist/{id}', [
        'uses' => 'Admin\AdminControllerUserPlans@deleteUserPlanToUser'
    ]);

    //Użytkownicy - partnerzy
    Route::get('admin/userspartnerslist', [
        'uses' => 'Admin\AdminUsersPartnersController@getUsersList'
    ]);

    Route::post('admin/userspartnerslist', [
        'uses' => 'Admin\AdminUsersPartnersController@addNewUser'
    ]);

    Route::put('admin/userspartnerslist', [
        'uses' => 'Admin\AdminUsersPartnersController@editUser'
    ]);

    Route::delete('admin/userspartnerslist', [
        'uses' => 'Admin\AdminUsersPartnersController@deleteUser'
    ]);

    // Użytkownicy do kodów promocyjnych
    Route::get('admin/userstopromocodeslist', [
        'uses' => 'Admin\AdminControllerUsersToPromoCodes@getUsersToPromoCodesList'
    ]);

    Route::post('admin/userstopromocodeslist', [
        'uses' => 'Admin\AdminControllerUsersToPromoCodes@addNewUserToPromocode'
    ]);

    Route::put('admin/userstopromocodeslist', [
        'uses' => 'Admin\AdminControllerUsersToPromoCodes@ediUserToPromocode'
    ]);

    Route::delete('admin/userstopromocodeslist', [
        'uses' => 'Admin\AdminControllerUsersToPromoCodes@deleteUserToPromocode'
    ]);

    // Użytkownicy do rabatów
    Route::get('admin/userstodistributorsrabatslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributorsRabats@getUsersToDistributorsRabatList'
    ]);

    Route::post('admin/userstodistributorsrabatslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributorsRabats@addNewUserToDistributorRabat'
    ]);

    Route::put('admin/userstodistributorsrabatslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributorsRabats@ediUserToDistributorRabat'
    ]);

    Route::delete('admin/userstodistributorsrabatslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributorsRabats@deleteUserToDistributorRabat'
    ]);

    //Użytkownicy - dystrybutorzy
    Route::get('admin/usersdistributorslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributors@getUsersList'
    ]);

    Route::post('admin/usersdistributorslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributors@addNewUser'
    ]);

    Route::put('admin/usersdistributorslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributors@editUser'
    ]);

    Route::delete('admin/usersdistributorslist', [
        'uses' => 'Admin\AdminControllerUsersToDistributors@deleteUser'
    ]);

    //Użytkownicy - użytkownicy dystrybutorów
    Route::get('admin/usersdistributorsuserslist', [
        'uses' => 'Admin\AdminControllerDistributorsToUsers@getDistributorsToUsersList'
    ]);

    // Tworzenie kuponów
    Route::get('admin/salescoupons', [
        'uses' => 'Admin\AdminControllerSalesCoupons@getSalesCouponsList'
    ]);

    Route::post('admin/salescoupons', [
        'uses' => 'Admin\AdminControllerSalesCouponsGenerator@addNewSalesCoupon'
    ]);

    Route::put('admin/salescoupons', [
        'uses' => 'Admin\AdminControllerSalesCoupons@editSalesCoupon'
    ]);

    Route::delete('admin/salescoupons', [
        'uses' => 'Admin\AdminControllerSalesCoupons@deleteSalesCoupon'
    ]);

    // Tworzenie kuponów w grupie
    Route::get('admin/salescouponsbygroup/{id}', [
        'uses' => 'Admin\AdminControllerSalesCouponsByGroupIdId@getSalesCouponsList'
    ]);

    Route::post('admin/salescouponsbygroup/{id}', [
        'uses' => 'Admin\AdminControllerSalesCouponsGenerator@addNewSalesCoupon'
    ]);

    Route::put('admin/salescouponsbygroup/{id}', [
        'uses' => 'Admin\AdminControllerSalesCouponsByGroupIdId@editSalesCoupon'
    ]);

    Route::delete('admin/salescouponsbygroup/{id}', [
        'uses' => 'Admin\AdminControllerSalesCouponsByGroupIdId@deleteSalesCoupon'
    ]);

    // Tworzenie grup kuponów
    Route::get('admin/salescouponsgroups', [
        'uses' => 'Admin\AdminControllerSalesCouponsGroups@getSalesCouponsGroupsList'
    ]);

    Route::post('admin/salescouponsgroups', [
        'uses' => 'Admin\AdminControllerSalesCouponsGroups@addNewSalesCouponGroup'
    ]);

    Route::put('admin/salescouponsgroups', [
        'uses' => 'Admin\AdminControllerSalesCouponsGroups@editSalesCouponGroup'
    ]);

    Route::delete('admin/salescouponsgroups', [
        'uses' => 'Admin\AdminControllerSalesCouponsGroups@deleteSalesCouponGroup'
    ]);

    // Wygenerowane kupony

    Route::get('admin/salescouponsgenerated', [
        'uses' => 'Admin\AdminControllerSalesCouponsGenerator@getGeneratedSalesCouponsList'
    ]);

    Route::post('admin/salescouponsgenerated', [
        'uses' => 'Admin\AdminControllerSalesCouponsGenerator@addNewSalesCoupon'
    ]);

    Route::put('admin/salescouponsgenerated', [
        'uses' => 'Admin\AdminControllerSalesCouponsGenerator@downloadFile'
    ]);


    

    //Aplication Api Admin
    Route::get('admin/aplicationapiadmin', [
        'uses' => 'Admin\AdminControllerAplicationApiAdmin@getAplicationApisList'
    ]);

    Route::post('admin/aplicationapiadmin', [
        'uses' => 'Admin\AdminControllerAplicationApiAdmin@addNewAplicationApi'
    ]);

    Route::put('admin/aplicationapiadmin', [
        'uses' => 'Admin\AdminControllerAplicationApiAdmin@editAplicationApi'
    ]);

    Route::delete('admin/aplicationapiadmin', [
        'uses' => 'Admin\AdminControllerAplicationApiAdmin@deleteAplicationApi'
    ]);

     Route::post('admin/addusertoaplicationapi', [
        'uses' => 'Admin\AdminControllerAplicationApiAdmin@addUserToAplicationApi'
    ]);

    //Aplication Api User
    Route::get('admin/aplicationapiuser', [
        'uses' => 'Admin\AdminControllerAplicationApiUser@getAplicationApisList'
    ]);

    Route::post('admin/aplicationapiuser', [
        'uses' => 'Admin\AdminControllerAplicationApiUser@addNewAplicationApi'
    ]);

    Route::put('admin/aplicationapiuser', [
        'uses' => 'Admin\AdminControllerAplicationApiUser@editAplicationApi'
    ]);

    Route::delete('admin/aplicationapiuser', [
        'uses' => 'Admin\AdminControllerAplicationApiUser@deleteAplicationApi'
    ]);

    // Użytkownicy api do Administratorów api
    Route::get('admin/aplicationadminapitoaplicationapi', [
        'uses' => 'Admin\AdminControllerAplicationAdminApiToAplicationUserApi@getAdminsApiToUsersApiList'
    ]);

    Route::post('admin/aplicationadminapitoaplicationapi', [
        'uses' => 'Admin\AdminControllerAplicationAdminApiToAplicationUserApi@addNewAdminApiToUserApi'
    ]);

    Route::put('admin/aplicationadminapitoaplicationapi', [
        'uses' => 'Admin\AdminControllerAplicationAdminApiToAplicationUserApi@ediAdminApiToUserApi'
    ]);

    Route::delete('admin/aplicationadminapitoaplicationapi', [
        'uses' => 'Admin\AdminControllerAplicationAdminApiToAplicationUserApi@deleteAdminApiToUserApi'
    ]);

    // Diagnoza ustawień
    Route::get('admin/diagnose', [
        'uses' => 'Admin\AdminControllerDiagnose@getDiagnosePanel'
    ]);

    Route::post('admin/diagnose', [
        'uses' => 'Admin\AdminControllerDiagnose@makeDiagnose'
    ]);

    //////////////////////
    // Add projects to user by admin
    /////////////////////
    Route::get(' admin/addprojectstouser/{userId}', 'Admin\AdminProjectController@getProjectsList');
    Route::post(' admin/addprojectstouser/{userId}', 'Admin\AdminProjectController@addProjectsToUser');

    //////////////////////
    // Cron test
    /////////////////////
    Route::get('admin/adminecronjob', 'Test\CronJobController@getPanel');


});


//////////////////
// Partner
//////////////////
Route::group(['middleware' => ['auth', 'distributor']], function () {

    Route::get('distributor/adminpanel', 'Distributor\DistributorController@getPanel');
    Route::get('distributor/loginas/{userId}', 'Distributor\DistributorController@loginAsOtherUser');
    Route::get('distributor/loginasdistributor', 'Distributor\DistributorController@loginAsDistributor');


    // Użytkownicy dystrybutora
    Route::get('distributor/userslist', [
        'uses' => 'Distributor\DistributorController@getUsersList'
    ]);

    Route::post('distributor/userslist', [
        'uses' => 'Distributor\DistributorController@addNewUser'
    ]);

    Route::put('distributor/userslist', [
        'uses' => 'Distributor\DistributorController@editUser'
    ]);

    Route::delete('distributor/userslist', [
        'uses' => 'Distributor\DistributorController@deleteUser'
    ]);

    // Użytkownik dystrybutora
    Route::get('distributor/user/{id}', [
        'uses' => 'Distributor\DistributorUserByIdController@getUsersById'
    ]);

    Route::post('distributor/user/{id}', [
        'uses' => 'Distributor\DistributorUserByIdController@addNewUser'
    ]);

    Route::put('distributor/user/{id}', [
        'uses' => 'Distributor\DistributorUserByIdController@editUser'
    ]);

    Route::delete('distributor/user/{id}', [
        'uses' => 'Distributor\DistributorUserByIdController@deleteUser'
    ]);

    //Dystrybutorzy - sprzedaż przez rabat
    Route::get('distributor/salerabat', [
        'uses' => 'Distributor\DistributorControllerPlansUsersSale@getUsersList'
    ]);

    Route::get('distributor/changeuserslisttoday', 'Distributor\DistributorControllerPlansUsersSale@changeUsersListToday');
    Route::get('distributor/changeuserslistweek', 'Distributor\DistributorControllerPlansUsersSale@changeUsersListWeek');
    Route::get('distributor/changeuserslistlastweek', 'Distributor\DistributorControllerPlansUsersSale@changeUsersListLastWeek');
    Route::get('distributor/changeuserslistmonth', 'Distributor\DistributorControllerPlansUsersSale@changeUsersListMonth');
    Route::get('distributor/changeuserslistlastmonth', 'Distributor\DistributorControllerPlansUsersSale@changeUsersListLastMonth');
    Route::get('distributor/changeuserslistyear', 'Distributor\DistributorControllerPlansUsersSale@changeUsersListYear');

    // Reselerzy do rabatów
    Route::get('distributor/userstoreselersrabatslist', [
        'uses' => 'Distributor\DistributorControllerUsersToDistributorsRabats@getUsersToReselersRabatList'
    ]);

    Route::post('distributor/userstoreselersrabatslist', [
        'uses' => 'Distributor\DistributorControllerUsersToDistributorsRabats@addNewUserToReselerRabat'
    ]);

    Route::put('distributor/userstoreselersrabatslist', [
        'uses' => 'Distributor\DistributorControllerUsersToDistributorsRabats@ediUserToReselerRabat'
    ]);

    Route::delete('distributor/userstoreselersrabatslist', [
        'uses' => 'Distributor\DistributorControllerUsersToDistributorsRabats@deleteUserToReselerRabat'
    ]);

    //Reselerzy - do kodów promocyjnych
    Route::get('distributor/usersreselerstopromocodeslist', [
        'uses' => 'Distributor\DistributorControllerUsersReselersToPromoCodes@getUsersToPromoCodesList'
    ]);

    Route::post('distributor/usersreselerstopromocodeslist', [
        'uses' => 'Distributor\DistributorControllerUsersReselersToPromoCodes@addNewUserToPromocode'
    ]);

    Route::put('distributor/usersreselerstopromocodeslist', [
        'uses' => 'Distributor\DistributorControllerUsersReselersToPromoCodes@ediUserToPromocode'
    ]);

    Route::delete('distributor/usersreselerstopromocodeslist', [
        'uses' => 'Distributor\DistributorControllerUsersReselersToPromoCodes@deleteUserToPromocode'
    ]);


    // Kody promocyjne dystrybutorów
    Route::get('distributor/promocodeslist', [
        'uses' => 'Distributor\DistributorControllerPromoCodes@getPromoCodesList'
    ]);

    Route::post('distributor/promocodeslist', [
        'uses' => 'Distributor\DistributorControllerPromoCodes@addNewPromoCode'
    ]);

    Route::put('distributor/promocodeslist', [
        'uses' => 'Distributor\DistributorControllerPromoCodes@editPromoCode'
    ]);

    Route::delete('distributor/promocodeslist', [
        'uses' => 'Distributor\DistributorControllerPromoCodes@deletePromoCode'
    ]);


     //////////////////////
    // Add projects to user by distributor
    /////////////////////
    Route::get(' distributor/addprojectstouser/{userId}', 'Distributor\DistributorProjectController@getProjectsList');
    Route::post(' distributor/addprojectstouser/{userId}', 'Distributor\DistributorProjectController@addProjectsToUser');


});

//////////////////
// Partner
//////////////////
Route::group(['middleware' => ['auth', 'partner']], function () {

    Route::get('partner/sale', [
        'uses' => 'Partner\PartnerController@getUsersList'
    ]);

    Route::post('partner/changesale', [
        'uses' => 'Partner\PartnerController@changeUsersList'
    ]);

    Route::get('partner/changeuserslisttoday', 'Partner\PartnerController@changeUsersListToday');
    Route::get('partner/changeuserslistweek', 'Partner\PartnerController@changeUsersListWeek');
    Route::get('partner/changeuserslistlastweek', 'Partner\PartnerController@changeUsersListLastWeek');
    Route::get('partner/changeuserslistmonth', 'Partner\PartnerController@changeUsersListMonth');
    Route::get('partner/changeuserslistlastmonth', 'Partner\PartnerController@changeUsersListLastMonth');
    Route::get('partner/changeuserslistyear', 'Partner\PartnerController@changeUsersListYear');

});


//////////////////
// Reseler
//////////////////
Route::group(['middleware' => ['auth', 'reseler']], function () {

    
    Route::get('reseler/sale', [
        'uses' => 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@getUsersList'
    ]);

    

    Route::post('reseler/changesale', [
        'uses' => 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@changeUsersList'
    ]);

    Route::get('reseler/changeuserslisttoday', 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@changeUsersListToday');
    Route::get('reseler/changeuserslistweek', 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@changeUsersListWeek');
    Route::get('reseler/changeuserslistlastweek', 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@changeUsersListLastWeek');
    Route::get('reseler/changeuserslistmonth', 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@changeUsersListMonth');
    Route::get('reseler/changeuserslistlastmonth', 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@changeUsersListLastMonth');
    Route::get('reseler/changeuserslistyear', 'Reseler\ReselerControllerPlansUsersSaleByPromoCodes@changeUsersListYear');


    Route::post('reseler/changesalebyrabat', [
        'uses' => 'Reseler\ReselerControllerPlansUsersSale@changeUsersList'
    ]);

    Route::get('reseler/changesalebyrabatuserslisttoday', 'Reseler\ReselerControllerPlansUsersSale@changeUsersListToday');
    Route::get('reseler/changesalebyrabatuserslistweek', 'Reseler\ReselerControllerPlansUsersSale@changeUsersListWeek');
    Route::get('reseler/changesalebyrabatuserslistlastweek', 'Reseler\ReselerControllerPlansUsersSale@changeUsersListLastWeek');
    Route::get('reseler/changesalebyrabatuserslistmonth', 'Reseler\ReselerControllerPlansUsersSale@changeUsersListMonth');
    Route::get('reseler/changesalebyrabatuserslistlastmonth', 'Reseler\ReselerControllerPlansUsersSale@changeUsersListLastMonth');
    Route::get('reseler/changesalebyrabatuserslistyear', 'Reseler\ReselerControllerPlansUsersSale@changeUsersListYear');


    //Dystrybutorzy - sprzedaż przez rabat
    Route::get('reseler/salerabat', [
        'uses' => 'Reseler\ReselerControllerPlansUsersSale@getUsersList'
    ]);



    Route::get('reseler/reselerpanel', 'Reseler\ReselerController@getPanel');
    // Route::get('reseler/loginas/{userId}', 'Reseler\ReselerController@loginAsOtherUser');
    // Route::get('reseler/loginasreseler', 'Reseler\ReselerController@loginAsReseler');

    // Użytkownicy
    Route::get('reseler/userslist', [
        'uses' => 'Reseler\ReselerController@getUsersList'
    ]);

    Route::post('reseler/userslist', [
        'uses' => 'Reseler\ReselerController@addNewUser'
    ]);

    Route::put('reseler/userslist', [
        'uses' => 'Reseler\ReselerController@editUser'
    ]);

    Route::delete('reseler/userslist', [
        'uses' => 'Reseler\ReselerController@deleteUser'
    ]);

    // Użytkownik dystrybutora
    Route::get('reseler/user/{id}', [
        'uses' => 'Reseler\ReselerUserByIdController@getUsersById'
    ]);

    Route::post('reseler/user/{id}', [
        'uses' => 'Reseler\ReselerUserByIdController@addNewUser'
    ]);

    Route::put('reseler/user/{id}', [
        'uses' => 'Reseler\ReselerUserByIdController@editUser'
    ]);

    Route::delete('reseler/user/{id}', [
        'uses' => 'Reseler\ReselerUserByIdController@deleteUser'
    ]);

     //////////////////////
    // Add projects to user by reseler
    /////////////////////
    Route::get(' reseler/addprojectstouser/{userId}', 'Reseler\ReselerProjectController@getProjectsList');
    Route::post(' reseler/addprojectstouser/{userId}', 'Reseler\ReselerProjectController@addProjectsToUser');

});






Route::group(['middleware' => ['auth']], function () {

    //////////////////////
    // Pricing and payment pages
    /////////////////////

    Route::get('/pricing/rules', 'Price\PriceController@rules');
    Route::get('/pricing/accounthasexpired', 'Price\PriceController@accountHasExpired');

    Route::post('/payment/buynow', 'Payment\PaymentController@buyPlanNow');
    Route::post('/payment/buynowsummary', 'Payment\PaymentController@buyPlanNowSummary');
    Route::post('/payment/buyoptionnow', 'Payment\PaymentController@buyPlanOptionNow');
    Route::post('/payment/buyoptionnowsummary', 'Payment\PaymentController@buyOptionNowSummary');

    Route::post('/payment/buyplanbysalescoupon', 'Payment\PaymentController@buyPlanBySalesCoupon');





    //////////////////////
    // Projects page
    /////////////////////
    Route::get('/projects', 'ProjectListController@launch');
    Route::post('/createnewfolder', 'ProjectListController@createNewFolder');
    Route::post('/createnewproject', 'ProjectListController@createNewProject');
    Route::post('/deletefolder', 'ProjectListController@deleteFolder');
    Route::post('/deleteproject', 'ProjectListController@deleteProject');
    Route::post('/setlastvisitedfolderid', 'ProjectListController@setLastVisitedFolderId');
    Route::post('/copyproject', 'ProjectListController@copyProject');
    Route::post('/templateproject', 'ProjectListController@templateProject');
    Route::post('/shareproject', 'ProjectListController@shareProjectFromProjectList');
    Route::post('/editor/shareproject', 'ProjectListController@shareProjectFromEditor');
    Route::post('/unshareproject', 'ProjectListController@unshareProject');
    Route::post('/getsharesrojectusers', 'ProjectListController@getShareProjectUsers');
    Route::post('/updateproject', 'ProjectListController@updateProject');
    Route::post('/updatefolder', 'ProjectListController@updateFolder');
    Route::post('/movefolder', 'ProjectListController@moveFolder');
    Route::post('/moveproject', 'ProjectListController@moveProject');
    Route::post('/checksharedprojects', 'ProjectListController@checkSharedProjects');
    Route::post('/disconectfromsharedprojects', 'ProjectListController@disconectFromSharedProjects');
    Route::post('/uploadzbit', 'ProjectListController@uploadZbit');
    Route::post('/getsummaryuserprojects', 'ProjectListController@getSummaryUserProjects');
    Route::post('/downloadproject', 'ProjectListController@downloadProject');

    Route::get('/profile', 'WebController@profile');
    Route::post('/profilerequest/savesubdomain', 'ProfileController@savesubdomain');
    Route::post('/profilerequest/savesubdomainname', 'ProfileController@savesubdomainname');
    Route::post('/profilerequest/changepassword', 'ProfileController@changepassword');
    Route::post('/profilerequest/changeavatar', 'ProfileController@changeavatar');



    Route::get('/lms', 'Lms\LmsIndexController@index');
    Route::get('/darkanpanel', 'Lms\LmsIndexController@index');

    Route::get('/lms/settings', 'Lms\Settings\LmsSettingsController@getSettings');
    Route::put('/lms/settings', 'Lms\Settings\LmsSettingsController@editSettings');


    Route::get('/lms/projects', 'Lms\Projects\LmsProjectsController@getProjectsList');
    Route::post('/lms/projects', 'Lms\Projects\LmsProjectsController@addProject');
    Route::put('/lms/projects', 'Lms\Projects\LmsProjectsController@editProject');
    Route::delete('/lms/projects', 'Lms\Projects\LmsProjectsController@deleteProject');

    Route::delete('/lms/projects/deletepublication', 'Lms\Projects\LmsProjectsController@deletePublication');

    Route::get('/lms/project/{id}', 'Lms\Projects\LmsProjectByIdController@getProjectById');
    Route::get('/lms/project/{id}/{userId}', 'Lms\Projects\LmsProjectByIdController@getProjectById');
    Route::post('/lms/project/{id}', 'Lms\Projects\LmsProjectByIdController@addProject');
    Route::put('/lms/project/{id}', 'Lms\Projects\LmsProjectByIdController@editProject');
    Route::delete('/lms/project/{id}', 'Lms\Projects\LmsProjectByIdController@deleteProject');

    Route::delete('/lms/projects/deletepublicationfromproject', 'Lms\Projects\LmsProjectByIdController@deletePublication');


    Route::get('/lms/publications', 'Lms\LmsPublicationsController@publications');
    Route::put('/lms/publications', 'Lms\LmsPublicationsController@editPublication');
    Route::delete('/lms/publications', 'Lms\LmsPublicationsController@deletePublication');

    Route::post('/lms/publications/addcouresetogroup', 'Lms\LmsPublicationsController@addCourseToGroup');
    Route::delete('/lms/publications/addcouresetogroup', 'Lms\LmsPublicationsController@deleteCourseFromGroup');


    Route::get('/lms/publication/{id}', 'Lms\LmsPublicationByIdController@getPublicationById');
    Route::get('/lms/publication/{id}/{userId}', 'Lms\LmsPublicationByIdController@getPublicationById');
    Route::delete('/lms/publication/{id}', 'Lms\LmsPublicationByIdController@deleteScormData');
    Route::delete('/lms/publicationdeletegroup', 'Lms\LmsPublicationByIdController@deleteCourseFromGroup');
    Route::post('/lms/publicationaddcoursetogroup', 'Lms\LmsPublicationByIdController@addCourseToGroup');
    Route::put('/lms/publicationedit', 'Lms\LmsPublicationByIdController@editPublication');
    Route::delete('/lms/publicationdelete', 'Lms\LmsPublicationByIdController@deletePublication');

    //Elearning
    Route::get('/lms/elearning/user/{id}', 'Lms\Elearning\LmsElearningUserByIdController@elearningUserById');
    Route::put('/lms/elearning/user/{id}', 'Lms\Elearning\LmsElearningUserByIdController@editUser');
    Route::delete('/lms/elearning/user/{id}', 'Lms\Elearning\LmsElearningUserByIdController@deleteUser');
    Route::delete('/lms/elearning/userscormdata/{id}', 'Lms\Elearning\LmsElearningUserByIdController@deleteScormData');

    Route::post('/lms/elearning/user/groupuser/{id}', 'Lms\Elearning\LmsElearningUserByIdController@addUserToGroup');
    Route::delete('/lms/elearning/user/groupuser/{id}', 'Lms\Elearning\LmsElearningUserByIdController@deleteUserFromGroup');


    Route::get('/lms/elearning/users', 'Lms\Elearning\LmsElearningUsersController@getUsersList');
    Route::post('/lms/elearning/users', 'Lms\Elearning\LmsElearningUsersController@addNewUser');
    Route::put('/lms/elearning/users', 'Lms\Elearning\LmsElearningUsersController@editUser');
    Route::delete('/lms/elearning/users', 'Lms\Elearning\LmsElearningUsersController@deleteUser');

    Route::post(' lms/elearning/downloadfile/users', 'Lms\Elearning\LmsElearningUsersController@downloadFile');

    Route::post('/lms/elearning/groupuser', 'Lms\Elearning\LmsElearningUsersController@addUserToGroup');
    Route::delete('/lms/elearning/groupuser', 'Lms\Elearning\LmsElearningUsersController@deleteUserFromGroup');

    Route::post('/lms/elearning/addnewuserfromjson', 'Lms\Elearning\LmsElearningUsersController@addNewUserFromJson');
    Route::post('/lms/elearning/addnewuserfromjcsv', 'Lms\Elearning\LmsElearningUsersController@addNewUserFromJCSV');


    Route::get('/lms/elearning/groups', 'Lms\Elearning\LmsElearningGroupsController@elearningGroups');
    Route::post('/lms/elearning/groups', 'Lms\Elearning\LmsElearningGroupsController@addNewGroup');
    Route::put('/lms/elearning/groups', 'Lms\Elearning\LmsElearningGroupsController@editGroup');
    Route::delete('/lms/elearning/groups', 'Lms\Elearning\LmsElearningGroupsController@deleteGroup');

    Route::post('/lms/elearning/groupcourse', 'Lms\Elearning\LmsElearningGroupsController@addCourseToGroup');
    Route::delete('/lms/elearning/groupcourse', 'Lms\Elearning\LmsElearningGroupsController@deleteCourseFromGroup');

    Route::post('/lms/elearning/usertogroup', 'Lms\Elearning\LmsElearningGroupsController@addUserToGroup');
    Route::delete('/lms/elearning/usertogroup', 'Lms\Elearning\LmsElearningGroupsController@deleteUserFromGroup');

    Route::get('/lms/elearning/group/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@elearningGroup');
    Route::post('/lms/elearning/group/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@addNewGroup');
    Route::put('/lms/elearning/group/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@editGroup');
    Route::delete('/lms/elearning/group/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@deleteGroup');

    Route::post('/lms/elearning/usertogroup/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@addUserToGroup');
    Route::delete('/lms/elearning/usertogroup/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@deleteUserFromGroup');

    Route::post('/lms/elearning/groupcourse/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@addCourseToGroup');
    Route::delete('/lms/elearning/groupcourse/{id}', 'Lms\Elearning\LmsElearningGroupByIdController@deleteCourseFromGroup');

    Route::get('/lms/publication/userscore/{uid}/{cid}', 'Lms\LmsPublicationUserScoreController@getUserScore');

    Route::get('lms/elearning/mailing/{id}', 'Lms\Elearning\LmsPublicationEmailsSenderController@getPublicationGroups');
    Route::post('lms/elearning/mailing/{id}', 'Lms\Elearning\LmsPublicationEmailsSenderController@sendMessageToGroups');

    Route::get('/lms/elearning/report', 'Lms\Elearning\LmsElearningReportsController@getReportPanel');
    Route::post('/lms/elearning/report', 'Lms\Elearning\LmsElearningReportsController@genetateReport');
    Route::post('/lms/elearning/downloadfile', 'Lms\Elearning\LmsElearningReportsController@downloadFile');


    //Mailing
    Route::get('/lms/mailing/users', 'Lms\Mailing\LmsMailingUsersController@getUsersList');
    Route::post('/lms/mailing/users', 'Lms\Mailing\LmsMailingUsersController@addNewUser');
    Route::put('/lms/mailing/users', 'Lms\Mailing\LmsMailingUsersController@editUser');
    Route::delete('/lms/mailing/users', 'Lms\Mailing\LmsMailingUsersController@deleteUser');

    Route::post('/lms/mailing/groupuser', 'Lms\Mailing\LmsMailingUsersController@addUserToGroup');
    Route::delete('/lms/mailing/groupuser', 'Lms\Mailing\LmsMailingUsersController@deleteUserFromGroup');


    Route::get('/lms/mailing/groups', 'Lms\Mailing\LmsMailingGroupsController@mailingGroups');
    Route::post('/lms/mailing/groups', 'Lms\Mailing\LmsMailingGroupsController@addNewGroup');
    Route::put('/lms/mailing/groups', 'Lms\Mailing\LmsMailingGroupsController@editGroup');
    Route::delete('/lms/mailing/groups', 'Lms\Mailing\LmsMailingGroupsController@deleteGroup');

    Route::post('/lms/mailing/usertogroup', 'Lms\Mailing\LmsMailingGroupsController@addUserToGroup');
    Route::delete('/lms/mailing/usertogroup', 'Lms\Mailing\LmsMailingGroupsController@deleteUserFromGroup');


    Route::get('/lms/mailing/group/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@mailingGroup');
    Route::post('/lms/mailing/group/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@addNewGroup');
    Route::put('/lms/mailing/group/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@editGroup');
    Route::delete('/lms/mailing/group/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@deleteGroup');

    Route::post('/lms/mailing/usertogroup/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@addUserToGroup');
    Route::delete('/lms/mailing/usertogroup/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@deleteUserFromGroup');

    Route::post('/lms/mailing/groupcourse/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@addCourseToGroup');
    Route::delete('/lms/mailing/groupcourse/{id}', 'Lms\Mailing\LmsMailingGroupByIdController@deleteCourseFromGroup');

    //Elearning
    Route::get('/lms/mailing/user/{id}', 'Lms\Mailing\LmsMailingUserByIdController@mailingUserById');
    Route::put('/lms/mailing/user/{id}', 'Lms\Mailing\LmsMailingUserByIdController@editUser');
    Route::delete('/lms/mailing/user/{id}', 'Lms\Mailing\LmsMailingUserByIdController@deleteUser');
    Route::delete('/lms/mailing/userscormdata/{id}', 'Lms\Mailing\LmsMailingUserByIdController@deleteScormData');

    Route::post('/lms/mailing/user/groupuser/{id}', 'Lms\Mailing\LmsMailingUserByIdController@addUserToGroup');
    Route::delete('/lms/mailing/user/groupuser/{id}', 'Lms\Mailing\LmsMailingUserByIdController@deleteUserFromGroup');



    //////////////////////
    // Editor
    /////////////////////
    Route::get('/editor/{projectId}', 'Editor\EditorController@index');
    Route::get('/editor/{projectId}/{userId}', 'Editor\EditorController@index');

    Route::post('/editor/emptyprojectfiles', 'Editor\EditorEmptyProjectController@addEmptyProjectFile');
    Route::delete('/editor/emptyprojectfiles', 'Editor\EditorEmptyProjectController@deleteEmptyProjectFiles');

    Route::post('/editor/emptyprojectpublish', 'Editor\EditorEmptyProjectController@emptyProjectPublish');
    Route::put('/editor/emptyprojectpublish', 'Editor\EditorEmptyProjectController@emptyProjectEditPublication');
    Route::delete('/editor/emptyprojectpublish', 'Editor\EditorEmptyProjectController@emptyProjectDeletePublication');

    Route::put('/editor/emptyproject', 'Editor\EditorEmptyProjectController@editProject');
    Route::delete('/editor/emptyproject', 'Editor\EditorEmptyProjectController@deleteProject');

    Route::post('/editor/emptyprojectoverwritepublication', 'Editor\EditorEmptyProjectController@emptyProjectOverwritePublication');


   
});

//////////////////
// Partner
//////////////////
Route::group(['middleware' => ['auth', 'user']], function () {

    Route::get('user/test', [
        'uses' => 'User\UserController@test'
    ]);

});



//////////////////////
// Wszyscy użytkownicy
/////////////////////
Route::group([], function () {

    //////////////////////
    // Pricing pages for all
    /////////////////////
    Route::get('/pricelist', 'Price\PriceController@pricingPage');
    Route::get('/pricing/standard/{period}', 'Price\PricingController@buyStandardPlan');
    Route::get('/pricing/profesional/{period}', 'Price\PricingController@buyProfesionalPlan');
    Route::get('/pricing/elearning/{period}/{amount}', 'Price\PricingController@buyElearningPlan');

    Route::get('/pricelistoptions', 'Price\PriceOptionsController@pricingOptionsPage');
    Route::get('/pricelistoption/{id}', 'Price\PriceOptionsController@pricingOptionPage');


    Route::get('/', 'WebController@index');
    Route::post('/', 'WebController@index');
    Route::get('/examples', 'WebController@examples');
    Route::get('/affiliate', 'WebController@affiliate');
    Route::get('/aff/{affiliate?}', 'WebController@affiliateEnterance');
    Route::get('/ouroffer', 'WebController@ouroffer');
    Route::get('/aboutus', 'WebController@aboutus');
    Route::get('/aboutproduct', 'WebController@aboutproduct');
    Route::get('/productvision', 'WebController@productvision');
    Route::get('/documentation', 'WebController@documentation');
    Route::get('/termsandconditions', 'WebController@termsandconditions');
    Route::get('/tutorial/{documentId}', 'WebController@document');

    Route::post('/checktestdriveform', 'WebController@checkTestDriveForm');
    Route::post('/acceptcookiepolicy', 'WebController@acceptCookiePolicy');

    //////////////////////
    // Content page
    /////////////////////
    Route::get('/content/{contentHash}', 'ContentController@showContent');
    Route::get('/content/{contentHash}/mailing', 'ContentController@showContentMailingUser');
    Route::get('/getcontent/{contentHash}', 'ContentController@showEmbededContent');

    Route::get('/c/{contentHash}', 'ContentController@showContent');
    Route::get('/app/banners/{contentHash}', 'ContentController@showContent');


    //////////////////////
    // Portal page
    /////////////////////
    Route::get('/portal', 'PortalController@index');
    Route::post('/portal/showhide/{id}', 'PortalController@showHide');
    Route::post('/portal/deletepublication/{id}', 'PortalController@deletePublication');
    Route::post('/portal/sortpublication', 'PortalController@sortPublication');
    Route::post('/portal/changeportalsettings', 'PortalController@changePortalSettings');
    Route::post('/portal/getportalsettings', 'PortalController@getPortalSettings');
    Route::post('/portal/changeportalskin', 'PortalController@changePortalSkin');
    Route::get('/giveportalaccess/{accessHash}', 'PortalController@givePortalAccess');


    //////////////////////
    // Editor
    /////////////////////
    //Route::get('/editor/{projectId}', 'EditorController@index');
    Route::get('/app/2.0.0/{projectId}', 'EditorController@indexOldLink');

    Route::post('/editor/downloadFromOcs', 'OcsController@downloadFromOcs');
    Route::post('/editor/keepsession', 'EditorController@keepSession');
    Route::post('/editor/darkanlibrary', 'EditorController@library');
    Route::post('/editor/searchimages', 'EditorController@searchImages');
    Route::post('/editor/projectversion', 'EditorController@projectVersion');
    Route::post('/editor/publication', 'EditorController@publication');

});











//////////////////////
// Subdomains
/////////////////////



//////////////////////
// Normal web
/////////////////////
//Route::group(['domain' => config('app.domain'), 'middleware' => 'apiCheckMiddleware'] , function() {
Route::group([] , function() {

    
    


    //////////////////////
    // Pricing pages
    /////////////////////
    // Route::get('/pricing', 'Payments\PaymentsController@pricingPage');
    // Route::get('/pricing/standard', 'Payments\PaymentsController@pricingStandardPage');
    // Route::get('/pricing/pro', 'Payments\PaymentsController@pricingProPage');
    // Route::get('/pricing/elearning', 'Payments\PaymentsController@pricingElearningPage');
    Route::post('/savepayment', 'Payments\PaymentsController@savePayment');
    Route::post('/checkdiscountcode', 'Payments\PaymentsController@checkDiscountCode');
    Route::post('/savepaymentform', 'Payments\PaymentsController@savePaymentForm');
    Route::post('/paypalpayment', 'Payments\PaypalPaymentController@makePayment');
    Route::post('/paypalcompleted', 'Payments\PaymentsController@paymentCompletedPage');
    Route::get('/paypalcompleted', 'WebController@profile');

    //Route::get('/testpaypal', 'Payment\TestPaymentController@testPayPal');
    Route::get('/getdone', 'Payment\TestPaymentController@getDone');
    Route::get('/getcancel', 'Payment\TestPaymentController@getCancel');





    //////////////////////
    // Darkanpanel (admin panel)
    /////////////////////
    // Route::get('/darkanpanel', 'WebController@darkanpanel');
    // Route::post('/darkanpanel/lmsrequest', 'LmsController@lmsRequest');
    // Route::post('/darkanpanel/mailing', 'MailingController@runMailingRequest');



    //////////////////////
    // Scorm controller
    //////////////////////
    Route::post('/scormcontroller', 'ScormController@runScormRequest');

    //////////////////////
    // Social login
    /////////////////////
    Route::get('login/{provider?}', 'Auth\LoginController@redirectToProvider');
    Route::get('callback/{provider?}', 'Auth\LoginController@handleProviderCallback');


    //////////////////////
    // Language chager
    //////////////////////
    Route::get('/changelang/{language}', 'WebController@changeLanguage');
    Route::post('/editor/changelang/{language}', 'WebController@changeLanguage');



    // Lang admin controllers
    // Route::get('/langmaker', 'LanguageController@langMaker');
    // Route::get('/languageadmin', 'LanguageController@langAdminView');

    // TEMP
    // Route::get('/prepareprojectsthumbs', 'TempController@prepareProjectsThumbs');
    // Route::get('/checknodejsserver', 'TempController@restartNodeServerIfDown');
    // Route::get('/createtestusers/{usersNumber}', 'TempController@createTestUsers');
    // Route::get('/assignTestUsersWithScormData/{adminId}', 'TempController@assignTestUsersWithScormData');
    // Route::get('/removealltestusersdata', 'TempController@removeAllTestUsersData');
    // Route::get('/pamrowtemplate', 'TempController@pamrowTempalate');
    // Route::get('/repairpublications', 'TempController@repairAllPublications');

});


//////////////////////
// External Editor via API
/////////////////////
Route::group([] , function() {
    Route::get('/editorexternal/{projectId}', 'EditorController@indexExternalProject');
    Route::post('/api', 'ApiController@runApi');
    //////////////////////
    // API
    /////////////////////
    Route::post('/editor/login/login_external', 'ApiEditorController@runLoginRequest');
    Route::get('/apidemo', 'ApiDemo@index');
    Route::post('/apidemo/gethashedapikey', 'ApiDemo@getHashedApikey');
    Route::post('/apidemo/createnewapikey', 'ApiDemo@createNewApiKey');
    Route::post('/apidemo/addnewproject', 'ApiDemo@addNewProject');
    Route::post('/apidemo/publishproject', 'ApiDemo@publishProject');

    //////////////////////
    // API DOCUMENTATION
    /////////////////////
    Route::get('/apidocs', 'ApiDocs@index');
    Route::get('/apidocs/{id}', 'ApiDocs@getItem');
});



//////////////////////
// Distributors Panel
/////////////////////
// Route::group(['before' => 'isDistributor'] , function() {
//     Route::get('/administration/dashboard', 'DistributorsPanelController@dashboard');
//     Route::get('/administration/addnewuserform', 'DistributorsPanelController@addNewUserForm');
//     Route::put('/administration/addnewuser', 'DistributorsPanelController@addNewUser');
//     Route::get('/administration/editdealerform/{dealerid}', 'DistributorsPanelController@editDealerForm');
//     Route::get('/administration/userdetails/{userId}', 'DistributorsPanelController@showUserDetails');
//     Route::put('/administration/editdealer', 'DistributorsPanelController@editDealer');
//     Route::get('/administration/payments', 'DistributorsPanelController@showPayments');
// });
// Route::get('/administration/noaccess', 'DistributorsPanelController@noaccess');

// Route::filter('isDistributor', function()
// {
//     if (!Auth::check() || !Auth::user()->hasRole('distributor'))
//     {
//         return Redirect::to('/administration/noaccess');
//     }
// });

//////////////////////
// Publication course routes
/////////////////////
Route::group([] , function() {
    Route::post('egzaminy/courses/uploaddocfile', 'PublicationCourseController@uploadDocFile');
});


