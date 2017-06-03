<?php namespace App\Http\Controllers;

use Auth;
use App\Modules\Payments\PaymentsWeb;
use App\Http\Requests\SavePaymentRequest;
use App\Http\Requests\DefaultRequest;
use App\Modules\Projectlist\Projectlist;
use App\Modules\Utils\Utils;
use Lang;
use App;
use Redirect;
use Session;
use App\Modules\Models\PprogramPaid;
use App\Modules\Models\Pprogram;
use App\Modules\Models\Payments;
use App\Modules\Models\PpPaycheck;
use App\Modules\Models\TestDrive;
use App\Modules\Models\PlansUsers;
use App\Modules\Models\Banners;
use Cookie;
use Input;
use App\Modules\Responce\ResponceFactory;

use App\Modules\Plans\UserPlanModule;


class WebController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}

	public function index(DefaultRequest $request)
	{
		// print_r($request['mc_currency']);
		// $postdata = Input::get();

		// print_r($postdata);
		// die();


		return view('web.pages.home');
			// ->with('postdata', $postdata);
	}


	public function examples()
	{

		$publications = $this->getExamplesPublications( );

		return view('web.pages.examples')
						->with('publications', $publications);
	}

	protected function getExamplesPublications()
    {

    	$examples_user_login = config('app.examples_user_login');

    	if(!$examples_user_login || $examples_user_login == ''){
    		return [];
    	}

        return Banners::leftJoin('users', 'users.id', '=', 'banners_projects.user_id')
                ->where('banners_projects.active', '=', true)
                ->where('users.email', '=', $examples_user_login)
                ->get();

    }


	public function affiliateEnterance($userhash)
	{
		Cookie::queue(config('app.affiliateCookieName'), $userhash);
		return redirect('/');
	}

	public function affiliate()
	{

		$registeredAccounts = 0;
		$numberOfPayments = 0;
		$paidOut = 0;

		$myMoney = array();

		if (Auth::check()) {

			if(!Auth::user()->hasRole('affiliate')) {
				return view('web.pages.affiliatenoaccess');
			}

			$paidOut = PpPaycheck::where('user_id', '=', Auth::user()->id)->sum('amount');

			$registeredAccounts = Pprogram::where('partner_id', '=', Auth::user()->id)
									->count();

			$affiliatePrograms = Pprogram::where('partner_id', '=', Auth::user()->id)
									->where('buy', '=', 1)
									->get();

			foreach ($affiliatePrograms as $affiliateProgram) {
				
				$paidRows = PprogramPaid::where('pprogram_id', '=', $affiliateProgram->id)->get();
				foreach ($paidRows as $paidRow) {
					$paymentData = Payments::find($paidRow->payments_id);
					if ($paymentData) {
						if ($paymentData->locale) {
							$numberOfPayments++;
							if (!isset($myMoney[$paymentData->locale])) {
								$myMoney[$paymentData->locale] = ($paymentData->price*(Auth::user()->pp_percent/100));
							} else {
								$myMoney[$paymentData->locale] += ($paymentData->price*(Auth::user()->pp_percent/100));
							}	
						}
					}
				}

			}

			$userPricingLanguage = \Config::get('app.locale');

			$pricingData = config('prices');

			return view('web.pages.affiliate')
					->with('registeredAccounts', $registeredAccounts)
					->with('numberOfPayments', $numberOfPayments)
					->with('pricingData', $pricingData)
					->with('paidOut', $paidOut)
					->with('myMoney', $myMoney);

		} else {

			return view('web.pages.affiliatenotlogged');
		}
		

		// return view('web.pages.affiliate');
	}

	public function ouroffer()
	{
		return view('web.pages.ouroffer');
	}

	public function aboutus()
	{
		return view('web.pages.aboutus');
	}

	public function changeLanguage($language = 'pl')
	{
		if(Auth::check()){

            $lang = Utils::getLocaleByCode($language);

			Auth::user()->lang = $lang;
			Auth::user()->save();
		}
		Cookie::queue('darkanlocale', $language);
		return Redirect::back();
	}

	public function profile()
	{

		if (Auth::check()) {

			$plansUsers = PlansUsers::where('user_id', '=', Auth::user()->id)
                                    ->where('active', '=', true)
                                    ->get();


			$userPlansHtml = '';
			// $userPlans = Utils::getUserPlans();

			// foreach ($userPlans as $planCategoryKey => $planCategory) {
			// 	foreach ($planCategory as $planName => $planExpirationDate) {
			// 		$planHasExpired = Utils::isDateExpired($planExpirationDate);
			// 		$icon = $planHasExpired ? '<i class="fa fa-times-circle text-warning"></i>' : '<i class="fa fa-check-circle text-success"></i>';
					
			// 		$userPlansHtml .= '<tr>';
			// 			$userPlansHtml .= '<td class="header">'. $icon . ' ' . Lang::get($planName) . ':</td>';
			// 			$userPlansHtml .= '<td class="account-type">' . Utils::getDaysToExpiry($planExpirationDate) . '</td>';
			// 		$userPlansHtml .= '</tr>';
			// 	}
			// }

	        $userPricePlansOptions = $this->getUserPricePlansOptions();

			return view('web.pages.profile')
						->with('userPlansHtml', $userPlansHtml)
						->with('plansUsers', $plansUsers)
						->with('userPricePlansOptions', $userPricePlansOptions);
						
		} else {
			return redirect()->guest('/login');
		}
	}

	public function aboutproduct()
	{
		return view('web.pages.aboutproduct');
	}

	public function productvision()
	{
		return view('web.pages.productvision');
	}

	public function documentation()
	{
		$language = \Config::get('app.locale');
		$json = file_get_contents(asset('/tutorial/assets/tutorials/'. $language .'/data.json'));
		$json = json_decode($json, true);

		$docs = $json[$language];
		// foreach ($json[$language] as $index => $val) {
		// 	echo '<li class="tutorial-list-item"><a href="page.php?l=tdoc&i=' . $index . '">' . $val['title'] . '</a></li>';
		// }

		return view('web.pages.documentation')
					->with('docs', $docs);
	}

	public function document($documentId)
	{
		$language = \Config::get('app.locale');


		$index = $documentId;
		$json = file_get_contents(asset('/tutorial/assets/tutorials/'. $language .'/data.json'));
		$json = json_decode($json, true);

		$title = '';

		if( isset($json[$language][$index])){
			$file = $json[$language][$index]['file'];
			$title = $json[$language][$index]['title'];
		
			$docs = file_get_contents(asset('/tutorial/assets/tutorials/' . $language . '/' . $file) );
		}else{
			$docs = file_get_contents(asset('/tutorial/assets/tutorials/' . $language . '/0/0.html') );
		}



		return view('web.pages.document')
					->with('title', $title)
					->with('docs', $docs);
	}


	public function darkanpanel()
	{
		if (Auth::check()) {
			return view('darkanpanel.index');
		} else {
			return redirect()->guest('/login');
		}
	}

	public function termsandconditions()
	{
		return view('web.pages.termsandconditions');
	}

	public function checkTestDriveForm(DefaultRequest $request)	
	{

		$postdata = Input::get('params');
		$email = json_decode($postdata);
		$email = $email->email;

		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		    $responce = ResponceFactory::createResponceFault();
		} else {
			$testDriveRow = TestDrive::firstOrNew(['email' => $email]);
			$testDriveRow->email = $email;
			$testDriveRow->save();
			setcookie('testdrive', true, time() + (86400 * 30), "/");



			$responce = ResponceFactory::createResponceResult();
		    $responce->data = array('testdriveurl' => url('/editor/0'));
		}

			
		echo $responce->toJSON();
	}

	public function acceptCookiePolicy(DefaultRequest $request)	
	{
		Cookie::queue('acceptcookiepolicy', true);
		echo '{}';
	}

    protected function getUserPricePlansOptions(){

        $userPlan = UserPlanModule::getUserPlan();

        if(!$userPlan){
            return false;
        }

        $planOptions = json_decode($userPlan->plan_options);

        return $planOptions;
    }

	

}
