<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Partners\AddNewPartnerRequest as AddNewUserRequest;
use App\Http\Requests\Admin\Partners\EditPartnerRequest as EditUserRequest;
use App\Http\Requests\Admin\Partners\DeletePartnerRequest as DeleteUserRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Utils\Utils;


class AdminUsersPartnersController extends AdminController
{
	protected $redirectTo = 'admin/userspartnerslist';
	protected $accessRolesIds = [7];


    public function getUsersList(){

    	$rolesList = Roles::wherein('id', $this->accessRolesIds)
						->pluck('name', 'id');

    	$users = $this->getUsers();


        return view('admin.users_partners.users_partners_list')
		        		->with('users', $users)
		        		->with('rolesList', $rolesList);
    }

    protected function getUsers()
    {
        return Users::select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'role_user.role_id', 'roles.name as role_name')
                        ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
                        ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
                        ->whereIn('role_user.role_id', $this->accessRolesIds)
                        ->get();
    }

}
