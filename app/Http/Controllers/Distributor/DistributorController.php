<?php

namespace App\Http\Controllers\Distributor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests\Admin\AddNewUserRequest;
use App\Http\Requests\Admin\EditUserRequest;
use App\Http\Requests\Admin\DeleteUserRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Models\ReselersToDistributors;
use App\Modules\Utils\Utils;

use App\Modules\User\UserRepository;


class DistributorController extends AdminController
{
	protected $redirectTo = 'distributor/userslist';
	protected $accessRolesIds = [9];
	protected $accessRolesLoginIds = [6, 9];

	public function getPanel(){

		$this->loginAsDistributor();

        return view('distributor.users.distributor_panel');
    }


    public function getUsersList(){

    	$rolesList = Roles::wherein('id', $this->accessRolesIds)
						->pluck('name', 'id');

    	$users = $this->getUsers();

        return view('distributor.users.distributor_users_list')
		        		->with('users', $users)
		        		->with('rolesList', $rolesList);
    }

    protected function getUsers()
	{
		return DB::table('users')
    					->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'role_user.role_id', 'roles.name as role_name')
						->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
						->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
						->leftJoin('reselers_to_distributors', 'reselers_to_distributors.reseler_id', '=', 'users.id')
						->whereIn('role_user.role_id', $this->accessRolesIds)
						->where('reselers_to_distributors.distributor_id', '=', Auth::user()->id)
						->get();
	}

	public function addNewUser(AddNewUserRequest $request)
	{

        if(!$this->checkAccessToRole($request->role_id)){
        	return $this->redirectoToRolesError();
        }

		$input = Input::all();

		$user = UserRepository::getInstance()->createReselerUser($input);

		$reselersToDistributors = ReselersToDistributors::firstOrNew(['reseler_id' => $user->id, 'distributor_id' => Auth::user()->id]);
		$reselersToDistributors->reseler_id = $user->id;
		$reselersToDistributors->distributor_id = Auth::user()->id;
		$reselersToDistributors->save();

		return redirect('distributor/user/' . $user->id );
	}

	public function loginAsOtherUser($userId, $redirect = true)
	{
		$roleId = Users::find($userId)->roleUser->role_id;

		if(!$this->checkAccessToLoginAsOtherUser( $roleId )){
        	return $this->redirectoToRolesError();
        }

        if(!Session::get('loginasdistributorid')){
        	Session::set('loginasdistributorid', Auth::user()->id);
        }

		Auth::loginUsingId($userId);
		Session::set('isDistributor', true);

		if($redirect){
			return redirect('home');
		}
	}

	public function loginAsDistributor()
	{
		$userId = Session::get('loginasdistributorid');
		$user = Users::find($userId);

		if($user){
			//Session::set('loginasdistributorid', $userId );
			//Session::set('loginasreselerid', $userId );
			
			Session::set('isDistributor', false);
			Session::set('isReseler', false);

			Auth::loginUsingId($userId);

			return redirect('home');
		}
	}

}
