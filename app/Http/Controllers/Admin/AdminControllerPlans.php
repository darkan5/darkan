<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Plans\EditPlanRequest;
use App\Http\Requests\Admin\Plans\AddNewPlanRequest;
use App\Http\Requests\Admin\Plans\DeletePlanRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Models\Plans;
use App\Modules\Models\OnOffStates;
use App\Modules\Models\PlansPeroidTypes;
use App\Modules\Models\FormsOfPayment;
use App\Modules\Models\PlansVersions;
use App\Modules\Utils\Utils;


class AdminControllerPlans extends Controller
{
	protected $redirectTo = 'admin/planslist';
	protected $accessRolesIds = [3];

    public function getPlansList(){


    	

    	$onOffStatesList = $this->getOnOffStates();
    	$rolesList = $this->getRoles();
    	$plansPeriodTypes = $this->getPlansPeroidTypes();
    	$p24FormsOfPayment = $this->getFormsOfPayment();
    	$plansVersionsList = $this->getPlansVersions();
    	$plans = $this->getPlans();

		return view('admin.plans.plans_list')
						->with('onOffStatesList', $onOffStatesList)
						->with('rolesList', $rolesList)
						->with('plansPeriodTypes', $plansPeriodTypes)
						->with('p24FormsOfPayment', $p24FormsOfPayment)
						->with('plansVersionsList', $plansVersionsList)
						->with('plans', $plans);

    }

    protected function getPlans()
	{
		return Plans::get();
	}

	protected function getRoles()
	{
		$rolesList = Roles::wherein('id', $this->accessRolesIds)
						->pluck('name', 'id');

		return $rolesList;
	}

	protected function getOnOffStates()
	{
		$onOffStatesList = OnOffStates::pluck('name', 'state');

		return $onOffStatesList;
	}

	protected function getPlansPeroidTypes()
	{
		$plansPeriodTypes = PlansPeroidTypes::pluck('name', 'id');

		return $plansPeriodTypes;
	}

	protected function getFormsOfPayment()
	{
		$formsOfPayment = FormsOfPayment::pluck('name', 'id');

		return $formsOfPayment;
	}

	protected function getPlansVersions()
	{
		$plansVersionsList = PlansVersions::pluck('version', 'id');

		return $plansVersionsList;
	}

	public function addNewPlan(AddNewPlanRequest $request){

		$input = Input::all();
		$input['created_by_user_id'] = Auth::user()->id;

		$promoCodes = new Plans($input);
		$promoCodes->save();

		return redirect($this->redirectTo);
	}


	public function editPlan(EditPlanRequest $request){

		$onePlan = Plans::find($request->plan_id); 

		if($onePlan){

			$input = Input::all();

		    $onePlan->fill($input);
		    $onePlan->save();
		}

		return redirect($this->redirectTo);
	}

	public function deletePlan(DeletePlanRequest $request){

		Plans::find($request->plan_id)->delete(); 

		return redirect($this->redirectTo);

	}

}
