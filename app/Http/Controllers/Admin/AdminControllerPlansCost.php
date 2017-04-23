<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlansCosts\EditPlanCostRequest;
use App\Http\Requests\Admin\PlansCosts\AddNewPlanCostRequest;
use App\Http\Requests\Admin\PlansCosts\DeletePlanCostRequest;
use App\Modules\Models\Currency;
use App\Modules\Models\Plans;
use App\Modules\Models\PlansCosts;
use App\Modules\Models\PlansVersions;



class AdminControllerPlansCost extends Controller
{
	protected $redirectTo = 'admin/planscostlist';

    public function getPlansCostList(){

    	$plansCosts = $this->getPlansCost();
    	$plansArray = $this->getPlans();
    	$currencyArray = $this->getCurrency();
    	$plansVersionsList = $this->getPlansVersions();

		return view('admin.plans_cost.plans_cost_list')
						->with('plansCosts', $plansCosts)
						->with('plansArray', $plansArray)
						->with('currencyArray', $currencyArray)
						->with('plansVersionsList', $plansVersionsList);

    }

    protected function getPlans()
	{
		$plans = Plans::pluck('name', 'id');
		return $plans;
	}

	protected function getCurrency()
	{
		$currencies = Currency::pluck('name', 'id');
		return $currencies;
	}

	protected function getPlansVersions()
	{
		$plansVersionsList = PlansVersions::pluck('version', 'id');

		return $plansVersionsList;
	}

    protected function getPlansCost()
	{
		$result = DB::table('plans_costs')
						->select('plans_costs.id',
									'plans_costs.cost as cost', 
									'plans.name as plan_name', 
									'plans.description as plan_description', 
									'plans.id as plan_id', 
									'currencies.id as currency_id', 
									'currencies.name as curency_name', 
									'plans_costs.version_id as version_id', 
									'plans_versions.version as version_version'
									)

						->leftJoin('plans', 'plans.id', '=', 'plans_costs.plan_id')
						->leftJoin('currencies', 'currencies.id', '=', 'plans_costs.currency_id')
						->leftJoin('plans_versions', 'plans_versions.id', '=', 'plans_costs.version_id')
						->get();

		return $result;
	}

	public function addNewPlanCost(AddNewPlanCostRequest $request){

		$input = Input::all();

		$plan = Plans::find($request->plan_id);

		if($plan->version_id != $request->version_id){
			return redirect($this->redirectTo)->withErrors(['Wersja planu musi być taka sama jak wersja ceny']);
		}

		$planCost = new PlansCosts($input);
		$planCost->save();

		return redirect($this->redirectTo);
	}


	public function editPlanCost(EditPlanCostRequest $request){

		$onePlanCost = PlansCosts::find($request->plan_cost_id); 

		if($onePlanCost){

			$input = Input::all();

		    $onePlanCost->fill($input);
		    $onePlanCost->save();
		}

		return redirect($this->redirectTo);
	}

	public function deletePlanCost(DeletePlanCostRequest $request){

		PlansCosts::find($request->plan_cost_id)->delete(); 

		return redirect($this->redirectTo);

	}

}
