<?php namespace App\Http\Controllers;


use Auth;
use App\Modules\Responce\ResponceFactory;
use Input;
use Lang;
use App\User;
use App\Modules\Distributor\Distributor;
use App\Http\Requests\Distributor\DistributorRequest;
use App\Http\Requests\Distributor\DistributorAddDealerRequest;
use App\Http\Requests\Distributor\DistributorEditDealerRequest;
use App\Modules\Models\Projects;
use App\Modules\Models\Banners;
use App\Modules\Models\DemosProjects;
use App\Modules\Models\DealerUsers;
use App\Modules\Models\UserLogin;
use App\Modules\Models\Capabilities;
use App\Modules\Models\Payments;
use stdClass;


class DistributorsPanelController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		if (!Auth::check()) {
			return redirect()->guest('/login');
		}
	}

	public function noaccess()
	{		
		return view('web.pages.distributors.noaccess');
	}

	public function dashboard()
	{		
		
		if (Auth::check()) {

			if (Auth::user()->hasRole('superadmin')) {
				$distributor = new Distributor();
				$allUsers = $distributor->getAllUsers();
				$owners = $distributor->getAllOwners();

				return view('web.pages.distributors.dashboard')
							->with('distributorUsers', $allUsers )
							->with('owners', $owners );	
			} else {
				$distributor = new Distributor();
				$distributorUsers = $distributor->getDealerUsers();
				$owners = array();

				return view('web.pages.distributors.dashboard')
							->with('distributorUsers', $distributorUsers )
							->with('owners', $owners );		
			}
		} else {
			// die ('tu');
			return redirect()->guest('/login');

		}
	}

	public function addNewUserForm()
	{

		$title = Lang::get('mails.REGISTER_MAIL_SUBJECT_FROM_DEALER');
		$message = Lang::get('mails.REGISTER_MAIL_CONTENT_FROM_DEALER');

		$demosProjects = DemosProjects::where('user_id', '=', '0')->get();
		$userProjects = Projects::where('user_id', '=', Auth::user()->id)->get();

		return view('web.pages.distributors.add_new_user_form')
						->with('title', $title )
						->with('message', $message )
						->with('demosProjects', $demosProjects)
						->with('userProjects', $userProjects );
	}

	public function addNewUser(DistributorAddDealerRequest $request)
	{
		$login = $request->login;
		$title = $request->title;
		$message = $request->message;

		$demosProjectsIds = $request->demosProjectsIds;
		
		$userProjectsIds = $request->userProjectsIds;

		$distributor = new Distributor();
		$distributorUsers = $distributor->addNewUser($login, $title, $message, $demosProjectsIds, $userProjectsIds);

		return redirect('/administration/dashboard');
	}

	public function editDealerForm(DistributorRequest $request)
	{
		$dealerId = $request->dealerid;

		$dealer = DealerUsers::where('dealer_id', '=', Auth::user()->id)
					->where('user_id', '=', $dealerId)
					->first();

		if($dealer || Auth::user()->hasRole('superadmin')) {

			$user = User::where('id', '=', $dealerId)->first();
			$user->user_plans = json_decode($user->user_plans);
			$user->folders_structure = array();

			$plansObject = config('prices.plansobject');

			$userTypes = Capabilities::get(['name']);
			$userTypesArray = [];
			foreach ($userTypes as $type) {
				array_push($userTypesArray, $type->name);
			}

			return view('web.pages.distributors.edit_dealer')
							->with('dealerId', $dealerId )
							->with('plansObject', $plansObject )
							->with('userTypes', $userTypesArray )
							->with('user', $user );
		}else{
			return $this->noaccess();
		}
	}

	public function showUserDetails($userId)
	{
		$dealerId = $userId;

		$dealer = DealerUsers::where('dealer_id', '=', Auth::user()->id)
					->where('user_id', '=', $dealerId)
					->first();

		if($dealer || Auth::user()->hasRole('superadmin')){

			$user = User::where('id', '=', $dealerId)->first();
			$logins = UserLogin::where('user_id', '=', $dealerId)->get();
			$projects = Projects::where('user_id', '=', $dealerId)->get();
			$banners = Banners::where('user_id', '=', $dealerId)->get();

			return view('web.pages.distributors.user_details')
							->with('dealerId', $dealerId )
							->with('logins', $logins )
							->with('projects', $projects )
							->with('banners', $banners )
							->with('user', $user );
		}else{
			return $this->noaccess();
		}
	}

	public function showPayments()
	{

		if(Auth::user()->hasRole('superadmin')){
			$payments = Payments::all();

			foreach ($payments as $payment) {
				if ($payment->user) {
					$payment->userLogin = $payment->user->email;
				} else {
					$payment->userLogin = 'undefined';
				}
			}

			return view('web.pages.distributors.payments')
							->with('payments', $payments );
		}else{
			return $this->noaccess();
		}
	}

	public function editDealer(DistributorEditDealerRequest $request)
	{

		$params = Input::all();
		// print_r(json_encode($params));
		// 	die();

		$dealerId = $request->dealerId;

		$dealer = DealerUsers::where('dealer_id', '=', Auth::user()->id)->where('user_id', '=', $dealerId)->first();

		if($dealer || Auth::user()->hasRole('superadmin')){
			$user = User::where('id', '=', $dealerId)->first();

			$userPlans = json_encode($user->user_plans);

			$newPlans = new stdClass();
			$selectedPlans = array();



			$plansObject = config('prices.plansobject');

			foreach ($plansObject as $key => $plans) {
				
				$onePlan = new stdClass();

				foreach ($plans as $key2 => $planName) {
					$index = $request->{$planName . '_plan'};

					array_push($selectedPlans, $index);

					if($index != null){
						
						$onePlan->{$plans[$index]} = $request->{$planName . '_date'};

						$newPlans->{$key} = $onePlan;
					}
				}
			}

			$user->user_plans = json_encode($newPlans);

			$user->email = $request->login;
		    $user->lang = $request->lang;
		    $user->subdomain = $request->subdomain;
		    $user->subdomain_name = $request->subdomain_name;
		    $user->type = $request->usertype;
			$user->save();


			//print_r($plansObject);
			//print_r(json_encode($newPlans));
			//print_r($userPlans);
			//print_r(json_encode($selectedPlans));
			//print_r(json_encode($params));
			//die();

			return redirect('/administration/editdealerform/' . $dealerId);

		}else{
			return $this->noaccess();
		}
	}

}
