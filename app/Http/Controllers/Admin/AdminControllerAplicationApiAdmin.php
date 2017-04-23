<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AplicationApis\EditAplicationApiRequest;
use App\Http\Requests\Admin\AplicationApis\AddNewAplicationApiRequest;
use App\Http\Requests\Admin\AplicationApis\DeleteAplicationApiRequest;
use App\Http\Requests\Admin\AplicationApis\AddUserToAplicationApiRequest;
use App\Modules\Models\AplicationApi;
use App\Modules\Models\UsersToAplicationsApi;

use App\Modules\Utils\Utils;


class AdminControllerAplicationApiAdmin extends Controller
{
	protected $redirectTo = 'admin/aplicationapiadmin';
	protected $accessRolesIds = [12];
	protected $accessApiRoleId = 1;
	
    public function getAplicationApisList(){

    	$usersArray = $this->getUsersArray();

    	$aplicationApis = $this->getAplicationApis();

		return view('admin.aplication_apis.aplication_apis_list')
						->with('aplicationApis', $aplicationApis)
						->with('usersArray', $usersArray);

    }

    protected function getUsersArray()
	{
		return DB::table('users')
    					->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'role_user.role_id', 'roles.name as role_name')
						->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
						->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
						->whereIn('role_user.role_id', $this->accessRolesIds)
						->pluck('email', 'id');
	}

    protected function getAplicationApis()
	{
		return AplicationApi::where('role_id', '=', $this->accessApiRoleId)->get();
	}

	public function addUserToAplicationApi(AddUserToAplicationApiRequest $request){

		$input = Input::all();

		$usersToAplicationsApi = UsersToAplicationsApi::firstOrNew(['user_id' => $request->user_id, 'aplication_api_id' => $request->aplication_api_id]);
		$usersToAplicationsApi->user_id = $request->user_id;
		$usersToAplicationsApi->aplication_api_id = $request->aplication_api_id;
		$usersToAplicationsApi->save();

		return redirect($this->redirectTo);
	}

	public function addNewAplicationApi(AddNewAplicationApiRequest $request){

		$input = Input::all();

		$aplicationApi = new AplicationApi($input);
		$aplicationApi->role_id = $this->accessApiRoleId;
		$aplicationApi->api_key = $this->generateNewApiKey();
		$aplicationApi->save();

		return redirect($this->redirectTo);
	}


	public function editAplicationApi(EditAplicationApiRequest $request){

		$oneAplicationApi = AplicationApi::find($request->aplication_api_id); 

		if($oneAplicationApi){

			$input = Input::all();

		    $oneAplicationApi->fill($input);
		    $oneAplicationApi->save();
		}

		return redirect($this->redirectTo);
	}

	public function deleteAplicationApi(DeleteAplicationApiRequest $request){

		AplicationApi::find($request->aplication_api_id)->delete(); 

		return redirect($this->redirectTo);

	}

	protected function generateNewApiKey(){

		return Utils::generateRandomToken();
	}


}
