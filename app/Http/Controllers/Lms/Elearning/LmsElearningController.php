<?php

namespace App\Http\Controllers\Lms\Elearning;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Lms\LmsController;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\Groups;


class LmsElearningController extends LmsController
{
    protected function checkAccessToUser($userId)
    {
        return LmsUserPortal::where('portal_admin', '=', Auth::user()->id)
                ->where('user', '=', $userId)
                ->first();
    }

    protected function checkAccessToGroup($groupId)
    {
        return Groups::where('id_owner', '=', Auth::user()->id)
                ->where('id', '=', $groupId)
                ->first();
    }

}
