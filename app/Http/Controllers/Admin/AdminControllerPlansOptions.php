<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlansOptions\EditPlanOptionRequest;
use App\Http\Requests\Admin\PlansOptions\AddNewPlanOptionRequest;
use App\Http\Requests\Admin\PlansOptions\DeletePlanOptionRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\PlansOptions;
use App\Modules\Models\PlansVersions;



class AdminControllerPlansOptions extends Controller
{
	protected $redirectTo = 'admin/plansoptionslist';
	
    public function getPlansOptionsList(){

    	$plansOptions = $this->getPlansOptions();
    	$plansVersionsList = $this->getPlansVersions();

		return view('admin.plans_options.plans_options_list')
						->with('plansOptions', $plansOptions)
						->with('plansVersionsList', $plansVersionsList);

    }

    protected function getPlansOptions()
	{
		return PlansOptions::get();
	}

	protected function getPlansVersions()
	{
		$plansVersionsList = PlansVersions::pluck('version', 'id');

		return $plansVersionsList;
	}

	public function addNewPlanOption(AddNewPlanOptionRequest $request){

		$input = Input::all();

		$planOption = new PlansOptions($input);
		$planOption->save();

		return redirect($this->redirectTo);
	}


	public function editPlanOption(EditPlanOptionRequest $request){

		$onePlanOption = PlansOptions::find($request->plan_option_id); 

		if($onePlanOption){

			$input = Input::all();

		    $onePlanOption->fill($input);
		    $onePlanOption->save();
		}

		return redirect($this->redirectTo);
	}

	public function deletePlanOption(DeletePlanOptionRequest $request){

		PlansOptions::find($request->plan_option_id)->delete(); 

		return redirect($this->redirectTo);

	}

}
