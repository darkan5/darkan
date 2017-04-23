<?php

namespace App\Http\Controllers\Distributor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\AdminUserByIdController;

use App\Modules\Models\ReselersToDistributors;

class DistributorUserByIdController extends AdminUserByIdController
{

	protected $redirectTo = 'distributor/user/';
	protected $accessRolesIds = [9];
	protected $accessRolesLoginIds = [6, 9];

	protected function checkAccessToUser($userId){
		
        return ReselersToDistributors::where('distributor_id', '=', Auth::user()->id)
                ->where('reseler_id', '=', $userId)
                ->first();
    }

    public function getAddProjectsUrl($user){

    	return url('distributor/addprojectstouser', $user->id);
	}

	public function getBackToUserListUrl(){

    	return  url('distributor/userslist');
	}

	public function getBackToUserListRedirect(){

    	return redirect('distributor/userslist');
	}

}
