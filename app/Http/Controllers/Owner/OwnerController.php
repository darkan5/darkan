<?php

namespace App\Http\Controllers\Owner;

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
use App\Modules\Utils\Utils;


class OwnerController extends AdminController
{
	protected $redirectTo = 'owner/userslist';
	protected $accessRolesIds = [2, 3];

	public function getPanel(){

        return view('owner.users.Owner_panel');
    }

    public function getUsersList(){

    	$rolesList = Roles::wherein('id', $this->accessRolesIds)
						->pluck('name', 'id');

    	$users = $this->getUsers();

        return view('owner.users.users_list')
		        		->with('users', $users)
		        		->with('rolesList', $rolesList);
    }

    public function loginAsOtherUser($userId)
	{
		Session::set('loginasid', Auth::user()->id);

		Auth::loginUsingId($userId);
		Session::set('isOwner', true);
		return redirect('home');
	}

}
