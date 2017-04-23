<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
// use App\Http\Requests\Admin\DistributorToUser\AddNewDistributorToUserRequest;
// use App\Http\Requests\Admin\DistributorToUser\EditDistributorToUserRequest;
// use App\Http\Requests\Admin\DistributorToUser\DeleteDistributorToUserRequest;
use App\Modules\Models\ReselersToDistributors;


class AdminControllerDistributorsToUsers extends Controller
{
	protected $redirectTo = 'admin/usersdistributorsuserslist';

    public function getDistributorsToUsersList(){

    	$usersToDistributors = $this->getReselersToDistributors();

        return view('admin.users_to_distributors.users_to_distributors_list')
		        		->with('usersToDistributors', $usersToDistributors);
    }

    protected function getReselersToDistributors()
	{
		return ReselersToDistributors::get();
	}

	// public function addNewDistributorToUser(AddNewDistributorToUserRequest $request)
	// {

	// 	$input = Input::all();
	// 	$usersToDistributors = new ReselersToDistributors($input);
	// 	$usersToDistributors->save();

	// 	return redirect($this->redirectTo);
	// }

	// public function editDistributorToUser(EditDistributorToUserRequest $request)
	// {

	// 	$usersToDistributors = ReselersToDistributors::find($request->plan_to_plan_option_id);

	// 	if($usersToDistributors){

	// 		$input = Input::all();
	// 	    $usersToDistributors->fill($input);
	// 	    $usersToDistributors->save();
	// 	}

	// 	return redirect($this->redirectTo);
	// }

	// public function deleteDistributorToUser(DeleteDistributorToUserRequest $request)
	// {
	// 	$usersToDistributors = ReselersToDistributors::find($request->plan_to_plan_option_id);
	// 	$usersToDistributors->delete();

	// 	return redirect($this->redirectTo);
	// }
}
