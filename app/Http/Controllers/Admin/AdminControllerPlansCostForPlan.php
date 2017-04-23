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



class AdminControllerPlansCostForPlan extends Controller
{
	protected $redirectTo = 'admin/planscostlist/';

    public function getPlansCostList($planId){

    	$plansCosts = $this->getPlansCost($planId);
    	$plansArray = $this->getPlans($planId);
    	$currenciesArray = $this->getCurrency($planId);
    	$plansVersionsList = $this->getPlansVersions();

		return view('admin.plans_cost.plans_cost_list')
						->with('plansCosts', $plansCosts)
						->with('plansArray', $plansArray)
						->with('currenciesArray', $currenciesArray)
						->with('plansVersionsList', $plansVersionsList);

    }

    protected function getPlans($planId)
	{
		$plans = Plans::where('id', '=', $planId)->get()->pluck('name', 'id');
		return $plans;
	}

	protected function getCurrency($planId)
	{
		$currencies = Currency::pluck('name', 'id');
		return $currencies;
	}

	protected function getPlansVersions()
	{
		$plansVersionsList = PlansVersions::pluck('version', 'id');

		return $plansVersionsList;
	}

    protected function getPlansCost($planId)
	{
		$result = DB::table('plans_costs')
						->select('plans_costs.id',
									'plans_costs.cost as cost', 
									'plans.name as plan_name', 
									'plans.description as plan_description', 
									'plans.id as plan_id', 
									'currencies.id as currencies_id', 
									'currencies.name as curency_name', 
									'plans_costs.version_id as version_id', 
									'plans_versions.version as version_version',
									'currencies.name as currencies_name'
									)

						->leftJoin('plans', 'plans.id', '=', 'plans_costs.plan_id')
						->leftJoin('currencies', 'currencies.id', '=', 'plans_costs.currencies_id')
						->leftJoin('plans_versions', 'plans_versions.id', '=', 'plans_costs.version_id')
						->where('plans.id', '=', $planId)
						->get();

		return $result;
	}

	public function addNewPlanCost($planId, AddNewPlanCostRequest $request){

		$input = Input::all();

		$planOption = new PlansCosts($input);
		$planOption->save();

		return redirect($this->redirectTo . $planId);
	}


	public function editPlanCost($planId, EditPlanCostRequest $request){

		$onePlanCost = PlansCosts::find($request->plan_cost_id); 

		if($onePlanCost){

			$input = Input::all();

		    $onePlanCost->fill($input);
		    $onePlanCost->save();
		}

		return redirect($this->redirectTo . $planId);
	}

	public function deletePlanCost($planId, DeletePlanCostRequest $request){

		PlansCosts::find($request->plan_cost_id)->delete(); 

		return redirect($this->redirectTo . $planId);

	}

}
