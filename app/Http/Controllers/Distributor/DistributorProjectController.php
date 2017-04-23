<?php

namespace App\Http\Controllers\Distributor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use File;
use App\Http\Controllers\Controller;

use App\Modules\Models\ReselersToDistributors;
use App\Http\Controllers\Admin\AdminProjectController;


class DistributorProjectController extends AdminProjectController
{

    protected $accessRolesIds = [9];

    protected $redirectTo = 'distributor/user/';

    protected function checkAccessToUser($userId){

        return ReselersToDistributors::where('distributor_id', '=', Auth::user()->id)
                ->where('reseler_id', '=', $userId)
                ->first();
    }

    protected function getDistributionProjects($userId)
    {
        return [];
    }

}
