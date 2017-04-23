<?php

namespace App\Http\Controllers\Reseler;

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
use App\Modules\Models\UsersToReselers;
use App\Modules\Utils\Utils;

use App\Modules\User\UserRepository;


class ReselerController extends AdminController
{
	protected $redirectTo = 'reseler/userslist';
	protected $accessRolesIds = [3];
	protected $accessRolesLoginIds = [3, 9];

	public function getPanel(){

        return view('reseler.users.reseler_panel');
    }

    public function getUsersList(){

    	$rolesList = Roles::wherein('id', $this->accessRolesIds)
						->pluck('name', 'id');

    	$users = $this->getUsers();

        return view('reseler.users.reseler_users_list')
		        		->with('users', $users)
		        		->with('rolesList', $rolesList);
    }

     protected function getUsers()
	{
		return DB::table('users')
    					->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'role_user.role_id', 'roles.name as role_name')
						->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
						->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
						->leftJoin('users_to_reselers', 'users_to_reselers.user_id', '=', 'users.id')
						->whereIn('role_user.role_id', $this->accessRolesIds)
						->where('users_to_reselers.reseler_id', Auth::user()->id)
						->get();
	}

	public function addNewUser(AddNewUserRequest $request)
	{


        if(!$this->checkAccessToRole($request->role_id)){
        	return $this->redirectoToRolesError();
        }

		$input = Input::all();
		
		$user = UserRepository::getInstance()->createNormalUser($input);

		$reselersToDistributors = UsersToReselers::firstOrNew(['user_id' => $user->id, 'reseler_id' => Auth::user()->id]);
		$reselersToDistributors->user_id = $user->id;
		$reselersToDistributors->reseler_id = Auth::user()->id;
		$reselersToDistributors->save();

		return redirect('reseler/user/' . $user->id);
	}

	public function loginAsOtherUser($userId, $redirect = true)
	{
		$roleId = Users::find($userId)->roleUser->role_id;

		if(!$this->checkAccessToLoginAsOtherUser( $roleId )){
        	return $this->redirectoToRolesError();
        }

        if(!Session::get('loginasreselerid')){
        	Session::set('loginasreselerid', Auth::user()->id);
        }


		Auth::loginUsingId($userId);
		Session::set('isReseler', true);

		if($redirect){
			return redirect('home');
		}
	}

	public function loginAsReseler()
	{
		$userId = Session::get('loginasreselerid');
		$user = Users::find($userId);

		if($user){
			//Session::set('loginasreselerid', $userId );
			
			Session::set('isReseler', false);

			Auth::loginUsingId($userId);

			return redirect('home');
		}
	}

}
