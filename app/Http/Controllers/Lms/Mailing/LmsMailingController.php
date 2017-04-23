<?php

namespace App\Http\Controllers\Lms\Mailing;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Lms\LmsController;
use App\Modules\Models\MailingUsers;
use App\Modules\Models\MailingGroups;


class LmsMailingController extends LmsController
{
    protected function checkAccessToUser($userId)
    {
        return MailingUsers::where('owner_id', '=', Auth::user()->id)
                ->where('id', '=', $userId)
                ->first();
    }

    protected function checkAccessToGroup($groupId)
    {
        return MailingGroups::where('id_owner', '=', Auth::user()->id)
                ->where('id', '=', $groupId)
                ->first();
    }

}
