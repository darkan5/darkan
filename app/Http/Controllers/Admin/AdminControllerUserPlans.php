<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
// use App\Http\Requests\Admin\PromoCodes\EditPromocodeRequest;
// use App\Http\Requests\Admin\PromoCodes\AddNewPromocodeRequest;
// use App\Http\Requests\Admin\PromoCodes\DeletePromocodeRequest;
use App\Http\Requests\Admin\PlansUsers\EditPlanUserRequest;
use App\Http\Requests\Admin\PlansUsers\AddPlanUserToUserRequest;
use App\Http\Requests\Admin\PlansUsers\DeletePlanUserRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Models\Plans;
use App\Modules\Models\PlansUsers;
use App\Modules\Models\Currency;
use App\Modules\Utils\Utils;
use App\Modules\Emails\PaymentMailSender;
use DateTime;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use stdClass;


class AdminControllerUserPlans extends Controller
{
	protected $redirectTo = 'admin/userplanslist/';

	public function getUserPlansList($userId) {

		$plansUser = PlansUsers::where('user_id', '=', $userId)
        							//->where('active', '=', true)
        							->get();

        $addPlansList = array();

        $plans = Plans::get();

		foreach ($plans as $plan) {
			$rPlan = $this->getPlan($plan->id);

			if(!$rPlan){
				continue;
			}

			$addPlansList[$rPlan->id] = $rPlan->description;

		}


		$user = Users::find($userId);

		$editPlansList = Plans::pluck('description', 'id');

		$currencyArray = $this->getCurrency();

		return view('admin.user_plans.user_plans')
					->with('plansUser', $plansUser)
					->with('editPlansList', $editPlansList)
					->with('addPlansList', $addPlansList)
					->with('currencyArray', $currencyArray)
					->with('user', $user);
	}

	protected function getCurrency()
	{
		$currencies = Currency::pluck('name', 'id');
		return $currencies;
	}

	private function getPlan($planId)
	{
		$plan = Plans::where('id', '=', $planId)
									->where('active', '=', 1)
								    ->first();

		if(!$plan){
			return false;
		}

		if($plan->limit_enabled == 0){
			return $plan;
		}

		if($plan->used < $plan->limit){

			if($plan->date_enabled == 0){
				return $plan;
			}

			$expirationResult = $this->getExpirationResult($plan->start_date, $plan->expiration_date);

	        if(!$expirationResult){
	           return false;
	        }	

	        return $plan;

		}else{
			return false;
		}
	}

	private function getExpirationResult($startDate, $expirationDate) {

    	$now = time();
		$first = DateTime::createFromFormat('Y-m-d H:i:s', $startDate)->getTimestamp();
		$second = DateTime::createFromFormat('Y-m-d H:i:s', $expirationDate)->getTimestamp();

		if ($now >= $first && $now <= $second)
		{
		    return true;
		}

		return false;
    }

    public function addUserPlanToUser(AddPlanUserToUserRequest $request) {

		$plan = $this->getPlan($request->plan_id);

		if(!$plan){

			return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
		}

		$options = $this->margePlansOptions($plan);

		$input = Input::all();
		$input['user_id'] = $request->user_id;
		$input['promo_code_id'] = 1;
		$input['created_by_user_id'] = Auth::user()->id;
		$input['paying_user_id'] = $request->user_id;
		$input['paid'] = 1;
		$input['active'] = 1;
		$input['plan_cost_to_pay_with_rabat'] = $request->plan_cost_to_pay;
		$input['plan_options'] = json_encode($options);
		$input['session_id'] = 1;

		$period = $plan->period;

		Carbon::setLocale('pl');

		$input['expiration_date'] = $this->getPlanExpiretionDate($request->start_date, $plan);

		$plansUsers = new PlansUsers($input);
		$plansUsers->save();

		// CronEmailTypeToPlanUser::firstOrCreate(['plan_user_id' => $plansUsers->id, 'cron_email_type_id' => 3]);
  //       CronEmailTypeToPlanUser::firstOrCreate(['plan_user_id' => $plansUsers->id, 'cron_email_type_id' => 4]);

  //       $this->sendPaymentEmail($request, $plan);

		return Redirect::to($this->redirectTo . $request->user_id);
	}

	public function editUserPlanToUser(EditPlanUserRequest $request) {

		$plan = $this->getPlan($request->plan_id);

		if(!$plan){

			return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
		}


		$plansUsers = PlansUsers::find($request->user_plan_id); 

		if($plansUsers){
			$input = Input::all();
		    $plansUsers->fill($input);

		    // $options = $this->margePlansOptions($plan);

		    // $plansUsers->plan_options = json_encode($options);
		    $plansUsers->save();
		}

		return Redirect::to($this->redirectTo . $request->user_id);
	}

	public function deleteUserPlanToUser(DeletePlanUserRequest $request) {

		$plansUsers = PlansUsers::find($request->user_plan_id);
		$plansUsers->delete();

		return Redirect::to($this->redirectTo . $request->user_id);
	}

	private function margePlansOptions($plan) {

		$options = new stdClass();

		foreach ($plan->plansToPlansOptions as $plansToPlansOption ) {

			$currentOptions = json_decode($plansToPlansOption->plansOptions->options);

			$options = (object) array_merge((array) $options, (array) $currentOptions);
		}

		return $options;
	}

	private function sendPaymentEmail($request, $plan) {

		$paymentMailSender = new PaymentMailSender();

        $user = User::find($request->user_id);

        if($user && $user->roleUser->name = 'user'){

    		$emailData = array('email' => $user->email, 'name' => $user->name, 'expirationDate' =>  $plansUsers->expiration_date);

        	$paymentMailSender->paymentFinished($emailData);
    	}
	}

	private function getPlanExpiretionDate($start_date, $plan) {

		$startDate = Carbon::createFromFormat('Y-m-d H:i:s', $start_date);

		switch ($plan->plans_period_type_id) {
			case 1:
				$expirationDate =  $startDate->addDays($plan->period);
				break;

			case 2:
				$expirationDate =  $startDate->addWeeks($plan->period);
				break;

			case 3:
				$expirationDate =  $startDate->addMonths($plan->period);
				break;

			case 4:
				$expirationDate =  $startDate->addYears($plan->period);
				break;
			
			default:
				$expirationDate =  $startDate;
				break;
		}

		return $expirationDate;
	}


	
}
