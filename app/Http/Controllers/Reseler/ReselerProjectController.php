<?php

namespace App\Http\Controllers\Reseler;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use File;
use App\Http\Controllers\Controller;

use App\Modules\Models\ReselersToReselers;
use App\Http\Controllers\Admin\AdminProjectController;

use App\Modules\Models\UsersToReselers;


class ReselerProjectController extends AdminProjectController
{

    protected $accessRolesIds = [3];

    protected $redirectTo = 'reseler/user/';

    protected function checkAccessToUser($userId){

        return UsersToReselers::where('reseler_id', '=', Auth::user()->id)
                ->where('user_id', '=', $userId)
                ->first();
    }

    protected function getDistributionProjects($userId)
    {
        return [];
    }

}
