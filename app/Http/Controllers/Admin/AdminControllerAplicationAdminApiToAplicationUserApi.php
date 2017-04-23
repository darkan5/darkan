<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\AplicationAdminApiToAplicationApi;
use App\Modules\Models\AplicationApi;
use App\Http\Requests\Admin\AdminApiToUserApi\AddAdminApiToUserApiRequest;
use App\Http\Requests\Admin\AdminApiToUserApi\EditAdminApiToUserApiRequest;
use App\Http\Requests\Admin\AdminApiToUserApi\DeleteAdminApiToUserApiRequest;


class AdminControllerAplicationAdminApiToAplicationUserApi extends Controller
{
	protected $redirectTo = 'admin/aplicationadminapitoaplicationapi';
	protected $accessRolesIds = [12];

    public function getAdminsApiToUsersApiList(){

    	$adminsApiToUsersApi = $this->getAdminsApiToUsersApi();

    	$adminsApiArray = $this->getAdminsApiArray();
    	$usersApiArray = $this->getUsersApiArray();

        return view('admin.aplication_admin_api_to_aplication_api.aplication_admin_api_to_aplication_api_list')
		        		->with('adminsApiToUsersApi', $adminsApiToUsersApi)
		        		->with('adminsApiArray', $adminsApiArray)
		        		->with('usersApiArray', $usersApiArray);
    }

    protected function getAdminsApiToUsersApi()
	{
		return AplicationAdminApiToAplicationApi::get();
	}

	protected function getAdminsApiArray()
	{
		return AplicationApi::where('role_id', '=', 1)->pluck('api_key', 'id');
	}

	protected function getUsersApiArray()
	{
		return AplicationApi::where('role_id', '=', 2)->pluck('api_key', 'id');
	}


	public function addNewAdminApiToUserApi(AddAdminApiToUserApiRequest $request)
	{

		$aplicationAdminApiToAplicationApi = AplicationAdminApiToAplicationApi::firstOrNew(['admin_api_key_id' => $request->admin_api_key_id, 'api_key_id' => $request->api_key_id]);
		$aplicationAdminApiToAplicationApi->admin_api_key_id = $request->admin_api_key_id;
		$aplicationAdminApiToAplicationApi->api_key_id = $request->api_key_id;
		$aplicationAdminApiToAplicationApi->save();

		return redirect($this->redirectTo);
	}

	public function ediAdminApiToUserApi(EditAdminApiToUserApiRequest $request)
	{

		$aplicationAdminApiToAplicationApi = AplicationAdminApiToAplicationApi::find($request->aplication_admin_api_to_aplication_api_id);

		if($aplicationAdminApiToAplicationApi){

			$input = Input::all();
		    $aplicationAdminApiToAplicationApi->fill($input);
		    $aplicationAdminApiToAplicationApi->save();
		}

		return redirect($this->redirectTo);
	}

	public function deleteAdminApiToUserApi(DeleteAdminApiToUserApiRequest $request)
	{
		$aplicationAdminApiToAplicationApi = AplicationAdminApiToAplicationApi::find($request->aplication_admin_api_to_aplication_api_id);
		$aplicationAdminApiToAplicationApi->delete();

		return redirect($this->redirectTo);
	}
}
