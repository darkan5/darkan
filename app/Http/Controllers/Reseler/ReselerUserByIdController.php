<?php

namespace App\Http\Controllers\Reseler;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\AdminUserByIdController;

use App\Modules\Models\UsersToReselers;

class ReselerUserByIdController extends AdminUserByIdController
{

	protected $redirectTo = 'reseler/user/';
	protected $accessRolesIds = [3];
	protected $accessRolesLoginIds = [3, 6];

	protected function checkAccessToUser($userId){
		
        return UsersToReselers::where('reseler_id', '=', Auth::user()->id)
                ->where('user_id', '=', $userId)
                ->first();
    }

    public function getAddProjectsUrl($user){

    	return url('reseler/addprojectstouser', $user->id);
	}

	public function getBackToUserListUrl(){

    	return  url('reseler/userslist');
	}

	public function getBackToUserListRedirect(){

    	return redirect('reseler/userslist');
	}

}
