<?php

namespace App\Http\Controllers\Price;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use Request;
use App\Http\Controllers\Controller;
use App\Modules\Models\PlansToPriceList;
use App\Modules\Models\PriceTypes;
use App\Modules\Models\PlansCosts;
use App\Modules\Models\Plans;
use App\Modules\Models\PromoCodes;
use App\Modules\Models\PlansUsers;
use App\Modules\Models\Roles;
use App\Http\Requests\Price\Buy\BuyNowPlanRequest;
use App\Http\Requests\Price\Buy\BuyNowPlanSummaryRequest;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use DateTime;
use stdClass;

use App\Modules\Models\Clients\ClientsCities;
use App\Modules\Models\Clients\ClientsZipCodes;
use App\Modules\Models\Clients\ClientsAddresses;

use App\Modules\Plans\UserPlanModule;


class PriceController extends Controller
{
    protected $version_id = 1;
    protected $currency_id = 1;
	protected $accessRolesBuyPlanIds = [3];

    public function rules(){

        return view('pricing.pl.pricing_rules');
    }

	
    public function pricingPage(Request $request ){

        $canBayPlanOptions = false;

        if(Auth::user()){
            $userPlan = UserPlanModule::getUserPlan();

            if(!$userPlan){
                $canBayPlanOptions = false;
            }else{
                $canBayPlanOptions = $this->checkIfCanUsePlanUserToBayPlansOptions($userPlan);
            }
        }

		return view('pricing.pl.pricing_page')->with('canBayPlanOptions', $canBayPlanOptions)->with('userIp', $request->ip());
    }

    private function checkIfCanUsePlanUserToBayPlansOptions($userPlan){

        return !$userPlan->plan->for_admin_only;
    }

    public function pricingStandardPage(){

        $plans = $this->getStandardPlans();

		return view('pricing.pl.pricing_standard_page')
                        ->with('plans', $plans);
    }

    public function pricingProfesionalPage(){

        $plans = $this->getProfesionalPlans();

		return view('pricing.pl.pricing_profesional_page')
                        ->with('plans', $plans);

    }

    public function pricingElearningPage(){

        $plans = $this->getElearningPlans();

		return view('pricing.pl.pricing_elearning_page')
                        ->with('plans', $plans);
    }

    protected function getStandardPlans(){

        $plansToPriceIds = PlansToPriceList::where('version_id', '=', $this->version_id)
                        ->where('price_type_id', '=', 1)
                        ->pluck('plan_id')->toArray();

        $plansCosts = PlansCosts::wherein('plan_id', $plansToPriceIds)->get();

        return $plansCosts;
    }


    protected function getProfesionalPlans(){

    	$plansToPriceIds = PlansToPriceList::where('version_id', '=', $this->version_id)
                        ->where('price_type_id', '=', 2)
                        ->pluck('plan_id')->toArray();

        $plansCosts = PlansCosts::wherein('plan_id', $plansToPriceIds)->get();

        return $plansCosts;
    }

    protected function getElearningPlans(){

    	$plansToPriceIds = PlansToPriceList::where('version_id', '=', $this->version_id)
                        ->where('price_type_id', '=', 3)
                        ->pluck('plan_id')->toArray();

        $plansCosts = PlansCosts::wherein('plan_id', $plansToPriceIds)->get();

        return $plansCosts;
    }

    public function accountHasExpired()
    {

        if(Session::get('hasPlan')){
            return redirect('/'); 
        }

        return view('pricing.account_has_expired');
  
    }

}
