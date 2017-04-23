<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\PlansToPlansOptions;
use App\Modules\Models\Plans;
use App\Modules\Models\PlansOptions;
use App\Http\Requests\Admin\PlanToPlanOptions\AddNewPlanToPlanOptionsRequest;
use App\Http\Requests\Admin\PlanToPlanOptions\EditPlanToPlanOptionsRequest;
use App\Http\Requests\Admin\PlanToPlanOptions\DeletePlanToPlanOptionsRequest;


class AdminControllerPlanToPlanOptionsForPlan extends Controller
{
	protected $redirectTo = 'admin/planstoplansoptionslist/';

    public function getPlansToPlanOptionsList($planId){

    	$plansToPlansOptions = $this->getPlansToPlansOptions($planId);

    	$plansArray = $this->getPlansArray($planId);
    	$plansOptionsArray = $this->getPlansOptionsArray($planId);

        return view('admin.plans_to_plans_options.plans_to_plans_options_list')
		        		->with('plansToPlansOptions', $plansToPlansOptions)
		        		->with('plansArray', $plansArray)
		        		->with('plansOptionsArray', $plansOptionsArray);
    }

    protected function getPlansToPlansOptions($planId)
	{
		//return PlansToPlansOptions::get();

		$result = DB::table('plans_to_plans_options')
						->select('plans_to_plans_options.id',
									'plans.name as plan_name', 
									'plans.description as plan_description', 
									'plans_to_plans_options.plan_id as plan_id', 
									'plans_options.name as plan_option_name', 
									'plans_options.description as plan_option_description',
									'plans_options.options as plan_option_options', 
									'plans_to_plans_options.plan_option_id as plan_option_id'
									)

						->leftJoin('plans', 'plans.id', '=', 'plans_to_plans_options.plan_id')
						->leftJoin('plans_options', 'plans_options.id', '=', 'plans_to_plans_options.plan_option_id')
						->where('plans.id', '=', $planId)
						->get();

		return $result;
	}

	protected function getPlansArray($planId)
	{
		return Plans::where('id', '=', $planId)->get()->pluck('name', 'id');
	}

	protected function getPlansOptionsArray($planId)
	{
		return PlansOptions::pluck('name', 'id');
	}

	public function addNewPlanToPlanOptions($planId, AddNewPlanToPlanOptionsRequest $request)
	{

		$input = Input::all();
		$plansToPlansOptions = new PlansToPlansOptions($input);
		$plansToPlansOptions->save();

		return redirect($this->redirectTo . $planId);
	}

	public function editPlanToPlanOptions($planId, EditPlanToPlanOptionsRequest $request)
	{

		$plansToPlansOptions = PlansToPlansOptions::find($request->plan_to_plan_option_id);

		if($plansToPlansOptions){

			$input = Input::all();
		    $plansToPlansOptions->fill($input);
		    $plansToPlansOptions->save();
		}

		return redirect($this->redirectTo . $planId);
	}

	public function deletePlanToPlanOptions($planId, DeletePlanToPlanOptionsRequest $request)
	{
		$plansToPlansOptions = PlansToPlansOptions::find($request->plan_to_plan_option_id);
		$plansToPlansOptions->delete();

		return redirect($this->redirectTo . $planId);
	}
}
