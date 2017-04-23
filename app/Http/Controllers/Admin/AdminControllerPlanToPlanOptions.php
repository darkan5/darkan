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


class AdminControllerPlanToPlanOptions extends Controller
{
	protected $redirectTo = 'admin/planstoplansoptionslist';

    public function getPlansToPlanOptionsList(){

    	$plansToPlansOptions = $this->getPlansToPlansOptions();

    	$plansArray = $this->getPlansArray();
    	$plansOptionsArray = $this->getPlansOptionsArray();

        return view('admin.plans_to_plans_options.plans_to_plans_options_list')
		        		->with('plansToPlansOptions', $plansToPlansOptions)
		        		->with('plansArray', $plansArray)
		        		->with('plansOptionsArray', $plansOptionsArray);
    }

    protected function getPlansToPlansOptions()
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
						->get();

		return $result;
	}

	protected function getPlansArray()
	{
		return Plans::pluck('name', 'id');
	}

	protected function getPlansOptionsArray()
	{
		return PlansOptions::pluck('name', 'id');
	}

	public function addNewPlanToPlanOptions(AddNewPlanToPlanOptionsRequest $request)
	{

		$input = Input::all();
		$plansToPlansOptions = new PlansToPlansOptions($input);
		$plansToPlansOptions->save();

		return redirect($this->redirectTo);
	}

	public function editPlanToPlanOptions(EditPlanToPlanOptionsRequest $request)
	{

		$plansToPlansOptions = PlansToPlansOptions::find($request->plan_to_plan_option_id);

		if($plansToPlansOptions){

			$input = Input::all();
		    $plansToPlansOptions->fill($input);
		    $plansToPlansOptions->save();
		}

		return redirect($this->redirectTo);
	}

	public function deletePlanToPlanOptions(DeletePlanToPlanOptionsRequest $request)
	{
		$plansToPlansOptions = PlansToPlansOptions::find($request->plan_to_plan_option_id);
		$plansToPlansOptions->delete();

		return redirect($this->redirectTo);
	}
}
